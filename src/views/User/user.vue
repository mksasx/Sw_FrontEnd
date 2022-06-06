<template>
    <el-container>
  <el-header style="height:600px">
      <img src="../../assets/backgroundimg/home.webp" alt="">
      <div class="container">
        <div v-if="imageUrl==null||imageUrl==''" class="userlogo">
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
        <el-tabs type="border-card" @tab-click="init">
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
                 <p v-if="edit_content">
                {{edit_content}}
                </p>
                <p v-else>
                  这人好懒，啥都没写~
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
               action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
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
    <!-- <el-descriptions-item>
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
    </el-descriptions-item> -->
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
import qs from "qs";
  export default {
    data () {
      return {
        size: '',
        edit_content: '',
        imageUrl: null,
        new_user_name:JSON.parse(sessionStorage.getItem('user')).username,
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
      init_intro(){
          this.$axios({
        method: "post",
        url: "http://localhost:8000/user/",
        data: qs.stringify({
          function_id: 3,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
        }),
      })
        .then((res) => {
              var introduction = res.data.introduction;
              // this.$store.dispatch("saveUserInfo", user);
              this.edit_content = introduction;
              console.log(introduction);
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
          this.$axios({
        method: "post",
        url: "http://localhost:8000/user/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 6,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          introduction: content_new.value
        }),
      })
        .then((res) => {
              this.$message.success("修改成功！");
              var introduction = res.data.introduction;
              // this.$store.dispatch("saveUserInfo", user);
              console.log(introduction);
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
      init_personal(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/user/",
        data: qs.stringify({
          function_id: 5,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
        }),
      })
        .then((res) => {
              this.imageUrl= res.data.PicID,
              this.new_user_name=res.data.Username,
              this.new_phonenum=res.data.Phone,
              this.new_livecity=res.data.City,
              this.new_status=res.data.Job,
              this.new_liveplace=res.data.City,
              console.log(res.data),
              
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
      edit_personnal(){
          const a1=document.getElementsByClassName("user_img");
          const a2=document.getElementsByClassName("user_name");
          const a3=document.getElementsByClassName("phonenum");
          const a4=document.getElementsByClassName("livecity");
          const a5=document.getElementsByClassName("status");
          // const a6=document.getElementsByClassName("liveplace");
          const a7=document.querySelector("#new_edit");

          const b1=document.getElementsByClassName("new_user_img");
          const b2=document.getElementsByClassName("new_user_name");
          const b3=document.getElementsByClassName("new_phonenum");
          const b4=document.getElementsByClassName("new_livecity");
          const b5=document.getElementsByClassName("new_status");
          // const b6=document.getElementsByClassName("new_liveplace");
          const b7=document.querySelector("#new_submit");
          a1[0].style.display = "none";
          a2[0].style.display = "none";
          a3[0].style.display = "none";
          a4[0].style.display = "none";
          a5[0].style.display = "none";
          // a6[0].style.display = "none";
          a7.style.display="none";
          b1[0].style.display = "block";
          b2[0].style.display = "block";
          b3[0].style.display = "block";
          b4[0].style.display = "block";
          b5[0].style.display = "block";
          // b6[0].style.display = "block";
          b7.style.display="block";
      },
      submit_personnal(){
         const a1=document.getElementsByClassName("user_img");
          const a2=document.getElementsByClassName("user_name");
          const a3=document.getElementsByClassName("phonenum");
          const a4=document.getElementsByClassName("livecity");
          const a5=document.getElementsByClassName("status");
          // const a6=document.getElementsByClassName("liveplace");
          const a7=document.querySelector("#new_edit");

          const b1=document.getElementsByClassName("new_user_img");
          const b2=document.getElementsByClassName("new_user_name");
          const b3=document.getElementsByClassName("new_phonenum");
          const b4=document.getElementsByClassName("new_livecity");
          const b5=document.getElementsByClassName("new_status");
          // const b6=document.getElementsByClassName("new_liveplace");
          const b7=document.querySelector("#new_submit");
          a1[0].style.display = "block";
          a2[0].style.display = "block";
          a3[0].style.display = "block";
          a4[0].style.display = "block";
          a5[0].style.display = "block";
          // a6[0].style.display = "block";
          a7.style.display="block";
          b1[0].style.display = "none";
          b2[0].style.display = "none";
          b3[0].style.display = "none";
          b4[0].style.display = "none";
          b5[0].style.display = "none";
          // b6[0].style.display = "none";
          b7.style.display="none";

          var c1=document.getElementById("new_user_img").value;
          var c2=document.getElementById("new_user_name").value;
          var c3=document.getElementById("new_phonenum").value;
          var c4=document.getElementById("new_livecity").value;
          var c5=document.getElementById("new_status").value;
          // var c6=document.getElementById("new_liveplace").value;
          
          a1[0].innerHTML= c1;
          a2[0].innerHTML= c2;
          a3[0].innerHTML= c3;
          a4[0].innerHTML= c4;
          a5[0].innerHTML= c5;
          // a6[0].innerHTML= c6;
          console.log(c2);
          console.log(c3);
          console.log(c4);
          console.log(c5);
          // console.log(c6);

        this.$axios({
        method: "post",
        url: "http://localhost:8000/user/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 7,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          PicID: this.imageUrl,
          Username: this.new_user_name,
          Phone: this.new_phonenum,
          City: this.new_livecity,
          Job: this.new_status,   
        }),
      })
        .then((res) => {
              this.$message.success("修改成功！");
      
              // this.$store.dispatch("saveUserInfo", user);
              
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
      init(tab,event){
        console.log(tab, event);
        if(tab.index==0){
          this.init_intro();
        }
        else if(tab.index==1){
          this.init_personal();
        }
      },

              },
  mounted(){
      this.init_intro();
    }
            }
 
 

</script>