<template>
  <div class="login">
    <img src="../../assets/backgroundimg/bg.png" alt="">
    <div class="logo">
      <div class="pic">
        <img src="../../assets/backgroundimg/Untitled_Artwork.png" alt="">
      </div>
      <div class="name">
        青租网
      </div>
    </div>
    <div class="kuang">
      <h1>登&nbsp;录</h1>
      <el-form ref="form" :model="form" class="form">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '邮箱不能为空' }]"
        >
          <el-input
            v-model="form.username"
            placeholder="邮箱"
            type="username"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="密码"
            show-password
            type="password"
            clearable
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn_login" type="primary" @click="login" round
            >登&nbsp;&nbsp;录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="regis" @click="toRegister">注册账号</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.form.username === "" && this.form.password === "") {
        this.$message.warning("请输入邮箱和密码！");
        return;
      }
      else if (this.form.username === "") {
        this.$message.warning("邮箱不能为空!");
        return;
      }
      else if(this.form.password === "") {
        this.$message.warning("密码不能为空！");
        return;
      }

      // if (
      //   !/^\w+$/.exec(this.form.username) ||
      //   !/^\w+$/.exec(this.form.password)
      // ) {
      //   this.$message.warning("请检查邮箱和密码的输入");
      //   return;
      // }
      //window.alert("用户名是："+this.username +" 密码是：" +this.password);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Login/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          email: this.form.username,
          password: this.form.password,
        }),
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          var usericon = {userId:  res.data.User_id,picurl:res.data.avatar_url};
          this.$store.dispatch("saveusericon", usericon);
          switch (res.data.errornumber) {
            case 0:
              this.$message.success("登录成功！");
              var user = {userId: res.data.User_id,username: res.data.Username};
              this.$store.dispatch("saveUserInfo", user);
              console.log(user);
              console.log(this.$store.state.user);
              window.location.href="FirstPage";
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("FirstPage");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
            case 1:
              this.$message.success("登录成功！");
              var user = {userId: res.data.User_id,username: res.data.Username};
              this.$store.dispatch("saveUserInfo", user);
               window.location.href="Commander_FirstPage";
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("Commander_FirstPage");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
              case 2:
              this.$message.success("登录成功！");
              var user = {userId: res.data.User_id,username: res.data.Username};
              this.$store.dispatch("saveUserInfo", user);
              window.location.href="RepairMan_SelfInfo";
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("RepairMan_SelfInfo");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
            case 3:
              this.$message.error("账号不存在！");
              break;
            case 4:
              this.$message.error("密码错误！");
              break;
              case 5:
              this.$message.error("请求方式错误！");
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
    toRegister() {
      this.$router.push("/register");
    },
  },

};

  
</script>

<style scoped>

.logo{
  width: 300px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 15%;
  
}
.logo .pic{
  float: left;
  margin-top: 20px;
}
.logo .name{
  float: left;
  font-size: 40px;
  font-weight:400;
  margin-left: 50px;
  margin-top: 20px;
}
.logo .pic img{
  width: 100px;
  height: 65px;
}
.kuang {
  width: 300px;
  height: 315px;
  padding: 0 25px;
  border: 1px solid grey;
  /* margin: 21px auto; */
  border-radius: 25px;
  line-height: 80px; /*可以让文字往下移一点 */
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 30%;
  box-shadow: 1px 1px 10px rgb(240, 242, 245);
}
.kuang h1{
  font-weight: 400;
}
.login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
   background-repeat:no-repeat;
   background-size:100%;
   background-image: url("../../assets/backgroundimg/bg.png");
  /* height: 100%; */
  overflow: hidden;
  overflow-y: hidden;
}
.login img{
  height: 800px;
}
.login >>> .el-input__inner {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn_login {
  width: 100%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.regis {
  float: right;
  margin-top: -34px;
  color: #999;
  cursor: pointer;
}
.regis {
  float: right;
  margin-top: -34px;
  color: #999;
  cursor: pointer;
}
.regis:hover {
  color: wheat;
}
</style>