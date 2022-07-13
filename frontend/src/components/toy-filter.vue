<template>
  <section class="main-layout flex justify-center filter-container">
    <div class="search">
      <label>
        <el-input
          type="text"
          @input="setFilter"
          v-model="filterBy.txt"
          placeholder="Search for a toy"
        />
      </label>
      <label for="in-stock-filter">
        <span>In stock</span>
        <el-switch
          id="in-stock-filter"
          @change="setFilter"
          v-model="filterBy.status"
        />
      </label>
    </div>
    <div class="sort">
      <label for="sort-by">
        <span>Sort toys</span>
      </label>
      <el-select id="sort-by" v-model="filterBy.sortBy" @change="setFilter">
        <el-option v-for="opt in sortOpts" :value="opt" :label="opt" :key="opt">
          {{ opt }}
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
import {utilService} from '../services/util.service.js'
export default {
  name: 'toyFilter',
  data() {
    return {
      filterBy: {
        txt: null,
        status: null,
        sortBy: null,
      },
      sortOpts: ['Name', 'Price', 'Time added'],
    }
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000)
  },
  methods: {
    setFilter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
    },
  },
}
</script>

<style></style>
