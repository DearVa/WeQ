import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


const app =  createApp(App)

for(const[k,c]of Object.entries(ElementPlusIcons)){
    app.component(k,c);
}
app.config.globalProperties.$message = ElMessage;
app.use(ElementPlus)
app.mount('#app')
