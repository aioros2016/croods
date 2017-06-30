<template>
	<div>
		<div class="btn-back">
			<a href="javascript:history.back(-1);">返回首页</a>
		</div>
		<div class="detail-box">
			<div class="detail-title">
				<h2>{{detail.title}}</h2>
				<div class="date">发布于 {{detail.createdAt}}</div>
			</div>
			<div class="text" v-html="detail.content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				host: location.host,
				detail: {}
			}
		},
		watch:{
			$route(to){
				var reg = /Detail\/\d+/;
				if(reg.test(to.path)){
					var articleId = this.$route.params.id || 0;
					this.fetchData(articleId);
				}
			}
		},
		methods:{
			fetchData(id){
				var _this=this;
				this.$http.get('http://'+ this.host +'/TheCroods/api_page_newsdetail.ashx', {
				    params: {
				    	id: id
				    }
			    }).then(function(res){
					_this.detail = res.data.data;
					console.log(_this.detail);
				}).catch(function(err){
					console.log('文章详细载入失败:',err);
				})
			}
		}
	}
</script>