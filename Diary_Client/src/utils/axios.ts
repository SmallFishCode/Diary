import { router } from '@/router'
import { IIsOnlineReq } from '@/server/login'
import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { showFailToast, showSuccessToast } from 'vant'

// 定义一些默认值
const DEFAULT_BASE_HOST = 'http://127.0.0.1'
const DEFAULT_BASE_PORT = 3000
const DEFAULT_BASE_URL = '/api/'
const DEFAULT_TIME_OUT = 50000

// 配置 axios 的 config
const config: AxiosRequestConfig = {
    timeout: DEFAULT_TIME_OUT,
    headers: {
        Accept: 'application/json',
        token: localStorage.getItem('token') || false,
    },
    withCredentials: true,
}

// 封装请求拦截
const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // 一般会请求拦截里面加token，用于后端的验证
    const token = localStorage.getItem('token') as string
    
    if (token) {
        config.headers!.Authorization = token
    } 

    return config
}

// 定义响应值类型
export interface AjaxResponse<T> {
    result: number;
    data: T;
    message: string;
    userInfo?: IIsOnlineReq
}

// 封装响应拦截
const responseInterceptor = <T>(res: AxiosResponse<AjaxResponse<T>>) => {
    if (res.status === 200 && res.data.result === 200) {
        if (res.data.userInfo) {
            localStorage.setItem('token', res.data.userInfo.token)
            localStorage.setItem('username', res.data.userInfo.username)
        }
        showSuccessToast({ message: res.data.message, duration: 300 })
    } 

    return res
}

// 创建 axios 实例
const getAxiosInstance = (): AxiosInstance => {
    const instance:AxiosInstance = axios.create(config)

    // 使用请求拦截
    instance.interceptors.request.use(requestInterceptor)

    // 使用响应拦截
    instance.interceptors.response.use(responseInterceptor)

    return instance
}

export default {
    post: async <T>(
        reqUrl: string,
        data: object = {},
        config: AxiosRequestConfig = {},
    ): Promise<AjaxResponse<T>> => {
        const instance: AxiosInstance = getAxiosInstance()
        const url = DEFAULT_BASE_URL + reqUrl 
        
        return new Promise((resolve, reject) => {
            instance.request<AjaxResponse<T>>(
                {
                    ...config,
                    method: 'POST',
                    url,
                    data,
                },
            ).then((res: AxiosResponse<AjaxResponse<T>>) => {
                resolve(res.data)
            }, (err) => {
                reject(err.response.data)
            })
        })
    },
}