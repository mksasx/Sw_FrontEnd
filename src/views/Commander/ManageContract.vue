<template>
  <div>
    <el-col :span="8" style="padding-bottom: 10px">
      <el-input
        v-model="searchValue"
        size="small"
        clearable
        placeholder="请输入合同相关信息进行搜索"
        suffix-icon="el-icon-search"
        @keyup.enter.native="doFilter"
      ></el-input>
    </el-col>
    <el-button type="primary" size="small" @click="doFilter" style="float: left"
      >搜索</el-button
    >
    <el-table
      ref="table"
      size="small"
      :data="
        showData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 100%; margin: 10px auto"
      :default-sort="{ prop: 'ContractID.value', order: 'ascending' }"
      highlight-current-row
    >
      <el-table-column
        prop="ContractID.value"
        label="合同编号"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="OrderID.value"
        label="订单编号"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="HouseID.value"
        label="房源编号"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="UserID.value"
        label="租客ID"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name.value"
        label="租客姓名"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="money.value"
        label="月租金"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="address.value"
        label="房源地址"
        align="center"
      >
      </el-table-column>
      <el-table-column label="合同操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-download" size="mini" @click="ContractVi=true,CheckC(scope.row)" >查看合同</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteContract(scope.row)">删除合同</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="prev, pager, next, jumper"
      :total="showData.length > 0 ? showData.length : null"
      style="margin-top: 20px; text-align: center"
    >
    </el-pagination>
    <el-dialog
          title="查看合同"
          :visible.sync="ContractVi"
          width="80%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :append-to-body="true"
          center
        >
    <div>
        <iframe :src="src" style="width: 100%;height: 100vh" ></iframe>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Managed_Complain",
  data() {
    return {
      url:'',
      src:'',
      searchValue: "",
      ContractVi: false,
      currentPage: 1,
      pageSize: 8,
      tableData: [
         {
          ContractID:{
            key: "合同编号",
            value: "xd9999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "xd999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "8888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "1234",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "陈小虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "长租3年",
            visible: false,
          },
          PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        }, {
          ContractID:{
            key: "合同编号",
            value: "xd19999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "xd2999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "8888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "2345",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "陈虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "短租3年",
            visible: false,
          }, PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        }, {
          ContractID:{
            key: "合同编号",
            value: "xd129999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "xd123999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "3468888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "12313",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "是小虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "长租3年",
            visible: false,
          }, PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        }, {
          ContractID:{
            key: "合同编号",
            value: "xs9999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "xs999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "s8888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "990221",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "长租3年",
            visible: false,
          }, PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        }, {
          ContractID:{
            key: "合同编号",
            value: "x2d129999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "x3d999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "sd8888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "31453",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "胡小虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "长租2年",
            visible: false,
          }, PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        }, {
          ContractID:{
            key: "合同编号",
            value: "xdsada9999",
            visible: false,
          },
          OrderID:{
            key: "订单编号",
            value: "xdxc999999",
            visible: false,
          },
          HouseID: {
            key: "房源ID",
            value: "xcs8888888",
            visible: false,
          },
          UserID: {
            key: "租客ID",
            value: "eqw222",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "八小虎",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "2500",
            visible: false,
          },
          time: {
            key: "租期",
            value: "长租3年",
            visible: false,
          }, PDFurl: {
            key: "pdf链接",
            value: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            visible: false,
          },
        },

      ],
      showData: [],
      filterTableData: [],
    };
  },
  mounted() {
            this.getUrl();
        },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });
    this.showData = this.tableData;
  },
  methods: {
    getUrl:function () {
                this.src = '/pdfjs-2.14.305-legacy-dist/web/viewer.html?file=' + this.url
            },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    doFilter() {
      var k = this.searchValue;
      if (k) {
        this.filterTableData = [];
        this.filterTableData = this.tableData.filter((item) => {
          return (
            item.UserID.value
              .toUpperCase()
              .indexOf(this.searchValue.toUpperCase()) > -1 ||
            item.ContractID.value.indexOf(this.searchValue) > -1 ||
            item.UserID.value.indexOf(this.searchValue) > -1 ||
            item.address.value.indexOf(this.searchValue) > -1
          );
        });
        // 页面数据改变重新统计数据数量和当前页
        this.currentPage = 1;
        // 渲染表格,根据值
        this.showData = this.filterTableData;
      } else {
        this.showData = this.tableData;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    CheckC(val){
      this.url=val.PDFurl.value;
      this.getUrl();
    },
    DeleteContract(val)
    {
      this.$confirm("确定删除此合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        this.tableData=this.tableData.filter(o => o.ContractID!=val.ContractID);
        this.showData=this.showData.filter(o => o.ContractID!=val.ContractID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

    }
  },
};
</script>

<style scoped>
.text {
  padding-left: 40px;
  line-height: 25px;
}
.pic {
  height: 300px;
  padding-left: 40px;
}
.pic img {
  height: 100%;
  width: 50%;
}
</style>