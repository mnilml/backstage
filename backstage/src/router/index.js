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
		component: () => import( /* webpackChunkName: "about" */ '../views/index.vue'),
		children: [{
				path: 'users',
				name: 'Users',
				component: () => import( /* webpackChunkName: "about" */ '../components/user/users.vue')
			},
			{
				path: 'goods',
				name: 'Goods',
				component: () => import( /* webpackChunkName: "about" */ '../components/goods/goods.vue'),
				children: [
					{
					path:'',
					redirect:'add'
					},
					{
					path: 'add',
					name: 'Add',
					component: () => import( /* webpackChunkName: "about" */'../components/goods/add.vue'),
				}]
			},
			{
				path: 'params',
				name: 'Params',
				component: () => import( /* webpackChunkName: "about" */ '../components/goods/params.vue'),
			},
			{
				path: 'categories',
				name: 'Categories',
				component: () => import( /* webpackChunkName: "about" */ '../components/goods/categories.vue'),
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "about" */ '../components/login/login.vue')
	},

]

const router = new VueRouter({
	routes
})

export default router
