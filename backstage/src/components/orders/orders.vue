<template>
  <div class="box">
    <!-- 头部面包屑 -->
    <div class="max">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- table表格 -->
    <div class="table">
      <!-- 搜索框 -->
      <div class="ss">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        class="tables"
      >
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" align="center">
        </el-table-column>
        <el-table-column label="是否支付" prop="is_send" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" align="center">
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time" align="center">
          <template slot-scope="scope">
            <!-- 格式花时间  使用filtedate 过滤器-->
            {{ scope.row.create_time | filtedate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" prop="name">
          <template slot-scope="scope">
            <!-- 省市区 三联动 -->
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="box"
            >
            </el-button>
            <!-- 物流对话按钮 -->
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location-outline"
              @click="showbox(scope.row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
      >
      </el-pagination>

      <!-- 修改地址弹层 -->
      <el-dialog title="修改地址" :visible.sync="addressVisible" width="20%" height='600px'>
        <el-form
          :model="addressForm"
          :rules="addressFormRules"
          ref="addressFormRef"
          label-width="100px"
          >
          <el-form-item label="省市区/县" prop="address1">
              <!-- 省市区/县使用 el-cascader :options= -->
            <el-cascader :options='sld' width="100%" class="Cas" v-model="addressForm.address1"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 展示物流对话框 -->
      <el-dialog
        title="物流进度"
        :visible.sync="Sync"
        width="50%"
      >
        <span>这是一段信息</span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "./../../repuire/index";
// 格式化时间文件引入路径
import { fmtDate } from "./../../components/sjd/date.js";
// <!-- 省市区/县使用  -->
import sld from './../../assets/sld/city_data2017_element'
export default {
  props: {},
  data() {
    return {
      sld,
      pagenum: 1,
      pagesize: 10,
      is_send: 0,
      pay_status: 0,
      order_id:'',
      tableData: [],
      search: "",
      data: "",
      Sync:false,
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      // 省市区 三联动
      addressFormRules: {
         address1: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      /*
        分页器数据
      */
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [2, 3, 5, 10],
      // 默认每页显示的条数（可修改）
    };
  },
  mounted() {
    this.user = window.sessionStorage.getItem("user");
    request({
      url: "orders",
      method: "get",
      /*
                需要传的参数使用params对象
            */
      params: {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        is_send: this.is_send,
        pay_status: this.pay_status,
      },
    }).then((res) => {
      console.log(res.data);
      this.tableData = res.data.goods;
      this.data = res.data;
      console.log(this.data.total);
    });
  },
  methods: {
    onl() {
      request({
        url: "orders",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          is_send: this.is_send,
          pay_status: this.pay_status,
          order_id:this.order_id
        },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.goods;
        this.data = res.data;
        console.log(this.data.total);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页器效果
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.onl();
    },
    // 分页器效果
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.onl();
    },
    // 点击修改地址
    box() {
      this.addressVisible = true;
    },
    //物流对话框
    showbox(e) {
      this.Sync = true
       request({
         url:`kuaidi/${e.order_id}`,
          method: "get",
          
       }).then(res=>{
         console.log(res)
       })
    },
  },
  components: {
    request,
  },
  /*
    自定义属性格式化时间
  */
  filters: {
    filtedate: function (date) {
      let t = new Date(date);
      return fmtDate(t, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  background: #ccc;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
}

.max {
  width: 100%;
}
.ss {
  width: 100%;
  background-color: #fff;
  display: flex;
}
.ss .input-with-select {
  width: 360px;
}
.table {
  padding: 10px;
}
.el-input__inner{
  width: 400px  !important;
}
</style>
