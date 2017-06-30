//fastClick
$(function() {
    FastClick.attach(document.body);  
});  

//等比缩放
(function(win, doc){
	function change(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';	
	}
	change();
	win.addEventListener('resize', change, false);
})(window, document);

//Loading
(function(){
	var loading = $("#loading");
	var animateArea = $("#animate-area");
	var total = 6;
	var count = 1;
	
	for (var i = 1; i < total; i++) {
		var oImg = new Image();
		oImg.src = "images/" + i + ".png";
		oImg.onload = function() {
			count++;
			console.log(count);
			var scale =  count / total;
			$("#line").css({ width: (scale * 100).toFixed(2) + "%" });
			if(count == total){
				setTimeout(function(){
					loading.hide();
					if(window.orientation === 90 || window.orientation === -90) return;
					animateArea.addClass('active');
					$("html, body").removeClass('lock-src');
				}, 300);
			};
		};
	};
}());

// 首页视图
var viewIndex = '<div class=\"btn-download\">\
	<a href=\"javascript:;\">下载游戏</a>\
</div>\
<div class=\"event-area\">\
	<h2>精彩活动</h2>\
	<div class=\"swiper-container swiper-event\">\
        <div class=\"swiper-wrapper\">\
            <div class=\"swiper-slide\"><a href="javascript:;"><img src=\"images/g1.jpg\" /></a></div>\
            <div class=\"swiper-slide\"><a href="javascript:;"><img src=\"images/g2.jpg\" /></a></div>\
            <div class=\"swiper-slide\"><a href="javascript:;"><img src=\"images/g3.jpg\" /></a></div>\
            <div class=\"swiper-slide\"><a href="javascript:;"><img src=\"images/g4.jpg\" /></a></div>\
        </div>\
        <div class=\"swiper-pagination\"></div>\
    </div>\
</div>\
<div class=\"features-area\">\
	<h2>游戏特色</h2>\
	<div class=\"swiper-container swiper-features\">\
        <div class=\"swiper-wrapper\">\
            <div class=\"swiper-slide\"><img src=\"images/b1.jpg\" /></div>\
            <div class=\"swiper-slide\"><img src=\"images/b2.jpg\" /></div>\
            <div class=\"swiper-slide\"><img src=\"images/b3.jpg\" /></div>\
            <div class=\"swiper-slide\"><img src=\"images/b4.jpg\" /></div>\
            <div class=\"swiper-slide\"><img src=\"images/b5.jpg\" /></div>\
        </div>\
        <div class="swiper-pagination"></div>\
    </div>\
</div>\
<div class=\"news-area\">\
	<h2>新闻中心</h2>\
	<div class=\"tabs\" id=\"tabs\">\
		<div class=\"menu\">\
			<ul>\
				<li class=\"active\">综合</li>\
				<li>新闻</li>\
				<li>公告</li>\
				<li>攻略</li>\
			</ul>\
		</div>\
		<div class=\"content\">\
			<ol style=\"display: block;\"></ol>\
			<ol></ol>\
			<ol></ol>\
			<ol></ol>\
		</div>\
	</div>\
	<div class=\"check-more\" onclick="loadCategory()">查看更多</div>\
</div>';

var innerbox = $('#inner-box');
if(!window.location.hash){
	loadIndex();
	window.location.hash='#d=0&cate=0&page=0';
}
var hJson=hash2json(window.location.hash);
console.log(window.location.hash);
console.log(hJson);




// 列表页视图
var viewCategory = '<div class=\"btn-back\">\
	<a href=\"javascript:;\" onclick="backHistory()">返回</a>\
</div>\
<div class=\"news-area\">\
	<div class=\"tabs show\" id=\"tabs\">\
		<div class=\"menu\">\
			<ul>\
				<li class=\"active\">综合</li>\
				<li>新闻</li>\
				<li>公告</li>\
				<li>攻略</li>\
			</ul>\
		</div>\
		<div class=\"content\">\
			<ol></ol>\
		</div>\
	</div>\
	<div class=\"page-box\">\
		<a class=\"prev\" href=\"javascript:;\" onclick="prevPage()">上一页</a>\
		<a class=\"next\" href=\"javascript:;\" onclick="nextPage()">下一页</a>\
	</div>\
</div>';

// 载入首页视图
var doc = $(document);
function backHistory(){
	if(hJson.cate != 0 && hJson.d == 0){
		hJson.page = 0;
		hJson.cate = 0;
		json2hash(hJson);
		loadIndex();
		doc.scrollTop(0);
	} else if(hJson.cate != 0 && hJson.d != 0){
		loadCategory();
		doc.scrollTop($('.animate-area').outerHeight());
	} else if(hJson.cate == 0 && hJson.d != 0){
		hJson.d = 0;
		json2hash(hJson);
		loadIndex();
		doc.scrollTop(0);
	};
	console.log(hJson);
};
if(hJson.cate != 0 && hJson.d == 0){
	loadCategory();
} else if(hJson.d != 0){
	getArticle(hJson.d);
} else {
	console.log(hJson);
	loadIndex();
}

function loadIndex(){
	innerbox.html(viewIndex);
	loadTab();
	getArticleList();
//	hJson.d = 0;
//	hJson.cate = 0;
	
	//swiper
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
	
	
//	console.log(hJson.d);
};

// 载入列表页视图
function loadCategory(){
	var aMenu = $('#tabs ul li');
	innerbox.html(viewCategory);
	
	console.log(hJson);
	if(hJson.cate == 0) hJson.cate = "total";
	if(hJson.page == 0){
		hJson.page = 1;
	}else {
		hJson.page = hJson.page;
	};
	hJson.d = 0;
	getCateList(hJson.cate, hJson.page);
	json2hash(hJson);
	loadTab2();
	doc.scrollTop($('.animate-area').outerHeight());
};

// 载入列表页新闻列表
var curPage = 0;
var totPage = 0;
function getCateList(category, page){
	var aCont = $('#tabs ol');
	aCont.html('');
	$.ajax({
	    url:'http://api-silkroad.opd2c.com:8080/TheCroods/api_page_newslist.ashx',
	    type:'GET',
	    async:true,
	    data:{
	        category: category,
			page: page
	    },
	    dataType:'json',
	    success:function(data){
	        var categoryList = data.data;
	        var page = data.page;
	        console.log(page);
	        curPage = page.current;
			totPage = page.total;
			for(var i in categoryList){
	        	var oLi = document.createElement('li');
	        	oLi.innerHTML = '<a href=\"javascript:;\" onclick=\"getArticle('+ categoryList[i].postId +')\">'+ categoryList[i].title +'</a><span>'+ categoryList[i].datetime.substring(0, 10) +'</span>';
	        	aCont.append(oLi);
	        };
			console.log(category);
	    },
	    error:function(){
	        console.log('载入失败，请稍后重试');
	    }
	});
}

// 上一页
function prevPage(){
	if(hJson.page == 1) return;
	hJson.page = hJson.page - 1;
		getCateList(hJson.cate, hJson.page);
		json2hash(hJson);
};

// 下一页
function nextPage(){
	if(hJson.page == totPage) return;
	hJson.page = parseInt(hJson.page) + 1;
	console.log(hJson.page);
	getCateList(hJson.cate, hJson.page);
	json2hash(hJson);
};

// 载入新闻列表
function getArticleList(){
	var aCont = $('#tabs ol');
	$.ajax({
	    url:'http://api-silkroad.opd2c.com:8080/TheCroods/api_page_index.ashx',
	    type:'GET',
	    async:true,
	    cache:false,
	    dataType:'json',
	    success:function(data){
	        var category = data.data;
	        var len = -1;
	        for(var j in category){
	        	var articleList = data.data[j].list;
	        	len++;
	        	for(var i in articleList){
		        	var oLi = document.createElement('li');
		        	oLi.innerHTML = '<a href=\"javascript:;\" onclick=\"getArticle('+ articleList[i].postId +')\">'+ articleList[i].title +'</a><span>'+ articleList[i].datetime.substring(0, 10) +'</span>';
		        	aCont[len].appendChild(oLi);
		        };
	        };
	    },
	    error:function(){
	        console.log('载入失败，请稍后重试');
	    }
	});
};

//新闻中心
function loadTab(){
	var oTab = $('#tabs');
	if(oTab.length == 0) return;
	var aMenu = $('#tabs ul li');
	var aCont = $('#tabs ol');
	var now = 0;
	aMenu.click(function(){
		now = $(this).index();
		tab();
	});
	function tab(){
		aMenu.removeClass('active');
		aCont.hide();
		aMenu.eq(now).addClass('active');
		aCont.eq(now).show();
		
	};
};

function loadTab2(){
	var oTab = $('#tabs');
	if(oTab.length == 0) return;
	var aMenu = $('#tabs ul li');
	var now = 0;
	switch (hJson.cate){
		case 'total':
			aMenu.removeClass('active');
			aMenu.eq(0).addClass('active');
			break;
		case 'news':
			aMenu.removeClass('active');
			aMenu.eq(1).addClass('active');
			break;
		case 'notice':
			aMenu.removeClass('active');
			aMenu.eq(2).addClass('active');
			break;
		case 'strategy':
			aMenu.removeClass('active');
			aMenu.eq(3).addClass('active');
			break;
	}
	aMenu.click(function(){
		var arr = ['total', 'news', 'notice', 'strategy']
		now = $(this).index();
		tab2();
		hJson.cate = arr[now];
		
		hJson.page = 1;
		getCateList(hJson.cate, hJson.page);
		json2hash(hJson);
	});
	function tab2(){
		aMenu.removeClass('active');
		aMenu.eq(now).addClass('active');
	};
};

// 获取新闻详情
function getArticle(id){
	$.ajax({
	    url:'http://api-silkroad.opd2c.com:8080/TheCroods/api_page_newsdetail.ashx',
	    type:'GET',
	    async:true,
	    dataType:'json',
	    data:{
	        id: id
	    },
	    success:function(data){
	        var detail = data.data;
	        var viewDetail = '<div class=\"btn-back\">\
				<a href=\"javascript:;\" onclick=\"backHistory()\">返回首页</a>\
			</div>\
			<div class=\"detail-box\">\
				<div class=\"detail-title\">\
					<h2>'+ detail.title +'</h2>\
					<div class=\"date\">发布于 '+ detail.createdAt +'</div>\
				</div>\
				<div class=\"text\">'+ detail.content +'</div>\
			</div>';
	        innerbox.html(viewDetail);
	        hJson.d = id;
	        json2hash(hJson);
	        doc.scrollTop($('.animate-area').outerHeight());
	        console.log(hJson);
	    },
	    error:function(){
	        console.log('载入失败，请稍后重试');
	    }
	});
};

// hash转换
function hash2json(sHash){
	var json={};
	sHash=sHash.substring(1);
	var arr=sHash.split('&');//[tab=2,page=3,msg=4]
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');//['tab','2']
		json[arr2[0]]=arr2[1];
	}
	return json;
}

function json2hash(json){
	var arr=[];
	for(var key in json){
		arr.push(key+'='+json[key]);
	}
	
	window.location.hash='#'+arr.join('&');	
};

// 播放视频
(function(){
	var oBtn = $('#btn-video');
	var oMask = $('#mask2');
	var oVideoBox = $('#video-box');
	var oVideo = document.querySelector('video');
	function playVideo(){
		$('html, body').addClass('lock-src');
		oMask.show();
		oVideoBox.show();
		if(!oVideo.src){
			oVideo.src = 'video/movie.mp4';
		}
		oVideo.play();
	};
	function closeVideo(){
		$('html, body').removeClass('lock-src');
		oMask.hide();
		oVideoBox.hide();
		oVideo.pause();
	}
	oBtn.click(function(){
		playVideo();
	});
	oMask.click(function(){
		closeVideo();
	});
}());

//var oDate = new Date().getTime()
//oDate = oDate * 1000;
//function getLocalTime(nS) {     
// return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
//}     
//alert(getLocalTime(oDate));

//返回顶部
(function(){
	var goTop = $('#go-top');
	goTop.click(function(){
		$('body, html').animate({scrollTop: 0}, 300);
	})
}());

//监听横屏
(function(){
	var doc = $(document);
	var oMask = $('#mask');
	var iphone = $('.iphone');
	var animateArea = $('#animate-area');
	function horizontal(){
		if (window.orientation === 180 || window.orientation === 0){
	    	oMask.hide();
	    	iphone.removeClass('rotatePhone');
	    	doc.unbind('touchmove');
	    	if(!animateArea.hasClass('active')){
	    		animateArea.addClass('active');
				$('html, body').removeClass('lock-src');
	    	}
		};
		if (window.orientation === 90 || window.orientation === -90){   
			oMask.show();
			iphone.addClass('rotatePhone');
			doc.on('touchmove', function(event){
				event.preventDefault();
			}, false);
		};
	};
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
	    horizontal();
	}, false);
	horizontal();
}());