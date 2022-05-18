<template>
  <el-container>
    <el-header style="height:80px">
        <div class="h">
          <img src="../assets/backgroundimg/logo.png" alt="">
          <span>
              青租网
          </span>
              <a href="../RepairMan_SelfInfo" class="login"><img src="../assets/workinfo/1.webp" alt=""></a>
              <a href="../RepairMan_SelfInfo" class="login2"><span> 赵一鸣</span></a>
              
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
  name: "Home",
  components: {
    RepairManAside,
  },
  data() {
    return {
      msg: "",
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
.h .login{
   right: 80px;
   vertical-align: middle;
}
.h .login2{
   right: 20px;
   top: 40px;
}
</style>