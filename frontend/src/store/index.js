import { createStore } from 'vuex'
import userStore from './modules/user-store.js'
import toyStore from './modules/toy-store.js'

export const myStore = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    toyStore
  }
})

export default myStore
