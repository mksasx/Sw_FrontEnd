<template>
   <el-container style="flex-direction: column;">
     <el-main1>
        <div class="block">
    <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
     </el-main1>
  
  <el-main2>
    <div class="intro">
       <i class="el-icon-medal"></i>
      <h2>热门房源推荐</h2>
      <div class="clear"></div>
    </div>
    <div class="container" style="margin-top:50px;">
    <div style="width:23.5%;background-color:white;float:left;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="introduction">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
    <div style="width:23.5%;background-color:white;float:left;margin-left:25px;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="introduction">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:left;margin-left:25px;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:25px">
                </div>
                <p class="introduction">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:right;margin-left:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="introduction">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
  <div class="clear"></div>
    <el-pagination
      background
      layout="prev, pager, next"
        :total="1000">
    </el-pagination>
    </div>
  </el-main2>
  
   </el-container>
</template>

<style>
.el-container{
    background-color: rgb(240, 242, 245);
    height: auto;
}
.intro{
  margin-top: 50px;
  font-size: 28px;
}
.intro i{
  float: left;
  margin-left:20px;
  margin-top: 20px;
}
.intro h2{
  float: left;
  margin-left: 10px;
}
.clear{
    clear: both;
}

.block{
  padding-top: 50px;
  width: 100%;
  height: 100%;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-pagination{
    margin-top: 50px;
  }
</style>