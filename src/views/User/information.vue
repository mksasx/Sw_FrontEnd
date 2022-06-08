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
    <el-descriptions-item label="评分"><el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
    </el-rate></el-descriptions-item>
    <el-descriptions-item label="房源ID">{{houseid}}</el-descriptions-item>
    <el-descriptions-item label="房源名称">{{housename}}</el-descriptions-item>
    <el-descriptions-item label="租金">{{money}}</el-descriptions-item>
    <el-descriptions-item label="户型">{{model}}</el-descriptions-item>
    <el-descriptions-item label="面积">{{area}}</el-descriptions-item>
    <el-descriptions-item label="楼层">{{floor}}</el-descriptions-item>
    <el-descriptions-item label="类型">{{housestyle}}</el-descriptions-item>
    <el-descriptions-item label="房东联系方式">{{hosterphone}}</el-descriptions-item>
    </el-descriptions>
    </div>
    <div class="concrete">
        <span>房源概况</span>
        <el-divider></el-divider>
        <p>{{concrete}}</p>
    </div>

    <div class="order">
        <span>我要租住</span>
        <el-divider></el-divider>
        <template>
          <el-radio v-model="radio" label="1" >短租</el-radio>
          <el-radio v-model="radio" label="2">长租</el-radio>
        </template>
    </div>
    <div v-if="radio==1" class="pay1">
      <div class="block">
    <el-date-picker
      v-model="Value1"
      type="daterange"
      range-separator="至"
      start-placeholder="租房开始日期"
      end-placeholder="租房结束日期">
    </el-date-picker>
  </div>
  <el-button @click="short_submit" style="margin-top:50px">提交</el-button>
    </div>

    <div v-if="radio==2" class="pay2">
       <!-- <div class="block">
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="租房开始月份"
      end-placeholder="租房结束月份">
    </el-date-picker> -->
    <div class="block">
          <el-date-picker
                 v-model="value1"
                 type="date"
                 placeholder="选择起租日期">
          </el-date-picker>
          <el-input
              placeholder="请输入租期(月)"
              prefix-icon="el-icon-house"
              v-model="num"
              clearable>
          </el-input>
  </div>
          <el-button @click="long_submit" style="margin-top:50px">提交</el-button>
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
  .el-input{
    width: auto;
    margin-right: 20px;
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
.order{
    margin-top: 50px;
    margin-bottom: 50px;
}
.order p{
    font-size: 20px;
    color: black;
}
.pay1{
  margin-bottom: 50px;
}
.pay2{
  margin-bottom: 50px;
}
</style>
<script>
// import p1 from '../../assets/houseinfo/1.jpg'
// import p2 from '../../assets/houseinfo/2.jpg'
// import p3 from '../../assets/houseinfo/3.jpg'
// import p4 from '../../assets/houseinfo/4.jpg'
import qs from "qs";
  export default {
      data() {
      return {
        num: '',
        radio: '',
        value: 5,
        houseid:'',
        housename:'',
        money:'',
        model:'',
        area:'',
        floor:'',
        housestyle:'',
        hosterphone:'',
        concrete:'',
        introduce:[],

            //短租
           PickerOptions: {
          Shortcuts: [{
            onClick(picker1) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker1.$emit('pick', [start, end]);
            }
          }, 
          ]
        },
        Value1: '',
        Value2: '',


            //长租
           pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker2) {
              picker2.$emit('pick', [new Date(), new Date()]);
            }
          }]
        },
        value1: '',
        value2: '',
      }
    },
    methods: {
      goBack() {
        console.log('go back');
        history.go(-1);
      },
      handleChange(value) {
        console.log(value);
      },
      short_submit(){
        if(this.radio==''){
          this.$message.warning("请选择租期类型");
        }
        else{
          if(this.radio==1){
              if(this.Value1==''){
                this.$message.warning("请选择租房时间");
              }
              else{
                this.$message.success("提交成功");
                // window.location.href="payment";
                var justtime = {begin_time: this.Value1[0],finish_time:this.Value1[1]};
                this.$store.dispatch("savejusthouseid", this.houseid);
                this.$store.dispatch("savejustrenttime", justtime);
                console.log(sessionStorage.getItem('justrenttime'))
                window.open("payment");
              }
          }
        }
      },
      long_submit(){
          if(this.radio==''){
          this.$message.warning("请选择租期类型");
        }
        else{
          
            var numreg = /^[0-9]*$/;
            var numre = new RegExp(numreg);
              if(!(numre.test(this.num))||(this.num=='0')){
                this.$message.warning("请检查租期是否合法");
              }
               else if(this.value1==''){
                this.$message.warning("请选择租房时间");
              }
              else{
                
                this.$message.success("提交成功");
                var justtime = {begin_time: this.value1,finish_time:this.num};
                this.$store.dispatch("savejusthouseid", this.houseid);
                this.$store.dispatch("savejustrenttime", justtime);
                console.log(sessionStorage.getItem('justrenttime'))
                window.location.href="bond";
                // window.open("bond");
              }
          
        }
      },
      init(){
        this.$axios({
        method: "post",
        url: "http://localhost:8090/collection/",
        data: qs.stringify({
          function_id: 5,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          house_id: sessionStorage.getItem('justhouseid'),
        }),
      })
        .then((res) => {
          console.log(this.house_id)
          this.houseid=res.data.HouseID;
          this.housename=res.data.Housename;
          this.money=res.data.Rent;
          this.model=res.data.Housetype;
          this.area=res.data.Area;
          this.floor=res.data.Floor;
          this.housestyle=res.data.Type;
          this.hosterphone=res.data.LandlordPhone;
          this.concrete = res.data.Introduction;
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
      },
     
    },
     mounted(){
        this.init();
      }
  }
</script>