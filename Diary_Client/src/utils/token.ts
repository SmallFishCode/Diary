import { useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import { IIsOnlineReq, isOnlineReq } from '@/server/login'

export const isOnline = () => {
    const router = useRouter()
    const params: IIsOnlineReq = {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
    }

    isOnlineReq(params).then((res) => {
        // 在线
    }).catch(err => {
        showFailToast(err.message)
        router.push({ path: '/login' })
    })
}