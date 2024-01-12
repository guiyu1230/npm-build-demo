# rollup、esbuild、vite、swc、webpack、ts打包

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a51661103b2433387c0b9f08012412b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1778&h=1520&s=187360&e=jpg&b=fefefe)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af3104c1ec034da28228a565dfb6d192~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1806&h=5182&s=483998&e=jpg&b=ffffff)

从上面能够看出，**支持场景最多的是rollup与vite**，而vite是基于rollup的封装；其次是webpack支持的场景最多，****但是webpack不支持原目录格式输出多文件，且输出esm模块格式还是实验特性**；在其次是esbuild，但是**esbuild不能输出es5、不支持按需polyfill、不支持emitDecoratorMetadata**，在其次是swc，但是swc不支持less、saas等、不支持图片处理等，不能够处理.vue；最后就是typescript，不支持less、saas等，不能够处理.vue，不能进行按需polyfill，也不能生成单bundle.js


| 构建工具/功能 | 单entry | 多entry | 输出单bundle | 源目录输出多文件 | 处理ts,tsx | 处理vue | 输出es5 | 处理css | 处理less,sass | 输出esm | 动态polyfill
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rollup | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| vite | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| webpack | ✅ |✅  | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| esbuild | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| swc | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| typescript | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |

### 使用 rollup 构建
| rollup | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ✅ |
| 源目录输出多文件 | ✅ |
| 处理ts,tsx | ✅ |
| 处理vue | ✅ |
| 输出es5 | ✅ |
| 处理css | ✅ |
| 处理less,sass | ✅ |
| 输出esm | ✅ |
| 动态polyfill | ✅ |

#### rollup 实例
- 适用于浏览器端
- 输出cjs与esm模块
- 需要polyfill
- 不需要打包成bundle
- 不需要包含node_modules中的依赖
- 需要压缩

```js
// rollup  -c rollup.config.mjs
// rollup.config.mjs
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert {type: 'json'};

export default [
  {
    input: './src/index.ts',
    output: [{
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },{
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },{
      dir: './dist-signle-input-mutil-output',
      format: 'esm',
      exports: 'named',
      preserveModules: true  // 源目录输出多文件
    }],
    plugins: [
      resolve(),
      json(),
      commonjs({
        transformMixedEsModules: true
      }),
      typescript(),
      getBabelOutputPlugin(),
    ],
    external: [], // 不需要打入包内的第三方npm包,例如['lodash']
  }
];
```

### 使用 vite 构建
| vite | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ✅ |
| 源目录输出多文件 | ✅ |
| 处理ts,tsx | ✅ |
| 处理vue | ✅ |
| 输出es5 | ✅ |
| 处理css | ✅ |
| 处理less,sass | ✅ |
| 输出esm | ✅ |
| 动态polyfill | ✅ |

#### vite 实例
- 适用于浏览器端
- 输出esm模块
- 不需要polyfill
- 需要打包成bundle
- 不需要包含node_modules中的依赖
- 不需要压缩

```js
// vite build
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: 'es5',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
    },
    minify: false,
    rollupOptions: {
      output: [{
        format: 'es',
        exports: 'named',
        dir: './dist',
        entryFileNames: '[name].bundle.js'
      }, {
        format: 'es',
        exports: 'named',
        dir: './dist-signle-input-mutil-output',
        entryFileNames: '[name].js',
        preserveModules: true,
      }]
    }
  }
})
```

### 使用 webpack 构建
| webpack | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ✅ |
| 源目录输出多文件 | ❌ |
| 处理ts,tsx | ✅ |
| 处理vue | ✅ |
| 输出es5 | ✅ |
| 处理css | ✅ |
| 处理less,sass | ✅ |
| 输出esm | ❌ |
| 动态polyfill | ✅ |

#### webpack 实例
- 仅适用于浏览器端的包
- 输出umd模块
- 需要polyfill
- 需要打包成bundle
- 需要包含node_modules中的依赖
- 需要压缩

```js
// webpack
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: {
      type: "commonjs",
      name: "MyLibrary"
    }
  },
  // experiments: { //library.type = "module" 
  //   outputModule: true
  // },
  resolve: { 
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
        exclude: /\bcore-js\b/
      }
    ]
  }
}
```

### 使用 typeScript 构建
| typeScript | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ❌ |
| 源目录输出多文件 | ✅ |
| 处理ts,tsx | ✅ |
| 处理vue | ❌ |
| 输出es5 | ✅ |
| 处理css | ❌ |
| 处理less,sass | ❌ |
| 输出esm | ✅ |
| 动态polyfill | ❌ |

#### typeScript 实例
- 仅适用于nodejs端的包
- 输出esm模块
- 不需要polyfill，
- 不需要打包成bundle
- 输出es6语法

```js
// tsc
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["dom", "dom.iterable", "es2015.promise", "esnext"],
    "module": "ESNext",
    "outDir": "dist"
  }
}
```

### 使用 swc 构建
| swc | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ✅ |
| 源目录输出多文件 | ✅ |
| 处理ts,tsx | ✅ |
| 处理vue | ❌ |
| 输出es5 | ✅ |
| 处理css | ❌ |
| 处理less,sass | ❌ |
| 输出esm | ✅ |
| 动态polyfill | ✅ |

#### swc 实例
- 仅适用于nodejs端的包
- 输出esm模块
- 不需要polyfill，
- 不需要打包成bundle
- 输出es6语法

```js
// node build.js
// build.js
const fs = require('fs-extra');
const swc = require('@swc/core');
const glob = require('glob');

function transform(file, option = {}) {
  return swc.transformFile(file, {
    sourceMaps: false,
    module: {
      type: 'es6',
      noInterop: true
    },
    jsc: {
      parser: {
        syntax: "typescript",
        decorators: true
      },
      transform: {
        "legacyDecorator": true,
        "decoratorMetadata": true
      },
      target: 'es2015'
    },
    ...option
  }).then(output => ({
    file,
    output
  }))
}

async function transformByswc({
  entry,
  dest = 'build',
  option
}) {
  console.time('swc build');
  // 需要排除.d.ts,避免覆盖同名的.ts文件
  const files = Array.isArray(entry) ? entry : glob.sync(entry);

  const result = await Promise.all(files.map(file => transform(file, option)));

  await Promise.all(result.map(item => {
    return fs.outputFile(item.file.replace('src', dest).replace('.ts', '.js'), item.output.code);
  }));

  console.timeEnd('swc build');
}

transformByswc({
  entry: 'src/**/!(*.d).ts'
})
```

### 使用 esbuild 构建
| esbuild | 支持 |
| --- | --- |
| 单entry | ✅ |
| 多entry | ✅ |
| 输出单bundle | ✅ |
| 源目录输出多文件 | ✅ |
| 处理ts,tsx | ✅ |
| 处理vue | ✅ |
| 输出es5 | ❌ |
| 处理css | ✅ |
| 处理less,sass | ❌ |
| 输出esm | ✅ |
| 动态polyfill | ❌ |

#### esbuild 实例
- 仅适用于nodejs端的包
- 输出cjs模块
- 不需要polyfill
- 需要打包成bundle
- 需要包含node_modules中的依赖
- 需要压缩

```js
// node build.js
// build.js
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
```
