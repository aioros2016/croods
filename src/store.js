import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
	videoShow: false
};

const mutations = {
	playVideo(state) { //处理状态(数据)变化
		state.videoShow = true;
	},
	hideMask(state) { //处理状态(数据)变化
		state.videoShow = false;
	}
};

const actions = {
	playVideo: ({
		commit
	}) => {
		var oVideo = document.querySelector('video');
		if(!oVideo.src){
			oVideo.src = 'mobile2/dist/assets/video/movie.mp4'; //此处在域名确认后，应为绝对路径。
		}
		oVideo.play();
		commit('playVideo');
	},
	hideMask: ({
		commit
	}) => {
		var oVideo = document.querySelector('video');
		oVideo.pause();
		commit('hideMask')
	}
};

const getters = {
	video(state) {
		return state.videoShow;
	}
};


//需要导出Store对象
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});