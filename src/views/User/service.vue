<template>
  <el-tabs v-model="activeName" @tab-click="init">
    <el-tab-pane label="投诉报修" name="first">
        <div class="complain">
            <span>
                选择你要投诉报修的订单
            </span>
             <el-main>
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
        prop="Address"
        label="房源地址"
        align="center">
        </el-table-column>
          <el-table-column label="查看详情" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="jump(scope.row.OrderID)">查看历史订单详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="投诉报修" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="jump2(scope.row.OrderID)">我要投诉/报修</el-button>
            </template>
          </el-table-column>
      </el-table>
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
        </div>
    </el-tab-pane>
   
    <el-tab-pane label="正在处理" name="second">
        
       <div class="complaining">
            <span>
                师傅在前往帮助你的路上
            </span>
             <el-main>
          <el-table  ref="table" size="small" 
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      stripe border 
      style="width: 100%;margin:20px auto;" 
      :default-sort = "{prop: 'date', order: 'ascending'}"
      highlight-current-row>
          <el-table-column
          prop="Datetime"
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
        prop="Address"
        label="房源地址"
        align="center">
        </el-table-column>
          <el-table-column label="查看详情" width="150" align="center">
              <el-button type="text" @click="jump3()">查看报销投诉详情</el-button>
          </el-table-column>
          <el-table-column label="联系客服" width="150" align="center">
              <el-button type="text" @click="jump4()">联系客服</el-button>
          </el-table-column>
      </el-table>
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
        </div>

    </el-tab-pane>

    <el-tab-pane label="历史记录" name="third">
        
        <div class="complained">
            <span>
                经历所有艰难，未来尽是坦途
            </span>
             <el-main>
          <el-table  ref="table" size="small" 
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
      stripe border 
      style="width: 100%;margin:20px auto;" 
      :default-sort = "{prop: 'date', order: 'ascending'}"
      highlight-current-row>
          <el-table-column
          prop="Datetime"
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
        prop="Address"
        label="房源地址"
        align="center">
        </el-table-column>
          <el-table-column label="查看详情" width="150" align="center">
              <el-button type="text" @click="jump5()">查看报销投诉详情</el-button>
          </el-table-column>
      </el-table>
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
        </div>

    </el-tab-pane>
  </el-tabs>
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
.complain{
    font-size: 18px;
}
</style>
<script>
import qs from "qs";
  export default {
    data() {
      return {
        activeName: 'first',
        texts:['差','一般','好','基本满意','非常满意'],
      currentPage:1,
      pageSize:12,
      tableData: [],
    }
      }
    ,
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      init_list(){
        this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
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
      init_now(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 6,
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
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 7,
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
      init(tab,event){
        console.log(event)
        this.tableData = '';
        if(tab.index==1){
          this.init_now();
        }
        else if(tab.index==2){
          this.init_his();
        }
        else if(tab.index==0){
          this.init_list();
        }
      },
       jump(a){
        this.$store.dispatch("savejustorder", a);
        // this.$store.dispatch("clearjusthouseid");
        window.location.href="info_order";
        },
        jump2(a){
          this.$store.dispatch("savejustorder", a);
          window.location.href="complain";
        },
        jump3(){
            window.location.href="info_complain";
        },
        jump4(){
          window.location.href="connection";
        }
    },
    mounted(){
      this.init_list();
    }
    };
</script>