import axios from '../utils/axios'

const BASE_URL = 'home'

export interface IHomeDiaryCardReq {
    username: string,
    page: number,
    pageSize: number
}

export interface IHomeDiaryCardRes {
    username: string,
    diaryId: number,
    tabs: string, // 标签
    diaryText: string,
    diaryTime: number,
    imageUrl: string[],
}

export const getHomeDiaryCard = async (params: IHomeDiaryCardReq): Promise<IHomeDiaryCardRes[]> => {
    const { data } = await axios.post<IHomeDiaryCardRes[]>(BASE_URL, params)
    return data
}