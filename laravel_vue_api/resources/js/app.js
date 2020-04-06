
require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Store from './store.js';
import { routes } from './routes.js';
import MainApp from './components/MainApp.vue';
import { initialize } from './helpers/generals.js';

Vue.use(Vuex);
Vue.use(VueRouter);


const store = new Vuex.Store(Store);
const router = new VueRouter({
    mode:'history',
    routes
})

initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
