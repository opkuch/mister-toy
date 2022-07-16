<template>
  <div class="add-toy">
    <router-link v-show="$store.getters.isAdmin" class="add-link" to="/toy/edit"
      >Add toy</router-link
    >
  </div>

  <section class="main-layout list-container">
    <toy-preview
      v-for="toy in toys"
      :key="toy._id"
      :toy="toy"
      @remove="removeToy"
    />
  </section>
</template>

<script>
import toyPreview from '../components/toy-preview.vue'
export default {
  name: 'appHome',
  props: {
    toys: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeToy(toyId) {
      this.$emit('remove', toyId)
    },
  },
  components: {
    toyPreview,
  },
}
</script>

<style></style>
