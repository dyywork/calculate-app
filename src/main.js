import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import print from 'vue3-print-nb'
import App from './App.vue'

createApp(App).use(ElementPlus).use(print).mount('#app')
