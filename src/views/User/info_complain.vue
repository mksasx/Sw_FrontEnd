<template>
<el-container>
    <el-head>
        <el-page-header @back="goBack" content="">
        </el-page-header>
        </el-head>
    <el-main>
    <div class="basic">
        <span style="color:black;font-size:20px">房源信息</span>
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
    <div class="complain_content">
        <span style="color:black;font-size:20px">报修/投诉图片</span>
        <el-divider></el-divider>
        <img src="../../assets/example.jpg" alt="" width="800px" height="400px">
        
        <span style="color:black;font-size:20px;margin-top:50px;display:block">报修/投诉详情信息</span>
        <el-divider></el-divider>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas doloribus dolore enim aut omnis, odio, vero culpa similique consequatur neque adipisci provident. Similique velit ratione aut, veritatis temporibus illo vero.</p>
    </div>
    </el-main>

</el-container>
</template>

<style>
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
export default {
  data() {
    return {
      textarea: ''
    }
  },
   methods: {
      goBack() {
        console.log('go back');
        history.go(-1);
      },
      submit(){
          if(this.textarea==''){
              this.$message.warning("请输入内容");
          }
          else{
              this.$message.success("提交成功");
              history.go(-1);
          }
      }
    }
}
</script>