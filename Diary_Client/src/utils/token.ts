import { showFailToast } from 'vant'
import { Router } from 'vue-router'
import { IIsOnlineReq, isOnlineReq } from '@/server/login'

export const isOnline = (router: Router) => {
    const params: IIsOnlineReq = {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
    }

    isOnlineReq(params).then((res) => {
        // 在线
    }).catch(err => {
        showFailToast(err)
        router.push({ path: '/login' })
    })
}