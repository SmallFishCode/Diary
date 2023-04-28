import axios, { type AjaxResponse } from '../utils/axios'

const BASE_URL = 'edit'

export interface IBufferFile {
    fileName?: string,
    buffer?: Object
}

export interface IEditInfoReq {
    diaryText: string,
    username: string,
    bufferFileArr?: IBufferFile[]
}

export const editInfoReq = async (params: IEditInfoReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(
        BASE_URL, 
        params,
        { headers: { 'Content-Type': 'application/json' } },

    )
    return data
}