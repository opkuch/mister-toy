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
    setUser(state, { user }) {
      state.user = user
      window.location.reload()
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
