angular.module('modRouter', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	
	// 全站路由设置
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('index',{
        url: '/',
        cache: 'false',
        views: {
            'app': {
                templateUrl: '/views/app.html'
            },
            'header@index': {
                templateUrl: '/views/header.html'
            },
            'content@index': {
            	templateUrl: '/views/index.html',
            	controller: 'contIndex'
            },
            'footer@index': {
            	templateUrl: '/views/footer.html'
            }
        }
    })
    .state('category',{
        url: '/category',
        cache: 'false',
        views: {
        	'app': {
                templateUrl: '/views/category.html',
            },
            'content@category': {
            	templateUrl: '/views/category_content.html',
            	controller: 'contCate'
            },
            'viewBox@category': {
            	templateUrl: '/views/inner-view.html'
            },
            'footer@category': {
            	templateUrl: '/views/footer.html'
            }
        }
    })
    .state('category.total',{
        url: '/total'
    })
    .state('category.news',{
        url: '/news'
    })
    .state('category.notice',{
        url: '/notice'
    })
    .state('category.strategy',{
        url: '/strategy'
    })
    .state('detail',{
        url: '/detail/:id/',
        views: {
        	'app': {
                templateUrl: '/views/category.html',
            },
            'content@detail': {
            	templateUrl: '/views/category_content.html',
            	controller: 'contDetail'
            },
            'viewBox@detail': {
            	templateUrl: '/views/detail.html'
            },
            'footer@detail': {
            	templateUrl: '/views/footer.html'
            }
        }
    })
    .state('return',{
    	url: '/category/:cate/',
    	views: {
        	'app': {
                templateUrl: '/views/category.html',
            },
            'content@return': {
            	templateUrl: '/views/category_content.html',
            	controller: 'contCate'
            },
            'viewBox@return': {
            	templateUrl: '/views/inner-view.html'
            },
            'footer@return': {
            	templateUrl: '/views/footer.html'
            }
        }
    })
}])