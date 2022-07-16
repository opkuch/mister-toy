<template>
  <div v-if="loggedUser && getToys" >
    <toy-filter @filtered="onSetFilter" />
    <toy-list :toys="getToys" @remove="onRemoveToy" />
  </div>
  <div class="toy-app-login flex align-center flex-col" v-else>
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
    onRemoveToy(toyId) {
      this.$store.dispatch('removeToy', { toyId })
    },
    onSetFilter(filterBy) {
      filterBy.sort.direction ? filterBy.sort.direction = 1 : filterBy.sort.direction = -1
      this.$store.dispatch({ type: 'setFilterBy', filterBy })
    },
    onLogin(credentials) {
      console.log(credentials);
      this.$store.dispatch({ type: 'login', credentials })
    },
    onLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    onSignup(signupInfo) {
      this.$store.dispatch({ type: 'signup', signupInfo })
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
