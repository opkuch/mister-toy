<template>
    <section v-if="toy" class="main-app flex flex-col align-center toy-details">
        <article>
            <p><span class="fw-bold">ID:</span> {{ toy._id }}</p>
            <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
            <p><span class="fw-bold">Price: </span> {{ toy.price }}</p>
            <p class="labels">Labels:
            <ul>
                <li v-for="label in toy.labels" :key="label" class="clean-list">{{ label }}</li>
            </ul>
            </p>
            <p class="in-stock">In stock: <span>{{ getInStock }}</span></p>
            <div class="reviews container">
                <p>Reviews</p>
                <ul>
                    <li v-for="review in toy.reviews" :key="review">{{ review }}</li>
                </ul>
            </div>
        </article>
        <router-link to="/toy">Back</router-link>
    </section>
</template>

<script>
import { toyService } from '../services/toy.service.js'

export default {
    name: 'toy-details',
    data() {
        return {
            toy: null,
        }
    },
    created() {
        const { toyId } = this.$route.params
        toyService.getById(toyId).then((toy) => {
            console.log(toy);
            this.toy = toy
        })
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
    },
    computed: {
        getInStock() {
            return this.toy.inStock ? 'Yes' : 'No'
        }
    }
}
</script>
