<template>
    <div id="login">
        <div class="login row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="authenticate">
                            <div class="form-group row">
                                <label for="email">Email</label>
                                <input type="text" v-model="form.email" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group row">
                                <label for="password">Password</label>
                                <input type="text" v-model="form.password" class="form-control" placeholder="Password">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary btn-sm">Login</button>
                            </div>
                            <div class="fom-group">
                                <p class="text-danger">
                                    {{ authError }}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { login } from '../../helpers/auth';

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        authenticate() {
            this.$store.dispatch('login');

            login(this.$data.form).then((res) => {
                this.$store.commit('loginSuccess', res);
                this.$router.push('/products');
            }) 
            .catch((err) => {
                this.$store.commit('loginFailed', err);
            });
        }
    },
    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    }
}
</script>