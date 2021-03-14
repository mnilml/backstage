 

<template slot-scope="scope">
  <div class="quanxlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tablecon">
      <el-table :data="tableDatas" border style="width: 100%" height="500px">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="pid" label="权限等级">
          <template slot-scope="props">
            <el-tag :type="tag(props.row.level)">
              {{ typeoglevel(props.row.level) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "../../repuire/index.js";
export default {
  props: {},
  data() {
    return {
      tableDatas: [],
    };
  },
  methods: {
    // 判断等级
    tag(e) {
      if (e == "0") {
        return "";
      } else if (e == "1") {
        return "success";
      } else if (e == "2") {
        return "warning";
      }
    },
    typeoglevel(e) {
      if (e == "0") {
        return "一级";
      } else if (e == "1") {
        return "二级";
      } else if (e == "2") {
        return "三级";
      }
    },
    // 角色列表
    getLists() {
      request({
        url: "rights/list",
        method: "get",
      }).then((res) => {
        this.tableDatas = res.data;
      });
    },
  },
  mounted() {
    this.getLists();
  },
  components: {},
};
</script>

<style scoped lang="less">
.quanxlist {
  margin-top: 70px;
}
.tablecon {
  margin-top: 40px;
}
</style>
