import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/register/index.vue'
import { isOnline } from '@/utils/token'

export const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home', component: () => import('@/views/home/index.vue') },
    { path: '/register', component: Register },
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/edit', component: () => import('@/views/edit/index.vue') },
    { path: '/detail/:id', component: () => import('@/views/detail/index.vue') },
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
    if (['/edit'].includes(to.path)) {
        isOnline(router)
    }
    next()
    // console.log('🚀🚀~ to:', to)
    // console.log('🚀🚀~ from:', from)
})