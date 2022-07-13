import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import myStore from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./styles/styles.scss"

const app = createApp(App)

app.use(router)
app.use(myStore)
app.use(ElementPlus)

app.mount('#app')
