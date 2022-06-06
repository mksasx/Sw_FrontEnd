<template>
  <el-container>
    <el-header style="height:80px;">
        <div class="h">
          <img src="../assets/backgroundimg/logo.png" alt="">
          <span>
              青租网
          </span>
          <div v-if="user==null">
              <a href="../Login" id="login">登录</a>
              <a href="../register" id="register">注册</a>
          </div>
          <div v-else>
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
      user: JSON.parse(sessionStorage.getItem('user'))
    };
    
  },
  methods:{
    getinfo(){
      console.log(sessionStorage.getItem('user'));
      console.log(this.userid);
    },
    logout(){
      sessionStorage.removeItem('user');
    }
  },
  mounted(){
      this.getinfo();
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
  margin-top: 25px;
  display: flex;
}
.h img{
  width: 40px;
  height: 40px;
}
.h span{
  margin-left: 10px;
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
.h #login{
  right: 60px;
}
.h #register{
  right: 20px;
}
.h #logout{
  right:15px;
  top:22px;
}
</style>