import axios, { AjaxResponse } from '../utils/axios'

const BASE_URL = 'search'

export interface IGetDetailReq {
    username: string
    tabs: string
}

export interface IGetDetailRes {
    username: string,
    diaryId: number,
    tabs: string, // 标签
    diaryText: string,
    diaryTime: number,
    imageUrl: string[],
}

// 根据 tabs 查询日记
export const searchWithTabs = async (params: IGetDetailReq): Promise<IGetDetailRes[]> => {
    const { data } = await axios.post<IGetDetailRes[]>(BASE_URL, params)
    return data
}
