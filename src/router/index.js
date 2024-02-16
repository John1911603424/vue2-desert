import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Interface from "../components/Interface.vue"
import Cases from "../components/Cases.vue"
import Projects from "../components/Projects.vue"

import GeoInfo from "../components/GeoInfo.vue"
import Grassland from "../components/Grassland.vue"
import GeoInfo1 from "../components/GeoInfo1.vue"
import GeoInfo2 from "../components/GeoInfo2.vue"
import GeoInfo3 from "../components/GeoInfo3.vue"
import GeoInfo4 from "../components/GeoInfo4.vue"
import GeoInfo5 from "../components/GeoInfo5.vue"
import Statistic from "../components/Statistic.vue"


Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect:'/geoinfo'
	},{
	path: '/login',
	name: 'login',
	component: Login
	},{
	path: '/home',
	name: 'home',
	component: Home,
	redirect:'/geoinfo',
	children:[
		{
			path: '/geoinfo',
			name:'geoinfo',
			component: GeoInfo
		},{
			path: '/grassland',
			name:'grassland',
			component: Grassland
		},{
			path: '/geoinfo1',
			name:'geoinfo1',
			component: GeoInfo1
		},{
			path: '/geoinfo2',
			name:'geoinfo2',
			component: GeoInfo2
		},{
			path: '/geoinfo3',
			name:'geoinfo3',
			component: GeoInfo3
		},{
			path: '/geoinfo4',
			name:'geoinfo4',
			component: GeoInfo4
		},{
			path: '/geoinfo5',
			name:'geoinfo5',
			component: GeoInfo5
		},{
			path: '/statistic',
			name:'statistic',
			component: Statistic
		},
		
	]},	
]

const router = new VueRouter({
  routes
})

// 添加路由导航守卫
// 添加路由导航守卫
// 用来对访问的路由进行权限控制
// 除了login这个路由其他的路由都要进行了登录之后才能访问
router.beforeEach((to, from, next) => {
	// console.log(to)
	// console.log(from)
	// console.log(next)
	// 判断访问的是否是登录页面
	// if (to.path === '/login') {
	// 	return next()
	// 	// 判断当前sessionStorage中是否有token(判断是否登录过)
	// } else if (window.sessionStorage.getItem('token')) {
	// 	return next()
	// } else {
	// 	return next('/login')
	// }
	
	if(to.path=== '/login' || window.sessionStorage.getItem('token')) return next()
	return next('/login')
})



export default router
