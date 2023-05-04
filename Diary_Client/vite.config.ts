import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '^/api': {
                target: 'http://127.0.0.1:3003',	// 实际请求地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: // 配置 @ 指代 src
            {
                '@': resolve(__dirname, './src'),
            },
    },
    
})
