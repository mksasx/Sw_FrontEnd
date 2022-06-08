<template>
  <el-container>
    <el-header style="height:80px">
        <div class="h">
          <img class="logo" src="../assets/backgroundimg/Untitled_Artwork.png" alt="">
          <!-- <span>
              青租网
          </span> -->
          <span>
              <a href="../RepairMan_SelfInfo" class="login2" v-if="!usericon.picurl"><img src="../assets/workinfo/1.webp" alt="" class="pic2">&nbsp;&nbsp;&nbsp;{{user.username}}</a>
              <a href="../RepairMan_SelfInfo" class="login2" v-else><img :src="usericon.picurl" alt="" class="pic2">&nbsp;&nbsp;&nbsp;{{user.username}}</a>
              <!-- <a href="../RepairMan_SelfInfo" class="login2" ><img src="../assets/workinfo/1.webp" alt="" class="pic2">&nbsp;&nbsp;&nbsp;{{user.username}}</a> -->
              <a href="../FirstPage" class="login3" @click="logout">登出</a>
          </span>
        </div>    
    </el-header>
    <el-container>
      <el-aside width="auto">
      <repair-man-aside></repair-man-aside>
         </el-aside>
      <el-main>
        <!-- 你输入了{{ msg }} -->
        <router-view></router-view>
        <!-- <el-input v-model="msg" placeholder="请输入内容"></el-input> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import RepairManAside from "../components/RepairManAside.vue";
export default {
  name: "Rp_Man_Home",
  components: {
    RepairManAside,
  },
  // 检验一下是否获取到了
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
      usericon:JSON.parse(sessionStorage.getItem('usericon')),
    };
  },
  methods:{
    getinfo(){
      console.log(sessionStorage.getItem('user'));
      console.log(sessionStorage.getItem('usericon'))
    },
    logout(){
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('usericon');
    }
  },
  mounted(){
      this.getinfo();
    }
};
</script>

 <style scoped>
.el-header {
  height: 100px;
  background-color: white;
  text-align: left;
  color:black;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 1;
}
.el-main {
     /* overflow:visible;  */ 
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
.h{
  margin-top: 10px;
  display: flex;
}
.h .logo{
  width: 100px;
  height: 65px;
  margin-left:32px;
}
.h img{
  width: 50px;
  height: 50px;
}
.el-container {
  height: 100vh;
}
.h a{
  text-decoration: none;
  position: absolute;
  color: black;
 
}
.h span{
  margin-left: 10px;
}

.h a:hover{
  color: wheat;
}
/* .h .login{
   right: 140px;
   vertical-align: middle;
} */
.h .login2 img {
  /* padding-right: 15px; */
  vertical-align: middle;
}
.h .login2 {
  right: 80px;
  top: 17px;
}
.h .login3 {
  right: 30px;
  top: 29px;
}
.pic2 {
border-radius: 100px
}
</style>