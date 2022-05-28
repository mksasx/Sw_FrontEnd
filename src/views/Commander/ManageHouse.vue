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
    <el-button type="primary" size="small" @click="doFilter" style="float:left"
      >搜索房源</el-button>
      <el-button type="primary" size="small" @click="AddHouseDialogVi = true" style="margin-left:42.5%"
      >新增房源</el-button>
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
        prop="HouseID.value"
        label="房源编号"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Landload.value"
        label="房东姓名"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNum.value"
        label="房东电话"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="money.value"
        label="月租金"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time.value"
        label="租期"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="Type.value"
        label="户型"
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
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-picture" size="mini"  @click="toogleExpand(scope.row)">{{scope.row.expansion? '收起' : '查看图片'}}</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteHouse(scope.row)">下架房源</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
            <template slot-scope="scope">
              <el-form label-position="top"  class="demo-table-expand">
                 <el-form-item label="房源图片">
                    <div class="pic">
                        <el-image v-for="url in scope.row.Img" :key="url.value" :src="url.value" lazy></el-image>
                    </div>
                 </el-form-item>
              </el-form>
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
          title="新增房源"
          :visible.sync="AddHouseDialogVi"
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
            prop="new_HouseID"
            :rules="[{ required: true, message: '房源ID号不能为空',trigger: 'blur' }]"
            label="房源ID："
          >
           <el-input
              v-model="form.new_HouseID"
              placeholder="请输入房源ID"
              suffix-icon="el-icon-bank-card"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="new_Landload"
            :rules="[{ required: true, message: '房东名称不能为空',trigger: 'blur' }]"
            label="房东名称："
          >
           <el-input
              v-model="form.new_Landload"
              placeholder="请输入房东名称"
              suffix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="new_phonenum"
            :rules="[{ required: true, message: '电话号码不能为空',trigger: 'blur' }]"
            label="电话号码："
          >
           <el-input
              v-model="form.new_phonenum"
              placeholder="请输入电话号码"
              suffix-icon="el-icon-phone"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="new_address"
            :rules="[{ required: true, message: '房源地址不能为空',trigger: 'blur' }]"
            label="房源地址："
          >
           <el-input
              v-model="form.new_address"
              placeholder="请输入新的房源地址"
              suffix-icon="el-icon-location-outline"
            ></el-input>
          </el-form-item>
           <el-form-item
            prop="new_Type"
            :rules="[{ required: true, message: '房源类型不能为空',trigger: 'blur' }]"
            label="房源类型："
          >
           <el-input
              v-model="form.new_Type"
              placeholder="请输入新的房源类型"
              suffix-icon="el-icon-warning-outline"
            ></el-input>
          </el-form-item> 
          <el-form-item
            prop="new_money"
            :rules="[{ required: true, message: '每月租金不能为空',trigger: 'blur' }]"
            label="每月租金："
          >
           <el-input
              v-model="form.new_money"
              placeholder="请输入新的房源地址"
              suffix-icon="el-icon-money"
            ></el-input>
          </el-form-item> 
          <el-form-item
            prop="new_time"
            :rules="[{ required: true, message: '租期不能为空',trigger: 'blur' }]"
            label="租期："
          >
           <el-input
              v-model="form.new_time"
              placeholder="请输入新的租期"
              suffix-icon="el-icon-timer"
            ></el-input>
          </el-form-item> 
          <el-form-item
            label="房源图片："
          >
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforeUpload"
                    :on-success="upSuccess"
                    :on-error="upError"
                    :on-remove="upRemve"
                    :file-list="fileList"
                    :multiple="true"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                        只能上传png/jpg格式，且不超过2MB
                    </div>
                </el-upload>
          </el-form-item> 
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button
                @click="(AddHouseDialogVi = false), resetForm('form')"
                >取消</el-button>
              <el-button
                type="primary"
                size="medium"
                @click="AddHouse()"
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
      url:'',
      src:'',
      filelist:[],
      searchValue: "",
      AddHouseDialogVi :false,
      currentPage: 1,
      pageSize: 8,
      form: {
        new_HouseID: "",
        new_Landload: "",
        new_address: "",
        new_money: "",
        new_time: "",
        new_phonenum:"",
        new_Type: "",
        new_pics: "",
      },
      tableData: [
         {
          HouseID: {
            key: "房源ID",
            value: "8888888",
            visible: false,
          },
          Landload: {
            key: "房东姓名",
            value: "陈星",
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
          Type: {
            key: "户型",
            value: "一室一厅",
            visible: false,
          },phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          Img:[{
            key:'图片1',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片2',
            value: require('../../assets/workinfo/1.webp'),
            visible:false,
            },{
            key:'图片3',
            value: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            visible:false,
            }],
        },{
          HouseID: {
            key: "房源ID",
            value: "18888888",
            visible: false,
          },
          Landload: {
            key: "房东姓名",
            value: "陈星",
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
          Type: {
            key: "户型",
            value: "一室一厅",
            visible: false,
          },phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          Img:[{
            key:'图片1',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片2',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片3',
            value: require('../../assets/example.jpg'),
            visible:false,
            }],
        },{
          HouseID: {
            key: "房源ID",
            value: "28888888",
            visible: false,
          },
          Landload: {
            key: "房东姓名",
            value: "陈星",
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
          Type: {
            key: "户型",
            value: "一室一厅",
            visible: false,
          },phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          Img:[{
            key:'图片1',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片2',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片3',
            value: require('../../assets/example.jpg'),
            visible:false,
            }],
        },{
          HouseID: {
            key: "房源ID",
            value: "38888888",
            visible: false,
          },
          Landload: {
            key: "房东姓名",
            value: "陈星",
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
          Type: {
            key: "户型",
            value: "一室一厅",
            visible: false,
          },phoneNum: {
            key: "租客电话",
            value: "13613677455",
            visible: false,
          },
          Img:[{
            key:'图片1',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片2',
            value: require('../../assets/example.jpg'),
            visible:false,
            },{
            key:'图片3',
            value: require('../../assets/example.jpg'),
            visible:false,
            }],
        }
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
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.tableData.map(item => {
        if (row.HouseID != item.HouseID) {
          $table.toggleRowExpansion(item, false)
          item.expansion = false
        } 
      })
      row.expansion=!row.expansion;
      $table.toggleRowExpansion(row)
    },
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
            item.HouseID.value
              .toUpperCase()
              .indexOf(this.searchValue.toUpperCase()) > -1 ||
            item.Landload.value.indexOf(this.searchValue) > -1 ||
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
    AddHouse(){
        var newob={
          HouseID: {
            key: "房源ID",
            value: "",
            visible: false,
          },
          Landload: {
            key: "房东姓名",
            value: "",
            visible: false,
          },
          address: {
            key: "房源地址",
            value: "",
            visible: false,
          },
          money:{
            key: "月租金",
            value: "",
            visible: false,
          },
          time: {
            key: "租期",
            value: "",
            visible: false,
          },
          Type: {
            key: "户型",
            value: "",
            visible: false,
          },phoneNum: {
            key: "租客电话",
            value: "",
            visible: false,
          },
          Img:[],
        };        
        if(this.form.new_HouseID==''||this.form.new_Landload==''||this.form.new_address==''||this.form.new_money==''||this.form.new_time==''||this.form.new_phonenum==''||this.form.new_Type=='')
      {
        this.$message.warning("请检查您的输入");
        return;
      }
        if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.new_phonenum))
      {
               this.$message.warning("请检查手机号码格式");
               return;
      }
      for(var i=0;i<this.tableData.length;i++)
      {
          if(this.tableData[i].HouseID.value == this.form.new_HouseID)
          {
               this.$message.warning("房源ID不能重复");
               return;
          }
      }
        newob.HouseID.value=this.form.new_HouseID;
        newob.phoneNum.value=this.form.new_phonenum;
        newob.address.value=this.form.new_address;
        newob.Landload.value=this.form.new_Landload;
        newob.Type.value=this.form.new_Type;
        newob.money.value=this.form.new_money;
        newob.time.value=this.form.new_time;
        this.AddHouseDialogVi = false;
        this.tableData.unshift(newob);
        // this.showData.push(this.new);
        this.resetForm('form');
    },
    DeleteHouse(val)
    {
      this.$confirm("确定下架此房源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        this.tableData=this.tableData.filter(o => o.HouseID!=val.HouseID);
        this.showData=this.showData.filter(o => o.HouseID!=val.HouseID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

    },
     beforeUpload(file) {
          const fileSuffix = file.name.substring(
             file.name.lastIndexOf('.') + 1
          );
          const whiteList = ['png','jpg'];
          if (whiteList.indexOf(fileSuffix) === -1) {
             this.$message({
                type: 'error',
                message: '上传文件只能是 png/jpg 格式',
                showClose: true,
                offset: 80,
              });
              this.fileList = [];
              return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message({
                    type: 'error',
                    message: '上传文件不能超过10MB',
                    showClose: true,
                    offset: 80,
                });
                return false;
            }
        },
         upSuccess(res) {
            this.$message({
                type: 'success',
                message: '上传成功',
                showClose: true,
                offset: 80,
            })
        },
        // 上传失败
        upError() {
            this.$message({
                type: 'error',
                message: '上传失败',
                showClose: true,
                offset: 80,
            });
        },
        upRemve(file) {
            console.log(file);
        }
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 1;
}
.demo-table-expand label {
  margin-left:20px;
  margin-bottom: 10px;
  width: 180px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form--label-top .el-form-item__label{
  padding-bottom: 0px;
}
.el-form-item__label{
    font-size:20px;
}
.text {
  padding-left: 40px;
  line-height: 25px;
}
.pic {
  height:500px;
  overflow: auto;
}
.el-image{
display: inline-block;
margin:0 auto;
padding-left:10px;
height: 100%;
width:50%;
margin-bottom: 10px;
}
.pic img{
  width:100%;
}
.el-main{
  overflow:visible;
}
</style>