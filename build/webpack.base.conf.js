//导入Node.js的path模块,主要用来转换成绝对路径,比如path.resolve(__dirname, 'build')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

//导入webpack整个模块
//也可以不导入webpack整个模块,而只导入用到的内置插件模块
//比如 var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//这样后面使用方式为 new CommonsChunkPlugin
//否则为new webpack.optimize.CommonsChunkPlugin
var webpack = require("webpack")

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	// 入口文件配置,打包输出的来源
	// 多种写法 entry:'entry.js' or entry:{entry1:'entry1.js'} or entry:{entry1:['entry1a.js', ...]} or etc.
	// 通常用path.resolve(__dirname, 'src/entry.js')转换成绝对路径,也可以使用相对路径,比如 './src/entry.js'
	entry: {
		// 打包的入口文件
		app: './src/main.js',
		vendor: ["element-ui", 'babel-polyfill', 'echarts'],
	},
	// entry: {
	// 	// 打包的入口文件
	// 	app: ['babel-polyfill', './src/main.js'],
	//   vendor:"element-ui"
	// },
	// 配置打包的结果
	output: {
		// 定义输出文件路径
		// 输出配置
		// path 输出目录 通常用path.resolve(__dirname, 'build')转换成绝对路径,也可以使用相对路径,比如 './dist'
		path: config.build.assetsRoot,
		// 定义输出文件名，输出js文件名,[name]对应entry对象键名,也可以指定名字,加上id和hash可以避免缓存问题,webpack会用实际值替换类似[hash]这样字符串
		filename: '[name].js',
		// publicPath 开发代码中url的转换拼接处理,通常是代码中各种资源的地址,比如图片等, url目录前缀或完整网址url前缀'http://cdn.com/'
		publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'pr' || process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'dev'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	// 影响对模块的解析
	resolve: {
		// 自行补全路径中文件的后缀
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	// 定义对模块的处理逻辑
	module: {
		//loaders: 加载器
		// [
		//     {
		//         test:正则表达式,匹配的文件名则使用这个加载器。
		//         include: 匹配的目录则进一步处理
		//         exclude: 匹配的目录则排除
		//         loader: `!`用于分隔loader 字符串形式,作用和数组形式一样
		//         loaders: ['loader',...] 数组形式,作用和字符串形式一样
		//     }
		// ]
		rules: [
			{
				test: /\.vue$/,           // vue文件后缀
				loader: 'vue-loader',   //使用vue-loader处理
				options: vueLoaderConfig    //options是对vue-loader做的额外选项配置
			},
			{
				test: /\.less$/,
				loader: 'style!css!less',
			},
			{
				test: /\.js$/,  // js文件后缀
				loader: 'babel-loader', //使用babel-loader处理
				include: [resolve('src'), resolve('test')],  //必须处理包含src和test文件夹
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  //图片后缀
				loader: 'url-loader',   //使用url-loader处理
				options: {
					limit: 10000,   //图片小于10000字节时以base64的方式引用
					name: utils.assetsPath('img/[name].[hash:7].[ext]') //文件名为name.7位hash值.拓展名
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //字体文件
				loader: 'url-loader',    //使用url-loader处理
				options: {
					limit: 10000,    //字体文件小于1000字节的时候处理方式
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')   //文件名为name.7位hash值.拓展名
				}
			}
		]
	},
	//script引入js类库，通过require或import的方式来使用，却不希望webpack把它编译到输出文件中。
	//比如不想这么用 const $ = window.jQuery 而是这么用 const $ = require("jquery") or import $ from "jquery"; 则配置"jquery": "jQuery"
	//键名是require或from时的字符串,键值是js内的全局变量名
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM',
	// 	'baidu-hmt': 'window._hmt',
	// 	'lrz': 'lrz',
	// 	'iscroll': 'IScroll',
	// 	'zepto': 'Zepto',
	// 	'fabric': 'fabric',
	// 	'react-slick': 'Slider'
	// },
	// 定义插件
	plugins: [
		// 把entry中配置的多个js中共用代码提取生成为单个js, 多参数写法 new webpack.optimize.CommonsChunkPlugin("commons", "commons.js")
		new webpack.optimize.CommonsChunkPlugin('vendor'),
		// ProvidePlugin的作用就是在开发代码内不需要require('react')或import ... from ... 也能使用React
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	]
}
