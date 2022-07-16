<template>
  <section class="main-layout">
    <app-header @login="onLogin" @logout="onLogout" @signup="onSignup" />
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'App',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  methods: {
    onLogin(credentials) {
      this.$store.dispatch({ type: 'login', credentials })
      window.location.reload()
    },
    onLogout() {
      this.$store.dispatch({ type: 'logout' })
      window.location.reload()
    },
    onSignup(signupInfo) {
      this.$store.dispatch({ type: 'signup', signupInfo })
      window.location.reload()
    },
  },
  components: {
    appHeader,
  },
}
</script>

<style>
@import '@/assets/base.css';
</style>
