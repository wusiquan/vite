"@iconify-json/mdi": "^1.1.50",
"unplugin-icons": "^0.16.1"

由于 local-pkg 包没有考虑 pnpm 的工作空间

unplugin-icons -> @iconify-utils/utils/loader.cjs -> @iconify-utils/utils/fs.cjs
resolveModule -- require.resolve, 需要设置第二次个参数，选项 { paths: [ path.resolve(process.cwd(), './node_modules') ] }

unplugin-icons 中 Vue3Compiler
importModule -- 中 require('@vue/compiler-sfc'), 这个路径也要先 resolveModule("@vue/compiler-sfc", { paths: [ resolve(process.cwd(), './node_modules') ] }), 再 require

还有种方式将 unplugin-icons, @iconify-json/mdi, @vue/compiler-sfc 都放到根目录下去安装

想想为什么 local-pkg 引入不到@vue/compiler-sfc?

local-pkg 还在其他模块引入
@iconify/utils 会引入 local-pkg 而 @unocss/preset-icons 会引入 @iconify/utils, 而 unocss 是根项目安装的

因为 local-pkg 在根项目上了而@vue/compiler-sfc 只是在工作区中
这个从 unplugin-icon 中调用 localPkg.resolveModule(`@iconify-json/${name}/icons.json`) 可以看出

为啥在工作区中同时安装 local-pkg 和@vue/compiler-sfc 也不行呢?
unplugin-icon 的 dependence 引入了 local-pkg, devDependence 引入了@vue/compiler-sfc

- 奇怪的是 unplugin-icon 好像始终 require 的是那个根 local-pkg, 工作区装的 local-pkg 好像没作用
- 我在 unplugin-icon 中直接 require("@vue/compiler-sfc")没问题，但是函数内调用 local-pkg 的 importModule("@vue/compiler-sfc")引不到了，这个上面已经说明了
