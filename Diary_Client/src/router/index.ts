import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/register/index.vue'
import { isOnline } from '@/utils/token'

export const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            keepAlive: true, // 设置页面是否需要使用缓存
        } },
    { path: '/register', component: Register },
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/echarts', component: () => import('@/views/echarts/index.vue') },
    { path: '/edit', component: () => import('@/views/edit/index.vue') },
    { path: '/edit/:id', component: () => import('@/views/edit/index.vue') },
    { path: '/detail/:id', component: () => import('@/views/detail/index.vue') },
]

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
    if (['/edit'].includes(to.path)) {
        isOnline()
    }
    // 编辑或者登录成功之后进行刷新操作
    if (from.path.split('/').some(item => item === 'edit' || item === 'login')) {
        to.meta.keepAlive = false
    }
    next()
    // console.log('🚀🚀~ to:', to)
    // console.log('🚀🚀~ from:', from)
})