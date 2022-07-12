<template>
    <section class="flex justify-center filter-container">
        <div class="search">
            <label>
                <input type="text" @input="setFilter" v-model="filterBy.txt" placeholder="Search for a toy">
            </label>
            <label for="in-stock-filter">
                <span>In stock</span>
            <input type="checkbox" id="in-stock-filter" @change="setFilter" v-model="filterBy.status">
            </label>
        </div>
        <div class="sort">
            <label for="sort-by">
                <span>Sort toys</span>
            </label>
            <select id="sort-by" v-model="filterBy.sortBy" @change="setFilter" >
                <option v-for="opt in sortOpts" :value="opt">{{opt}}</option>
            </select>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service.js'
export default {
    name: 'toyFilter',
    data() {
        return {
            filterBy: {
                txt: null,
                status: null,
                sortBy: null
            },
            sortOpts: ['Name', 'Price', 'Time added']
        }
    },
    components: {},
    methods: {
        setFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
}
</script>

<style>
</style>