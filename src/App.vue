<template>
	<div class="container" id="container">
		<ViewLoading></ViewLoading>
		<ViewHeader></ViewHeader>
		<keep-alive>
        	<router-view class="router-view"></router-view>
		</keep-alive>
		<ViewFooter></ViewFooter>
		<ViewHorizontal></ViewHorizontal>
		<ViewMask></ViewMask>
		<ViewVideo></ViewVideo>
	</div>
</template>

<script>
	import ViewLoading from './components/Loading.vue'
	import ViewHeader from './components/Header.vue'
	import ViewHome from './components/Home.vue'
	import ViewFooter from './components/Footer.vue'
	import ViewVideo from './components/Video.vue'
	import ViewMask from './components/Mask.vue'
	import ViewHorizontal from './components/Horizontal.vue'
	export default {
		components:{
			ViewLoading,
			ViewHeader,
			ViewHome,
			ViewFooter,
			ViewMask,
			ViewVideo,
			ViewHorizontal
		}
	}
</script>