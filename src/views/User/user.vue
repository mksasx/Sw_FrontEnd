<template>
    <el-container>
  <el-header style="height:600px">
      <img src="../../assets/backgroundimg/home.webp" alt="">
      <div class="container">
        <div v-if="imageUrl==''"class="userlogo">
          <i class="el-icon-picture-outline-round" style=" width: 80px;
    height: 80px;"></i>
      </div>
       <div v-else class="userlogo">
          <img :src="imageUrl" alt="尚未上传图像" style=" width: 80px;
    height: 80px;">
      </div>
      <div v-if="new_user_name!=''" class="username">
          <h3>{{new_user_name}}</h3>
      </div>
    <div v-else class="username">
          <h3>未登录</h3>
      </div>
      
      </div>
  </el-header>
  <el-main>
        <el-tabs type="border-card">
          <div class="edit_content" id="edit_content">
            <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="edit_content"
                id="new_input">
            </el-input>
            <div class="submit" id="submit" @click="edit_save">
                <el-button type="primary" size="" @click="edit_intro">提交</el-button>
            </div>
          </div>
        <el-tab-pane label="个人介绍">
            <div class="content" id="content">
                 <p>
                {{edit_content}}
                </p>
            </div>
            <div class="edit" id="edit">
                <el-button type="primary" size="" @click="edit_intro">编辑</el-button>
            </div>
            </el-tab-pane>
        <el-tab-pane label="详细资料">
            <el-radio-group v-model="size">
            <el-radio label="" style="display:none">默认</el-radio>
            </el-radio-group>

  <el-descriptions class="margin-top" title="个人信息列表" :column="1" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="" @click="edit_personnal" id="new_edit">个人设置</el-button>
      <el-button type="primary" size="" @click="submit_personnal" id="new_submit" style="display:none">保存</el-button>
    </template>
  
    <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-picture-outline"></i>
          用户头像
          </template>
          <div class="user_img">
              <img :src="imageUrl" alt="尚未上传图像" style="width:100px;height:100px">
          </div>
          <div class="new_user_img" style="display:none" id="new_user_img">
               <el-upload
            class="avatar-uploader"
            action="https://http://localhost:8080/user"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </div>
         
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      
      <div class="user_name">
          {{new_user_name}}
      </div>
      <div class="new_user_name" style="display:none">
          <el-input v-model="new_user_name" placeholder="请输入新用户名" id="new_user_name"></el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      <div class="phonenum">
          {{new_phonenum}}
      </div>
    <div class="new_phonenum" style="display:none">
          <el-input v-model="new_phonenum" placeholder="请输入新手机号" id="new_phonenum"></el-input>
      </div>
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      <div class="livecity">
          {{new_livecity}}
      </div>
       <div class="new_livecity" style="display:none">
          <el-input v-model="new_livecity" placeholder="请输入新城市" id="new_livecity"></el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        身份
      </template>
      <div class="status">
        <el-tag size="">{{new_status}}</el-tag>
      </div>
      <div class="new_status" style="display:none">
          <el-input v-model="new_status" placeholder="请输入新身份" id="new_status"></el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      <div class="liveplace">
          {{new_liveplace}}
      </div>
      <div class="new_liveplace" style="display:none">
          <el-input v-model="new_liveplace" placeholder="请输入新联系地址" id="new_liveplace"></el-input>
      </div>
    </el-descriptions-item>
  </el-descriptions>
        </el-tab-pane>
        </el-tabs>
  </el-main>
</el-container>
</template>



<style scoped>
.edit_content{
    display: inline-block;
    width: 100%;
    text-align: left;
    display: none;
}
.edit_content .submit{
  margin-top: 20px;
  float: right;
}
.avatar-uploader .el-upload {
    border: 1px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-main {
    overflow:visible;
  }
.container{
    position: absolute;
    top: 500px;
    left: 50px;
    height: auto;
}
.userlogo{
    display: inline-block;
    top: 100px;
    font-size: 80px;
}
.username{
    font-size: bold;
    font-size: 25px;
    display: inline-block;
    padding-left: 10px;
}
.el-header .userlogo{
    width: 80px;
    height: 80px;
}

.el-header img{
    padding-top: 30px;
    padding-bottom: 30px;
    width: 100%;
    height: 90%;
}
.el-tab-pane{
    height: 100%;
}
.content{
    display: inline-block;
    width: 90%;
    text-align: left;
}
.edit{
    float:right;
}
</style>

<script>
import { Upload } from 'element-ui';
  export default {
    data () {
      return {
        size: '',
        imageUrl: '',
        edit_content: '',
        new_user_name:'',
        new_phonenum:'',
        new_livecity:'',
        new_status:'',
        new_liveplace:'',
      };
    },
     methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      edit_intro(){
          const mid=document.querySelector("#content");
          const mid2=document.querySelector("#edit");
          const mid3=document.querySelector("#edit_content")
          mid.style.display= "none";
          mid2.style.display= "none";
          mid3.style.display = "block";
          //发包
      },
      edit_save(){
          const mid=document.querySelector("#content");
          const mid2=document.querySelector("#edit");
          const mid3=document.querySelector("#edit_content")
          var content_new = document.getElementById("new_input")
          mid.style.display= "inline-block";
          mid2.style.display= "inline-block";
          mid3.style.display = "none";
          mid.innerHTML= '<p>'+content_new.value+'</p>';
          Upload();
      },
      edit_personnal(){
          const a1=document.getElementsByClassName("user_img");
          const a2=document.getElementsByClassName("user_name");
          const a3=document.getElementsByClassName("phonenum");
          const a4=document.getElementsByClassName("livecity");
          const a5=document.getElementsByClassName("status");
          const a6=document.getElementsByClassName("liveplace");
          const a7=document.querySelector("#new_edit");

          const b1=document.getElementsByClassName("new_user_img");
          const b2=document.getElementsByClassName("new_user_name");
          const b3=document.getElementsByClassName("new_phonenum");
          const b4=document.getElementsByClassName("new_livecity");
          const b5=document.getElementsByClassName("new_status");
          const b6=document.getElementsByClassName("new_liveplace");
          const b7=document.querySelector("#new_submit");
          a1[0].style.display = "none";
          a2[0].style.display = "none";
          a3[0].style.display = "none";
          a4[0].style.display = "none";
          a5[0].style.display = "none";
          a6[0].style.display = "none";
          a7.style.display="none";
          b1[0].style.display = "block";
          b2[0].style.display = "block";
          b3[0].style.display = "block";
          b4[0].style.display = "block";
          b5[0].style.display = "block";
          b6[0].style.display = "block";
          b7.style.display="block";
      },
      submit_personnal(){
         const a1=document.getElementsByClassName("user_img");
          const a2=document.getElementsByClassName("user_name");
          const a3=document.getElementsByClassName("phonenum");
          const a4=document.getElementsByClassName("livecity");
          const a5=document.getElementsByClassName("status");
          const a6=document.getElementsByClassName("liveplace");
          const a7=document.querySelector("#new_edit");

          const b1=document.getElementsByClassName("new_user_img");
          const b2=document.getElementsByClassName("new_user_name");
          const b3=document.getElementsByClassName("new_phonenum");
          const b4=document.getElementsByClassName("new_livecity");
          const b5=document.getElementsByClassName("new_status");
          const b6=document.getElementsByClassName("new_liveplace");
          const b7=document.querySelector("#new_submit");
          a1[0].style.display = "block";
          a2[0].style.display = "block";
          a3[0].style.display = "block";
          a4[0].style.display = "block";
          a5[0].style.display = "block";
          a6[0].style.display = "block";
          a7.style.display="block";
          b1[0].style.display = "none";
          b2[0].style.display = "none";
          b3[0].style.display = "none";
          b4[0].style.display = "none";
          b5[0].style.display = "none";
          b6[0].style.display = "none";
          b7.style.display="none";

          var c1=document.getElementById("new_user_img").value;
          var c2=document.getElementById("new_user_name").value;
          var c3=document.getElementById("new_phonenum").value;
          var c4=document.getElementById("new_livecity").value;
          var c5=document.getElementById("new_status").value;
          var c6=document.getElementById("new_liveplace").value;
          
          a1[0].innerHTML= c1;
          a2[0].innerHTML= c2;
          a3[0].innerHTML= c3;
          a4[0].innerHTML= c4;
          a5[0].innerHTML= c5;
          a6[0].innerHTML= c6;
          console.log(c2);
          console.log(c3);
          console.log(c4);
          console.log(c5);
          console.log(c6);
      },
       Upload(){
               var map = {			//JSON数据		名称-值对
             "username":this.size,
          }
          this.$axios.post(
              '/user'		
              ,map)
          
          .then((response)=>{
              flag=response.data;
          })
          .then( (res)=>{
              if (flag==true) { 
              	 this.$notify({
                      type: 'success',
                      message: '欢迎用户'+this.user.name,
                      duration: 3000
                  })
              } else {
                  this.$message({
                      type: 'error',
                      message: '用户名或密码错误',
                      showClose: true
                  })
              }
              console.log(message);
          })
          // .catch( (err)=>{
          //     console.log(err);
          // })
                  }
              }
            }
 
 

</script>