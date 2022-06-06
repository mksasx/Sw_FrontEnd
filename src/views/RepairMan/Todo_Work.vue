<template>
  <div>
    <el-table
      ref="table"
      size="small"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 100%; margin: 0px auto"
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
      <el-table-column label="回复租客" width="150" align="center">
        <template slot-scope="scope"><el-button type="text" @click="jump(),user_workinfo(scope.row)">回复租客</el-button></template>
      </el-table-column>
      <el-table-column label="查看详情" width="150" align="center">
        <!-- <template slot-scope="scope">
              <el-button type="text" @click="toogleExpand(scope.row)">{{scope.row.expansion? '收起' : '查看报修/投诉详情'}}</el-button>
            </template> -->
      <template slot-scope="scope"><el-button type="text" @click="jump2(),user_workinfo(scope.row)">查看报修/投诉详情</el-button></template>
      </el-table-column>
      <!-- <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <el-form label-position="top"  class="demo-table-expand">
                 <el-form-item label="报修/投诉详细内容">
                    <div class="text">{{ props.row.Question.value }}</div>
                 </el-form-item>
                 <el-form-item label="报修/投诉具体图片">
                    <div class="pic"><img :src="props.row.Img.value"></div>
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
      style="margin-top: 40px; text-align: center"
    >
    </el-pagination>
  </div>
</template>
<script>
import qs from "qs"
export default {
  name: "Todo_Work",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      user: JSON.parse(sessionStorage.getItem("user")),
      tableData: [],
    };
  },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });
  },
  methods: {
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
    jump() {
      window.location.href = "RepairMan_Connection";
    },
    jump2() {
      window.location.href = "RepairMan_info_complain";
    },
    getworkinfo() {
      console.log(sessionStorage.getItem("user"));
      console.log(this.user.userId);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/RepairMan_SelfInfo/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 3,
          user_id: this.user.userId,
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
            // Question: {
            //   key: "详细内容",
            //   value: "",
            //   visible: false,
            // },
            // Img: {
            //   key: "报修图片",
            //   value: require("../../assets/workinfo/1.webp"),
            //   visible: false,
            // },
            // Comment: {
            //   key: "租客评价",
            //   value: "",
            //   visible: false,
            // },
            // Rate: {
            //   key: "评分",
            //   value: "",
            //   visible: false,
            // },
          };
          tmp.date.value = item.Datetime;
          tmp.WorkID.value = item.WorkID;
          tmp.HouseID.value = item.HouseID;
          tmp.phoneNum.value = item.Phone;
          tmp.address.value = item.Address;
          tmp.UserID.value = item.UserID;
          tmp.name.value = item.Username;
          // tmp.Question.value = item.Description;
          // tmp.Comment.value = item.Comment;
          console.log(tmp);
          this.tableData.push(tmp);
        });
      });
    },
    user_workinfo(row)
    {
      var user_work={userId:this.user.userId,workId:row.WorkID.value};
      console.log(user_work);
      this.$store.dispatch("saveuser_workInfo",user_work);
    }
  },
  mounted(){
    this.getworkinfo();
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
.el-main {
  overflow: visible;
}
</style>