<template>
  <app-header />  
  <router-view />

</template>

<script>
import appHeader from './components/app-header.vue'
export default {
  name: 'App',
  data() {

  },
  components: {
    appHeader
  }
}
</script>

<style>
@import '@/assets/base.css';
</style>
