const
  path = require('path'),
  ManifestPlugin = require('webpack-manifest-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

  
module.exports = {
  entry: {
    index: __dirname + '/../src/index.js'
  },
  output: { filename: '[name]-[hash].js', path: __dirname + '/../build/assets' },
  resolve: {
    modules: [ path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src') ]  
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
      },
      {
        test: /\.css/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' })
  ]
};
