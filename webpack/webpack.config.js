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
