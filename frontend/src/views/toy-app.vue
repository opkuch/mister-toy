<template>
    <toy-list :toys="getToys" @remove="removeToy" />
</template>

<script>
// import toyService from '../services/toy.service.vue'
import toyList from '../components/toy-list.vue'

export default {
    name: 'toyApp',
    created() {
        this.$store.dispatch({ type: 'loadToys' })
    },
    computed: {
        getToys() {
            return this.$store.getters.toysForDisplay
        }
    },
    methods: {
        removeToy(toyId) {
            console.log('hi');
            this.$store.dispatch('removeToy', {toyId})
        }
    },
    components: {
        toyList
    },
}
</script>

<style>
</style>