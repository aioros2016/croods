angular.module('modNav', [])
.controller('contNav', ['$scope', '$location', function($scope, $location){
	var pathName = location.pathname;
	console.log($location.path());
	$scope.nowPage = 0;
	$scope.navList = [
		{
			"title": "官网首页",
			"href": "index"
		},
		{
			"title": "新闻公告",
			"href": "category.total"
		}
	];
	
	$scope.$on('$stateChangeSuccess', function(){
		if($location.path() === '/'){
			$scope.nowPage = 0;
		}
		else if($location.path().indexOf('/category') >= 0){
			$scope.nowPage = 1;
		}
		else {
			$scope.nowPage = 1;
		}
		console.log($scope.nowPage);
	});
}])
.directive('topNav', function(){
	return {
		restrict: 'A',
		template: '<div class="top-nav" ng-controller="contNav">\
						<div class="safe-box">\
							<div class="logo"><a ui-sref=\"index\"><img src="images/icon_app.png" alt="上海东方明珠迪尔希" /></a></div>\
							<div class="nav">\
								<ul>\
									<li class="{{$index == nowPage?\'active\':\'\'}}" ng-repeat="menu in navList"><a ui-sref="{{menu.href}}">{{menu.title}}</a></li>\
								</ul>\
							</div>\
						</div>\
					</div>'
	}
});