<template>
	<el-container class="home">
		<el-header>
			<span>电商后台管理系统</span>
			<div v-if="user">{{user}}</div>
			<button @click="login()" v-else>登录</button>
		</el-header>
		<el-container>
			<el-aside width="200px" class="infinite-list" style="overflow:auto">
				<el-menu :default-openeds="['1', '3']">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-menu"></i>用户管理
							</template>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>

			</el-main>
		</el-container>
			
	</el-container>
</template>

<script>
	import request from '../repuire/index.js'
	// @ is an alias to /src
	export default {
		data() {
			return {
				user: null,
				list: [],
				id:null,
				icon:{
					125:"el-icon-user-solid",
					103:"el-icon-bank-card",
					101:"el-icon-s-goods",
					102:"el-icon-s-order",
					145:"el-icon-suitcase"
				}
			}
		},
		mounted() {
			this.user = window.sessionStorage.getItem('user')
			// console.log(window.sessionStorage.getItem('user'))
			request({
				url: 'menus',
				method: 'get'

			}).then(res => {
				console.log(res.data)
				this.list = res.data
			})
			   request({
      url: "/carousel",
      method: "get",
    }).then((res) => {
      // console.log(res);
      this.imglist = res.hcy;
    });
		},
		methods: {
			login() {
				this.$router.replace('login')
			}
		}
	}
</script>
<style>
	html,
	body {
		width: 100%;
		height: 100%;
	}

	.home {
		height: 100%;
	}

	.el-header {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
		background-color: rgb(51, 55, 68);
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.el-aside{
		margin-top: 60px;
	}
	.el-header>button {
		width: 60px;
		height: 40px;
		border-radius: 8px;
		color: #fff;
		background-color: rgba(255, 255, 255, .4);
		outline: none;
		border: none;
	}

	.el-aside {
		/* height: 100%; */
		background-color: rgb(51, 55, 68);
	}

	.el-menu-vertical-demo {
		background-color: rgb(51, 55, 68);
	}

	.el-menu-item {
		background-color: rgb(51, 55, 68);
	}

	.el-menu-demo {
		position: absolute;
		left: 200px;
	}

	.el-menu {
		background-color: rgb(51, 55, 68);

	}

	.el-submenu__title {
		color: #fff !important;
	}

	.el-submenu__title:hover {
		color: #000 !important;
	}
</style>
