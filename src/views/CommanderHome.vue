<template>
  <el-container>
    <el-header style="height: 80px">
      <div class="h">
        <img src="../assets/backgroundimg/logo.png" alt="" />
        <span> 青租网 </span>
        <span>
          <a href="../Commander_FirstPage" class="login2">
          <img src="../assets/workinfo/1.webp" alt="" class="pic2" />{{user.username}}&nbsp;&nbsp;{{ user.userId }}
          </a>
          <a href="../FirstPage" class="login3" @click="logout">登出</a>
          </span>
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
  // 检验一下是否获取到了
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
    };
  },
  methods: {
    getinfo() {
      console.log(sessionStorage.getItem("user"));
    },
    logout() {
      sessionStorage.removeItem("user");
    },
  },
  mounted() {
    this.getinfo();
  },
};
</script>

 <style scoped>
.el-header {
  height: 100px;
  background-color: white;
  text-align: left;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 80px;
  bottom: 0;
}
.h {
  margin-top: 25px;
  display: flex;
}
.h img {
  width: 50px;
  height: 50px;
}
.el-container {
  height: 100vh;
}
.h a {
  text-decoration: none;
  position: absolute;
  color: black;
}
.h span {
  margin-left: 10px;
}

.h a:hover {
  color: wheat;
}
/* .h .login{
   right: 120px;
   vertical-align: middle;
   top:15px;
} */
.h .login2 img {
  padding-right: 15px;
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
</style>