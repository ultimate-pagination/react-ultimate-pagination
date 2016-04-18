module.exports = {
  entry: './src/react-ultimate-pagination.js',
  output: {
    path: './dist',
    filename: 'react-ultimate-pagination.js',
    library: 'reactUltimatePagination',
    libraryTarget: 'umd',
  },
  externals: [
    '<react></react>'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
