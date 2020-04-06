import {getLocalUser} from './helpers/auth';
import Axios from 'axios';

const user = getLocalUser();
export default {
    state: {
        welcome: 'Welcome',
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        products: [],
    },
    getters: {
        welcome: (state) => {
            return state.welcome
        },

        currentUser: (state) => {
            return state.currentUser;
        },

        isLoggedIn: (state) => {
            return state.isLoggedIn;
        },

        isLoading: (state) => {
            return state.isLoading;
        },

        authError: (state) => {
            return state.auth_error;
        },

        products: (state) => {
            return state.products;
        }


    },
    mutations: {
        login: (state) => {
            state.loading = true;
            state.auth_error = null;
        },

        loginSuccess: (state, payload) => {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {'token': payload.access_token});

            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },

        loginFailed: (state, payload) => {
            state.loading = false;
            state.auth_error = payload;
        },

        logout: (state) => {
            localStorage.removeItem('users');
            state.isLoggedIn = false;
            state.currentUser = null;

        } ,

        updateProducts: (state, payload) => {
            state.products = payload;
        }
    },
    actions: {
        login: (context) => {
            context.commit('login');
        },

        getProducts: (context) => {
            Axios.get(`/api/products`, {
                headers: {
                    'Authorization': `bearer ${context.state.currentUser.token}`
                }
            })
            .then((res) => {
                context.commit('updateProducts', res.data.products);
            })
        }
    }
}