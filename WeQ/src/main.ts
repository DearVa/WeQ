import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';  // 引用饿了么Plus
import 'element-plus/dist/index.css';  // 基础样式表
import * as ElementPlusIcons from '@element-plus/icons';  // 导入控件库
import { ElMessage } from 'element-plus';  // 导入EL消息

const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIcons)) {
    vueApp.component(key, component);
}

vueApp.config.globalProperties.$message = ElMessage;  // 全局化消息配置
vueApp.use(ElementPlus);
vueApp.mount('#app');
