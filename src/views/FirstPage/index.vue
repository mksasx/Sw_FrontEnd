<template>
<el-container>
 <el-main1>
        <div class="block">
    <el-carousel trigger="click" height="650px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="introduce[item-1]" width="100%" height="85%">
        <h3> {{text[item-1]}}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</el-main1>
      <div class="intro">
       <i class="el-icon-medal"></i>
      <h2>热门房源推荐</h2>
      <div class="fire">
        <img src="../../assets/backgroundimg/fire.png" alt="">
      <img src="../../assets/backgroundimg/fire.png" alt="">
      <img src="../../assets/backgroundimg/fire.png" alt="">
      <img src="../../assets/backgroundimg/fire.png" alt="">
      <img src="../../assets/backgroundimg/fire.png" alt="">
      </div>
      
     </div>
 <el-main2>
     
      <div class="container">
        <div v-for="item in info" :key="item" >
            <div class="house" style="border-radius:25px;margin-left:20px;margin-right:20px">
                <div class="pic">
                    <!-- <img :src="item.url" alt="" style="width:400px;height:200px;"> -->
                    <!-- <img :src="items[item.id-1].url" alt="" style="width:400px;height:200px;"> -->
                    <img :src="item.PicPathList[0].PicPath" alt="" style="width:400px;height:200px;border-radius:10px">
                </div>
                <div class="content">
                    <div class="name">
                        <a href="information"  @click="addjusthouseid(item)">房源名:{{item.Housename}}</a>
                    </div>
                     <div class="place">
                         <!-- 地点:{{items[item.id-1].place}} -->
                         地点:{{item.Address}}
                     </div>
                     <div class="floor">
                         <!-- 楼层:{{items[item.id-1].floor}} -->
                         楼层:{{item.Floor}}
                     </div>
                     <div class="add">
                         <el-button type="warning" round @click="addcollection(item)">加入收藏</el-button>
                    </div>
                </div>
                <!-- <div class="mark"> -->
                    <!-- 评分:{{items[item.id-1].mark}} -->
                    <!-- 评分:{{item.mark}} -->
                <!-- </div> -->
                 <div class="rentmoney">
                    <!-- 租金:{{items[item.HouseID-1].money}}元/月 -->
                    <span>租金:</span>
                    <p>{{item.Rent}}元/月</p>
                    
                </div>
                <div class="housemodel">
                    <!-- 户型:{{items[item.HouseID-1].model}} -->
                    <span>户型:</span>
                    
                    <p>{{item.Housetype}}</p>
                </div>
                <div class="area">
                    <!-- 面积:{{items[item.HouseID-1].area}}m² -->
                    <span>面积:</span>
                    <p>{{item.Area}}m²</p>
                    
                </div>
        <!-- <div v-for="item in items" :key="item.name" >
            <div class="house">
                <div class="pic">
                    <img :src="item.url" alt="" style="width:400px;height:200px;">
                </div>
                <div class="content">
                    <div class="name">
                        <a href="information" @click="addjusthouseid(item)">房源名:{{item.name}}</a>
                    </div>
                     <div class="place">
                         地点:{{item.place}}
                     </div>
                     <div class="floor">
                         楼层:{{item.floor}}
                     </div>
                     <div class="add">
                         <el-button type="warning" round @click="addcollection(item)">加入收藏</el-button>
                    </div>
                </div>
                 <div class="mark">
                    评分:{{item.mark}}
                </div>
                <div class="rentmoney">
                    租金:{{item.money}}元/月
                </div>
                <div class="housemodel">
                    户型:{{item.model}}
                </div>
                <div class="area">
                    面积:{{item.area}}m²
                </div>
                
        </div>
            <div class="clear"></div>
        </div> -->
    </div>
        </div>
      </div>
 </el-main2>
 <el-footer>
 </el-footer>
    
</el-container>
</template>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 20px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     /* background-color: #99a9bf; */
     background-color: #d3dce6;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
     /* background-color: #99a9bf; */
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
.intro .fire{
  float: left;
  margin-left: 15px;
  
}
.intro .fire img{
margin-top: 10px;
}
.intro h2{
  float: left;
  margin-left: 10px;
}
.clear{
    clear: both;
}
.el-main2 {
    overflow:visible;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-container{
      background-color:rgb(240, 242, 245);
      height: auto;
      /* width: 100%; */
  }
  .el-pagination{
    margin-top: 100px;
  }
  .city{
    display: flex;
    margin-top:100px;
    margin-left: 20px;
    align-items: center;
  }
  .money{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .housestyle{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .renttime{
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    align-items: center;
  }
  .city span{
    padding-right: 20px;
  }
  .money span{
    padding-right: 20px;
  }
  .housestyle span{
    padding-right: 20px;
  }
  .renttime span{
    padding-right: 20px;
  }
  .container{
      height: 100%;
      margin-top: 50px;
  }
  .container .house{
      background-color: white;
      margin-bottom: 30px;
      height: 240px;
  }
  .container .house .pic{
      float: left;
      margin:20px;
  }
  .container .house .content{
      text-align: left;
      float: left;
  }
  .container .house .content .name{
      margin-top: 30px;
  }
  .container .house .content .name a{
      color: skyblue;
      
      font-size: 20px;
      text-decoration: none;
  }
  .container .house .content .name a:hover{
      color: blue;
      text-decoration: underline;
  }
  .container .house .content .floor{
      margin-top: 30px;
  }
   .container .house .content .place{
      margin-top: 30px;
  }
    .container .house .content .add{
       margin-top: 20px;
  }
  .container .house .rentmoney{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }
  .container .house .housemodel{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }

  .container .house .area{
      color: lightcoral;
      font-weight: bold;
      float: right;
      margin-top: 80px;
      margin-right: 50px;
      background-color: rgb(240, 242, 245);
      padding: 10px;
      border-radius: 10px;
      height: 60px;
  }
    .container .house p{
      font-size: 30px;
  } 
  .container .house span{
    font-size: 15px;
    text-align: left;
  }
</style>
<script>
import p1 from '../../assets/backgroundimg/5.jpg'
import p2 from '../../assets/backgroundimg/6.jpg'
import p3 from '../../assets/backgroundimg/7.jpg'
import p4 from '../../assets/backgroundimg/8.jpg'
import qs from "qs";
export default {
    data() {
      return {
        restaurants: [],
        state: '',
        timeout:  null,
        radio_money: 0,
        radio_renttime: 1,
        value: '5',
        housestyle:'',
        info:[],
        introduce:[
            p1,
            p2,
            p3,
            p4
            ],
            text:[
                "欢迎来到青租网",
                "为广大青年同胞提供优质房源信息",
                "房源覆盖全国各地",
                "无论长租还是短租，大户型或小户型，我们都可以满足您的需求"
            ],
         items: [
            { id:1, name: '湾景国际3单元1楼四户',           mark:5.0,          place:'北京海淀',  floor:2,  money:4500,model:'3室2厅',  area:127,url:require('../../assets/houseinfo/1/pic/1.png')},
            { id:2, name: '天宫4单元6楼2户',                mark:4.0,              place:'北京海淀',  floor:8,  money:4500,model:'3室1厅',  area:120 ,url:require('../../assets/houseinfo/2/pic/1.png')},
            { id:3, name: '林肯公园3单元2楼1户',            mark:5.0,           place:'北京昌平',  floor:15,  money:15000,model:'3室2厅', area:251 ,url:require('../../assets/houseinfo/3/pic/1.png')},
            { id:4, name: '玫瑰园2单元1楼3户',              mark:3.8,             place:'上海黄浦区',floor:1,money:7500,model:'3室1厅',  area:90,url:require('../../assets/houseinfo/4/pic/1.png')},
            { id:5, name: '玫瑰园3单元2楼7户',              mark:4.4,             place:'北京海淀',  floor:10,  money:7700,model:'3室1厅',  area:128 ,url:require('../../assets/houseinfo/5/pic/1.png')},
            { id:6, name: '天上人间3单元2楼1户',            mark:5.0,           place:'北京朝阳',  floor:5,  money:5500,model:'1室1厅',  area:0.2 ,url:require('../../assets/houseinfo/6/pic/1.png')},
            { id:7, name: '芜湖牛逼2单元1楼4户',            mark:4.7,           place:'北京海淀',  floor:19,  money:7000,model:'2室1厅',  area:99.6 ,url:require('../../assets/houseinfo/7/pic/1.png')},
            { id:8, name: '北苑2单元3楼1户',                mark:4.1,               place:'成都锦江',  floor:19,  money:2399,model:'1室1厅',  area:45 ,url:require('../../assets/houseinfo/8/pic/1.png')},
            { id:9, name: '观澳园2单元3楼4户',              mark:4.2,             place:'上海徐汇',  floor:3,  money:8000,model:'2室1厅',  area:90.5 ,url:require('../../assets/houseinfo/9/pic/1.png')},
            { id:10,name: '永泰庄2单元3楼1户',              mark:3.6,             place:'成都成化',  floor:5,  money:5500,model:'2室1厅',  area:63, url:require('../../assets/houseinfo/10/pic/1.png')},
            { id:11,name: '悦溪3单元2楼1户',                mark:3.4,               place:'上海徐汇',  floor:6,  money:9000,model:'2室2厅',  area:88.5, url:require('../../assets/houseinfo/11/pic/1.png')},
            { id:12,name: '仁和花园3单元2楼5户',            mark:5.0,           place:'上海徐汇',  floor:6,  money:3400,model:'2室1厅',  area:89, url:require('../../assets/houseinfo/12/pic/1.png')},
            { id:13,name: '汇景5单元2楼4户',                mark:4.2,               place:'北京通州',  floor:2,  money:6000,model:'2室1厅',  area:88, url:require('../../assets/houseinfo/13/pic/1.png')},
            { id:14,name: '通天院2单元3楼1户',              mark:3.6,             place:'上海徐汇',  floor:8,  money:7250,model:'2室1厅',  area:54, url:require('../../assets/houseinfo/14/pic/1.png')},
            { id:15,name: '丽湾家园2单元3楼4户',            mark:5.0,           place:'北京东城',  floor:2,  money:5900,model:'2室1厅',  area:89, url:require('../../assets/houseinfo/15/pic/1.png')},
            { id:16,name: '祈东家园5单元2楼1户',            mark:5.0,           place:'北京通州',  floor:12,  money:5000,model:'2室2厅',  area:80, url:require('../../assets/houseinfo/16/pic/1.png')},
            { id:17,name: '中湾国际5单元2楼6户',            mark:5.0,          place:'北京西城',  floor:16,  money:6650,model:'1室1厅',  area:42,url:require('../../assets/houseinfo/17/pic/1.png')},
            { id:18,name: '明珠家园5单元4楼8户',            mark:3.2,           place:'北京大兴',  floor:3,  money:6700,model:'3室2厅',  area:100 ,url:require('../../assets/houseinfo/18/pic/1.png')},
            { id:19,name: '金隅汇景7单元3楼8户',            mark:5.0,           place:'北京通州',  floor:8,  money:6000,model:'2室1厅',  area:80 ,url:require('../../assets/houseinfo/19/pic/1.png')},
            { id:20,name: '次渠嘉园4单元3楼2户',            mark:4.4,           place:'北京通州',  floor:17,  money:3399,model:'1室1厅',  area:45 ,url:require('../../assets/houseinfo/20/pic/1.png')},
            { id:21,name: '紫藤一村4单元3楼8户',            mark:5.0,           place:'上海浦东',  floor:12,  money:4500,model:'2室1厅',  area:77 ,url:require('../../assets/houseinfo/21/pic/1.png')},
            { id:22,name: '爱博二村5单元2楼4户',            mark:5.0,           place:'成都郫县',  floor:5,  money:3300,model:'1室1厅',  area:59.8 ,url:require('../../assets/houseinfo/22/pic/1.png')},
            { id:23,name: '黎明花园2单元3楼4户',            mark:3.4,           place:'北京西城',  floor:3,  money:4400,model:'2室1厅',  area:52.3 ,url:require('../../assets/houseinfo/23/pic/1.png')},
            { id:24,name: '玫瑰园4单元3楼2户',              mark:3.1,             place:'成都高新',  floor:14,  money:4600,model:'2室1厅',  area:66.5 ,url:require('../../assets/houseinfo/24/pic/1.png')},
            { id:25,name: '碧林湾摩登堂6单元3楼2户',        mark:5.0,       place:'北京海淀',  floor:13,  money:4600,model:'2室1厅',  area:66.5 ,url:require('../../assets/houseinfo/25/pic/1.png')},
            { id:26,name: '七韵美地苑 6单元3楼2户',         mark:5.0,        place:'上海黄埔',  floor:3,  money:7000,model:'2室2厅',  area:91, url:require('../../assets/houseinfo/26/pic/1.png')},
            { id:27,name: '牡丹新村8单元3楼1户',            mark:4.7,           place:'没写',      floor:2,      money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/27/pic/1.png')},
            { id:28,name: '万圭园2单元5楼2户',              mark:3.9,             place:'成都锦江',  floor:17,  money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/28/pic/1.png')},
            { id:29,name: '天上单元楼户',                   mark:5.0,                  place:'北京海淀',  floor:19,  money:4000,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/29/pic/1.png')},
            { id:30,name: '东边院子1单元2楼4户',            mark:4.8,           place:'广州荔湾',  floor:16,  money:1780,model:'3室1厅',  area:80, url:require('../../assets/houseinfo/30/pic/1.png')},
            { id:31,name: '南城都汇汇朗园5单元2楼3户',      mark:4.5,     place:'广州越秀',  floor:8,  money:3800,model:'3室1厅',  area:89, url:require('../../assets/houseinfo/31/pic/1.png')},
            { id:32,name: '保利城单元5楼3户',               mark:5.0,              place:'广州海珠',  floor:7,  money:1850,model:'2室2厅',  area:73, url:require('../../assets/houseinfo/32/pic/1.png')},
            { id:33,name: '中德英伦世邦6单元4楼2户',        mark:3.6,       place:'成都成化',  floor:12,  money:2000,model:'2室1厅',  area:88 ,url:require('../../assets/houseinfo/33/pic/1.png')},
            { id:34,name: '成华奥园广场(二期)4单元2楼3户',  mark:4.2, place:'成都成化',  floor:19,  money:2200,model:'2室1厅',  area:72.8, url:require('../../assets/houseinfo/34/pic/1.png')},
            { id:35,name: '东城印象4单元3楼2户',            mark:4.8,           place:'成都龙泉驿',floor:10,money:2180,model:'1室1厅',area:45, url:require('../../assets/houseinfo/35/pic/1.png')},
            { id:36,name: '时光荟6单元3楼2户',              mark:5.0,             place:'北京东城',  floor:13,  money:1560,model:'1室1厅',  area:42.8, url:require('../../assets/houseinfo/36/pic/1.png')},
            { id:37,name: '时光荟6单元3楼2户',              mark:5.0,             place:'北京东城',  floor:8,  money:1560,model:'1室1厅',  area:42.8, url:require('../../assets/houseinfo/37/pic/1.png')},
            { id:38,name: '华侨城御龙山7单元8楼3户',        mark:4.0,       place:'上海徐汇',  floor:20,  money:2480,model:'2室2厅',  area:88, url:require('../../assets/houseinfo/38/pic/1.png')},
            { id:39,name: '鑫禾北城鑫街6单元5楼2户',        mark:3.1,       place:'广州黄埔',  floor:16,  money:1480,model:'1室1厅',  area:45, url:require('../../assets/houseinfo/39/pic/1.png')},
            { id:40,name: '鑫禾北城鑫街7单元3楼4户',        mark:3.8,       place:'北京西城',  floor:15,  money:2700,model:'3室2厅',  area:79, url:require('../../assets/houseinfo/40/pic/1.png')},
        ],   
      }
    },
    methods: {
      
      addcollection(item){
          this.$axios({
        method: "post",
        url: "http://localhost:8000/FirstPage/",
        data: qs.stringify({
          function_id: 6,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          house_id: item.HouseID
        }),
      })
        .then((res) => {
          console.log(item.id)
          if(res.data.errornumber==1){
            this.$message.success("收藏成功")
          }
          else if(res.data.errornumber==3){
            this.$message.warning("已经收藏过啦")
          }
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
       addjusthouseid(item){
        console.log(item);
        this.$store.dispatch("savejusthouseid", item.HouseID);
        window.location.href="information";
    },
     init(){
        this.$axios({
        method: "post",
        // url: "http://localhost:8000/collection/",
        url: "http://localhost:8000/FirstPage/",
        data: qs.stringify({
          function_id: 4,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
        }),
      })
        .then((res) => {
              // this.items_index = res.data.houselist;
              this.info = res.data.houselist;
              console.log(this.info);
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

