<template>
  <div>
    <el-col :span="8" style="padding-bottom: 10px">
      <el-input
        class="top"
        v-model="searchValue"
        size="small"
        clearable
        placeholder="请输入租客相关信息进行搜索"
        suffix-icon="el-icon-search"
        @keyup.enter.native="doFilter"
      ></el-input>
    </el-col>
    <el-button type="primary" size="small" @click="doFilter">搜索</el-button>
    <el-table
      ref="table"
      size="small"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 61%; margin: 20px auto"
      :default-sort="{ prop: 'UserID.value', order: 'ascending' }"
      highlight-current-row
    >
      <el-table-column
        prop="UserID.value"
        label="租客ID"
        width="90"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="name.value"
        label="租客姓名"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNum.value"
        label="租客联系电话"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="email.value"
        label="租客登录邮箱"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="password.value"
        label="租客密码"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="livecity.value"
        label="租客所在地"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column label="修改租客资料" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="(ChangeUserInfoDialogVi = true), saveInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="DeleteUserInfo(scope.row)"
          ></el-button>
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
      title="修改租客资料"
      :visible.sync="ChangeUserInfoDialogVi"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      center
      @close="resetForm('form')"
    >
      <el-form
        ref="form"
        :model="form"
        class="form"
        hide-required-asterisk="false"
        label-width="auto"
        @submit.native.prevent
      >
        <el-form-item
          prop="User_Change_name"
          :rules="[
            { required: true, message: '用户名称不能为空', trigger: 'blur' },
          ]"
          label="用户名称："
        >
          <el-input
            v-model="form.User_Change_name"
            placeholder="请输入新的用户名"
            suffix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="User_Change_phoneNum"
          :rules="[
            { required: true, message: '电话号码不能为空', trigger: 'blur' },
          ]"
          label="电话号码："
        >
          <el-input
            v-model="form.User_Change_phoneNum"
            placeholder="请输入新的电话号码"
            suffix-icon="el-icon-phone"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="User_Change_email"
          :rules="[
            { required: true, message: '新的邮箱不能为空', trigger: 'blur' },
          ]"
          label="登录邮箱："
        >
          <el-input
            v-model="form.User_Change_email"
            placeholder="请输入新的登录邮箱"
            suffix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="User_Change_livecity"
          :rules="[
            { required: true, message: '所在城市不能为空', trigger: 'blur' },
          ]"
          label="所在城市："
        >
          <el-input
            v-model="form.User_Change_livecity"
            placeholder="请输入新的所在城市"
            suffix-icon="el-icon-location-outline"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(ChangeUserInfoDialogVi = false), resetForm('form')"
          >取消更改</el-button
        >
        <el-button type="primary" size="medium" @click="ChangeUserInfo()"
          >确认更改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Managed_Complain",
  inject: ["reload"],
  data() {
    return {
      searchValue: "",
      user: JSON.parse(sessionStorage.getItem("user")),
      ChangeUserInfoDialogVi: false,
      selectWorkerDialogVi: false,
      replyDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      tmp: null,
      form: {
        User_Change_name: "",
        User_Change_livecity: "",
        User_Change_phoneNum: "",
        User_Change_email: "",
      },
      tableData: [],
      showData: [],
      filterTableData: [],
    };
  },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });
    // this.getinfo();
    // this.showData = this.tableData;
  },
  methods: {
    getinfo() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8090/Manage_User/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 2,
        }),
      }).then((res) => {
        console.log(res);
        res.data.userlist.forEach((item) => {
          var temp = {
            UserID: {
              key: "租客ID",
              value: "",
              visible: false,
            },
            phoneNum: {
              key: "租客电话",
              value: "",
              visible: false,
            },
            name: {
              key: "租客姓名",
              value: "",
              visible: false,
            },
            email: {
              key: "租客邮箱",
              value: "",
              visible: false,
            },
            password: {
              key: "租客密码",
              value: "",
              visible: false,
            },
            livecity: {
              key: "租客居住城市",
              value: "",
              visible: false,
            },
          };
          temp.password.value = item.Password;
          temp.phoneNum.value = item.Phone;
          temp.livecity.value = item.City;
          temp.UserID.value = item.UserID;
          temp.name.value = item.Username;
          temp.email.value = item.Email;
          console.log(temp);
          this.tableData.push(temp);
        });
      });
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    doFilter() {
      if (/^[0-9]*$/.exec(this.searchValue) && this.searchValue != "") {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8090/Manage_User/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 12,
            id: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该⽤户");
            return;
          } else {
            console.log(res);
            this.tableData.splice(0);
            var temp = {
              UserID: {
                key: "租客ID",
                value: "",
                visible: false,
              },
              phoneNum: {
                key: "租客电话",
                value: "",
                visible: false,
              },
              name: {
                key: "租客姓名",
                value: "",
                visible: false,
              },
              email: {
                key: "租客邮箱",
                value: "",
                visible: false,
              },
              password: {
                key: "租客密码",
                value: "",
                visible: false,
              },
              livecity: {
                key: "租客居住城市",
                value: "",
                visible: false,
              },
            };
            temp.password.value = res.data.Password;
            temp.phoneNum.value = res.data.Phone;
            temp.livecity.value = res.data.City;
            temp.UserID.value = res.data.UserID;
            temp.name.value = res.data.Username;
            temp.email.value = res.data.Email;
            console.log(temp);
            this.tableData.push(temp);
          }
        });
      } else {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8090/Manage_User/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 11,
            user_name: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该⽤户");
            return;
          } else {
            this.tableData.splice(0);
            res.data.userlist.forEach((item) => {
              var temp = {
                UserID: {
                  key: "租客ID",
                  value: "",
                  visible: false,
                },
                phoneNum: {
                  key: "租客电话",
                  value: "",
                  visible: false,
                },
                name: {
                  key: "租客姓名",
                  value: "",
                  visible: false,
                },
                email: {
                  key: "租客邮箱",
                  value: "",
                  visible: false,
                },
                password: {
                  key: "租客密码",
                  value: "",
                  visible: false,
                },
                livecity: {
                  key: "租客居住城市",
                  value: "",
                  visible: false,
                },
              };
              temp.password.value = item.Password;
              temp.phoneNum.value = item.Phone;
              temp.livecity.value = item.City;
              temp.UserID.value = item.UserID;
              temp.name.value = item.Username;
              temp.email.value = item.Email;
              console.log(temp);
              this.tableData.push(temp);
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
    //         // 此处识别id是数字需要转换
    //         (item.UserID.value+'').toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.name.value.indexOf(this.searchValue) > -1 ||
    //         item.livecity.value.indexOf(this.searchValue) > -1
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
    ChangeUserInfo() {
      var tmp1=null;
      tmp1=this.tmp;
      console.log(tmp1);
      if (
        this.form.User_Change_name == "" ||
        this.form.User_Change_phoneNum == "" ||
        this.form.User_Change_livecity == "" ||
        this.form.User_Change_email == ""
      ) {
        this.$message.warning("请检查您的输入");
        return;
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8090/Manage_User/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 9,
          user_id: tmp1.UserID.value,
          name: this.form.User_Change_name,
          phone: this.form.User_Change_phoneNum,
          city: this.form.User_Change_livecity,
          email: this.form.User_Change_email,
        }),
      }).then((res) => {
        console.log(res);
        if (res.data.errornumber == 3) {
          this.$message.warning("⼿机号格式错误,请检查手机号码格式");
          return;
        }
        if (res.data.errornumber == 0) {
          this.$message.success("租客信息更改成功");
          this.ChangeUserInfoDialogVi = false;
          this.reload();
          return;
        }
      });
    },
    // ChangeUserInfo() {
    //   if (
    //     !/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(
    //       this.form.User_Change_phoneNum
    //     )
    //   ) {
    //     this.$message.warning("请检查手机号码格式");
    //     return;
    //   }
    //   var tmp1 = null;
    //   tmp1 = this.tmp;
    //   this.showData.filter((o) => o.UserID === tmp1.UserID)[0].name.value =
    //     this.form.User_Change_name;
    //   this.showData.filter((o) => o.UserID === tmp1.UserID)[0].phoneNum.value =
    //     this.form.User_Change_phoneNum;
    //   this.showData.filter((o) => o.UserID === tmp1.UserID)[0].livecity.value =
    //     this.form.User_Change_livecity;
    //   this.showData.filter((o) => o.UserID === tmp1.UserID)[0].liveplace.value =
    //     this.form.User_Change_liveplace;
    //   this.tableData.filter((o) => o.UserID === tmp1.UserID)[0].name.value =
    //     this.form.User_Change_name;
    //   this.tableData.filter((o) => o.UserID === tmp1.UserID)[0].phoneNum.value =
    //     this.form.User_Change_phoneNum;
    //   this.tableData.filter((o) => o.UserID === tmp1.UserID)[0].livecity.value =
    //     this.form.User_Change_livecity;
    //   this.tableData.filter(
    //     (o) => o.UserID === tmp1.UserID
    //   )[0].liveplace.value = this.form.User_Change_liveplace;
    //   this.ChangeUserInfoDialogVi = false;
    //   this.resetForm("form");
    // },
    saveInfo(val) {
      this.tmp = val;
      console.log(this.tmp);
    },
    DeleteUserInfo(val) {
      this.$confirm("确定删除此用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            method: "post" /* 指明请求方式，可以是 get 或 post */,
            url: "http://localhost:8090/Manage_User/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
              function_id: 10,
              user_id: val.UserID.value,
            }),
          }).then((res) => {
            console.log(val.UserID.value);
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
    // DeleteUserInfo(val) {
    //   this.$confirm("确定删除此用户信息, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //       this.tableData = this.tableData.filter((o) => o.UserID != val.UserID);
    //       this.showData = this.showData.filter((o) => o.UserID != val.UserID);
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
.el-main {
  overflow: visible;
}
.top {
  position: relative;
  left: 85%;
}
</style>