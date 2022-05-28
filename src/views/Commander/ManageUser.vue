<template>
  <div>
    <el-col :span="8" style="padding-bottom: 10px">
      <el-input
        v-model="searchValue"
        size="small"
        clearable
        placeholder="请输入租客相关信息进行搜索"
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
        prop="livecity.value"
        label="租客所在地"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="liveplace.value"
        label="租客联系地址"
        align="center"
      >
      </el-table-column>
      <el-table-column label="修改租客资料" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="ChangeUserInfoDialogVi = true,saveInfo(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="DeleteUserInfo(scope.row)"></el-button>
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
        label-width= auto
        @submit.native.prevent
      >
          <el-form-item
            prop="User_Change_name"
            :rules="[{ required: true, message: '用户名称不能为空',trigger: 'blur' }]"
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
            :rules="[{ required: true, message: '电话号码不能为空',trigger: 'blur' }]"
            label="电话号码："
          >
           <el-input
              v-model="form.User_Change_phoneNum"
              placeholder="请输入新的电话号码"
              suffix-icon="el-icon-phone"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="User_Change_livecity"
            :rules="[{ required: true, message: '所在城市不能为空',trigger: 'blur' }]"
            label="所在城市："
          >
           <el-input
              v-model="form.User_Change_livecity"
              placeholder="请输入新的所在城市"
              suffix-icon="el-icon-location-outline"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="User_Change_liveplace"
            :rules="[{ required: true, message: '居住地点不能为空',trigger: 'blur' }]"
            label="居住地点："
          >
           <el-input
              v-model="form.User_Change_liveplace"
              placeholder="请输入新的居住地点"
              suffix-icon="el-icon-office-building"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button
                @click="(ChangeUserInfoDialogVi = false), resetForm('form')"
                >取消更改</el-button
              >
              <el-button
                type="primary"
                size="medium"
                @click="ChangeUserInfo()"
                >确认更改</el-button
              >
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Managed_Complain",
  data() {
    return {
      searchValue: "",
      ChangeUserInfoDialogVi: false,
      selectWorkerDialogVi: false,
      replyDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      tmp:null,
      form: {
        User_Change_name: "",
        User_Change_livecity: "",
        User_Change_liveplace: "",
        User_Change_phoneNum: "",
      },
      tableData: [
        {
          UserID: {
            key: "租客ID",
            value: "8888888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "1288888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "1388888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "14888888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "14588888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "1688888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "1788888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "1888888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
        {
          UserID: {
            key: "租客ID",
            value: "2488888",
            visible: false,
          },
          phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "租客姓名",
            value: "王小虎",
            visible: false,
          },
          livecity: {
            key: "租客居住城市",
            value: "上海市",
            visible: false,
          },
          liveplace: {
            key: "租客地址",
            value: "上海市普陀区金沙江路 1518 弄大所多",
            visible: false,
          },
        },
      ],
      showData: [],
      filterTableData: [],
    };
  },
  created() {
    let tableData = this.tableData;
    tableData.map((item) => {
      item.expansion = false;
    });
    this.showData = this.tableData;
  },
  methods: {
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
            item.liveplace.value.indexOf(this.searchValue) > -1 ||
            item.name.value.indexOf(this.searchValue) > -1 ||
            item.livecity.value.indexOf(this.searchValue) > -1
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
    ChangeUserInfo()
    {
      if(this.form.User_Change_name==''||this.form.User_Change_phoneNum==''||this.form.User_Change_livecity==''||this.form.User_Change_liveplace=='')
      {
        this.$message.warning("请检查您的输入");
        return;
      }
      if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.User_Change_phoneNum))
      {
               this.$message.warning("请检查手机号码格式");
               return;
      }
      var tmp1=null;
      tmp1=this.tmp;
      this.showData.filter(o=>o.UserID===tmp1.UserID)[0].name.value=this.form.User_Change_name;
      this.showData.filter(o=>o.UserID===tmp1.UserID)[0].phoneNum.value=this.form.User_Change_phoneNum;
      this.showData.filter(o=>o.UserID===tmp1.UserID)[0].livecity.value=this.form.User_Change_livecity;
      this.showData.filter(o=>o.UserID===tmp1.UserID)[0].liveplace.value=this.form.User_Change_liveplace;
      this.tableData.filter(o=>o.UserID===tmp1.UserID)[0].name.value=this.form.User_Change_name;
      this.tableData.filter(o=>o.UserID===tmp1.UserID)[0].phoneNum.value=this.form.User_Change_phoneNum;
      this.tableData.filter(o=>o.UserID===tmp1.UserID)[0].livecity.value=this.form.User_Change_livecity;
      this.tableData.filter(o=>o.UserID===tmp1.UserID)[0].liveplace.value=this.form.User_Change_liveplace;
      this.ChangeUserInfoDialogVi = false;
      this.resetForm('form');
    },
    saveInfo(val)
    {
      this.tmp=val;
      console.log(this.tmp);
    },
    DeleteUserInfo(val)
    {
      this.$confirm("确定删除此用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        this.tableData=this.tableData.filter(o => o.UserID!=val.UserID);
        this.showData=this.showData.filter(o => o.UserID!=val.UserID);
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
.el-main{
  overflow:visible;
}
</style>