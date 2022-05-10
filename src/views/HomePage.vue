<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header><div class="h">20373793 马泽远</div></el-header>
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
  background-color: #333;
  text-align: center;
  color:azure;
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
</style>