<template>
<el-container>
  <el-main>
  <el-tabs v-model="activeName" @tab-click="init">
   
    <el-tab-pane label="正在处理" name="first">
        <span>
          请耐心等待审批~
        </span>
        <el-table  ref="table" size="small" 
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      stripe border 
      style="width: 100%;margin:20px auto;" 
      :default-sort = "{prop: 'date', order: 'ascending'}"
      highlight-current-row>
          <el-table-column
          prop="OrderDate"
          label="日期"
          width="90"
          align="center"
          sortable>
         </el-table-column>
         <el-table-column
          prop="OrderID"
          label="订单号"
          width="90"
          align="center">
          </el-table-column>
        <el-table-column
          prop="HouseID"
          label="房源ID"
          width="90"
          align="center">
       </el-table-column>
      <el-table-column
        prop="LandlordName"
        label="房东姓名"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="LandlordPhone"
        label="房东联系电话"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="Address"
        label="房源地址"
        align="center">
        </el-table-column>
          </el-table>

    </el-tab-pane>

    <el-tab-pane label="历史记录" name="second">
        
       <el-table  ref="table" size="small" 
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      stripe border 
      style="width: 100%;margin:20px auto;" 
      :default-sort = "{prop: 'date', order: 'ascending'}"
      highlight-current-row>
          <el-table-column
          prop="OrderDate"
          label="日期"
          width="90"
          align="center"
          sortable>
         </el-table-column>
         <el-table-column
          prop="OrderID"
          label="订单号"
          width="90"
          align="center">
          </el-table-column>
        <el-table-column
          prop="HouseID"
          label="房源ID"
          width="90"
          align="center">
       </el-table-column>
      <el-table-column
        prop="LandlordName"
        label="房东姓名"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="LandlordPhone"
        label="房东联系电话"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="Address"
        label="房源地址"
        align="center">
        </el-table-column>
          <el-table-column label="查看详情" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="jump(scope.row.OrderID)">查看历史订单详情</el-button>
            </template>
          </el-table-column>
          </el-table>

    </el-tab-pane>
   
  </el-tabs>
</el-main>
    
   <el-footer>
              <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-size="pageSize"
                  background
                 layout="prev, pager, next, jumper"
                 :total="tableData.length>0 ? tableData.length : null">
             </el-pagination>
          </el-footer>
</el-container>

</template>

<style scoped> 
.demo-table-expand {
  font-size: 1;
}
.demo-table-expand label {
  margin-left:20px;
  width: 130px;
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
.text{
  padding-left:40px;
  line-height: 25px;
}
.pic{
  height: 300px;
  padding-left:40px;
}
.pic img{
  height:100%;
  width:50%;
}
.el-main{
  overflow:visible;
}
.el-container{
    height: 100vh;
}
</style>

<script>
import qs from "qs";
export default {
  name: 'History_Order',
  data() {
    return {
      activeName: 'first',
      texts:['差','一般','好','基本满意','非常满意'],
      currentPage:1,
      pageSize:12,
      tableData: '',
    }
  },
  methods: {
    // toogleExpand(row) {
    //   let $table = this.$refs.table;
    //   this.tableData.map(item => {
    //     if (row.WorkID != item.WorkID) {
    //       $table.toggleRowExpansion(item, false)
    //       item.expansion = false
    //     } 
    //   })
    //   row.expansion=!row.expansion;
    //   $table.toggleRowExpansion(row)
    // },
     handleSizeChange: function (size) {
                this.pagesize = size;
            },
     handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
        },
   jump(a){
        this.$store.dispatch("savejustorder", a);
        // window.location.href="info_order";
        window.open("info_order")
    },
    init_now(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/order/",
        data: qs.stringify({
          function_id: 5,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          
        }),
      })
        .then((res) => {
          this.tableData = res.data.orderlist
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
     init_his(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/order/",
        data: qs.stringify({
          function_id: 6,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          
        }),
      })
        .then((res) => {
          this.tableData = res.data.orderlist
          console.log(this.tableData)
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
    init(tab,event){
      console.log(event)
        if(tab.index==0){
          this.init_now();
        }
        else if(tab.index==1){
          this.init_his();
        }
      },
  },
   mounted(){
      this.init_now();
    }
}
</script>