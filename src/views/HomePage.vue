<template>
  <el-container>
    <el-header>
        <div class="h">
          <span>
            青租网
          </span>
          <span>
              <a href="../Login" id="login">登录</a>
              <a href="../register" id="register">注册</a>
          </span>
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
  background-color: white;
  text-align: left;
  color:black;
  box-shadow: 1px 1px 10px rgb(240, 242, 245);
  z-index: 1;
}
.h{
  padding-top:15px;
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
}
.h span{
  padding-left: 50px;
  font: bold;
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