<template>
    <div class="row">
        <div class="mr-auto">
            <router-link to="/products/add">Add Product</router-link>
        </div>
        <div style="overflow:auto" class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!products.length">
                        <td colspan="2" class="text-center">No Product available</td>
                    </tr>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <router-link :to="`/products/${product.id}`">view</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        products() {
            return this.$store.getters.products;
        }
    },
    created() {
        if(this.products.length) {
            return;
        } else {
            this.$store.dispatch('getProducts');
        }
    }
}
</script>