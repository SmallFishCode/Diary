import axios, { type AjaxResponse } from '../utils/axios'

const BASE_URL = 'register'

export interface RegisterReq {
    username: string,
    password: string
}

export const registerReq = async (params: RegisterReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(BASE_URL, params)
    return data
}