<template>
<el-container>
    <el-header>
        <el-page-header @back="goBack" content="">
        </el-page-header>
        </el-header>
    <el-main>
    <div class="basic">
        <span style="color:black;font-size:20px">房源信息</span>
        <el-divider></el-divider>
    <el-descriptions title="" :column="1">
    
    <el-descriptions-item label="房源ID">{{houseid}}</el-descriptions-item>
    <el-descriptions-item label="房源名称">{{housename}}</el-descriptions-item>
    <el-descriptions-item label="租金">{{money}}元/月</el-descriptions-item>
    <el-descriptions-item label="户型">{{model}}</el-descriptions-item>
    <el-descriptions-item label="面积">{{area}}m²</el-descriptions-item>
    <el-descriptions-item label="楼层">{{floor}}楼</el-descriptions-item>
    <el-descriptions-item label="类型">{{housestyle}}</el-descriptions-item>
    <el-descriptions-item label="房东联系方式">{{housephone}}</el-descriptions-item>
    <el-descriptions-item label="租住起始日期">{{start}}</el-descriptions-item>
    <el-descriptions-item label="租住结束日期">{{end}}</el-descriptions-item>
    </el-descriptions>
    </div>
    <div class="complain_content">
        <span style="color:black;font-size:20px">报修/投诉图片</span>
        <el-divider></el-divider>
        <img :src="picurl" alt="" width="800px" height="400px">
        
        <span style="color:black;font-size:20px;margin-top:50px;display:block">报修/投诉详情信息</span>
        <el-divider></el-divider>
        <p>{{textarea}}</p>
    </div>
    </el-main>

</el-container>
</template>

<style scoped>
.el-main{
    text-align: left;
}
.complain_content{
    float: left;
    margin-top: 50px;
}
.upload-demo{
    margin-bottom: 50px;
}
.el-divider{
    width: 1000px;
}
</style>

<script>
import qs from "qs";
export default {
  data() {
    return {
      textarea: '',
      houseid:'',
      housename:'',
      money:'',
      model:'',
      area:'',
      floor:'',
      housestyle:'',
      hosterphone:'',
      start:'',
      end:'',
      picurl:'',
    }
  },
   methods: {
      goBack() {
        console.log('go back');
        history.go(-1);
      },
      init(){
           this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 10,
          user_id: JSON.parse(sessionStorage.getItem('user_work')).userId,
          work_id: JSON.parse(sessionStorage.getItem('user_work')).workId,
        }),
      })
        .then((res) => {
            this.houseid=res.data.HouseID;
            this.housename=res.data.Housename;
            this.money=res.data.Rent;
            this.model=res.data.Housetype;
            this.area=res.data.Area;
            this.floor=res.data.Floor;
            this.housestyle=res.data.Type;
            this.hosterphone=res.data.LandlordPhone;
            this.start = res.data.OrderDate;
            this.end = res.data.DueDate;
            this.picurl = res.data.ComplainPic;
            this.textarea = res.data.ComplainText;
              
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
      }
    },
    mounted(){
        this.init();
    }
}
</script>