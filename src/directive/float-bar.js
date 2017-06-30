angular.module('modFloatBar', [])
.controller('contFloatBar', ['$scope', function($scope){
	var bar = document.getElementById('float-bar');
	$scope.show=function(){
		$(bar).stop().animate({
			"right": 0
		}, 200);
	}
	$scope.hide=function(){
		$(bar).stop().animate({
			"right": "-171px"
		}, 200);
	}
	$scope.open2wm = function(){
		$scope.$emit('show2wm', 'true');
	}
	$scope.close2wm = function(){
		$scope.$emit('close2wm', 'false');
	}
}])
.directive('floatBar', function(){
	return {
		restrict: 'A',
//		scope: {
//			mouseover: '&',
//			monuseleave: '&'
//		},
		template: '<div class="float-bar" id="float-bar" ng-mouseover="show()" ng-mouseleave="hide()">\
						<div class="push"><span>官方入口</span></div>\
						<div class="list">\
							<ul>\
								<li class="wx"><a ng-click="open2wm()" href="javascript:;">微信公众号</a></li>\
								<li class="sina"><a href="http://weibo.com/u/6020178770?topnav=1&wvr=6&topsug=1" target="_blank">新浪微博</a></li>\
								<li class="bd"><a href="http://tieba.baidu.com/f?kw=%E7%96%AF%E7%8B%82%E5%8E%9F%E5%A7%8B%E4%BA%BA%E6%89%8B%E6%B8%B8&ie=utf-8&red_tag=i1536704262" target="_blank">百度贴吧</a></li>\
								<li class="kf">\
									<a href="javascript:;">客服</a>\
									<span class="info">客服QQ群号：374804639<br/ >客服邮箱：fkysr_cs@opd2c.com</span>\
								</li>\
							</ul>\
						</div>\
					</div>'
	}
});