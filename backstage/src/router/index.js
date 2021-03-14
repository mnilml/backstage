import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
<<<<<<< HEAD
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/index.vue'),
        children: [{
                path: 'users',
                name: 'Users',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/user/users.vue')
            },
            {
                path: 'roles',
                name: 'roles',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/jurisdiction/roles.vue')
            },
            {
                path: 'rights',
                name: 'rights',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/jurisdiction/rights.vue')
            }







        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/login/login.vue')
    },
=======
		path: '/',
		redirect: '/login'
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
<<<<<<< HEAD
<<<<<<< HEAD
				path:'orders',
				name:'orders',
				component:()=> import('../components/orders/orders.vue')
			},
=======
=======
>>>>>>> 4c58a8396ec703a850a9177502276bb25b279d3b
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
>>>>>>> 4c58a8396ec703a850a9177502276bb25b279d3b
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "about" */ '../components/login/login.vue')
	},
>>>>>>> dcb40f279ea5da173d7c386eb1e7f72323073446

]

const router = new VueRouter({
    routes
})

export default router