import axios from '../utils/axios'

const BASE_URL = 'detail'

export interface IGetDetailReq {
    id: string
}

export interface IGetDetailRes {
    username: string,
    diaryId: number,
    diaryText: string,
    diaryTime: number,
    imageUrl: string[],
}

export const getCardDetail = async (params: IGetDetailReq): Promise<IGetDetailRes> => {
    const { data } = await axios.post<IGetDetailRes>(BASE_URL, params)
    return data
}