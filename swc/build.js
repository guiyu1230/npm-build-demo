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



