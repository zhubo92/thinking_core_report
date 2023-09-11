// 初始化样式
import '@/styles/reset.scss'
import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 pinia
import store from './store'
import 'animate.css'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
// 引入共样式
import './styles/common.scss'
import VConsole from 'vconsole'
new VConsole()
const app = createApp(App).use(store)

app.use(router).mount('#app')
