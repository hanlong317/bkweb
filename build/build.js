require('./check-versions')()

//根据不同的编译命令，设置当前环境
process.env.NODE_ENV = process.argv[2]
//终端显示的转轮loading
var ora = require('ora')
//node环境下rm -rf的命令库
var rm = require('rimraf')
//文件路径处理库
var path = require('path')
//终端显示带颜色的文字
var chalk = require('chalk')
var webpack = require('webpack')
//读取配置文件
var config = require('../config')
//生产环境下的webpack配置
var webpackConfig = require('./webpack.prod.conf')

// 在终端显示ora库的loading效果
var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

// 删除已编译文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
	if (err) throw err
	//在删除完成的回调函数中开始编译
	webpack(webpackConfig, function (err, stats) {
		//停止loading
		spinner.stop()
		if (err) throw err
		// 在编译完成的回调函数中,在终端输出编译的文件
		process.stdout.write(stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n')

		console.log(chalk.cyan('  Build complete.\n'))
		console.log(chalk.yellow(
			'  Tip: built files are meant to be served over an HTTP server.\n' +
			'  Opening index.html over file:// won\'t work.\n'
		))
	})
})
