<template>
  <el-container>
    <el-header style="height:80px">
        <div class="h">
          <img src="../assets/logo.png" alt="">
          <span>
              青租网
          </span>
              <a href="../Login" id="login">登录</a>
              <a href="../register" id="register">注册</a>
          </div>
          
    </el-header>
    <el-container>
      <el-aside width="auto">
      <common-aside></common-aside>
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
import CommonAside from "../components/CommenAside.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
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
  /* box-shadow: 1px 1px 10px rgb(240, 242, 245); */
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 1;
}
.h{
  padding-top:15px;
  padding-bottom: 15px;
}
.h img{
  width: 40px;
  height: 40px;
}
.el-main {
  padding-top: 0;
}
.el-container {
  height: 100vh;
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
</style>