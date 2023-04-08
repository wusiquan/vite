// 学习antfu的21年插件 https://github.com/antfu/vite-plugin-psvg
import { promises as fs } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { compilePSVG } from '@lingdong/psvg'
// @ts-ignore
import hash_sum from 'hash-sum'
import slash from 'slash'
// import SVGO from 'svgo'
import type { Plugin, ResolvedConfig } from 'vite'
import type { Options } from './types'

function isPSVG(id: string) {
  return id.endsWith('.psvg')
}

function VitePluginPSVG(options: Options = {}): Plugin {
  let config: ResolvedConfig

  const assets = new Map<string, string>()
  // const svgo = new SVGO()

  return {
    name: 'vite-plugin-psvg',
    configResolved(_config) {
      config = _config
    },
    resolveId(id, importer) {
      if (config.command === 'serve') return
      console.log(456, config, id)
      return isPSVG(id)
        ? resolve((importer && dirname(importer)) || '.', id)
        : null
    },
    async load(id) {
      console.log(789, id, config.command)
      if (config.command === 'serve') return
      if (!isPSVG(id)) return
      console.log(888, id)
      const svg = compilePSVG(await fs.readFile(id, 'utf-8'))

      // if ( )
      //   svg = (await svgo.optimize(svg)).data

      const baseName = basename(id, '.psvg')
      const resolvedFileName = `${baseName}.${hash_sum(id)}.svg`

      const url =
        config.base + slash(join(config.build.assetsDir, resolvedFileName))

      assets.set(resolvedFileName, svg)

      return `export default ${JSON.stringify(url)}`
    },
    generateBundle(_options, bundle) {
      console.log(999, assets)
      for (const [fileName, source] of assets) {
        bundle[fileName] = {
          needsCodeReference: false,
          name: fileName,
          // isAsset: true,
          type: 'asset',
          fileName: join(config.build.assetsDir, fileName),
          source,
        }
      }
    },
  }
}

export default VitePluginPSVG
