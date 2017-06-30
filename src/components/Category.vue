<template>
	<div>
		<div class="btn-back">
			<a href="javascript:history.back(-1);">返回</a>
		</div>
		<div class="news-area">
			<div class="tabs show" id="tabs">
				<div class="menu">
					<ul>
						<li :class="nowTab == index ? 'active' : ''" @click="tab(index)" v-for="(menu, index) in newsTitle">{{menu}}</li>
					</ul>
				</div>
				<div class="content">
					<ol>
						<li v-for="(article, index) in newsList">
							<router-link :to="'/Detail/'+ article.postId" tag="a">{{article.title}}</router-link>
							<span>{{article.datetime.substring(0, 10)}}</span>
						</li>
					</ol>
				</div>
			</div>
			<div class="page-box" v-show="page.total > 1">
				<a :class="page.current == 1 ? 'prev disabled' : 'prev'" href="javascript:;" @click="prevPage(category, page.current)">上一页</a>
				<a :class="page.current == page.total ? 'next disabled': 'next'" href="javascript:;" @click="nextPage(category, page.current)">下一页</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				host: location.host,
				newsTitle: ['综合', '新闻', '公告', '攻略'],
				newsList: [],
				category: 'total',
				page: {},
				nowTab: 0
			}
		},
		mounted(){
			this.fetchData('total', 1);
		},
		methods:{
			fetchData(category, page){
				var _this = this;
				this.$http.get('http://'+ this.host +'/TheCroods/api_page_newslist.ashx', {
				    params: {
				    	category: category,
				    	page: page
				    }
				}).then(function(res){
					_this.newsList = res.data.data;
					console.log(res.data.page);
					_this.page = res.data.page;
				}).catch(function(err){
					console.log(err);
				});
			},
			prevPage(category, page){
				var _this = this;
				if(_this.page.current == 1) return;
				page--;
				this.fetchData(category, page);
			},
			nextPage(category, page){
				var _this = this;
				if(_this.page.current == _this.page.total) return;
				console.log(_this.page.total);
				page++;
				this.fetchData(category, page);
			},
			tab(index){
				var _this = this;
				var aLi = document.querySelectorAll('#tabs .menu li');
				_this.page.current = 1;
				switch (index){
					case 0:
						_this.category = 'total';
						this.fetchData(_this.category, 1);
						break;
					case 1:
						_this.category = 'news';
						this.fetchData(_this.category, 1);
						break;
					case 2:
						_this.category = 'notice';
						this.fetchData(_this.category, 1);
						break;
					case 3:
						_this.category = 'strategy';
						this.fetchData(_this.category, 1);
						break;
				};
				_this.nowTab = index;
			}
		}
	}
</script>