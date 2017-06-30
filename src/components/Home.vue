<template>
	<div>
		<div class="btn-download">
			<a href="javascript:;">下载游戏</a>
		</div>
		<div class="event-area">
			<h2>精彩活动</h2>
			<div class="swiper-container swiper-event">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide" v-for="(item,index) in swiper">
		            	<a :href="item.href"><img :src="item.src" /></a>
		            </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
		</div>
		<div class="features-area">
			<h2>游戏特色</h2>
			<div class="swiper-container swiper-features">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide" v-for="(item,index) in swiper2">
		            	<a :href="item.href"><img :src="item.src" /></a>
		            </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
		</div>
		<div class="news-area">
			<h2>新闻中心</h2>
			<div class="tabs" id="tabs">
				<div class="menu">
					<ul>
						<li :class="nowTab == index ? 'active' : ''" @click="tab(index)" v-for="(menu, index) in newsTitle">{{menu}}</li>
					</ul>
				</div>
				<div class="content">
					<ol v-for="(list, category, index) in newsList" v-show="nowTab == index">
						<li v-for="(article, index) in list.list">
							<router-link :to="'/Detail/'+ article.postId" tag="a">{{article.title}}</router-link>
							<span>{{article.datetime.substring(0, 10)}}</span>
						</li>
					</ol>
				</div>
			</div>
			<router-link to="/category" tag="div" class="check-more">查看更多</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				host: location.host,
				swiper: [{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/g1.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/g2.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/g3.jpg'
				}],
				swiper2: [{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/b1.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/b2.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/b3.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/b4.jpg'
				},
				{
					'href': 'javascript:;',
					'src': '/mobile/dist/assets/images/b5.jpg'
				}],
				newsTitle: ['综合', '新闻', '公告', '攻略'],
				newsList: [],
				nowTab: 0
			}
		},
		mounted(){
			var swiper = new Swiper('.swiper-event', {
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    paginationBulletRender: function (swiper, index, className) {
			        return '<span class="' + className + '">' + (index + 1) + '</span>';
			    }
			});
			var swiper2 = new Swiper('.swiper-features', {
				freeMode: true,
				slidesPerView: 'auto',
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    paginationBulletRender: function (swiper, index, className) {
			        return '<span class="' + className + '">' + (index + 1) + '</span>';
			    }
			});
			this.fetchData();
		},
		methods:{
			fetchData(){
				var _this=this;
				this.$http.get('http://'+ this.host +'/TheCroods/api_page_index.ashx').then(function(res){
					_this.newsList = res.data.data;
					console.log(_this.newsList);
				}).catch(function(err){
					console.log(err);
				});
			},
			tab(index){
				var _this=this;
				var aLi = document.querySelectorAll('#tabs .menu li');
				_this.nowTab = index;
			}
		}
	}
</script>