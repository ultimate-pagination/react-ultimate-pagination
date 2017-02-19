module.exports = {
  entry: './src/react-ultimate-pagination.js',
  output: {
    path: './dist',
    library: 'reactUltimatePagination',
    libraryTarget: 'umd',
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { "modules": false }], 'react']
        }
      }
    ]
  }
};
