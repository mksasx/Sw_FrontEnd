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
        <span style="color:black;font-size:20px">上传报修/投诉信息</span>
        <el-divider></el-divider>
        <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8080/complain"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">(只能上传jpg/png文件，且不超过500kb)</div>
        </el-upload>
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <el-button type="primary" round style="margin-top:50px" @click="submit">点击提交</el-button>
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