angular.module('modCate', ['modDetail'])
.controller('contCate', ['$scope', '$http', '$location', '$state', function($scope, $http, $location, $state){
	$scope.curPage = '';
	$scope.totPage = '';
	$scope.nowCate = 0;
	$scope.nowCategory = '';
	$scope.showCatePath = true;
	$scope.host = $location.host() +':'+ $location.port();
	
	$scope.category = [{
		"name": "综合",
		"href": "category.total"
	},
	{
		"name": "新闻",
		"href": "category.news"
		
	},
	{
		"name": "公告",
		"href": "category.notice"
		
	},
	{
		"name": "攻略说明",
		"href": "category.strategy"
		
	}];
	
	// 获取文章列表
	function getArticle(category, page){
		$scope.curPage = page;
		$http.get('http://'+ $scope.host +'/TheCroods/api_page_newslist.ashx', {
			params: {
				category: category,
				page: page
			}
		}).success(function (data){
			$scope.list = data.data;
			$scope.page = data.page;
			$scope.nowCategory = $scope.list[0].category;
			$scope.curPage = $scope.page.current;
			$scope.totPage = $scope.page.total;
		}).error(function (){
			console.log('载入失败，请稍后重试！');
		});
	};
	$scope.getArticle = getArticle;
	
	// 下一页
	$scope.nextPage = function(category, page){
		if($scope.curPage == $scope.totPage) return;
		page++;
		$scope.getArticle(category, page);
	};
	
	// 上一页
	$scope.prevPage = function(category, page){
		if($scope.curPage == 1) return;
		page--;
		$scope.getArticle(category, page);
	};
	
	// 最后一页
	$scope.lastPage = function(category, page){
		if($scope.curPage == $scope.totPage) return;
		$scope.getArticle(category, page);
	};
	
	$scope.$on('show2wm', function(event,data) {
		$scope.showMask = true;
		$scope.show2wm = data;
	});
	$scope.close2wm = function(){
		$scope.showMask = false;
		$scope.show2wm = false
	}
	
	// 哈希地址切换模块
	function path2title(){
		if($location.path().indexOf('total') >= 0){
			$scope.title = '综合新闻';
			$scope.cate = 'total';
			$scope.nowCate = 0;
			getArticle('total', 1);
		}
		else if($location.path().indexOf('news') >= 0){
			$scope.title = '新闻中心';
			$scope.cate = 'news';
			$scope.nowCate = 1;
			getArticle('news', 1);
		}
		else if($location.path().indexOf('notice') >= 0){
			$scope.title = '公告中心';
			$scope.cate = 'notice';
			$scope.nowCate = 2;
			getArticle('notice', 1);
		}
		else if($location.path().indexOf('strategy') >= 0){
			$scope.title = '攻略说明';
			$scope.cate = 'strategy';
			$scope.nowCate = 3;
			getArticle('strategy', 1);
		}
		else {
			$scope.title = '综合新闻';
			$scope.cate = 'total';
			$scope.nowCate = 0;
			getArticle('total', 1);
		}
	};
	$scope.$on('$routeChangeStart', function(){
		$scope.cateShow();
	});
	$scope.$on('$stateChangeSuccess', function(){
		path2title();
	});
	
	// 文章列表菜单的显示与隐藏
	$scope.cateShow = function(){
		if($location.path().indexOf("detail") >= 0){
			return false;
		}
		else{
			return true;
		};
	};
	$scope.cateShow();
}]);