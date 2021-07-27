/*
 * @Author: your name
 * @Date: 2021-07-21 11:27:38
 * @LastEditTime: 2021-07-21 14:11:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuee:\学习\vue3.0-study\snabbdom\webpack.config.js
 */
module.exports = {
	entry: './src/index.js',
	output: {
    publicPath: '/xuni/',
		filename: 'bounde.js'
	},
  devServer:{
    port:8848,
    contentBase:'www'
  }
}
