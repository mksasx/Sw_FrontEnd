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
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
      <el-table-column prop="address.value" label="房源地址" align="center">
      </el-table-column>
      <el-table-column label="合同操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-download"
            size="mini"
            @click="(ContractVi = true), CheckC(scope.row)"
            >查看合同</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DeleteContract(scope.row)"
            >删除合同</el-button
          >
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
      :total="tableData.length > 0 ? tableData.length : null"
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
        <iframe :src="src" style="width: 100%; height: 100vh"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
// 本地pdf需要放到pdfjs的web文件夹下
export default {
  name: "Managed_Complain",
  inject: ["reload"],
  data() {
    return {
      url: "",
      src: "",
      searchValue: "",
      ContractVi: false,
      currentPage: 1,
      pageSize: 8,
      tableData: [],
      showData: [],
      filterTableData: [],
    };
  },
  // mounted() {
  //   this.getUrl();
  // },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });
    this.showData = this.tableData;
  },
  methods: {
    getUrl: function () {
      this.src = "/pdfjs-2.14.305-legacy-dist/web/viewer.html?file=" + this.url;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    getinfo() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8090/Manage_Contract/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 8,
        }),
      }).then((res) => {
        console.log(res);
        res.data.contract_list.forEach((item) => {
          var tmp = {
            ContractID: {
              key: "合同编号",
              value: "",
              visible: false,
            },
            OrderID: {
              key: "订单编号",
              value: "",
              visible: false,
            },
            HouseID: {
              key: "房源ID",
              value: "",
              visible: false,
            },
            UserID: {
              key: "租客ID",
              value: "",
              visible: false,
            },
            name: {
              key: "租客姓名",
              value: "",
              visible: false,
            },
            address: {
              key: "房源地址",
              value: "",
              visible: false,
            },
            money: {
              key: "月租金",
              value: "",
              visible: false,
            },
            PDFurl: {
              key: "pdf链接",
              value: "",
              visible: false,
            },
          };
          tmp.ContractID.value = item.contract_id;
          tmp.OrderID.value = item.order_id;
          tmp.HouseID.value = item.house_id;
          tmp.PDFurl.value = item.path;
          tmp.address.value = item.address;
          tmp.UserID.value = item.user_id;
          tmp.name.value = item.user_name;
          tmp.money.value = item.rent;
          console.log(tmp);
          this.tableData.push(tmp);
        });
      });
    },
    doFilter() {
      if (/^[0-9]*$/.exec(this.searchValue) && this.searchValue != "") {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8090/Manage_Contract/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 12,
            id: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该合同");
            return;
          } else {
            console.log(res);
            this.tableData.splice(0);
            var tmp = {
              ContractID: {
                key: "合同编号",
                value: "",
                visible: false,
              },
              OrderID: {
                key: "订单编号",
                value: "",
                visible: false,
              },
              HouseID: {
                key: "房源ID",
                value: "",
                visible: false,
              },
              UserID: {
                key: "租客ID",
                value: "",
                visible: false,
              },
              name: {
                key: "租客姓名",
                value: "",
                visible: false,
              },
              address: {
                key: "房源地址",
                value: "",
                visible: false,
              },
              money: {
                key: "月租金",
                value: "",
                visible: false,
              },
              PDFurl: {
                key: "pdf链接",
                value: "",
                visible: false,
              },
            };
            tmp.ContractID.value = res.data.contract_id;
            tmp.OrderID.value = res.data.order_id;
            tmp.HouseID.value = res.data.house_id;
            tmp.PDFurl.value = res.data.path;
            tmp.address.value = res.data.address;
            tmp.UserID.value = res.data.user_id;
            tmp.name.value = res.data.user_name;
            tmp.money.value = res.data.rent;
            console.log(tmp);
            this.tableData.push(tmp);
          }
        });
      } else {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8090/Manage_Contract/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 9,
            name: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该合同");
            return;
          } else {
            this.tableData.splice(0);
            res.data.contract_list.forEach((item) => {
              var tmp = {
                ContractID: {
                  key: "合同编号",
                  value: "",
                  visible: false,
                },
                OrderID: {
                  key: "订单编号",
                  value: "",
                  visible: false,
                },
                HouseID: {
                  key: "房源ID",
                  value: "",
                  visible: false,
                },
                UserID: {
                  key: "租客ID",
                  value: "",
                  visible: false,
                },
                name: {
                  key: "租客姓名",
                  value: "",
                  visible: false,
                },
                address: {
                  key: "房源地址",
                  value: "",
                  visible: false,
                },
                money: {
                  key: "月租金",
                  value: "",
                  visible: false,
                },
                PDFurl: {
                  key: "pdf链接",
                  value: "",
                  visible: false,
                },
              };
              tmp.ContractID.value = item.contract_id;
              tmp.OrderID.value = item.order_id;
              tmp.HouseID.value = item.house_id;
              tmp.PDFurl.value = item.path;
              tmp.address.value = item.address;
              tmp.UserID.value = item.user_id;
              tmp.name.value = item.user_name;
              tmp.money.value = item.rent;
              console.log(tmp);
              this.tableData.push(tmp);
            });
          }
        });
      }
    },
    // doFilter() {
    //   var k = this.searchValue;
    //   if (k) {
    //     this.filterTableData = [];
    //     this.filterTableData = this.tableData.filter((item) => {
    //       return (
    //         item.UserID.value
    //           .toUpperCase()
    //           .indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.ContractID.value.indexOf(this.searchValue) > -1 ||
    //         item.UserID.value.indexOf(this.searchValue) > -1 ||
    //         item.address.value.indexOf(this.searchValue) > -1
    //       );
    //     });
    //     // 页面数据改变重新统计数据数量和当前页
    //     this.currentPage = 1;
    //     // 渲染表格,根据值
    //     this.showData = this.filterTableData;
    //   } else {
    //     this.showData = this.tableData;
    //   }
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    CheckC(val) {
      this.url = val.PDFurl.value;
      this.getUrl();
    },
    DeleteContract(val) {
      this.$confirm("确定删除此合同信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            method: "post" /* 指明请求方式，可以是 get 或 post */,
            url: "http://localhost:8090/Manage_Contract/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
              function_id: 11,
              contract_id: val.ContractID.value,
            }),
          }).then((res) => {
            console.log(res.data.errornumber);
            switch (res.data.errornumber) {
              case 0:
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                break;
              case 1:
                this.$message({
                  type: "warning",
                  message: "删除失败!",
                });
                break;
            }
            this.reload();
          });
          // this.tableData = this.tableData.filter((o) => o.UserID != val.UserID);
          // this.showData = this.showData.filter((o) => o.UserID != val.UserID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // DeleteContract(val) {
    //   this.$confirm("确定删除此合同, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //       this.tableData = this.tableData.filter(
    //         (o) => o.ContractID != val.ContractID
    //       );
    //       this.showData = this.showData.filter(
    //         (o) => o.ContractID != val.ContractID
    //       );
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  },
  mounted: function () {
    this.getinfo();
    this.getUrl();
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