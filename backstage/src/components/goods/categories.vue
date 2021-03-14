<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="cat_id" border default-expand-all
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
			<el-table-column type="cat_id" label="#" width="180">
			</el-table-column>
			<el-table-column prop="cat_name" label="分类名称" width="180">
			</el-table-column>
			<el-table-column prop="" label="是否有效">
				<div slot-scope="scope">
					<!-- <button @click="a(scope.rwo.id)"></button> -->
					<i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
					<i class="el-icon-error" v-else style="color: red;"></i>
				</div>
				<!-- <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
				<i class="el-icon-error" v-else style="color: red;"></i> -->
			</el-table-column>
			<el-table-column prop="" label="排序">
				<template slot-scope="scope">
					<el-tag size="small" v-if="scope.row.cat_level == 0">一级</el-tag>
					<el-tag type="success" size="small" v-else-if="scope.row.cat_level == 1">二级</el-tag>
					<el-tag type="warning" size="small" v-else>三级</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<el-button  type="primary" icon="el-icon-edit" circle
							@click="showEditDialog(scope.row.cat_id)"></el-button></el-button>
						<el-button  type="danger" icon="el-icon-delete" circle
							@click="removeParams(scope.row.cat_id)"></el-button>
					</template>
			</el-table-column>
		</el-table>
		<el-dialog >
			<!-- 添加参数的对话框 -->
			<!-- <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
				<el-form-item :label="titleText" prop="attr_name">
					<el-input v-model="addForm.attr_name"></el-input>
				</el-form-item>
			</el-form> -->
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addParams">确 定</el-button> -->
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import request from '../../repuire/index.js'
	export default {
		data() {
			return {
				tableData: [],
				querInfo: {
					type: 1,
					pagenum: 1,
					pagesize: 5
				},
			}
		},
		mounted() {
			request({
				url: 'categories',
				method: 'get',
				params: this.queryInfo
			}).then(res => {
				console.log(res)
				this.tableData = res.data
			})
		},
		methods: {
			a(id) {
				console.log(id)
			},
			showEditDialog(attrId) {
				console.log(attrId)
				// 查询当前参数的信息
				request({
					url:`categories/${attrId}`,
					method:'get',
					params: {
						attr_sel: this.activeName
					}
				}).then(res=>{
					console.log(res)
					if (res.meta.status !== 200) {
					return this.$message.error('获取参数信息失败！')
				}

				this.editForm = res.data
				this.editDialogVisible = true
				})
				
				
			},
			
		},
	}
</script>
