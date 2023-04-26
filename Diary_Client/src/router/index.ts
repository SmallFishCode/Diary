import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/register/index.vue'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'

export const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: () => import('@/views/login/index.vue') },
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})
