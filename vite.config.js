import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : 'z8iZzshZUKHMczXwyD4XKLUbsrLc6tvnh7kSy',
  plugins: [vue()],
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000/graphql',
    }
  }
})
