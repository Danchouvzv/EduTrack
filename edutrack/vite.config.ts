import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Отключаем HMR оверлей для CSS ошибок, чтобы их можно было увидеть в консоли
    devSourcemap: true,
  },
})
