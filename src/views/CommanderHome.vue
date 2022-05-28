<template>
  <el-container>
    <el-header style="height:80px">
        <div class="h">
          <img src="../assets/backgroundimg/logo.png" alt="">
          <span>
              青租网
          </span>
              <a href="../Commander_FirstPage" class="login2"><span><img src="../assets/workinfo/1.webp" alt="" class="pic2">{{commander_name}}&nbsp;{{commander_id}}</span></a>
          </div>    
    </el-header>
    <el-container>
      <el-aside width="auto">
      <commander-aside></commander-aside>
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
import CommanderAside from "../components/CommanderAside.vue";
export default {
  name: "CommanderHome",
  components: {
    CommanderAside,
  },
  data() {
    return {
      msg: "",
      commander_id:'xd88888888',
      commander_name:'乔丹'
    };
  },
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
.h{
  margin-top: 25px;
  display: flex;
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
   right: 120px;
   vertical-align: middle;
   top:15px;
} */
.h .login2 img{
    padding-right:15px;
    vertical-align:middle;
}
.h .login2{
   right: 20px;
   top: 17px;
}
</style>