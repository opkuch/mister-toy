<template>
  <el-card class="card" :body-style="{ padding: '0px' }">
    <img :src="getImgUrl" v-if="toy.imgUrl" />
    <p v-else>No avaiable photo..</p>

    <section class="preview-container">
      <section class="prev-details">
        <div class="prev-header">
          <h3>{{ toy.name }}</h3>
        </div>
        <div class="prev-content">
          <p class="price">
            Price: <span>{{ toy.price }}</span>
          </p>
          <p class="in-stock">
            In stock: <span>{{ getInStock }}</span>
          </p>
        </div>
        <div class="prev-actions">
          <el-button @click="goToDetail" class="detail-btn">Details</el-button>
          <el-button @click="goToEdit" class="edit-btn">Edit</el-button>
          <el-button @click="removeToy(toy._id)" class="remove-btn"
            >Remove</el-button
          >
        </div>
      </section>
    </section>
  </el-card>
</template>

<script>
export default {
  name: 'appHome',
  props: {
    toy: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetail() {
      this.$router.push(`/toy/${this.toy._id}`)
    },
    goToEdit() {
      this.$router.push(`/toy/edit/${this.toy._id}`)
    },
    removeToy(toyId) {
      this.$emit('remove', toyId)
    },
  },
  computed: {
    getInStock() {
      return this.toy.inStock ? 'Yes' : 'No'
    },
    getImgUrl() {
      return new URL('../assets/toy-img/' + this.toy.imgUrl, import.meta.url)
        .href
    },
  },
}
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
