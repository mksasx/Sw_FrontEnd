<template>
  <div class="container">
    <div class="title">
      <img src="../../assets/backgroundimg/selfinfo.png" />我的个人信息
    </div>
    <el-divider class="div1"></el-divider>
    <div class="main">
      <div class="left">
        <div class="pic1" v-if="!imageUrl"><img src="../../assets/workinfo/1.webp" alt="" ></div>
        <div class="pic1" v-else><img :src="imageUrl" alt="" ></div>
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          :show-file-list="false"
          :on-change="handleChange"
          :http-request="submitAvatarHttp"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button class="left_b" size="mini" type="text" round 
            >修改头像</el-button>
          <div slot="tip" class="el-upload__tip">
            （只能上传jpg/png文件,且不超过2MB）
          </div>
        </el-upload>
      </div>
      <div class="right">
        <div class="div2"><el-divider direction="vertical"></el-divider></div>
        <div class="rows-fi">
          <i class="el-icon-user-solid icon"></i>
          <span class="hanzi">管理员姓名</span>
          <span class="num">{{ commander_name }}</span>
        </div>
        <div class="rows-f">
          <i class="el-icon-bank-card icon"></i>
          <span class="hanzi">管理员ID</span>
          <span class="num">{{ user.userId }}</span>
        </div>
        <div class="rows-f">
          <i class="el-icon-phone icon"></i>
          <span class="hanzi">联系电话</span>
          <span class="num">{{ phoneNum }}</span>
        </div>
        <div class="rows-f">
          <i class="el-icon-message icon"></i>
          <span class="hanzi">联系邮箱</span>
          <span class="num">{{ Commander_Email }}</span>
        </div>
        <div class="right_b1">
          <el-button
            size="mini"
            type="text"
            @click="PhoneChangeDialogVi = true"
            round
            >更换电话</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="PasswordChangeDialogVi = true"
            round
            >修改密码</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="EmailChangeDialogVi = true"
            round
            >更换邮箱</el-button
          >
        </div>

        <el-form
          ref="eform"
          :model="eform"
          class="eform"
          hide-required-asterisk="false"
          @submit.native.prevent
        >
          <el-dialog
            title="更换您的邮箱"
            :visible.sync="EmailChangeDialogVi"
            width="30%"
            center
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <el-form-item
              prop="emailChange"
              :rules="[{ required: true, message: '邮箱不能为空' }]"
              label="请输入新的邮箱号码："
            >
              <el-input
                v-model="eform.emailChange"
                placeholder="请输入新的邮箱号码"
                suffix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
              <el-form-item>
                <el-button
                  @click="(EmailChangeDialogVi = false), resetForm('eform')"
                  >取消更改</el-button
                >
                <el-button
                  type="primary"
                  size="medium"
                  @click="changeEmail(), resetForm('eform')"
                  >确认更改</el-button
                >
              </el-form-item>
            </span>
          </el-dialog>
        </el-form>

        <el-form
          ref="form"
          :model="form"
          class="form"
          hide-required-asterisk="false"
          @submit.native.prevent
        >
          <el-dialog
            title="更换您的电话"
            :visible.sync="PhoneChangeDialogVi"
            width="30%"
            center
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <el-form-item
              prop="phoneNumChange"
              :rules="[{ required: true, message: '电话号码不能为空' }]"
              label="请输入新电话号码："
            >
              <el-input
                v-model="form.phoneNumChange"
                placeholder="请输入新的电话号码"
                suffix-icon="el-icon-phone"
              ></el-input>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
              <el-form-item>
                <el-button
                  @click="(PhoneChangeDialogVi = false), resetForm('form')"
                  >取消更改</el-button
                >
                <el-button
                  type="primary"
                  size="medium"
                  @click="changePhone(), resetForm('form')"
                  >确认更改</el-button
                >
              </el-form-item>
            </span>
          </el-dialog>
        </el-form>

        <el-form
          ref="password"
          :model="password"
          class="password"
          hide-required-asterisk="false"
        >
          <el-dialog
            title="更改您的密码"
            :visible.sync="PasswordChangeDialogVi"
            width="30%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            center
          >
            <el-form-item
              prop="originPassWord"
              label="请输入旧密码："
              :rules="[{ required: true, message: '旧密码不能为空' }]"
            >
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="在此输入旧密码"
                show-password
                type="password"
                clearable
                v-model="password.originPassWord"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="passwordChange"
              label="请输入新密码："
              :rules="[{ required: true, message: '新密码不能为空' }]"
            >
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="在此输入新密码"
                show-password
                type="password"
                clearable
                v-model="password.passwordChange"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="checkpasswordChange"
              label="请再输入一遍新密码："
              :rules="[{ required: true, message: '新密码不能为空' }]"
            >
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="再此输入新密码"
                show-password
                type="password"
                clearable
                v-model="password.checkpasswordChange"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="(PasswordChangeDialogVi = false), resetForm('password')"
                >取消更改</el-button
              >
              <el-button
                type="primary"
                @click="changePass(), resetForm('password')"
                >确认更改</el-button
              >
            </span>
          </el-dialog>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Commander_FirstPage",
  inject: ["reload"],
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      imageUrl: "",
      tmpUrl: "",
      flag: 0,
      PhoneChangeDialogVi: false,
      PasswordChangeDialogVi: false,
      EmailChangeDialogVi: false,
      commander_name: "",
      phoneNum: "",
      Commander_Email: "",
      form: {
        phoneNumChange: "",
      },
      eform: {
        emailChange: "",
      },
      password: {
        originPassWord: "",
        passwordChange: "",
        checkpasswordChange: "",
      },
    };
  },
  methods: {
    submitAvatarHttp(val)
    {
        var a= this.beforeAvatarUpload1(val.file)
        if(!a)
        {
            return;
        }
        let formdata=new FormData();
        formdata.append("file",val.file);
        console.log(formdata.get('file'));
        console.log("in!",this.imageUrl);
        this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        headers: { "Content-Type": "multipart/form-data" },
        url: "http://localhost:8000/Commander_FirstPage/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: {
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 9,
          user_id: this.user.userId,
          avatar: formdata.get('file'), 
        },
      }).then((res) => {
        //   console.log(res.data.Phone);
        var usericon = {userId: this.user.userId,picurl: res.data.avatar_url};
        this.$store.dispatch("saveusericon", usericon);
        console.log(res);
        this.imageUrl=res.data.avatar_url;
        location.reload();
      });
    },
    handleChange(file){
        var a= this.beforeAvatarUpload1(file)
        if(!a)
        {
            return;
        }
        this.tmpUrl = URL.createObjectURL(file.raw);
        console.log("File",this.tmpUrl);
        this.imageUrl= (file == null) ? this.imageUrl : this.tmpUrl;
    },
    getinfo() {
      console.log(sessionStorage.getItem("user"));
      console.log(this.user.userId);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Commander_FirstPage/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 1,
          id: this.user.userId,
        }),
      }).then((res) => {
        console.log(res);
        this.imageUrl=res.data.path
        this.phoneNum = res.data.phone;
        this.Commander_Email = res.data.email;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload1(file) {
      const isJPG =file.type == 'image/jpeg' || file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    beforeAvatarUpload(file) {
      const isJPG =file.type == 'image/jpeg' || file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片格式错误!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeEmail() {
      if (this.eform.emailChange === this.Commander_Email) {
        this.$message.warning("与原有邮箱相同");
        return;
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Commander_FirstPage/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 12,
          user_id: this.user.userId,
          email: this.eform.emailChange,
        }),
      }).then((res) => {
        switch (res.data.errornumber) {
          case 0:
            this.$message.success("邮箱修改成功！");
            break;
          case 7:
            this.$message.warning("邮箱格式错误！请检查邮箱格式");
            break;
        }
      });
      //   this.$message.success("修改成功");
      this.EmailChangeDialogVi = false;
      this.reload();
    },
    changePhone() {
      //   if (
      //     !/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(
      //       this.form.phoneNumChange
      //     )
      //   ) {
      //     this.$message.warning("手机号格式错误！请检查手机号码格式");
      //     return;
      //   }
      if (this.form.phoneNumChange === this.phoneNum) {
        this.$message.warning("与原有手机号码相同");
        return;
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Commander_FirstPage/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 10,
          user_id: this.user.userId,
          phone: this.form.phoneNumChange,
        }),
      }).then((res) => {
        switch (res.data.errornumber) {
          case 0:
            this.$message.success("手机号修改成功！");
            break;
          case 3:
            this.$message.warning("手机号格式错误！请检查手机号码格式");
            break;
        }
      });
      //   this.$message.success("修改成功");
      this.PhoneChangeDialogVi = false;
      this.reload();
      //   this.phoneNum = this.form.phoneNumChange;
    },
    changePass() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/Commander_FirstPage/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          function_id: 11,
          user_id: this.user.userId,
          original_password: this.password.originPassWord,
          new_password1: this.password.passwordChange,
          new_password2: this.password.checkpasswordChange,
        }),
      }).then((res) => {
        switch (res.data.errornumber) {
          case 4:
            this.$message.warning("原密码输入错误！");
            break;
          case 6:
            this.$message.warning("密码格式错误，只能输入数字和字母的组合！");
            break;
          case 5:
            this.$message.warning("两次输入的密码不一致！");
            break;
          case 0:
            this.$message.success("用户密码修改成功！");
            break;
        }
      });
      this.PasswordChangeDialogVi = false;
      this.reload();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted: function () {
    this.commander_name = this.user.username;
    this.getinfo();
  },
};
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  .container {
    height: 62.5%;
    width: 70%;
    margin: 15px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
.container {
  height: 62.5%;
  width: 50%;
  margin: 15px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.div1 {
  margin-bottom: 10px;
}
.title {
  height: 10%;
  line-height: 43.99px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 20px;
  font-weight: 200;
  /*上面三行让内容居中*/
  margin-bottom: -25px;
}
.title img {
  height: 20px;
  margin-right: 10px;
  margin-left: 15px;
  vertical-align: middle;
}
.main {
  width: 100%;
  height: 87.99%;
}
.left {
  float: left;
  width: 40%;
  height: 100%;
  /* background-color:saddlebrown; */
}
.right {
  float: left;
  width: 60%;
  height: 100%;
  /* background:pink; */
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
.pic1 {
  margin: 0 28px;
  padding-top: 10%;
  margin-bottom: -15px;
  height: 55%;
  width: 80%;
  padding-left: 0px;
  /* background:pink; */
}
.pic1 img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.el-button {
  font-size: 15px;
}
.left_b {
  margin-top: 30px;
  margin-bottom: 18px;
}
.right_b1 {
  margin-top: 57%;
  margin-left: 50px;
  text-align: left;
}
.el-button :hover {
  color: bisque;
}
.el-upload__tip {
  margin-top: -20px;
}
.div2 {
  float: left;
  margin-top: 13px;
  padding-left: 4px;
}
.div2 .el-divider {
  height: 16.5em;
}
.rows-fi {
  display: flex;
  float: left;
  margin-top: 40px;
  margin-left: 12px;
  align-items: center;
  justify-content: left;
}
.rows-f {
  display: flex;
  float: left;
  margin-top: 15px;
  margin-left: 12px;
  align-items: center;
  justify-content: left;
}
.icon {
  font-size: 30px;
  vertical-align: middle;
}
.hanzi {
  text-align: left;
  margin-left: 18px;
  margin-right: 40px;
  width: 100px;
}
</style>