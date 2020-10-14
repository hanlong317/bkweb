var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')

// 生产环境下的webpack配置，通过merge方法合并webpack.base.conf.js基础配置
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		//导出文件目录
		path: config.build.assetsRoot,
		//导出的文件名
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		//非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
		chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
	},
	plugins: [
		//配置全局环境为生产环境
		new webpack.DefinePlugin({
			'process.env': env
		}),
		//js文件压缩插件
		new webpack.optimize.UglifyJsPlugin({
			//压缩配置
			compress: {
				warnings: false// 不显示警告
			},
			sourceMap: false//生成sourceMap文件
		}),
		//将js中引入的css分离的插件
		new ExtractTextPlugin({
			//分离出的css文件名
			filename: utils.assetsPath('css/[name].[contenthash].css')
		}),
		//压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//生成html的插件,引入css文件和js文件
		new HtmlWebpackPlugin({
			filename: config.build.index,//生成的html的文件名
			template: 'index.html',//依据的模板
			inject: true,//注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
			//压缩配置
			minify: {
				removeComments: true, //删除html中的注释代码
				collapseWhitespace: true,//删除html中的空白符
				removeAttributeQuotes: true//删除html元素中属性的引号
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			//按dependency的顺序引入
			chunksSortMode: 'dependency'
		}),
		//分离公共js到vendor中
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor', //文件名
			// 声明公共的模块来自node_modules文件夹
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		//上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。
		//下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		// 复制静态资源,将static文件内的内容复制到指定文件夹
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.build.assetsSubDirectory,
				ignore: ['.*']//忽视.*文件
			}
		])
	]
})

//配置文件开启了gzip压缩
if (config.build.productionGzip) {
	//引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
	var CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',//目标文件名
			algorithm: 'gzip',//使用gzip压缩
			//满足正则表达式的文件会被压缩
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,//资源文件大于10240B=10kB时会被压缩
			minRatio: 0.8 //最小压缩比达到0.8时才会被压缩
		})
	)
}

if (config.build.bundleAnalyzerReport) {
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
