const
  path = require('path'),
  ManifestPlugin = require('webpack-manifest-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  webpack = require('webpack');

  
module.exports = {
  entry: {
    common: __dirname + '/../src/common.js',
    index: __dirname + '/../src/index.js',
    waloun: __dirname + '/../src/waloun.js',
    'production-info': __dirname + '/../src/production-info.js',
    projects: __dirname + '/../src/projects.js',
    products: __dirname + '/../src/products.js',
    offers: __dirname + '/../src/offers.js',
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
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    })
  ]
};
