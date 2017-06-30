//import Vue from 'vue'


import Home from './components/Home.vue'
import Category from './components/Category.vue'
import Detail from './components/Detail.vue'
//import Column from './components/Column.vue'
//import UserInfo from './components/UserInfo.vue'
//import UserLogin from './components/UserLogin.vue'
//import UserReg from './components/UserReg.vue'
//import Article from './components/Article.vue'

export default [
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Category',
    component: Category
  },
  {
    path: '/Detail/:id',
    component: Detail
  },
  { 
    path: '/', 
    redirect: '/Home' 
  },
  { 
    path: '*', 
    redirect: '/Home' 
  }
];

/*const router={
	mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
	routes:[
		{
			path:'/home',
			component:Home
		},
    {
      path:'/follow',
      component:Follow
    },
    {
      path:'/column',
      component:Column
    },
		{ 
      path: '/', 
      redirect: '/home' 
    }
	]
};*/

//export default new VueRouter(router);

