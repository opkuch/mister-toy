import { userService } from '../../services/user.service.js'

export default {
  state: {
    user: userService.getLoggedinUser(),
    isSigninModal: false,
    loginMsg: '',
  },
  getters: {
    user({ user }) {
      return user
    },
    isModal({ isSigninModal }) {
      return isSigninModal
    },
    isAdmin({ user }) {
      return user.isAdmin
    },
    loginMsg({ loginMsg }) {
      return loginMsg
    },
  },
  mutations: {
    updateOrder(state, { order }) {
      const idx = state.user.orders.findIndex((o) => o._id === order._id)
      state.user.orders.splice(idx, 1, order)
    },
    setUser(state, { user }) {
      state.user = user
    },
    setUserBalance(state, { balance }) {
      state.user.balance = balance
    },
    toggleModal(state, bool) {
      state.isSigninModal = bool
    },
    setMsg(state) {
      if (state.user) {
        state.loginMsg = 'Logged in successfully! redirecting..'
      } else {
        state.loginMsg = 'login failed! try again..'
      }
    },
    clearMsg(state) {
      state.loginMsg = ''
    },
  },
  actions: {
    checkout({ commit, getters }) {
      return userService
        .addOrder(getters.cart, getters.cartTotal)
        .then((user) => {
          commit({ type: 'setUser', user })
          commit({ type: 'clearCart' })
          return user.balance
        })
    },
    changeOrderStatus({ commit }, { orderId, status }) {
      return userService.changeOrderStatus(orderId, status).then((order) => {
        commit({ type: 'updateOrder', order })
        return order
      })
    },
    deposit({ commit }, { amount }) {
      return userService.updateBalance(amount).then((balance) => {
        commit({ type: 'setUserBalance', balance })
        return balance
      })
    },
    async login({ commit }, { credentials }) {
      try {
        const user = await userService.login(credentials)
        commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.log('Cannot sign in', err)
      } finally {
        commit({ type: 'setMsg' })
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout()
        commit({ type: 'setUser', user: null })
        commit({ type: 'clearMsg' })
      } catch (err) {
        console.error('CANNOT LOGOUT', err)
      }
    },
    async signup({commit}, {signupInfo}) {
        try {
            const user = await userService.signup(signupInfo)
            commit({ type: 'setUser', user })
            return user    
        } catch (err) {
            console.error('cannot signup', err)
        }
    }
  },
}
