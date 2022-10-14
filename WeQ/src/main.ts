import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';  // 引用饿了么Plus
import 'element-plus/dist/index.css';  // 基础样式表
import * as ElementPlusIcons from '@element-plus/icons';  // 导入控件库
import { ElMessage } from 'element-plus';  // 导入EL消息
import { MiraiHelper } from '../framework/mirai_helper'
import { ConsoleCatcher } from '../framework/console_catcher';

const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIcons)) {
    vueApp.component(key, component);
}

const mirai =  new MiraiHelper();
vueApp.config.globalProperties.$mirai = mirai;
console.log("↓Vue")
console.log(window)
console.log(document)
console.log("")

const miraibutt = document.createElement("button")
miraibutt.setAttribute("style","display:none")
miraibutt.id = "miraiButton"
miraibutt.addEventListener("click",()=>{ 
    document.body.removeChild(miraibutt) 
    console.log("triggered")
    mirai.initialize();
})
document.body.appendChild(miraibutt)



vueApp.config.globalProperties.$message = ElMessage;  // 全局化消息配置
vueApp.use(ElementPlus);
vueApp.mount('#app');

declare global{
    interface Window{
        consoleCatcher:ConsoleCatcher;
    }
}
