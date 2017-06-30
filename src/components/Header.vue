<template>
	<div class="header">
		<div class="top-nav">
			<div class="logo">
				<h1>疯狂原始人，这次玩爽的！</h1>
			</div>
			<div class="download">
				<a href="javascript:;">立即下载</a>
			</div>
		</div>
		<div class="animate-area" id="animate-area">
			<div class="shadow rotate-shadow">
				<img src="../assets/images/6.png" />
			</div>
			<div class="boy rotate-boy">
				<img src="../assets/images/3.png" />
			</div>
			<div class="video rollIn" @click="playVideo"><img src="../assets/images/5.png" alt="播放视频" /></div>
			<div class="slogan fadeInUp">
				<div class="bounce">
					<img src="../assets/images/4.png" alt="竞技对战" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name: 'header',
	computed: mapGetters(['video']),
	methods: mapActions(['playVideo'])
}
</script>