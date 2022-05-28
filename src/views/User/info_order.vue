<template>

    <el-container>
        <el-head>
        <el-page-header @back="goBack" content="">
        </el-page-header>
        </el-head>
        <el-main>
             <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img :src="introduce[item-1]" width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
  <div class="house_info">
    <div class="basic">
        <span>房源信息</span>
    <el-divider></el-divider>
    <el-descriptions title="" :column="1">
    
    <el-descriptions-item label="房源ID">空</el-descriptions-item>
    <el-descriptions-item label="房源名称">空</el-descriptions-item>
    <el-descriptions-item label="租金">空</el-descriptions-item>
    <el-descriptions-item label="户型">空</el-descriptions-item>
    <el-descriptions-item label="面积">空</el-descriptions-item>
    <el-descriptions-item label="楼层">空</el-descriptions-item>
    <el-descriptions-item label="类型">空</el-descriptions-item>
    <el-descriptions-item label="房东联系方式">空</el-descriptions-item>
    <el-descriptions-item label="租住起始日期">空</el-descriptions-item>
    <el-descriptions-item label="租住结束日期">空</el-descriptions-item>
    </el-descriptions>
    </div>
    
    <div class="concrete">
        <span>房源概况</span>
        <el-divider></el-divider>
        <p>哈哈哈哈哈哈哈哈，挺好哈哈哈哈哈哈哈</p>
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

<style>
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
import p1 from '../../assets/backgroundimg/1.jpg'
import p2 from '../../assets/backgroundimg/2.jpg'
import p3 from '../../assets/backgroundimg/3.jpg'
import p4 from '../../assets/backgroundimg/4.jpg'
  export default {
      data() {
      return {
        value: 5,
        introduce:[
            p1,
            p2,
            p3,
            p4],
      }
    },
    methods: {
      goBack() {
        console.log('go back');
        history.go(-1);
      }
    }
  }
</script>