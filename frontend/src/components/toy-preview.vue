<template>
    <li class="preview-container">
        <div class="prev-header">
            <h3>{{ toy.name }}</h3>
        </div>
        <div class="prev-content">
            <p class="price">Price: <span>{{ toy.price }}</span></p>
            <p class="in-stock">In stock: <span>{{getInStock}}</span></p>
        </div>
        <div class="prev-actions">
            <button @click="goToDetail" class="detail-btn">Detail</button>
            <button @click="goToEdit" class="edit-btn">Edit</button>
            <button @click="removeToy(toy._id)" class="remove-btn">Remove</button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'appHome',
    props: {
        toy: {
            type: Object,
            required: true
        }
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
        }
    },
    computed: {
        getInStock() {
            return this.toy.inStock? 'Yes' : 'No'
        }
    }
}
</script>

<style>
</style>