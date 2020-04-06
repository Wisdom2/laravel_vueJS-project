import Axios from "axios";

export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
       const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
       const currentUser = store.state.currentUser;

       if(requiresAuth && !currentUser) {
           next('/login');
       } else if(to.path == '/login' && currentUser) {
           next('/products');
       } else {
           next();
       }
    });

    Axios.interceptors.response.use(null, (err) => {

        if(err.response.status == 401) {
            store.commit('logout');
            router.push('/login')
        }

        return Promise.reject(err);
    });

    if(store.getters.currentUser) {
        Axios.defaults.headers.common['Authorization'] = `bearer ${store.getters.currentUser.token}`;
    }
}