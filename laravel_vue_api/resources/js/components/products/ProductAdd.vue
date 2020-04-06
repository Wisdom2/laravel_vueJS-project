<template>
    <div>
        <form @submit.prevent="add">
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="product.name" class="form-control">
            </div>
             <div class="form-group">
                <label>Description</label>
                <textarea v-model="product.description" cols="30" rows="10" placeholder="Description.." class="form-control"></textarea>
            </div>
             <div class="form-group">
                <label>Price</label>
                <input type="number" v-model="product.price" class="form-control">
            </div>
             <div class="form-group">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
            <div class="form-froup">
                <ul>
                    <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                        {{ fieldsError.join('\n') }}
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>
<script>
import validate from 'validate.js';
export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: ''
            },
            errors: null,
        }
    },
    methods: {
        add() {
            this.errors = null;
            const constraints = this.getConstraints();
            const errors = validate(this.$data.product, constraints);

            if(errors) {
                this.errors = errors;
                return;
            }

            //send post

            axios.post(`/api/new_product`, this.$data.product,
            {
                headers: {
                    'Authorization': `bearer ${this.$store.getters.currentUser.token}`
                }
            })
                 .then((res) => {
                     this.$store.dispatch('getProducts');
                     this.$router.push('/products');
                 })
        },

        getConstraints() {
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: 'Must be at least 3 characters long'
                    }
                },
                description: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message:  'Must be at least 3 characters long'
                    }
                },
                price: {
                    presence: true,
                    numericality: true
                }
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        }
    }
}
</script>