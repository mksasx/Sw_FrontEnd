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
      >搜索房源</el-button
    >
    <el-button
      type="primary"
      size="small"
      @click="AddHouseDialogVi = true"
      style="margin-left: 42.5%"
      >新增房源</el-button
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
        prop="HouseID.value"
        label="房源编号"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="HouseName.value"
        label="房源名称"
        width="200"
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
        prop="floor.value"
        label="楼层"
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column prop="Type.value" label="户型" align="center" width="90">
      </el-table-column>
      <el-table-column prop="Area.value" label="面积" align="center" width="90">
      </el-table-column>
      <el-table-column prop="address.value" label="房源地址" align="center">
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-picture"
            size="mini"
            @click="toogleExpand(scope.row)"
            >{{ scope.row.expansion ? "收起" : "查看图片" }}</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DeleteHouse(scope.row)"
            >下架房源</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
        <template slot-scope="scope">
          <el-form label-position="top" class="demo-table-expand">
            <el-form-item label="房源图片">
              <div class="pic">
                <el-image
                  v-for="url in scope.row.Img"
                  :key="url.PicPath"
                  :src="url.PicPath"
                  lazy
                ></el-image>
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
      :total="tableData.length > 0 ? tableData.length : null"
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
        label-width="auto"
        @submit.native.prevent
      >
        <el-form-item
          prop="new_HouseName"
          :rules="[
            { required: true, message: '房源名称不能为空', trigger: 'blur' },
          ]"
          label="房源名称："
        >
          <el-input
            v-model="form.new_HouseName"
            placeholder="请输入房源名称"
            suffix-icon="el-icon-bank-card"
          ></el-input>
        </el-form-item>
         <el-form-item
          prop="new_HouseID"
          :rules="[
            { required: true, message: '房源编号不能为空', trigger: 'blur' },
          ]"
          label="房源编号："
        >
          <el-input
            v-model="form.new_HouseID"
            placeholder="请输入房源编号"
            suffix-icon="el-icon-bank-card"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_Landload"
          :rules="[
            { required: true, message: '房东姓名不能为空', trigger: 'blur' },
          ]"
          label="房东姓名："
        >
          <el-input
            v-model="form.new_Landload"
            placeholder="请输入房东姓名"
            suffix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_phonenum"
          :rules="[
            { required: true, message: '房东电话号码不能为空', trigger: 'blur' },
          ]"
          label="房东电话："
        >
          <el-input
            v-model="form.new_phonenum"
            placeholder="请输入房东电话号码"
            suffix-icon="el-icon-phone"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_City"
          :rules="[
            { required: true, message: '房源所在城市不能为空', trigger: 'blur' },
          ]"
          label="房源所在城市："
        >
          <el-input
            v-model="form.new_City"
            placeholder="请输入新的房源所在城市"
            suffix-icon="el-icon-location-outline"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_address"
          :rules="[
            { required: true, message: '房源详细地址不能为空', trigger: 'blur' },
          ]"
          label="房源详细地址："
        >
          <el-input
            v-model="form.new_address"
            placeholder="请输入新的房源详细地址"
            suffix-icon="el-icon-location-outline"
          ></el-input>
        </el-form-item>
        <!-- 几室几厅 -->
        <el-form-item
          prop="new_Type"
          :rules="[
            { required: true, message: '房源户型不能为空', trigger: 'blur' },
          ]"
          label="房源户型："
        >
          <el-input
            v-model="form.new_Type"
            placeholder="请输入新的房源户型"
            suffix-icon="el-icon-warning-outline"
          ></el-input>
        </el-form-item>
        <!-- 商品房之类的 -->
        <el-form-item
          prop="new_HouseType"
          :rules="[
            { required: true, message: '房源类型不能为空', trigger: 'blur' },
          ]"
          label="房源类型："
        >
          <el-input
            v-model="form.new_HouseType"
            placeholder="请输入新的房源类型"
            suffix-icon="el-icon-warning-outline"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_Area"
          :rules="[
            { required: true, message: '房源面积不能为空', trigger: 'blur' },
          ]"
          label="房源面积："
        >
          <el-input
            v-model="form.new_Area"
            placeholder="请输入新的房源面积"
            suffix-icon="el-icon-crop"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_money"
          :rules="[
            { required: true, message: '每月租金不能为空', trigger: 'blur' },
          ]"
          label="每月租金："
        >
          <el-input
            v-model="form.new_money"
            placeholder="请输入新的每月租金"
            suffix-icon="el-icon-money"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="new_floor"
          :rules="[
            { required: true, message: '楼层不能为空', trigger: 'blur' },
          ]"
          label="房源楼层："
        >
          <el-input
            v-model="form.new_floor"
            placeholder="请输入新的房源楼层"
            suffix-icon="el-icon-school"
          ></el-input>
        </el-form-item>
        <el-form-item label="房源图片：">
           <el-upload
            class="upload-demo"
            drag
            action=""
            multiple
            :limit="4"
            :on-exceed="handleExceed"
            list-type="picture"
            :on-change="loadJsonFromFile"
            :http-request="submitAvatarHttp"
            :before-upload="beforeUpload"
            :file-list="uploadFiles"
            :on-remove="handleRemove"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(AddHouseDialogVi = false), resetForm('form')"
          >取消</el-button
        >
        <el-button type="primary" size="medium" @click="AddHouse()"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
let formdata = new FormData();
let i=1;
import qs from "qs";
export default {
  name: "Managed_Complain",
  inject: ["reload"],
  data() {
    return {
      imageUrl:'',
      uploadFiles:[],
      filelist:[],
      searchValue: "",
      AddHouseDialogVi: false,
      currentPage: 1,
      pageSize: 8,
      form: {
        new_HouseID: "",
        new_HouseName: "",
        new_Landload: "",
        new_City:"",
        new_address: "",
        new_money: "",
        new_floor: "",
        new_phonenum: "",
        new_HouseType: "",
        new_Type: "",
        new_pics: "",
        new_Area:"",
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
  },
  methods: {
    // 为了实现删除功能，filelist用来存放当前所有文件的uid
    handleRemove(file, fileList){
       console.log(file, fileList);
       this.filelist=this.filelist.filter(item => item != file.uid);
    },
    submitAvatarHttp(val){
      var a= this.beforeUpload1(val.file)
      if(!a)
      {
            return;
      }
      console.log(val.file.uid)
      formdata.append(val.file.uid,val.file);
      console.log(i,formdata.get(val.file.uid));
      this.filelist.push(val.file.uid)
      console.log(this.filelist);
    },
    //  beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除 ${ file.name }？`);
    //   },
    loadJsonFromFile(file, fileList) {
      var a= this.beforeUpload1(file)
      if(!a)
      {
            return;
      }
      this.uploadFiles = fileList
    },
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    getinfo() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Manage_House/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 3,
        }),
      }).then((res) => {
        console.log(res);
        res.data.houselist.forEach((item) => {
          var tmp = {
            HouseID: {
              key: "房源ID",
              value: "",
              visible: false,
            },
            HouseName: {
              key: "房源名称",
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
            Area: {
              key: "房源地址",
              value: "",
              visible: false,
            },
            money: {
              key: "月租金",
              value: "",
              visible: false,
            },
            floor: {
              key: "楼层",
              value: "",
              visible: false,
            },
            Type: {
              key: "户型",
              value: "",
              visible: false,
            },
            phoneNum: {
              key: "房东电话",
              value: "",
              visible: false,
            },
            Img: [],
          };
          tmp.HouseName.value = item.Housename;
          tmp.Landload.value = item.Landlordname;
          tmp.HouseID.value = item.HouseID;
          tmp.Type.value = item.Housetype;
          tmp.address.value = item.Address;
          tmp.phoneNum.value = item.Phone;
          tmp.floor.value = item.Floor;
          tmp.money.value = item.Rent;
          tmp.Area.value = item.Area;
          for (var i = 0; i < item.PicPathList.length; i++) {
            tmp.Img.push(item.PicPathList[i]);
          }
          console.log(tmp);
          this.tableData.push(tmp);
          this.num.push(tmp.HouseID.value);
        });
      });
    },
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.tableData.map((item) => {
        if (row.HouseID != item.HouseID) {
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
          url: "http://localhost:8000/Manage_House/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 13,
            id: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该房源");
            return;
          } else {
            console.log(res);
            this.tableData.splice(0);
            var tmp = {
              HouseID: {
                key: "房源ID",
                value: "",
                visible: false,
              },
              HouseName: {
                key: "房源名称",
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
              Area: {
                key: "房源地址",
                value: "",
                visible: false,
              },
              money: {
                key: "月租金",
                value: "",
                visible: false,
              },
              floor: {
                key: "楼层",
                value: "",
                visible: false,
              },
              Type: {
                key: "户型",
                value: "",
                visible: false,
              },
              phoneNum: {
                key: "房东电话",
                value: "",
                visible: false,
              },
              Img: [],
            };
            tmp.HouseName.value = res.data.Housename;
            tmp.Landload.value = res.data.Landlordname;
            tmp.HouseID.value = res.data.HouseID;
            tmp.Type.value = res.data.Housetype;
            tmp.address.value = res.data.Address;
            tmp.phoneNum.value = res.data.Phone;
            tmp.floor.value = res.data.Floor;
            tmp.money.value = res.data.Rent;
            tmp.Area.value = res.data.Area;
            for (var i = 0; i < res.data.PicPathList.length; i++) {
              tmp.Img.push(res.data.PicPathList[i]);
            }
            console.log(tmp);
            this.tableData.push(tmp);
          }
        });
      } else {
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8000/Manage_House/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            function_id: 10,
            house_name: this.searchValue,
          }),
        }).then((res) => {
          if (res.data.errornumber == 1) {
            this.$message.warning("搜索失败，⽆该合同");
            return;
          } else {
            this.tableData.splice(0);
            res.data.houselist.forEach((item) => {
              var tmp = {
                HouseID: {
                  key: "房源ID",
                  value: "",
                  visible: false,
                },
                HouseName: {
                  key: "房源名称",
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
                Area: {
                  key: "房源地址",
                  value: "",
                  visible: false,
                },
                money: {
                  key: "月租金",
                  value: "",
                  visible: false,
                },
                floor: {
                  key: "楼层",
                  value: "",
                  visible: false,
                },
                Type: {
                  key: "户型",
                  value: "",
                  visible: false,
                },
                phoneNum: {
                  key: "房东电话",
                  value: "",
                  visible: false,
                },
                Img: [],
              };
              tmp.HouseName.value = item.Housename;
              tmp.Landload.value = item.Landlordname;
              tmp.HouseID.value = item.HouseID;
              tmp.Type.value = item.Housetype;
              tmp.address.value = item.Address;
              tmp.phoneNum.value = item.Phone;
              tmp.floor.value = item.Floor;
              tmp.money.value = item.Rent;
              tmp.Area.value = item.Area;
              for (var i = 0; i < item.PicPathList.length; i++) {
              tmp.Img.push(item.PicPathList[i]);
              }
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
    //         item.HouseID.value
    //           .toUpperCase()
    //           .indexOf(this.searchValue.toUpperCase()) > -1 ||
    //         item.Landload.value.indexOf(this.searchValue) > -1 ||
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
    AddHouse()
    {
      if (
        this.form.new_HouseID == "" ||
        this.form.new_HouseName == "" ||
        this.form.new_Landload == "" ||
        this.form.new_address == ""||
        this.form.new_money == ""||
        this.form.new_floor == ""||
        this.form.new_phonenum == ""||
        this.form.new_HouseType == ""||
        this.form.new_Type == ""||
        this.form.new_Area == ""||
        this.form.new_City == "") 
      {
        this.$message.warning("请检查您的输入");
        return;
      }
      if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.new_phonenum))
      {
               this.$message.warning("请检查手机号码格式");
               return;
      }
      for(var i=0;i<this.num.length;i++)
      {
          if(this.num[i] == this.form.new_HouseID)
          {
               this.$message.warning("房源ID不能重复");
               return;
          }
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Manage_House/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        headers: { "Content-Type": "multipart/form-data" },
        data: {
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 12,
          house_id: this.form.new_HouseID,
          house_name: this.form.new_HouseName,
          phone: this.form.new_phonenum,
          landlord_name:this.form.new_Landload,
          address: this.form.new_address,
          house_type: this.form.new_Type,
          rent: this.form.new_money,
          city:this.form.new_address,
          type:this.form.new_HouseType,
          area:this.form.new_Area,
          floor:this.form.new_floor,
          pic1:formdata.get(this.filelist[0]),
          pic2:formdata.get(this.filelist[1]),
          pic3:formdata.get(this.filelist[2]),
          pic4:formdata.get(this.filelist[3]),
          // pic2:this.uploadFiles[1],
          // pic3:this.uploadFiles[2],
          // pic4:this.uploadFiles[3],
          // pic5:"",
        },
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
    },
    // AddHouse() {
    //   var newob = {
    //     HouseID: {
    //       key: "房源ID",
    //       value: "",
    //       visible: false,
    //     },
    //     Landload: {
    //       key: "房东姓名",
    //       value: "",
    //       visible: false,
    //     },
    //     address: {
    //       key: "房源地址",
    //       value: "",
    //       visible: false,
    //     },
    //     money: {
    //       key: "月租金",
    //       value: "",
    //       visible: false,
    //     },
    //     floor: {
    //       key: "租期",
    //       value: "",
    //       visible: false,
    //     },
    //     Type: {
    //       key: "户型",
    //       value: "",
    //       visible: false,
    //     },
    //     phoneNum: {
    //       key: "租客电话",
    //       value: "",
    //       visible: false,
    //     },
    //     Img: [],
    //   };
    //   if (
    //     this.form.new_HouseID == "" ||
    //     this.form.new_Landload == "" ||
    //     this.form.new_address == "" ||
    //     this.form.new_money == "" ||
    //     this.form.new_floor == "" ||
    //     this.form.new_phonenum == "" ||
    //     this.form.new_Type == ""
    //   ) {
    //     this.$message.warning("请检查您的输入");
    //     return;
    //   }
    //   if (
    //     !/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(
    //       this.form.new_phonenum
    //     )
    //   ) {
    //     this.$message.warning("请检查手机号码格式");
    //     return;
    //   }
    //   for (var i = 0; i < this.tableData.length; i++) {
    //     if (this.tableData[i].HouseID.value == this.form.new_HouseID) {
    //       this.$message.warning("房源ID不能重复");
    //       return;
    //     }
    //   }
    //   newob.HouseID.value = this.form.new_HouseID;
    //   newob.phoneNum.value = this.form.new_phonenum;
    //   newob.address.value = this.form.new_address;
    //   newob.Landload.value = this.form.new_Landload;
    //   newob.Type.value = this.form.new_Type;
    //   newob.money.value = this.form.new_money;
    //   newob.floor.value = this.form.new_floor;
    //   this.AddHouseDialogVi = false;
    //   this.tableData.unshift(newob);
    //   // this.showData.push(this.new);
    //   this.resetForm("form");
    // },
    DeleteHouse(val) {
      this.$confirm("确定删除此房源信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            method: "post" /* 指明请求方式，可以是 get 或 post */,
            url: "http://localhost:8000/Manage_House/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
              function_id: 11,
              house_id: val.HouseID.value,
            }),
          }).then((res) => {
            console.log(res.data.errornumber);
            switch (res.data.errornumber) {
              case 0:
                this.$message({
                  type: "success",
                  message: "下架成功!",
                });
                break;
              case 1:
                this.$message({
                  type: "warning",
                  message: "下架失败!",
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
    // DeleteHouse(val) {
    //   this.$confirm("确定下架此房源, 是否继续?", "提示", {
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
    //         (o) => o.HouseID != val.HouseID
    //       );
    //       this.showData = this.showData.filter((o) => o.HouseID != val.HouseID);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    beforeUpload(file) {
      const isJPG =file.type == 'image/jpeg' || file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片格式错误!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
      },
    beforeUpload1(file) {
      const isJPG =file.type == 'image/jpeg' || file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10;
      return isJPG && isLt2M;
      }
    },
    // upSuccess(res) {
    //   this.$message({
    //     type: "success",
    //     message: "上传成功",
    //     showClose: true,
    //     offset: 80,
    //   });
    // },
    // // 上传失败
    // upError() {
    //   this.$message({
    //     type: "error",
    //     message: "上传失败",
    //     showClose: true,
    //     offset: 80,
    //   });
    // },
  mounted: function () {
    this.getinfo();
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 1;
}
.demo-table-expand label {
  margin-left: 20px;
  margin-bottom: 10px;
  width: 180px;
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
.el-form-item__label {
  font-size: 20px;
}
.text {
  padding-left: 40px;
  line-height: 25px;
}
.pic {
  height: 500px;
  overflow: auto;
}
.el-image {
  display: inline-block;
  margin: 0 auto;
  padding-left: 10px;
  height: 100%;
  width: 50%;
  margin-bottom: 10px;
}
.pic img {
  width: 100%;
}
.el-main {
  overflow: visible;
}
</style>