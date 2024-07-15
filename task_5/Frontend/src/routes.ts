import {createWebHistory, createRouter} from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';

const routes = [
    {
        name:'Login',
        path:'/',
        component:Login
    },
    {
        name:'Signup',
        path:'/signup',
        component:Signup
    },
    {
        name:'Dashboard',
        path:'/dashboard',
        component:Dashboard
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;