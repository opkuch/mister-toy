<template>
  <section class="main-layout flex filter-container">
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
        <el-switch
          class="stock-filter"
          id="in-stock-filter"
          @change="setFilter"
          v-model="filterBy.status"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #224435"
          inline-prompt
          active-text="In"
          inactive-text="Out"
          size="large"
        />
      </label>
    </div>
    <div class="sort">
      <el-select id="sort-by" v-model="filterBy.sort.by" @change="setFilter">
        <el-option
          v-for="opt in sortOpts"
          :value="opt.toLowerCase()"
          :label="opt"
          :key="opt"
        >
          {{ opt }}
        </el-option>
      </el-select>
      <label for="sort-direction">
        <el-switch
          class="sort-direction"
          id="sort-direction"
          @change="setFilter"
          v-model="filterBy.sort.direction"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff8500"
          inline-prompt
          size="large"
        />
      </label>
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
        txt: '',
      sort: {
        by: '',
        direction: true,
      },
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
