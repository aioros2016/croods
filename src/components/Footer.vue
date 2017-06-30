<template>
	<div class="footer">
		<div class="wx-area">
			<div class="icon-wx"></div>
			<h3>关注《疯狂原始人》官方微信</h3>
			<p>请搜索微信公众号：<strong>疯狂原始人手游</strong><br />获取更多活动礼包</p>
		</div>
		<div class="go-top" @click="goTop">返回顶部<span class="fadeInUp2"><i></i></span></div>
		<div class="copyright">
			<p>Copyright ©2015 上海东方明珠迪尔希文化传媒有限公司<br />Shanghai Oriental Pearl D2C Culture & Media CO ,Ltd<br />网络文化经营许可证：沪网文[2015]15015900号</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'footer',
	data(){
		return {
		}
	},
	methods:{
	  	goTop(){
	  		document.documentElement.scrollTop = document.body.scrollTop = 0;
		}
  	}
}
</script>