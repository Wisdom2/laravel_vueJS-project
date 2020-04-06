<template>
    <div>
        Product Details
       <div v-if="product">
            Name: {{ product.name }} <br/>
            Description: {{ product.description }} <br />
            Price: {{ product.price }} 
       </div>
       <router-link to="/products">Back to products</router-link>
    </div>
</template>
<script>
export default {
    name: 'display',
    data() {
        return {
            product: null
        }
    },
    created() {
        if(this.products.length) {
            this.product = this.products.find(p => p.id == this.$route.params.id);
        } else {
            axios.get(`/api/product/${this.$route.params.id}`)
                 .then((res) => {
                     this.product = res.data.product;
                 })
        }
    },
    computed: {
        products() {
            return this.$store.getters.products;
        }
    }
}
</script>