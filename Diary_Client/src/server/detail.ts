import axios, { AjaxResponse } from '../utils/axios'

const BASE_URL = 'detail'

export interface IGetDetailReq {
    id: string
}

export interface IGetDetailRes {
    username: string,
    diaryId: number,
    tabs: string, // 标签
    diaryText: string,
    diaryTime: number,
    imageUrl: string[],
}

// 获取日记详情
export const getCardDetail = async (params: IGetDetailReq): Promise<IGetDetailRes> => {
    const { data } = await axios.post<IGetDetailRes>(BASE_URL, params)
    return data
}

// 删除日记
export const deleteCardDetail = async (params: IGetDetailReq): Promise<AjaxResponse<null>> => {
    const data = await axios.post<null>(`${BASE_URL}/delete`, params)
    return data
}