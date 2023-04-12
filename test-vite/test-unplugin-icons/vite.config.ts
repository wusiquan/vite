import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
// import Components from 'unplugin-vue-components/vite'
// import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  resolve: {
    alias: {
      '/@': __dirname,
    },
  },
  server: {
    port: 8080,
    // This option caused issues with HMR,
    // although it should not affect the build
    // origin: 'http://localhost:8080'
  },
  plugins: [
    vue(),
    // Components({
    //   resolvers: [
    //     IconsResolver()
    //   ]
    // }),
    Icons({ compiler: 'vue3' }),
  ],
})
