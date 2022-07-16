import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import dashboard from '../views/dashboard.vue'

import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/toy',
      name: 'toyApp',
      component: toyApp
    },
    {
      path: '/toy/:toyId',
      name: 'toyDetails',
      component: toyDetails
    },
    {
      path: '/toy/edit/:toyId?',
      name: 'toyEdit',
      component: toyEdit
    }
  ]
})

export default router
