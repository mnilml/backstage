import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import( /* webpackChunkName: "about" */ '../views/index.vue'),
		children:[
			{
				path:'/',
				redirect:'yh'
			},
			{
				path:'yh',
				component:()=>import('../components/index/yonghu.vue')
			},
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "about" */ '../components/login/login.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
