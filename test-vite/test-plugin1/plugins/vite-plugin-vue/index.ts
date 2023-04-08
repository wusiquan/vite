import type { Plugin, ViteDevServer } from 'vite'
import { createFilter } from 'vite'
/* eslint-disable import/no-duplicates */
import type {
  SFCScriptCompileOptions,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc'
import type * as _compiler from 'vue/compiler-sfc'
import { resolveCompiler } from './compiler'
import { parseVueRequest } from './utils/query'
import { transformMain } from './main'
import { EXPORT_HELPER_ID, helperCode } from './helper'

export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
  isProduction?: boolean

  // options to pass on to vue/compiler-sfc
  script?: Partial<Pick<SFCScriptCompileOptions, 'babelParserPlugins'>>
  template?: Partial<
    Pick<
      SFCTemplateCompileOptions,
      | 'compiler'
      | 'compilerOptions'
      | 'preprocessOptions'
      | 'preprocessCustomRequire'
      | 'transformAssetUrls'
    >
  >
  /**
   * Transform Vue SFCs into custom elements.
   * - `true`: all `*.vue` imports are converted into custom elements
   * - `string | RegExp`: matched files are converted into custom elements
   *
   * @default /\.ce\.vue$/
   */
  customElement?: boolean | string | RegExp | (string | RegExp)[]
}

export interface ResolvedOptions extends Options {
  compiler: typeof _compiler
  root: string
  sourceMap: boolean
  cssDevSourcemap: boolean
  devServer?: ViteDevServer
  devToolsEnabled?: boolean
}

export default function vuePlugin(rawOptions: Options = {}): Plugin {
  const {
    include = /\.vue$/,
    exclude,
    customElement = /\.ce\.vue$/,
    //   reactivityTransform = false,
  } = rawOptions

  const filter = createFilter(include, exclude)

  // TODO: customElement??
  const customElementFilter =
    typeof customElement === 'boolean'
      ? () => customElement
      : createFilter(customElement)

  let options: ResolvedOptions = {
    isProduction: process.env.NODE_ENV === 'production',
    compiler: null as any,
    root: process.cwd(),
    sourceMap: true,
    cssDevSourcemap: false,
    devToolsEnabled: process.env.NODE_ENV !== 'production',
  }

  return {
    name: 'vite:vue',

    config(config) {
      console.log(11, config)
      return {}
    },

    configResolved(config) {
      console.log(22, 'configResolved')
      options = {
        ...options,
        root: config.root,
        sourceMap: true,
        cssDevSourcemap: false,
        isProduction: config.isProduction,
        devToolsEnabled: false,
        // devToolsEnabled: !!config.define!.__VUE_PROD_DEVTOOLS__ || !config.isProduction,
      }
    },

    configureServer(server) {
      console.log(33, 'configureServer')
      options.devServer = server
    },

    buildStart() {
      console.log(44, 'buildStart')
      options.compiler = options.compiler || resolveCompiler(options.root)
    },

    // TODO: resolveId什么时候调用?
    async resolveId(id) {
      console.log(55, 'resolveId', id)
      // component export helper
      if (id === EXPORT_HELPER_ID) {
        return id
      }

      // serve sub-part requests (*?vue) as virtual modules
      if (parseVueRequest(id).query.vue) {
        return id
      }
    },

    load(id, opt) {
      console.log(66, 'load', id)
      if (id === EXPORT_HELPER_ID) {
        return helperCode
      }

      const { filename, query } = parseVueRequest(id)

      if (query.vue) {
        console.log(88888888)
      }
    },

    transform(code, id, opt): any {
      const ssr = opt?.ssr === true
      const { filename, query } = parseVueRequest(id)
      console.log(77, 'transform', filename)
      // if (query.raw || query.url) {
      //   return
      // }
      if (!filter(filename) && !query.vue) {
        console.log('??')
        return
      }

      if (!query.vue) {
        console.log('<=== transformMain ===>', filename, query)
        // main request
        return transformMain(
          code,
          filename,
          options,
          this,
          ssr,
          customElementFilter(filename),
        )
      } else {
        console.log(99999999)
      }
    },
  }
}
