<template>
  <div>
    <el-col :span="8" style="padding-bottom: 10px">
      <el-input
        v-model="searchValue"
        size="small"
        clearable
        placeholder="请输入工单相关信息进行搜索"
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
      :default-sort="{ prop: 'date', order: 'ascending' }"
      highlight-current-row
    >
      <el-table-column
        prop="date.value"
        label="日期"
        width="90"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="WorkID.value"
        label="工单号"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="HouseID.value"
        label="房源号"
        width="90"
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
      <el-table-column prop="address.value" label="房源地址" align="center">
      </el-table-column>
      <el-table-column label="分配师傅" width="80" align="center">
        <template slot-scope="scope"><el-button type="text" @click="selectWorkerDialogVi = true,selectedworkid(scope.row)"
          >分配师傅</el-button
        ></template>
      </el-table-column>
      <!-- 现在点击取消清除还不会，需要接着写 -->
      <el-dialog
        title="分配师傅"
        :visible.sync="selectWorkerDialogVi"
        width="30%"
        center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :append-to-body="true"
      >
        <el-select
          v-model="workerId"
          clearable
          multiple
          filterable
          @change="nowselect"
          :filter-method="workerFilter"
          placeholder="请选择当前空闲的师傅,支持搜索"
          style="width: 100%"
        >
          <el-option
            v-for="item in filterWorkers"
            :key="item.workerId"
            :label="item.workerName"
            :value="item.workerId"
          >
            <span style="float: left">{{ item.workerId }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.workerName
            }}</span>
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectWorkerDialogVi = false">取 消</el-button>
          <el-button
            type="primary"
            @click="(selectWorkerDialogVi = false), selectWorker()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-table-column label="回复租客" width="80" align="center">
        <!-- <el-button type="text" @click="replyDialogVi = true">回复租客</el-button> -->
        <template slot-scope="scope"><el-button type="text" @click="jump(),user_workinfo(scope.row)">回复租客</el-button></template>
      </el-table-column>
      <!-- <el-form
        ref="form"
        :model="form"
        class="form"
        hide-required-asterisk="true"
        @submit.native.prevent
      >
        <el-dialog
          title="回复申诉租客"
          :visible.sync="replyDialogVi"
          width="30%"
          center
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :append-to-body="true"
          @close="resetForm('form')"
        >
          <el-form-item
            prop="replyText"
            :rules="[{ required: true, message: '回复内容不能为空' }]"
          > -->
            <!-- 另一种加label的方式 -->
            <!-- <span slot="label">
              <span style="color: black" class="txt"
                >请在下方框内输入回复租客的内容：</span
              >
            </span>
            <el-input
              v-model="form.replyText"
              placeholder="在此输入回复内容"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-form-item>
              <el-button @click="(replyDialogVi = false), resetForm('form')"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="medium"
                @click="submitReply(), resetForm('form')"
                >确认</el-button
              >
            </el-form-item>
          </span>
        </el-dialog>
      </el-form> -->
      <el-table-column label="查看详情" width="120" align="center">
        <!-- <template slot-scope="scope"> -->
        <!-- <el-button type="text" @click="toogleExpand(scope.row)">{{
            scope.row.expansion ? "收起" : "查看申诉详情"
          }}</el-button> -->
        <template slot-scope="scope"><el-button type="text" @click="jump2(),user_workinfo(scope.row)">查看申诉详情</el-button></template>
        <!-- </template> -->
      </el-table-column>
      <!-- <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <el-form label-position="top" class="demo-table-expand">
            <el-form-item label="申诉详细内容">
              <div class="text">{{ props.row.Question.value }}</div>
            </el-form-item>
            <el-form-item label="申诉具体图片">
              <div class="pic"><img :src="props.row.Img.value" /></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
import qs from "qs"
export default {
  name: "Manage_Complain",
  inject: ["reload"],
  data() {
    return {
      searchValue: "",
      selectWorkerDialogVi: false,
      replyDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      selectworkid:"",
      tableData: [],
      showData: [],
      filterTableData: [],
      filterWorkers: [],
      selectWorkersArr: [],
      Workers: [],
      workerId: "",
      // form: {
      //   replyText: "",
      // },
    };
  },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });

  },
  methods: {
    selectedworkid(row)
    {
      this.selectworkid=row.WorkID.value;
      console.log(this.selectworkid)
    },
    nowselect(val)
    {
      // val=JSON.parse(JSON.stringify(val));
      // console.log(val);
      // console.log(Object.prototype.toString.call(val));
      this.selectWorkersArr=val;
      // var k=JSON.parse(JSON.stringify(this.selectWorkersArr));
      // console.log(k);
      // console.log(Object.prototype.toString.call(k));
    },
    selectWorker(){
      var k= this.selectWorkersArr;
      // var k=JSON.parse(JSON.stringify(this.selectWorkersArr));
      console.log(k);
      console.log(Object.prototype.toString.call(k));
      var s="";
      s=k.join(" ");
      console.log(s);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Manage_Complain/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 11,
          work_id:this.selectworkid,
          worker_id_list: s,
        }),
      }).then((res) => {
        console.log(res);
        if(res.data.errornumber==0)
        {
          this.$message.success("分配师傅成功");
        }
        this.reload();
      });
    },
    // getLabel(workerID) {
    //   console.log(workerID);
    //   this.selectWorkersArr.push(workerID);
    // },
    // selectWorker() {
    //   console.log(this.selectWorkersArr);
    // },
    // reset(){
    //   this.
    // }
    getworker() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Manage_Complain/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 10,
        }),
      }).then((res) => {
        console.log(res);
        res.data.worker_list.forEach((item) => {
          var tmp = {
          workerId: "",
          workerName: "",
        };
          tmp.workerId = item.id;
          tmp.workerName = item.name;
          console.log(tmp);
          this.Workers.push(tmp);
        });
      });
    },
    getworkinfo() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Manage_Complain/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 6,
        }),
      }).then((res) => {
        console.log(res);
        res.data.worklist.forEach((item) => {
          var tmp = {
          date: {
            key: "日期",
            value: "",
            visible: false,
          },
          WorkID: {
            key: "工单号",
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
          address: {
            key: "租客地址",
            value: "",
            visible: false,
          },
        };
          tmp.date.value = item.Datetime;
          tmp.WorkID.value = item.WorkID;
          tmp.HouseID.value = item.HouseID;
          tmp.phoneNum.value = item.Phone;
          tmp.address.value = item.Address;
          tmp.UserID.value = item.UserID;
          tmp.name.value = item.Username;
          console.log(tmp);
          this.tableData.push(tmp);
        });
        this.filterWorkers = this.Workers;
      });
    },
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.tableData.map((item) => {
        if (row.WorkID != item.WorkID) {
          $table.toggleRowExpansion(item, false);
          item.expansion = false;
        }
      });
      row.expansion = !row.expansion;
      $table.toggleRowExpansion(row);
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
          url: "http://localhost:8000/Manage_Complain/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 13,
            id: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该申诉");
            return;
          } else {
            console.log(res);
            this.tableData.splice(0);
            var tmp = {
                date: {
                  key: "日期",
                  value: "",
                  visible: false,
                },
                WorkID: {
                  key: "工单号",
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
                address: {
                  key: "租客地址",
                  value: "",
                  visible: false,
                },
              };
              tmp.date.value = res.data.Datetime;
              tmp.WorkID.value = res.data.WorkID;
              tmp.HouseID.value = res.data.HouseID;
              tmp.phoneNum.value = res.data.Phone;
              tmp.address.value = res.data.Address;
              tmp.UserID.value = res.data.UserID;
              tmp.name.value = res.data.Username;
            console.log(tmp);
            this.tableData.push(tmp);
          }
        });
      } else {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8000/Manage_Complain/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 9,
            name: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该⼯单");
            return;
          } else {
            this.tableData.splice(0);
            res.data.worklist.forEach((item) => {
              var tmp = {
                date: {
                  key: "日期",
                  value: "",
                  visible: false,
                },
                WorkID: {
                  key: "工单号",
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
                address: {
                  key: "租客地址",
                  value: "",
                  visible: false,
                },
              };
              tmp.date.value = item.Datetime;
              tmp.WorkID.value = item.WorkID;
              tmp.HouseID.value = item.HouseID;
              tmp.phoneNum.value = item.Phone;
              tmp.address.value = item.Address;
              tmp.UserID.value = item.UserID;
              tmp.name.value = item.Username;
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
    //         item.WorkID.value
    //           .toUpperCase()
    //           .indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.HouseID.value
    //           .toUpperCase()
    //           .indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.address.value.indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.name.value.indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.UserID.value.indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.phoneNum.value.indexOf(this.searchValue.toUpperCase()) > -1
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
    workerFilter(val) {
      if (val) {
        this.filterWorkers = [];
        // let originalData = JSON.parse(JSON.stringify(this.Workers));
        this.filterWorkers = this.Workers.filter((item) => {
          return (
            (item.workerId+"").toUpperCase().indexOf(val.toUpperCase()) > -1 ||
            item.workerName.indexOf(val) > -1
          );
        });
      } else {
        this.filterWorkers = this.Workers;
      }
    },
    // submitReply() {
    //   this.replyDialogVi = false;
    //   console.log(this.form.replyText);
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    user_workinfo(row) {
      var user_work = { userId: row.UserID.value, workId: row.WorkID.value };
      console.log(user_work);
      this.$store.dispatch("saveuser_workInfo", user_work);
    },
    jump() {
      window.location.href = "Commander_Connection";
    },
    jump2() {
      window.location.href = "Commander_info_complain";
    },
  },
  mounted:function(){
    this.getworkinfo();
    this.getworker();
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 1;
}
.demo-table-expand label {
  margin-left: 20px;
  width: 130px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form--label-top .el-form-item__label {
  padding-bottom: 0px;
}
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
.txt {
  font-size: 17px;
  margin: 0 auto;
}
</style>