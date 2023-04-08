// import WindiCSS from 'vite-plugin-windicss'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetAttributify({
          /* preset options */
        }),
        presetUno(),
      ], // disable default preset
      rules: [
        // your custom rules
      ],
    }),
  ],
  server: {
    port: 8080,
  },
}
