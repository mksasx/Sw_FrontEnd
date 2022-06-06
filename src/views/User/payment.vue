<template>
    <el-container>
        <div class="basic">
        <span style="font-size:20px;color:black">订单信息</span>
    <el-divider></el-divider>
    <el-descriptions title="" :column="1">
    <el-descriptions-item label="订单ID">{{house_id}}</el-descriptions-item>
    <el-descriptions-item label="租金（元 / 日）">{{rent}}</el-descriptions-item>
    <el-descriptions-item label="租期（日）">{{rentday}}</el-descriptions-item>
    <el-descriptions-item label="总租金（元）">{{summoney}}</el-descriptions-item>
    </el-descriptions>

    <div class="pay">
        <span style="font-size:20px;color:black;">支付方式</span>
    <el-divider></el-divider>
        <el-radio v-model="radio" label="1">微信支付</el-radio>
        <el-radio v-model="radio" label="2">支付宝</el-radio>
    </div>
    <div class="payment" v-if="radio==2">
        <img src="../../assets/backgroundimg/alipay.jpg" alt="">
        <div class="qrcode">
            <img src="../../assets/backgroundimg/QRali.png" alt="" >
            <el-button type="primary" round @click="payforit">确认支付</el-button>
        </div>
        
    </div>
     <div class="payment" v-if="radio==1">
        <img src="../../assets/backgroundimg/wechat.jpg" alt="">
         <div class="qrcode">
            <img src="../../assets/backgroundimg/QR.png" alt="">
            <el-button type="success" round @click="payforit">确认支付</el-button>
        </div>
        
    </div>

    </div>
    </el-container>
    
</template>

<style scoped>
    .basic{
        text-align: left;
    }
    .pay{
        margin-top:50px;
    }
    .payment img{
        margin-top: 100px;
        margin-left: 35%;
        width: 382px;
        height: 616px;
    }
    .payment .qrcode img{
        position: absolute;
        width:270px; 
        height:270px;
        top: 575px;
        left: 60px;
    }
    .payment .qrcode .el-button{
        position: absolute;
        margin-top: 50px;
        left: 670px;
    }
</style>


<script>
import qs from "qs";

  export default {
    data () {
      return {
        radio: '1',
        house_id: '',
        rent:'',
        rentday:'',
        summoney: ''
      };
    },
    methods:{
        init(){
             this.$axios({
        method: "post",
        url: "http://localhost:8000/information/",
        data: qs.stringify({
          function_id: 5,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          flag:1,
          house_id: sessionStorage.getItem('justhouseid'),
          start_day:JSON.parse(sessionStorage.getItem('justrenttime')).begin_time.split("T")[0],
          finish_day:JSON.parse(sessionStorage.getItem('justrenttime')).finish_time.split("T")[0]
        }),
      })
        .then((res) => {
            this.house_id = sessionStorage.getItem('justhouseid'),
            this.rent = res.data.dayrent,
            this.rentday = res.data.day,
            this.summoney = res.data.price
              
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
        payforit(){
            this.$axios({
        method: "post",
        url: "http://localhost:8000/information/",
        data: qs.stringify({
          function_id: 5,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          flag:2,
          house_id: sessionStorage.getItem('justhouseid'),
          start_day:JSON.parse(sessionStorage.getItem('justrenttime')).begin_time.split("T")[0],
          finish_day:JSON.parse(sessionStorage.getItem('justrenttime')).finish_time.split("T")[0]
        }),
      })
        .then((res) => {
            this.$message.success("支付成功")
            setTimeout(function(){ window.close(); }, 2000);
            
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