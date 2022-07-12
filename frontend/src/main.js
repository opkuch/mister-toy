import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import myStore from './store'
import './css/main.css'

const app = createApp(App)

app.use(router)
app.use(myStore)

app.mount('#app')
