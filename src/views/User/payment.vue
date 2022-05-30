<template>
    <el-container>
        <div class="basic">
        <span style="font-size:20px;color:black">订单信息</span>
    <el-divider></el-divider>
    <el-descriptions title="" :column="1">
    <el-descriptions-item label="订单ID">空</el-descriptions-item>
    <el-descriptions-item label="租金（元 / 日）">空</el-descriptions-item>
    <el-descriptions-item label="租期（日）">空</el-descriptions-item>
    <el-descriptions-item label="总租金（元）">空</el-descriptions-item>
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
            <img src="../../assets/backgroundimg/QRali.jpg" alt="" >
        </div>
    </div>
     <div class="payment" v-if="radio==1">
        <img src="../../assets/backgroundimg/wechat.jpg" alt="">
         <div class="qrcode">
            <img src="../../assets/backgroundimg/QR.jpg" alt="">
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
</style>


<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>