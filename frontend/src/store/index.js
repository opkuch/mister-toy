// import { userStore } from './user-store.js'
import { createStore } from 'vuex'
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
    // userStore,
    toyStore
  }
})

export default myStore
