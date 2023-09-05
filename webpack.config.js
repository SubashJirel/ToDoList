const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'), // old // entry: './src/index.js'
  },
  output: {
    filename: '[name][contenthash].js', // old // filename: 'main.js' // [contenthash] for caching
    path: path.resolve(__dirname, 'dist'),
    clean: true, // so that old main4bc45.js gets deleted and only new one remains
  },
  devtool: 'source-map', // to get the file name and line number where error is in developer tool
  devServer: {
    // to automatically run the server when changes are made
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To Do List',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
