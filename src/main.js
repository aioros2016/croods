import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './routeConfig.js'
import store from './store'

Vue.use(VueRouter);
require('./assets/css/reset.css');
require('./assets/css/style.css');

const router=new VueRouter({
	mode: 'history', //切换路径模式，变成history模式
	scrollBehavior: () => ({ y: 0 }),
	routes
});

Vue.prototype.$http = axios;

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
	mounted(){
  	
	  	// FastClick
	  	if ('addEventListener' in document) {
		    document.addEventListener('DOMContentLoaded', function(){
		        FastClick.attach(document.body);
		    }, false);
	    };
	  	
	  	// 等比缩放
	  	(function(win, doc){
			function change(){
				doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';	
			}
			change();
			win.addEventListener('resize', change, false);
		})(window, document);
		
	},
	methods:{
		
	}
})
