import axios from '../utils/axios'

const BASE_URL = 'echarts'

export interface ITabsItems {
    name: string,
    value: number
}

export interface IGetTabsEchartsReq {
    username: string
}

// 获取标签使用情况
export const getTabsEcharts = async (params: IGetTabsEchartsReq): Promise<ITabsItems[]> => {
    const { data } = await axios.post<ITabsItems[]>(BASE_URL, params)
    return data
}
