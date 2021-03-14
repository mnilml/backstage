<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="list" v-if="show">
			<div class="search">
				<el-input placeholder="请输入内容"></el-input>
				<el-button type="primary" icon="el-icon-search"></el-button>
				<el-button type="primary" @click="add()">添加用户</el-button>
			</div>
			<el-table border :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe style="width: 100%">
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称" width="680">
				</el-table-column>
				<el-table-column prop="goods_price" label="商品价格" >
				</el-table-column>
				<el-table-column prop="goods_weight" label="商品重量">
				</el-table-column>
				<el-table-column prop="add_time" label="创建时间">
				</el-table-column>
				<el-table-column prop="" label="操作">
					<el-row>
						<el-button type="primary" icon="el-icon-edit" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" circle></el-button>
					</el-row>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current- change="handleCurrentChange"
				:current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<router-view v-else></router-view>
	</div>
	
</template>

<script>
	import request from '../../repuire/index.js'
	// import Add from './add.vue'
	export default {
		// components:{
		// 	Add
		// },
		data() {
			return {
				queryInfo: {
					pagenum: 1,
					pagesize: 13
				},
				show:true,
				list: [],
				data: {},
				value: true,
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [2, 3, 5, 10],
				// 默认每页显示的条数（可修改）
				PageSize: 7,
			}
		},
		mounted() {

			request({
				url: 'goods',
				method: 'get',
				params: this.queryInfo

			}).then(res => {
				console.log(res.data)
				this.list = res.data.goods
				this.data = res.data
			})

		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.PageSize = val
				// 注意：在改变每页显示的条数时，要将页码显示到第一页
				this.currentPage = 1
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val
			},
			add(){
				// this.$router.push('goods/add')
				this.show=false
			}
		},
	}
</script>
<style>
	.el-input {
		width: 400px;
	}

	.search {
		float: left;
	}

	.el-pagination {
		float: left;
	}

	.el-form-item {
		text-align: center;
	}


	td {
		white-space: nowrap;
	}
</style>
