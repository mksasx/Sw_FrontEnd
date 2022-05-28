<template>
<el-container>
    <div class="talk">
         <span style="color:grey;font-size:25px">留言板</span>
    <el-divider></el-divider>
    <div class="content">
        
    </div>
    <span style="color:grey;font-size:25px">我的回复</span>
    <el-divider></el-divider>
     <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="textarea">
    </el-input>

    </div>
   

</el-container>
</template>
<style scoped>
.talk{
    width: 100%;
    text-align: left;
}
.content{
    height: 700px;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 50px;
}
.content p{
    padding: 20px;
}
.el-input{
    width: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>


