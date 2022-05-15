<template>
  <div class="register">

    <div class="kuang">
      <h1>注&nbsp;册</h1>
      <el-form ref="form" :model="form" class="form">
        <el-form-item
          prop="email"
          :rules="[{ required: true, message: '邮箱不能为空' }]"
        >
          <el-input
            v-model="form.email"
            placeholder="邮箱"
            type="email"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input
            v-model="form.username"
            placeholder="用户名"
            type="username"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password1"
          prop="password1"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="密码"
            show-password
            type="password"
            clearable
            v-model="form.password1"
            autocomplete="off"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password2"
          prop="password2"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="确认密码"
            show-password
            type="password"
            clearable
            v-model="form.password2"
            autocomplete="off"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn_register" type="primary" @click="register" round
            >注&nbsp;册</el-button>
             <el-button class="btn_reset" @click="resetForm('form')" round>重&nbsp;置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        username: "",
        password1: "",
        password2: "",
      },
    };
  },
  methods: {
    register() {
      if (this.form.username === "" || this.form.password1=== ""||this.form.email==="" || this.form.password2==="") {
        this.$message.warning("请输入相关信息！");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.exec(this.form.email)
      ) {
        this.$message.warning("请检查邮箱格式");
        return;
      }
      if (
        !/^\w+$/.exec(this.form.username) ||
        !/^\w+$/.exec(this.form.password1)||
        !/^\w+$/.exec(this.form.password2)
      ) {
        this.$message.warning("请检查相关信息的输入");
        return;
      }
      if(this.form.password1!=this.form.password2){
          this.$message.warning("两次输入密码不一致，请检查");
      }
      //window.alert("用户名是："+this.username +" 密码是：" +this.password);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/user/register" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          email: this.form.email,
          username: this.form.username,
          password: this.form.password1,
        }),
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          switch (res.data.status_code) {
            case 200:
              this.$message.success("注册成功！");
              /* 将后端返回的 user 信息使用 vuex 存储起来 */
              this.$store.dispatch("saveUserInfo", {
                user: {
                  username: res.data.username,
                  token: res.data.token,
                  userId: res.data.user_id,
                },
              });

              /* 从 localStorage 中读取 preRoute 键对应的值 */
              const history_pth = localStorage.getItem("preRoute");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;

            case 401:
              this.$message.error("用户名不存在！");
              break;
            case 402:
              this.$message.error("密码错误！");
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
     resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style scoped>

.kuang {
  width: 300px;
  height: 400px;
  padding: 0 25px;
  border: 1px solid grey;
  margin: 21px auto;
  border-radius: 25px;
  line-height: 80px; /*可以让文字往下移一点 */
  position: absolute;
  left: 45%;
  top: 15%;
  box-shadow: 1px 1px 10px rgb(240, 242, 245);
}
.register {
  font-family: "Noto Serif SC", serif;
  background-image: url(../../assets/2.webp);
  background-repeat:no-repeat;
   background-size:100%;
  height: 100%;
}
.register >>> .el-input__inner {
  font-family: "Noto Serif SC", serif;
}
.btn_register {
  width: 30%;
  margin-top: 5px;
  font-family: "Noto Serif SC", serif;
}
.btn_reset {
  width: 30%;
  margin-top: 5px;
  font-family: "Noto Serif SC", serif;
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
  color: blue;
}
</style>