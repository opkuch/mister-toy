<template>
    <toy-filter @filtered="setFilter"/>
    <toy-list :toys="getToys" @remove="removeToy" />
</template>

<script>
// import toyService from '../services/toy.service.vue'
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'
export default {
    name: 'toyApp',
    computed: {
        getToys() {
            return this.$store.getters.toysForDisplay
        }
    },
    methods: {
        removeToy(toyId) {
            this.$store.dispatch('removeToy', {toyId})
        },
        setFilter(filterBy) {
            this.$store.dispatch({type: 'setFilterBy', filterBy})
        }
    },
    components: {
        toyList,
        toyFilter
    },
}
</script>

<style>
</style>