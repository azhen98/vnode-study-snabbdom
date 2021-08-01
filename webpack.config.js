/*
 * @Author: your name
 * @Date: 2021-07-21 11:27:38
 * @LastEditTime: 2021-07-28 11:48:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuee:\学习\vue3.0-study\snabbdom\webpack.config.js
 */
module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    publicPath: '/xuni/',
    filename: 'bounde.js'
  },
  optimization: { // 1. 这个配置必须
    minimize: false
  },
  devServer: {
    port: 8848,
    contentBase: 'www'
  }
}