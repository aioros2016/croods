<template>
	<div class="video-box" id="video-box" v-show="video">
		<video controls loop></video>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	export default {
		data () {
			return {
				lockSrc: false,
				videoShow: false,
				maskShow: false
			}
		},
		mounted(){
		},
		computed: mapGetters(['video'])
	}
</script>