<template>
	<div>
<<<<<<< HEAD
<<<<<<< HEAD
	     内容
=======
<<<<<<< HEAD
=======
>>>>>>> 4c58a8396ec703a850a9177502276bb25b279d3b
		111	qwertyukl
=======
		<div class="search">
			<el-input placeholder="请输入内容"></el-input>
			<el-button type="primary" icon="el-icon-search"></el-button>
			<el-button type="primary" @click="add = true">添加用户</el-button>
			<el-dialog :visible.sync="add">
			  <el-form >
			    <el-form-item label="用户名" >
			      <el-input  autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="密码" >
			     <el-input  autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="邮箱" >
				 <el-input  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" >
				 <el-input  autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<el-table :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe style="width: 100%">
			<el-table-column type="index" label="#">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column prop="mobile" label="电话">
			</el-table-column>
			<el-table-column prop="role_name" label="角色">
			</el-table-column>
			<el-table-column prop="" label="状态">
				<el-switch v-model="data.mg_state" @click="!data.mg_state" active-color="#13ce66" inactive-color="#ada6a4">
				</el-switch>
			</el-table-column>
			<el-table-column prop="" label="操作">
				<el-row  slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit"  circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="delect(scope.row.id)" circle></el-button>
					<el-button type="info" icon="el-icon-message" circle></el-button>
				</el-row>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current- change="handleCurrentChange"
			:current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="data.total">
		</el-pagination>
>>>>>>> dcb40f279ea5da173d7c386eb1e7f72323073446
<<<<<<< HEAD
>>>>>>> 4c58a8396ec703a850a9177502276bb25b279d3b
=======
>>>>>>> 4c58a8396ec703a850a9177502276bb25b279d3b
	</div>

</template>

<script>
	import request from '../../repuire/index.js'
	export default {
		data() {
			return {
				queryInfo: {
					pagenum: 1,
					pagesize: 13
				},
				add:false,
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
				url: 'users',
				method: 'get',
				params: this.queryInfo

			}).then(res => {
				console.log(res.data)
				this.list = res.data.users
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
			delect(id){
				console.log(id)
				request({
					url: 'roles/500',
					method: 'delete',
				}).then(res => {
					console.log(res)
				})
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
	.el-form-item{
		text-align: center;
	}
	
</style>
