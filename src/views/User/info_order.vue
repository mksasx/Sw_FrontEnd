<template>

    <el-container>
        <el-header>
        <el-page-header @back="goBack" content="">
        </el-page-header>
        </el-header>
        <el-main>
             <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="item in 4" :key="item" style="border-radius:20px">
      <img :src="introduce[item-1]" width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
  <div class="house_info">
    <div class="basic">
        <span>房源信息</span>
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
    
    <div class="concrete">
        <span>房源概况</span>
        <el-divider></el-divider>
        <p>{{concrete}}</p>
    </div>
    <div class="idea">
        <span>我的评价</span>
        <el-divider></el-divider>
        <el-descriptions title="" :column="1">
        <el-descriptions-item label="评分"><el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
        </el-rate></el-descriptions-item>
        </el-descriptions>
    </div>
    
  </div>

  
        </el-main>
    </el-container>
</template>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
.house_info{
    margin-top: 50px;
    text-align: left;
    font-size: 25px;
}
.el-descriptions{
    font-size: 20px;
}
.concrete{
    margin-top: 50px;
}
.concrete p{
    font-size: 20px;
    color: black;
}

.idea{
    margin-top: 50px;
}
.idea .el-descriptions-item{
    font-size: 20px;
    color: black;
}
</style>
<script>
import qs from "qs";
// import p1 from '../../assets/backgroundimg/1.jpg'
// import p2 from '../../assets/backgroundimg/2.jpg'
// import p3 from '../../assets/backgroundimg/3.jpg'
// import p4 from '../../assets/backgroundimg/4.jpg'
  export default {
      data() {
      return {
        value: 5,
        introduce:[],
        houseid:'',
        housename:'',
        money:'',
        model:'',
        area:'',
        floor:'',
        housestyle:'',
        hosterphone:'',
        concrete:'',
        start:'',
        end:'',
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
          function_id: 8,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          order_id: sessionStorage.getItem('justorderid'),
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
          this.concrete = res.data.Introduction;
          this.start = res.data.OrderDate;
          this.end = res.data.DueDate;
          this.value = res.data.Mark;
          this.introduce = [require('../../assets/houseinfo/'+this.houseid+'/pic/1.png'),
                  require('../../assets/houseinfo/'+this.houseid+'/pic/2.png'),
                  require('../../assets/houseinfo/'+this.houseid+'/pic/3.png'),
                  require('../../assets/houseinfo/'+this.houseid+'/pic/4.png')];
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