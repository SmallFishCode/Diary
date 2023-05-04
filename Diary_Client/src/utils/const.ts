export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'http://112.124.32.18:3003'

// vite 代理地址：
export const VITE_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3003' : 'http://112.124.32.18:3003'

// 前端项目跑的端口
export const PORT = process.env.NODE_ENV === 'development' ? 5173 : 96

// 代理 URL
// export const API_URL = process.env.NODE_ENV === 'development' ? '/api/' : 'http://112.124.32.18:3003/'

export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3003/' : 'http://112.124.32.18:3003/'