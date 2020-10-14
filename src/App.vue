<template>
	<div id="app">
		<router-view></router-view>
		<!-- Loading 遮罩层 -->
		<div v-loading.fullscreen.lock="$store.state.spinShow"></div>
	</div>
</template>

<script>
	import 'babel-polyfill'
	export default {
		name: 'app',
		data () {
			return {
				spinShow: true
			}
		},
		mounted(){
			window.emctx = this.$store.state.umServer;
		},
		created() {
			setTimeout(() => {
				window.L2Dwidget.init({
					pluginRootPath: 'static/live2dw/',
					pluginJsPath: 'lib/',

					pluginModelPath: 'live2d-widget-model-haru_1/assets/',
					tagMode: false,
					debug: false,
					model: { jsonPath: 'static/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json' },
					display: { position: 'right', width: 150, height: 300 },
					mobile: { show: true },
					log: false
				})
			}, 1000)
		}
	}
</script>

<style>
	#app{
		height: 100vh;
	}
</style>
