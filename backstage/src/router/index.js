import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import( /* webpackChunkName: "about" */ '../views/index.vue')
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
