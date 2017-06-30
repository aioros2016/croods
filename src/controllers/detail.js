angular.module('modDetail', [])
.controller('contDetail', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){
	$scope.showCatePath = false;
	$scope.showDetailPath = true;
	$scope.detailCate = '';
	$scope.postId = $stateParams.id;
	$scope.host = $location.host() +':'+ $location.port();
	$http.get('http://'+ $scope.host +'/TheCroods/api_page_newsdetail.ashx', {
		params: {
			id: $scope.postId
		}
	}).success(function(res){
		$scope.detail = res.data;
		$scope.detailCate = $scope.detail.category;
		if($scope.detailCate == 'news'){
			$scope.title = '新闻中心';
		}
		else if($scope.detailCate == 'notice'){
			$scope.title = '公告中心';
		}
		else if($scope.detailCate == 'strategy'){
			$scope.title = '攻略说明';
		}
		else {
			$scope.title = '综合新闻';
		}
	}).error(function (){
		console.log('载入失败，请稍后重试！');
	});
}])
.filter('showAsHtml', ['$sce', function($sce){
	return function(input){
		return $sce.trustAsHtml(input);
	}
}])
.filter('pathChn', function (){
	return function (input){
		switch (input){
			case 'news':
				input = '新闻详情';
				break;
			case 'notice':
				input = '公告详情';
				break;
			case 'strategy':
				input = '攻略详情';
				break;
		}
		return input;
	};
});