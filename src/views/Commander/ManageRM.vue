<template>
  <div>
    <el-col :span="6" style="padding-bottom: 10px">
      <el-input
        class="top"
        v-model="searchValue"
        size="small"
        clearable
        placeholder="请输入师傅相关信息进行搜索"
        suffix-icon="el-icon-search"
        @keyup.enter.native="doFilter"
      ></el-input>
    </el-col>
    <el-button type="primary" size="small" @click="doFilter">搜索</el-button>
    <el-button type="primary" size="small" @click="AddWorkerDialogVi = true"
      >新增</el-button
    >
    <el-table
      ref="table"
      size="small"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 50%; margin: 20px auto"
      :default-sort="{ prop: 'WorkerID.value', order: 'ascending' }"
      highlight-current-row
    >
      <el-table-column
        prop="WorkerID.value"
        label="师傅ID"
        width="90"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="name.value"
        label="师傅姓名"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="email.value"
        label="师傅登录邮箱"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNum.value"
        label="师傅联系电话"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="livecity.value" label="师傅所在地" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="DeleteWorker(scope.row)"
            >删除师傅</el-button
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
      title="新增师傅"
      :visible.sync="AddWorkerDialogVi"
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
          prop="Worker_Change_id"
          :rules="[
            { required: true, message: '师傅ID号不能为空', trigger: 'blur' },
          ]"
          label="师傅ID："
        >
          <el-input
            v-model="form.Worker_Change_id"
            placeholder="请输入师傅ID"
            suffix-icon="el-icon-bank-card"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="Worker_Change_name"
          :rules="[
            { required: true, message: '师傅名称不能为空', trigger: 'blur' },
          ]"
          label="师傅名称："
        >
          <el-input
            v-model="form.Worker_Change_name"
            placeholder="请输入师傅名称"
            suffix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="Worker_Change_email"
          :rules="[
            { required: true, message: '师傅邮箱号不能为空', trigger: 'blur' },
          ]"
          label="师傅邮箱："
        >
          <el-input
            v-model="form.Worker_Change_email"
            placeholder="请输入师傅邮箱"
            suffix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="Worker_Change_password"
          :rules="[
            { required: true, message: '师傅密码不能为空', trigger: 'blur' },
          ]"
          label="师傅密码："
        >
          <el-input
            v-model="form.Worker_Change_password"
            placeholder="请输入师傅密码"
            suffix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="Worker_Change_phoneNum"
          :rules="[
            { required: true, message: '电话号码不能为空', trigger: 'blur' },
          ]"
          label="电话号码："
        >
          <el-input
            v-model="form.Worker_Change_phoneNum"
            placeholder="请输入电话号码"
            suffix-icon="el-icon-phone"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="Worker_Change_livecity"
          :rules="[
            { required: true, message: '所在城市不能为空', trigger: 'blur' },
          ]"
          label="所在城市："
        >
          <el-input
            v-model="form.Worker_Change_livecity"
            placeholder="请输入所在城市"
            suffix-icon="el-icon-location-outline"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(AddWorkerDialogVi = false), resetForm('form')"
          >取消</el-button
        >
        <el-button type="primary" size="medium" @click="AddWorker()"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs"
export default {
  name: "Managed_Complain",
  inject: ["reload"],
  data() {
    return {
      searchValue: "",
      AddWorkerDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      tmp: null,
      form: {
        Worker_Change_name: "",
        Worker_Change_livecity: "",
        Worker_Change_id: "",
        Worker_Change_phoneNum: "",
        Worker_Change_email: "",
        Worker_Change_password: "",
      },
      tableData: [],
      showData: [],
      filterTableData: [],
      num:[],
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
        url: "http://localhost:8090/Manage_RM/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 4,
        }),
      }).then((res) => {
        console.log(res);
        res.data.worker_list.forEach((item) => {
            var temp = {
              WorkerID: {
                key: "师傅ID",
                value: "",
                visible: false,
              },
              phoneNum: {
                key: "联系电话",
                value: "",
                visible: false,
              },
              email: {
                key: "联系邮箱",
                value: "",
                visible: false,
              },
              name: {
                key: "师傅姓名",
                value: "",
                visible: false,
              },
              livecity: {
                key: "师傅所在地",
                value: "",
                visible: false,
              },
            };
            temp.phoneNum.value = item.phone;
            temp.livecity.value = item.city;
            temp.WorkerID.value = item.id;
            temp.name.value = item.name;
            temp.email.value = item.email;
            console.log(temp);
            this.tableData.push(temp);
            this.num.push(temp.WorkerID.value);
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
          url: "http://localhost:8090/Manage_RM/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
              WorkerID: {
                key: "师傅ID",
                value: "",
                visible: false,
              },
              phoneNum: {
                key: "联系电话",
                value: "",
                visible: false,
              },
              email: {
                key: "联系邮箱",
                value: "",
                visible: false,
              },
              name: {
                key: "师傅姓名",
                value: "",
                visible: false,
              },
              livecity: {
                key: "师傅所在地",
                value: "",
                visible: false,
              },
            };
            temp.phoneNum.value = res.data.phone;
            temp.livecity.value = res.data.place;
            temp.WorkerID.value = res.data.workerID;
            temp.name.value = res.data.workername;
            temp.email.value = res.data.email;
            console.log(temp);
            this.tableData.push(temp);
          }
        });
      } else {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8090/Manage_RM/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 9,
            worker_name: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该⽤户");
            return;
          } else {
            console.log(res);
            this.tableData.splice(0);
            res.data.workerlist.forEach((item) => {
              var temp = {
              WorkerID: {
                key: "师傅ID",
                value: "",
                visible: false,
              },
              phoneNum: {
                key: "联系电话",
                value: "",
                visible: false,
              },
              email: {
                key: "联系邮箱",
                value: "",
                visible: false,
              },
              name: {
                key: "师傅姓名",
                value: "",
                visible: false,
              },
              livecity: {
                key: "师傅所在地",
                value: "",
                visible: false,
              },
            };
            temp.phoneNum.value = item.phone;
            temp.livecity.value = item.place;
            temp.WorkerID.value = item.workerID;
            temp.name.value = item.workername;
            temp.email.value = item.email;
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
    //         item.WorkerID.value
    //           .toUpperCase()
    //           .indexOf(this.searchValue.toUpperCase()) > -1 ||
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // saveInfo(val)
    // {
    //   this.tmp=val;
    //   console.log(this.tmp);
    // },
    DeleteWorker(val) {
      this.$confirm("确定删除此师傅, 是否继续?", "提示", {
         confirmButtonText: "确定",
         cancelButtonText: "取消",
         type: "warning",
       })
        .then(() => {
          this.$axios({
            method: "post" /* 指明请求方式，可以是 get 或 post */,
            url: "http://localhost:8090/Manage_RM/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
              function_id: 10,
              worker_id: val.WorkerID.value,
            }),
          }).then((res) => {
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
    AddWorker()
    {
      if (
        this.form.Worker_Change_name == "" ||
        this.form.Worker_Change_livecity == "" ||
        this.form.Worker_Change_id == "" ||
        this.form.Worker_Change_phoneNum == ""||
        this.form.Worker_Change_password == ""
      ) {
        this.$message.warning("请检查您的输入");
        return;
      }
      if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.Worker_Change_phoneNum))
      {
               this.$message.warning("请检查手机号码格式");
               return;
      }
      for(var i=0;i<this.num.length;i++)
      {
          if(this.num[i] == this.form.Worker_Change_id)
          {
               this.$message.warning("师傅ID不能重复");
               return;
          }
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8090/Manage_RM/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 11,
          id: this.form.Worker_Change_id,
          name: this.form.Worker_Change_name,
          phone: this.form.Worker_Change_phoneNum,
          city: this.form.Worker_Change_livecity,
          email: this.form.Worker_Change_email,
          password: this.form.Worker_Change_password,
        }),
      }).then((res) => {
        console.log(res);
        if (res.data.errornumber == 1) {
          this.$message.warning("添加失败");
          return;
        }
        if (res.data.errornumber == 0) {
          this.$message.success("添加成功");
          this.AddWorkerDialogVi = false;
          this.reload();
          return;
        }
      });
    }
    // DeleteWorker(val) {
    //   this.$confirm("确定删除此师傅, 是否继续?", "提示", {
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
    //         (o) => o.WorkerID != val.WorkerID
    //       );
    //       this.showData = this.showData.filter(
    //         (o) => o.WorkerID != val.WorkerID
    //       );
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    // AddWorker(){
    //     var newob={
    //       WorkerID: {
    //         key: "师傅ID",
    //         value: "",
    //         visible: false,
    //       },
    //       phoneNum: {
    //         key: "联系电话",
    //         value: "",
    //         visible: false,
    //       },
    //       name: {
    //         key: "师傅姓名",
    //         value: "",
    //         visible: false,
    //       },
    //       livecity: {
    //         key: "师傅所在地",
    //         value: "",
    //         visible: false,
    //       },
    //     };
    //     if(this.form.Worker_Change_id==''||this.form.Worker_Change_phoneNum==''||this.form.Worker_Change_livecity==''||this.form.Worker_Change_name=='')
    //   {
    //     this.$message.warning("请检查您的输入");
    //     return;
    //   }
    //     if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.Worker_Change_phoneNum))
    //   {
    //            this.$message.warning("请检查手机号码格式");
    //            return;
    //   }
    //   for(var i=0;i<this.tableData.length;i++)
    //   {
    //       if(this.tableData[i].WorkerID.value == this.form.Worker_Change_id)
    //       {
    //            this.$message.warning("师傅ID不能重复");
    //            return;
    //       }
    //   }
    //     newob.WorkerID.value=this.form.Worker_Change_id;
    //     newob.phoneNum.value=this.form.Worker_Change_phoneNum;
    //     newob.livecity.value=this.form.Worker_Change_livecity;
    //     newob.name.value=this.form.Worker_Change_name;
    //     this.AddWorkerDialogVi = false;
    //     this.tableData.unshift(newob);
    //     // this.showData.push(this.new);
    //     this.resetForm('form');
    // }
  },
  mounted:function(){
    this.getinfo();
  }
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
.top {
 position: relative;
  left: 105%;
}
</style>