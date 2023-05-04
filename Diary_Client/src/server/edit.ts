import axios, { type AjaxResponse } from '../utils/axios'

const BASE_URL = 'edit'

export interface IBufferFile {
    fileName?: string,
    buffer?: Object
}

export interface IEditInfoReq {
    diaryText: string,
    username: string,
    bufferFileArr?: IBufferFile[],
    tabs: string, // 标签
    diaryId?: string
    isExitImgArr?: string[] // 已存在服务端的图片
}

// 添加日记信息
export const editInfoReq = async (params: IEditInfoReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(BASE_URL, params)
    return data
}

// 更新日记信息
export const updateInfoReq = async (params: IEditInfoReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(`${BASE_URL}/update`, params)
    return data
}
