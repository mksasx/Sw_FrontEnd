<template>
  <el-container>
    <el-header style="height:80px;">
        <div class="h">
          <img src="../assets/backgroundimg/Untitled_Artwork.png" alt="">
          <div v-if="user==null">
              <a href="../Login" id="login">登录</a>
              <a href="../register" id="register">注册</a>
          </div>
          <div v-else>
            <div v-if="this.imageUrl==''||this.imageUrl==null">
              <a href="../user" id="icon">
              <img src="../assets/workinfo/1.webp" alt="" style="border-radius:50%">
              </a>
            </div>
            <div v-else>
                <a href="../user" id="icon">
              <img :src="imageUrl" alt="" style="border-radius:50%">
              </a>
            </div>

              
              <a href="../user" id="login">{{user.username}}</a>
              <a href="../FirstPage" id="logout" @click="logout">登出</a>
          </div>
          </div>
          
    </el-header>
    <el-container>
      <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommenAside.vue";


export default {
  name: "Home",
  components: {
    CommonAside,
  },
   created () {

    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')),
      imageUrl: JSON.parse(sessionStorage.getItem('usericon')).picurl,
    };
    
  },
  methods:{
    getinfo(){
      this.user =  JSON.parse(sessionStorage.getItem('user'));
      this.imageUrl = JSON.parse(sessionStorage.getItem('usericon')).picurl;
      console.log(this.user)
    },
    logout(){
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('usericon');
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
              this.username=res.data.Username;
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
  },
  mounted(){
      this.getinfo();
      // this.init_personal();
    }
};
</script>

<style scoped>
.el-main {
     /* overflow:visible;  */
    /* padding-top: 0;  */
  position: absolute;
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: scroll;
  }
  .el-aside{
   display: block;
  position: absolute;
  left: 0;
  top: 80px;
  bottom: 0;
}
.el-header {
  background-color: white;
  text-align: left;
  color:black;
  /* box-shadow: 1px 1px 10px rgb(240, 242, 245); */
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 1;
}

.h{
  margin-top: 10px;
  display: flex;
}
.h img{
  width: 100px;
  height: 65px;
  margin-left: 32px;
}
.h a{
  text-decoration: none;
  position: absolute;
  color: black;
  vertical-align: middle;
}
.h span{
  font: bold; 
  padding-bottom: 50px;
  align-items: center;
}
.h a:hover{
  color: wheat;
}
.h #icon{
  right: 142px;
  top: 10px;
}
.h #icon img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.h #login{
  right: 80px;
  top: 29px;
}
.h #register{
  right: 30px;
  top: 29px;
}
.h #logout{
  right:30px;
  top: 29px;
}
</style>