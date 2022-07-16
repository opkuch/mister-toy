<template>
    <div class="main-layout login-container">
      <el-button type="warning" @click="openSignup" v-if="!loggedinUser"
        >Sign up</el-button
      >
      <el-button type="warning" @click="openSignin" v-if="!loggedinUser"
        >Sign in</el-button
      >
      <div v-else>
        <el-button type="warning" @click="logout">Log out</el-button>
        <div>
          <span>Welcome, </span>
          <span>{{loggedinUser.fullname}}</span>
        </div>
          <a>My profile</a>
      </div>

    <modal class="modal" v-model="isShow">
      <div class="modal">
        <form @submit.prevent="login" v-if="isSignin">
          <h1>Not in our community? <a @click="isSignin = false">Join us!</a></h1>
          <label for="username-input">
            <span>Username</span>
            <el-input
              type="text"
              v-model="credentials.username"
              placeholder="Enter username"
              id="username-input"
            />
          </label>
          <label for="password-input">
            <span>Password</span>
            <el-input
              type="password"
              v-model="credentials.password"
              placeholder="Enter password"
              id="password-input"
            />
          </label>
          <button type="warning">Log in</button>
          <p v-show="loginMsg">{{ loginMsg }}</p>
        </form>
        <form @submit.prevent="signup" v-else>
          <h1>Sign up</h1>
          <label for="fullname-input">
            <span>Full name</span>
            <el-input
              type="text"
              v-model="signupInfo.fullname"
              placeholder="Enter Full Name"
              id="fullname-input"
            />
          </label>
          <label for="username-input">
            <span>Username</span>
            <el-input
              type="text"
              v-model="signupInfo.username"
              placeholder="Enter username"
              id="username-input"
            />
          </label>
          <label for="password-input">
            <span>Password</span>
            <el-input
              type="password"
              v-model="signupInfo.password"
              placeholder="Enter password"
              id="password-input"
            />
          </label>
          <button type="warning">Sign up!</button>
          <p v-show="loginMsg">{{ loginMsg }}</p>
        </form>
        <el-button @click="closeModal">X</el-button>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      credentials: {
        username: null,
        password: null,
      },
      signupInfo: {
        fullname: null,
        username: null,
        password: null
      },
      isShow: false,
      isSignin: true,
      loggedinUser: null
    }
  },
  created() {
    this.loggedinUser = this.$store.getters.user
  },
  methods: {
    closeModal() {
      this.$store.commit('toggleModal', false)
      this.isShow = this.$store.getters.isModal
    },  
    openModal() {
      this.$store.commit('toggleModal', true)
      this.isShow = this.$store.getters.isModal
    },
    login() {
      this.$emit('login', this.credentials)
      this.credentials.username = null
      this.credentials.password = null
      setTimeout(() => {
        const user = this.$store.getters.user
        if (user) {
          this.loggedinUser = user
          this.closeModal()
        }
      }, 1500)
    },
    logout() {
      this.$emit('logout')
      this.loggedinUser = null
    },
    signup() {
      this.$emit('signup', this.signupInfo)
      this.signupInfo.fullname = ''
      this.signupInfo.username = ''
      this.signupInfo.password = ''
      this.closeModal()
    },
    openSignup() {
      this.isSignin = false
      this.openModal()
    },
    openSignin() {
      this.isSignin = true
      this.openModal()
    },
  },
  computed: {
    loginMsg() {
      return this.$store.getters.loginMsg
    },
  },
}
</script>
<style></style>
