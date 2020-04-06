import Login from './components/auth/login.vue';
import ProductMain from './components/products/ProductMain.vue';
import ProductList from './components/products/ProductsList.vue';
import ProductAdd from './components/products/ProductAdd.vue';
import ProductView from './components/products/ProductView.vue';

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/products',
        component: ProductMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: ProductList
            },
            {
                path: 'add',
                component: ProductAdd
            },
            {
                path: ':id',
                component: ProductView
            }
        ]
    }
];