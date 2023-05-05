import { showFailToast } from 'vant'
import { IIsOnlineReq, isOnlineReq } from '@/server/login'
import { CLIENT_BASE_URL } from './const'

export const isOnline = () => {
    const params: IIsOnlineReq = {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
    }

    isOnlineReq(params).then((res) => {
        // 在线
    }).catch(err => {
        showFailToast(err)
        window.location.replace(CLIENT_BASE_URL) 
    })
}