import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import myStore from './store'
import ElementPlus from 'element-plus'
// import VModal from 'vue-js-modal'
import 'element-plus/dist/index.css'
import "./styles/styles.scss"
import 'vue-universal-modal/dist/index.css';

import VueUniversalModal from 'vue-universal-modal';


const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    // look implementation inside car-preview.vue
    return '$' + amount
  },
}

app.use(router)
app.use(myStore)
app.use(ElementPlus)
app.use(VueUniversalModal, {
    teleportTarget: '#modals',
    modalComponent: 'modal',
  });
  
app.mount('#app')
