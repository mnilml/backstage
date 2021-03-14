<template>
<<<<<<< HEAD
  <el-container class="home">
    <el-header>
      <span>电商后台管理系统</span>
      <div v-if="user">{{ user }}</div>
      <button @click="login()" v-else>登录</button>
    </el-header>
    <el-container>
      <el-aside width="200px" class="infinite-list" style="overflow: auto">
        <el-menu router>
          <el-submenu v-for="(item, ind) in list" :index="String(item.order)">
            <template slot="title"
              ><i :class="icon[item.id]"></i>{{ item.authName }}</template
            >
            <el-menu-item
              v-for="it in item.children"
              :index="'/index/' + it.path"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ it.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import request from "../repuire/index.js";
// @ is an alias to /src
export default {
  data() {
    return {
      user: null,
      list: [],
      id: null,
      icon: {
        125: "el-icon-user-solid",
        103: "el-icon-bank-card",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-suitcase",
      },
    };
  },
  components: {},
  mounted() {
    this.user = window.sessionStorage.getItem("user");
    // console.log(window.sessionStorage.getItem('user'))
    request({
      url: "menus",
      method: "get",
    }).then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
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
      this.$router.replace("login");
    },
  },
};
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
.el-aside {
  margin-top: 60px;
}
.el-header > button {
  width: 60px;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.4);
  outline: none;
  border: none;
}
=======
	<el-container class="home">
		<el-header>
			<span>电商后台管理系统</span>
			<div v-if="user">{{user}}</div>
			<button @click="login()" v-else>登录</button>
		</el-header>
		<el-container>
			<el-aside width="200px" class="infinite-list" style="overflow:auto">
				<el-menu router>
					<el-submenu v-for="(item,ind) in list" :index="String(item.order)">
						<template slot="title"><i :class="icon[item.id]"></i>{{item.authName}}</template>
						<el-menu-item v-for="it in item.children" :index="'/index/'+it.path">
								<i class="el-icon-menu"></i>
								<span slot="title" >{{it.authName}}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
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
		background-color: rgb(234,237,241);
	}

	.home {
		height: 100%;
	}
	.el-main{
		margin-top: 60px;
		background-color: #fff;
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
		position: fixed;
		height: 100%;
		z-index: 100;
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
	.el-main{
		margin-left: 200px;
	}
	.el-aside {
		/* height: 100%; */
		background-color: rgb(51, 55, 68);
	}
	.el-menu-item span{
		color: #FFF9F3;
	}
	.el-menu-item:hover span{
		color: #000;
	}
	.el-menu-vertical-demo {
		background-color: rgb(51, 55, 68);
	}
>>>>>>> dcb40f279ea5da173d7c386eb1e7f72323073446

.el-aside {
  /* height: 100%; */
  background-color: rgb(51, 55, 68);
}
.el-menu-item span {
  color: #fff9f3;
}
.el-menu-item:hover span {
  color: #000;
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
