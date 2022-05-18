<template>
  <div class="container">
      <div class="title">
          <img src="../../assets/backgroundimg/selfinfo.png">您的个人信息
      </div>
      <el-divider class="div1"></el-divider>
         <div class="main">
            <div class="left">
                <div class="pic"><img src="../../assets/workinfo/1.webp" alt=""></div>
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button class="left_b" size="mini" type="text" round>修改头像</el-button>
                <div slot="tip" class="el-upload__tip">（只能上传jpg/png文件,且不超过500kb）</div>
                </el-upload>
            </div>
            <div class="right">
                <div class="div2"><el-divider direction="vertical"></el-divider></div>
                <div class="rows-fi">
                    <i class="el-icon-user-solid icon"></i>
                    <span class="hanzi">师傅姓名</span>
                    <span class="num">赵一鸣</span>    
                </div>
                <div class="rows-f">
                    <i class="el-icon-bank-card icon"></i>
                    <span class="hanzi">师傅ID</span>
                    <span class="num">{{ID}}</span>    
                </div>
                 <div class="rows-f">
                    <i class="el-icon-phone icon"></i>
                    <span class="hanzi">联系电话</span>
                    <span class="num">{{phoneNum}}</span>    
                </div>
                <div class="right_b1">
                <el-button  size="mini" type="text" @click="PhoneChangeDialogVi = true" round>更换电话</el-button>
                <el-button  size="mini" type="text" @click="PasswordChangeDialogVi = true" round>修改密码</el-button>
                </div>
                <el-form ref="form" :model="form" class="form" hide-required-asterisk="false">
                  <el-dialog
                    title="更换您的电话"
                    :visible.sync="PhoneChangeDialogVi"
                    width="30%"
                    center
                    :close-on-click-modal="false"
                    :close-on-press-escape= "false">
                        <el-form-item
                        prop="phoneNumChange"
                        :rules="[{ required: true, message: '电话号码不能为空' }]"
                        label="请输入新电话号码："
                        >
                            <el-input v-model="form.phoneNumChange" placeholder="请输入新的电话号码"   suffix-icon="el-icon-phone"></el-input>
                        </el-form-item>
                        <span  slot="footer" class="dialog-footer">
                                <el-form-item>
                                    <el-button @click="PhoneChangeDialogVi = false,resetForm('form')">取消更改</el-button>
                                    <el-button type="primary" size= "medium" @click="changePhone(),resetForm('form')">确认更改</el-button>
                                </el-form-item>
                        </span> 
                 </el-dialog>
                </el-form>

                <el-form ref="password" :model="password" class="password" hide-required-asterisk="false" :rules="rules">
                 <el-dialog
                    title="更改您的密码"
                    :visible.sync="PasswordChangeDialogVi"
                    width="30%"
                    :before-close="handleClose"
                     :close-on-click-modal="false"
                    :close-on-press-escape= "false"
                    center>
                     <el-form-item prop="originPassWord" label="请输入旧密码：" :rules="[{ required: true, message: '旧密码不能为空' }]"> 
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
                     <el-form-item prop="passwordChange" label="请输入新密码：" :rules="[{ required: true, message: '新密码不能为空' }]"> 
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
                     <el-form-item prop="checkpasswordChange" label="请再输入一遍新密码：" :rules="[{ required: true, message: '新密码不能为空' }]"> 
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
                                <el-button @click="PasswordChangeDialogVi = false,resetForm('password')">取消更改</el-button>
                                <el-button type="primary" @click="changePass(),resetForm('password')">确认更改</el-button>
                            </span>
                 </el-dialog>
                </el-form>
            </div>  
        </div>    
  </div>

</template>

<script>
export default {
  name: "RepairMan_SelfInfo",
  data() {
      return {
        imageUrl: '',
        PhoneChangeDialogVi: false,
        PasswordChangeDialogVi:false,
        phoneNum:'88888888',
        ID:'88888888',
        form: {
        phoneNumChange:'',
        },
        password:{
            originPassWord:'',
            passwordChange:'',
            checkpasswordChange:''
        },
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      changePhone()
      {
          if(!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.exec(this.form.phoneNumChange))
          {
               this.$message.warning("请检查手机号码格式");
               return;
          }
          if(this.form.phoneNumChange===this.phoneNum)
          {
              this.$message.warning("与原有手机号码相同");
              return;
          }
          this.$message.success("修改成功");
          this.PhoneChangeDialogVi=false;
          this.phoneNum=this.form.phoneNumChange;
      },
      changePass(){
        if(this.password.originPassWord === "")
        {
            this.$message.warning("旧密码不能为空！");
            return;
        }
        if(this.password.passwordChange === ""||this.password.checkpasswordChange === "") {
            this.$message.warning("新密码不能为空！");
            return;
        }
        if(this.password.originPassWord!=='8888')
        {
            this.$message.warning("旧密码输入错误");
            return;
        }
        if(!/^\w+$/.exec(this.password.passwordChange))
        {
        this.$message.warning("请检查新密码的格式");
        return;
        }
        if(this.password.passwordChange === this.password.originPassWord) {
            this.$message.warning("新密码与旧密码相同！请修改！");
            return;
        }
        if(this.password.passwordChange !== this.password.checkpasswordChange) {
            this.$message.warning("前后输入密码不一致！");
            return;
        }
        this.$message.success("修改成功");
        this.PasswordChangeDialogVi=false;
        this.password.originPassWord=this.password.passwordChange;
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
}
</script>

<style scoped>
@media screen and (max-width:1000px ) {
    .container{
    height:62.5%;
    width:70%;
    margin:15px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
}
.container{
    height:62.5%;
    width:50%;
    margin:15px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.div1{
    margin-bottom:10px;
}
.title{
    height:10%;
    line-height:43.99px;
    display:flex;
    align-items:center;
    justify-content:left;
    font-size:20px;
    font-weight:200;
    /*上面三行让内容居中*/
    margin-bottom: -25px;
}
.title img{
    height: 20px;
    margin-right:10px;
    margin-left: 15px;
    vertical-align: middle;
}
.main{
    width:100%;
    height:87.99%;
}
.left{
    float:left;
    width:40%;
    height:100%;
    /* background-color:saddlebrown; */
}
.right{
    float:left;
    width:60%;
    height:100%;
    /* background:pink; */
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
}
.pic{
    margin:0 auto;
    padding-top:10%;
    margin-bottom: -15px;
    height:55%;
    width:80%;
    /* background:pink; */
}
.pic img{
    height:100%;
    width:100%;
    border-radius: 50%;
}
.el-button{
    font-size: 15px;
}
.left_b{
     margin-top:30px;
     margin-bottom: 18px;
     
}
.right_b1{
    margin-top: 59%;
    margin-left:75px;
    text-align: left;
}
.el-button :hover{
     color:bisque;
     }
.el-upload__tip{
    margin-top:-20px;
}
.div2{
    float:left;
    margin-top: 13px;
    padding-left: 4px;   
}
.div2 .el-divider{
    height:16.5em;
}
.rows-fi{
    display: flex;
    float:left;
    margin-top: 45px;
    margin-left:12px;
    align-items:center;
    justify-content:left;
}
.rows-f{
    display: flex;
    float:left;
    margin-top: 25px;
    margin-left:12px;
    align-items:center;
    justify-content:left;
}
.icon{
    font-size:30px;
    vertical-align: middle;
}
.hanzi{
    text-align:left;
    margin-left:18px;
    margin-right:40px;
    width:100px;
}
</style>