
// 角色列表
<template>
  <div class="jiaoslist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <el-button
        size="medium"
        type="primary"
        @click="dialogVisible = true"
        class="addbtn"
        >添加角色</el-button
      >

      <!-- @click="handleEdit(scope.$index, scope.row)" -->
      <el-table :data="tableData" border style="width: 100%" height="450px">
        <el-table-column prop=" " label=" " width="50" type="expand">
          <template slot-scope="props">
            <el-table-column type="expand">
              <template slot-scope="child_lists">
                <!-- 展开行内容填充 -->
                <el-row
                  class="centerRow boeder_bot"
                  v-for="(item1, i1) in child_lists.row.children"
                  :key="item1.id"
                >
                  <!-- 这一列，专门渲染 一级权限 -->
                  <el-col :span="5">
                    <el-tag
                      closable
                      @close="removeQXbtn(item1.id, child_lists.row)"
                      >>
                      {{ item1.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 还剩余 19 列，分配给二三级权限 -->
                  <el-col :span="19">
                    <el-row
                      v-for="(item2, i2) in item1.children"
                      :key="item2.id"
                      class="centerRow"
                    >
                      <!-- 放二级权限 -->
                      <el-col :span="6">
                        <el-tag
                          closable
                          type="success"
                          @close="removeQXbtn(item2.id, child_lists.row)"
                          >{{ item2.authName }}</el-tag
                        >
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 放三级权限 -->
                      <el-col :span="18">
                        <el-tag
                          closable
                          type="warning"
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          @close="removeQXbtn(item3.id, child_lists.row)"
                        >
                          {{ item3.authName }}</el-tag
                        >
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="bianJroles(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >

            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showsetQxian(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限的对话框 -->

      <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        id="duihk"
        class="roleinp"
      >
        <el-tree
          ref="tree"
          :data="rightslist"
          :props="righttree"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defKeys"
        ></el-tree>
        <!-- 权限菜单 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button @click="setRoleqx()" type="primary">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加角色对话框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        height="300px"
        :before-close="handleClose"
      >
        <div class="roleinp">
          <el-input
            v-model="input1"
            autofocus
            prop="roleName"
            placeholder="请输入角色名称"
          >
            <template slot="prepend">角色名称</template>
          </el-input>
          <div class="kongrole">角色名称不能为空哦！！！</div>
        </div>
        <div class="roleinp">
          <el-input
            v-model="input2"
            prop="roleDesc"
            placeholder="请输入角色描述"
          >
            <template slot="prepend">角色描述</template>
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addroles()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑角色 -->
      <el-dialog
        :visible.sync="bianjrole"
        width="30%"
        height="300px"
        :before-close="handleClose"
      >
        <div class="roleinp">
          <el-input
            v-model="bjinput1"
            autofocus
            prop="roleName"
            placeholder="请输入修改的角色名称"
          >
            <template slot="prepend">角色名称</template>
          </el-input>
          <div class="kongrole1">编辑的角色名称不能为空哦！！！</div>
        </div>
        <div class="roleinp">
          <el-input
            v-model="bjinput2"
            prop="roleDesc"
            placeholder="请输入修改的角色描述"
          >
            <template slot="prepend">角色描述</template>
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bianjrole = false">取 消</el-button>
          <el-button @click="qrbianJroles()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import request from "../../repuire/index.js";

export default {
  props: {},
  data() {
    return {
      tableData: [],
      child_lists: [],
      // 控制权限对话框显示
      setRightDialogVisible: false,
      // 权限数据
      rightslist: [],
      righttree: {
        label: "authName",
        children: "children",
      },
      // 3级默认选中
      defKeys: [],
      // 分配角色id
      rolrId: [],
      //控制角色框显示隐藏
      dialogVisible: false,
      // 角色输入框内容
      input1: "",
      input2: "",
      // 编辑角色
      bianjrole: false,
      bjinput1: "",
      bjinput2: "",
      bjId: "",
    };
  },
  methods: {
    // 角色列表
    getRoles() {
      request({
        url: "/roles",
        method: "get",
      }).then((res) => {
        // console.log(res.data[0]);
        this.tableData = res.data;
        this.child_lists = res.data.children;
      });
    },
    //添加角色
    addroles() {
      let roleName = this.input1;
      let roleDesc = this.input2;
      console.log(roleName, roleDesc);
      if (roleName == "") {
        document.querySelector(".kongrole").style.display = "block";
        return;
      }
      request({
        url: "/roles",
        data: { roleName, roleDesc },
        method: "post",
      }).then((res) => {
        console.log(res);
        this.getRoles();
        this.roleName = "";
        this.roleDesc = "";
        this.dialogVisible = false;
      });
    },
    // 编辑角色
    bianJroles(roleID) {
      this.bianjrole = true;
      this.bjId = roleID.id;
    },
    // 确认编辑角色
    qrbianJroles() {
      if (this.bjinput1 == "") {
        document.querySelector(".kongrole1").style.display = "block";
        return;
      }
      request({
        url: `roles/${this.bjId}`,
        data: {
          roleName: this.bjinput1,
          roleDesc: this.bjinput2,
        },
        method: "put",
      }).then((res) => {
        this.getRoles();
        this.bjinput1 = "";
        this.bjinput2 = "";
        this.bianjrole = false;
      });
    },
    // 据ID删权限
    removeQXbtn(role, rId) {
      let rightId = rId.id;
      console.log(rightId);
      // 删除角色
      request({
        url: `roles/${rightId}/rights/${role}`,
        method: "delete",
      }).then((res) => {
        this.getRoles();
      });
    },
    //指定角色删除
    handleDelete(roresid) {
      let ZDroleid = roresid.id;
      request({
        url: `roles/${ZDroleid}`,
        method: "delete",
      }).then((res) => {
        console.log(res);
        this.getRoles();
      });
    },
    // 分配权限
    setRoleqx() {
      // 获取半选，全选ID
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const rids = [...arr1, ...arr2].join(",");
      console.log(rids);
      request({
        url: `roles/${this.roleId}/rights`,
        data: { rids },
        method: "post",
      }).then((res) => {
        console.log(res);
        // id保存视图
        this.getRoles();
        this.setRightDialogVisible = false;
      });
    },

    // 控制权限对话框显示
    showsetQxian(role) {
      this.roleId = role.id;
      console.log(role.children);
      // 对话框数据
      request({
        url: "rights/tree",
        method: "get",
      }).then((res) => {
        console.log(res);
        this.rightslist = res.data;
        this.defKeys = arrtemp;
      });
      // 获取所有三级节点的Id
      let arrtemp = [];
      
      role.children.forEach((item1) => {
        arrtemp.push(item1.id);
        item1.children.forEach((item2) => {
          arrtemp.push(item2.id);
          item2.children.forEach((item3) => {
            arrtemp.push(item3.id);
          });
        });
      });
      // console.log(arrtemp);
      // 权限对话框显示
      this.setRightDialogVisible = true;
    },
    handleClose(done) {
      done();
    },
  },
  components: {},
  mounted() {
    this.getRoles();
  },
};
</script>

<style scoped lang="less">
.jiaoslist {
  margin-top: 70px;
}
.addbtn {
  float: left;
  margin: 20px 0;
}
.centerRow {
  margin: 10px;
}
.el-tag {
  margin: 10px;
}
.boeder_bot {
  border-bottom: 1px solid #ccc;
}
.roleinp {
  margin-top: 20px;
}
.kongrole {
  color: red;
  display: none;
  float: left;
  margin: 10px 0;
  font-size: 12px;
}
.kongrole1 {
  color: red;
  display: none;
  float: left;
  margin: 10px 0;
  font-size: 12px;
}
</style>
