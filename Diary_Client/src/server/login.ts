import axios, { type AjaxResponse } from '../utils/axios'

const BASE_URL = 'login'

export interface LoginReq {
    username: string,
    password: string
}

export const loginReq = async (params: LoginReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(BASE_URL, params)
    return data
}

export interface IIsOnlineReq {
    token: string,
    username: string
}

// 判断 token 是否正确
export const isOnlineReq = async (params: IIsOnlineReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(`${BASE_URL}/token`, params)
    return data
}