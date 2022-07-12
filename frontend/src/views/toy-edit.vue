<template>
    <section class="main-app flex flex-col align-center edit-container">
        <form @submit.prevent="saveToy" class="flex flex-col">
            <label for="toy-name">
                <span>Name: </span>
                <input type="text" id="toy-name" v-model="toyToEdit.name">
            </label>
            <label for="toy-price">
                <span>Price: </span>
                <input type="number" id="toy-price" v-model="toyToEdit.price">
            </label>
            <label for="toy-labels">
                <span>Labels: </span>
                <select v-model="toyToEdit.labels" id="toy-labels" multiple>
                    <option v-for="label in labels" :value="label">{{ label }}</option>
                </select>
            </label>
            <label for="in-stock">
                <span>In stock</span>
                <select id="in-stock" v-model="toyToEdit.inStock">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                </select>
            </label>
            <button>Save</button>
        </form>
        <router-link to="/toy">Back</router-link>

    </section>
</template>
<script>
import { toyService } from '../services/toy.service.js'

export default {
    name: 'toy-edit',
    created() {
        const { toyId } = this.$route.params
        if (toyId) {
            toyService.getById(toyId).then((toy) => {
                this.toyToEdit = toy
            })
        }
        this.setLabels()
    },
    data() {
        return {
            toyToEdit: toyService.getEmptyToy(),
            labels: []
        }
    },
    methods: {
        setLabels() {
            this.labels = toyService.getLabels()
        },
        saveToy() {
            this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
            this.toyToEdit = toyService.getEmptyToy()
            this.$router.push('/toy')
        }
    }
}
</script>
<style>
</style>