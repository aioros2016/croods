<template>
	<div>
		<div class="mask2" v-show="video" @click="hideMask"></div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	export default {
		data () {
			return {
				maskShow: false
			}
		},
		computed: mapGetters(['video']),
		methods: mapActions(['hideMask'])
	}
</script>