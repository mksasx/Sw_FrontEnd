<template>
  <div>
    <el-col :span="8" style="padding-bottom: 10px ">
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
    <el-button type="primary" size="small" @click="doFilter" style="margin-left:100px"
      >搜索</el-button>
    <el-button type="primary" size="small" @click="AddWorkerDialogVi = true"
      >新增</el-button>
    <el-table
      ref="table"
      size="small"
      :data="
        showData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 70%; margin: 10px auto"
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
        prop="phoneNum.value"
        label="师傅联系电话"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="livecity.value"
        label="师傅所在地"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="small" @click="DeleteWorker(scope.row)">删除师傅</el-button>
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
        label-width= auto
        @submit.native.prevent
      >
          <el-form-item
            prop="Worker_Change_id"
            :rules="[{ required: true, message: '师傅ID号不能为空',trigger: 'blur' }]"
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
            :rules="[{ required: true, message: '师傅名称不能为空',trigger: 'blur' }]"
            label="师傅名称："
          >
           <el-input
              v-model="form.Worker_Change_name"
              placeholder="请输入师傅名称"
              suffix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="Worker_Change_phoneNum"
            :rules="[{ required: true, message: '电话号码不能为空',trigger: 'blur' }]"
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
            :rules="[{ required: true, message: '所在城市不能为空',trigger: 'blur' }]"
            label="所在城市："
          >
           <el-input
              v-model="form.Worker_Change_livecity"
              placeholder="请输入新的所在城市"
              suffix-icon="el-icon-location-outline"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button
                @click="(AddWorkerDialogVi = false), resetForm('form')"
                >取消</el-button>
              <el-button
                type="primary"
                size="medium"
                @click="AddWorker()"
                >提交</el-button>
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
      AddWorkerDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      tmp:null,

      form: {
        Worker_Change_name: "",
        Worker_Change_livecity: "",
        Worker_Change_id: "",
        Worker_Change_phoneNum: "",
      },
      tableData: [
        {
          WorkerID: {
            key: "师傅ID",
            value: "8888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "18888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "12613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "28888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "38888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "48888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "58888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "68888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "78888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
            visible: false,
          },
        },{
          WorkerID: {
            key: "师傅ID",
            value: "88888888",
            visible: false,
          },
          phoneNum: {
            key: "联系电话",
            value: "13613677455",
            visible: false,
          },
          name: {
            key: "师傅姓名",
            value: "陈小虎",
            visible: false,
          },
          livecity: {
            key: "师傅所在地",
            value: "上海市",
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
            item.WorkerID.value
              .toUpperCase()
              .indexOf(this.searchValue.toUpperCase()) > -1 ||
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
    saveInfo(val)
    {
      this.tmp=val;
      console.log(this.tmp);
    },
    DeleteWorker(val)
    {
      this.$confirm("确定删除此师傅, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        this.tableData=this.tableData.filter(o => o.WorkerID!=val.WorkerID);
        this.showData=this.showData.filter(o => o.WorkerID!=val.WorkerID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    AddWorker(){
        var newob={
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
        if(this.form.Worker_Change_id==''||this.form.Worker_Change_phoneNum==''||this.form.Worker_Change_livecity==''||this.form.Worker_Change_name=='')
      {
        this.$message.warning("请检查您的输入");
        return;
      }
        if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.Worker_Change_phoneNum))
      {
               this.$message.warning("请检查手机号码格式");
               return;
      }
      for(var i=0;i<this.tableData.length;i++)
      {
          if(this.tableData[i].WorkerID.value == this.form.Worker_Change_id)
          {
               this.$message.warning("师傅ID不能重复");
               return;
          }
      }
        newob.WorkerID.value=this.form.Worker_Change_id;
        newob.phoneNum.value=this.form.Worker_Change_phoneNum;
        newob.livecity.value=this.form.Worker_Change_livecity;
        newob.name.value=this.form.Worker_Change_name;
        this.AddWorkerDialogVi = false;
        this.tableData.unshift(newob);
        // this.showData.push(this.new);
        this.resetForm('form');
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
.top{
    padding-left:390px;
}
</style>