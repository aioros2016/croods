angular.module('croods', ['modRouter', 'modIndex', 'modCate', 'modDetail', 'modFloatBar', 'modNav'])
.controller('contApp', ['$scope', '$http', function($scope, $http){
	$scope.showMask = false;
	$scope.show2wm = false;
	$scope.count = 0;
	
	// 首页视频
	var video = document.querySelector('video');
	$scope.showVideo = false;
	$scope.openVideo = function(){
		$scope.showMask = true;
		$scope.showVideo = true;
		if(!video.src){
			video.src = video.getAttribute('_src');
		}
		video.play();
		video.setAttribute("_src", "");
	};
	$scope.closeVideo = function(){
		$scope.showMask = false;
		$scope.showVideo = false;
		video.pause();
	};

	//二维码
	$scope.$on('show2wm', function(event,data) {
		$scope.showMask = true;
		$scope.show2wm = data;
	});
	$scope.close2wm = function(){
		$scope.showMask = false;
		$scope.show2wm = false
	};

	$scope.$on('$stateChangeSuccess', function(){
		$scope.count++;
	});
	
}])
.filter('chn', function (){
	return function (input){
		switch (input){
			case 'total':
				input = '综合';
				break;
			case 'news':
				input = '新闻';
				break;
			case 'notice':
				input = '公告';
				break;
			case 'strategy':
				input = '攻略';
				break;
		}
		return input;
	};
});