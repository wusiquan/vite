import { defineConfig } from '../../packages/vite'
// import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': import.meta.url
  //   },
  // },
  // plugins: [vue()],
  build: {
    // to make tests faster
    minify: false,
  },
})
