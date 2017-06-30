angular.module('modIndex', [])
.controller('contIndex', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.integrated = [];
	$scope.news = [];
	$scope.notice = [];
	$scope.media = [];
	$scope.host = $location.host() +':'+ $location.port();
	
	function getCookie(name){
		var arr = document.cookie.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');	
			if(arr2[0]==name){
				return arr2[1];	
			}
		}
		return '';
	};
	
	$http.get('http://'+ $scope.host +'/TheCroods/api_page_index.ashx').success(function (data){
		$scope.integrated = data.data.total.list;
		$scope.integratedHot = data.data.total.hot;
		$scope.news = data.data.news.list;
		$scope.newsHot = data.data.news.hot;
		$scope.notice = data.data.notice.list;
		$scope.noticeHot = data.data.notice.hot;
		$scope.raiders = data.data.strategy.list;
		$scope.raidersHot = data.data.strategy.hot;
	}).error(function (){
		console.log('载入失败，请稍后重试！');
	});

	// 选项卡模块
	function tab(id){
		if(!id) return;
		this.wrap = document.getElementById(id);
		this.head = this.wrap.getElementsByTagName('ol')[0].getElementsByTagName('li');
		this.content = this.wrap.getElementsByTagName('ul')[0].getElementsByTagName('li');
		var _this = this;
		for(var i=0;i<this.head.length;i++){
			(function(index){
				_this.head[i].onmouseover = function(){
					_this.fnClick(index);
				};	
			})(i);
		};
	};
	tab.prototype.fnClick = function(index){
		for(var i=0;i<this.head.length;i++){
			this.head[i].className = '';
			$(this.head[i]).removeClass("active");
			$(this.content[i]).stop().animate({
				"opacity": 0
			}, 300).hide();
		}
		$(this.head[index]).addClass("active");
		$(this.content[index]).stop().show().animate({
			"opacity": 1
		}, 300);
	};
	
	function tabAuto(id){
		tab.call(this,id);
		this.now = 0;
		this.timer = null;
		this.auto();
		var _this = this;
		this.wrap.onmouseover = function(){
			_this.fnOver();	
		};
		this.wrap.onmouseout = function(){
			_this.fnOut();	
		};
	}
	tabAuto.prototype = new tab();
	tabAuto.prototype.constructor = tabAuto;
	tabAuto.prototype.auto = function(){
		var _this = this;
		this.timer = setInterval(function(){
			_this.now++;
			if(_this.now == _this.head.length) _this.now = 0;
			_this.fnClick(_this.now);	
		},3500);
	};
	tabAuto.prototype.fnOver = function(){
		clearInterval(this.timer);	
	};
	tabAuto.prototype.fnOut = function(){
		this.auto();	
	};
	
	$scope.$on('$viewContentLoaded', function(){
		// 模式介绍
		(function(){
			var oBox = document.getElementById('about-mode');
			var aLi = oBox.children[0].children;
			var W = oBox.offsetWidth;
			var defaultW = 136;
			for(var i=1; i<aLi.length; i++){
				aLi[i].style.left = W - (aLi.length - i) * defaultW + 'px';
			}
			for(var i=0; i<aLi.length; i++){
				(function(index){
					aLi[i].onmouseover = function(){
						for(var i=0; i<aLi.length; i++){
							if(i <= index){
								$(aLi[i]).stop().animate({
									"left": i * defaultW
								}, 300);
							}
							else{
								$(aLi[i]).stop().animate({
									"left": W - (aLi.length - i) * defaultW
								}, 300);
							};
						};
					};
				})(i);
			};
		}());
		
		new tabAuto('slide-show');
		new tab('news-box');
		new tab('media-news');
	});
	$scope.$on('$stateChangeSuccess', function(){
		var arr = [];
		var gamerRank = getCookie('gamerRank');
		var json = eval('('+gamerRank+')');
		var oRank = document.getElementById('rank');
		var oTbody = oRank.getElementsByTagName('tbody')[0];
		if($scope.count == 1) return;
		var index = 0;
		for(var i=0; i<5; i++){
			var oTr = document.createElement('tr');
			index++;
			oTr.innerHTML = '<td><i class="n'+ index +'">'+ index +'</i></td><td>'+ json[i].name +'</td><td>'+ json[i].trophy +'</td>';
			oTbody.appendChild(oTr);
		};
	});
}]);
	
	
