const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true, // 将所有文件打包到一个bundle文件里面
  minify: true, // 压缩代码
  target: ['node12'], // 生成的目标代码兼容node12
  outfile: './build/index.js',
  platform: 'node',
  charset: 'utf8', // 保证中文不被转码
  // packages: 'external' // 将node_modules下的依赖也包含进来
})
