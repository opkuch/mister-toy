<template>
  <div v-if="loggedUser && getToys" >
    <toy-filter @filtered="setFilter" />
    <toy-list :toys="getToys" @remove="removeToy" />
  </div>
  <div v-else>
    <h1>Are you signed up already?</h1>
    <login-logout @login="onLogin" @logout="onLogout" @signup="onSignup" />
  </div>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'
import loginLogout from '../components/login-logout.vue'

export default {
  name: 'toyApp',
  data() {
    return {
      loggedUser: null,
    }
  },
  created() {
    this.loggedUser = this.$store.getters.user
  },
  computed: {
    getToys() {
      return this.$store.getters.toysForDisplay
    },
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch('removeToy', { toyId })
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilterBy', filterBy })
    },
    onLogin(credentials) {
      console.log(credentials);
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
    }
  },
  components: {
    toyList,
    toyFilter,
    loginLogout,
  },
}
</script>

<style></style>
