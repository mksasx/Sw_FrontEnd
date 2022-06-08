<template>
<el-container>
    <el-header>
         <el-steps :active="active" finish-status="success" simple>
            <el-step title="步骤 1:确认合同信息" icon="el-icon-edit"></el-step>
            <el-step title="步骤 2:生成合同线下签约" icon="el-icon-upload"></el-step>
            <el-step title="步骤 3:等待审核通过" icon="el-icon-user"></el-step>
         </el-steps>
    </el-header>
   <el-main>
       <div class="basic">
        <span>基本信息确认,确认无误后点击下一步自动生成合同</span>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="出租方:">
    {{landlordname}}
  </el-form-item>
  <el-form-item label="承租方:">
    {{username}}
  </el-form-item>
  <el-form-item label="房源地址:">
    {{address}}
  </el-form-item>
  <el-form-item label="房源面积:">
    {{area}}m²
  </el-form-item>
  <el-form-item label="租赁期:">
    {{rentday}}月
  </el-form-item>
  <el-form-item label="租赁期起止时间:">
    从 {{start}} 至 {{end}}
  </el-form-item>
  
    
</el-form>
    </div>

        <div class="upload">
            <span>上传线下签约的合同</span>
            <el-divider></el-divider>
            <el-upload
                class="upload-demo"
                drag
                action=""
                :http-request="submitAvatarHttp"
                :file-list="uploadFiles"
                list-type="picture"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>

        <div class="wait">
            <el-col :sm="12" :lg="6">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
    </el-result>
  </el-col>
        </div>
    
   </el-main>
    <div class="submit">
      <el-button type="primary" @click="next" id="submit">下一步</el-button>
  </div>
    
    
</el-container>
    
</template>

<style scoped>
    .basic{
        text-align: left;
        width: 100%;
        color: #000;
        font-size: 20px;
        margin-top: 50px;
    }
    .submit{
        display: flex;
        margin-left: 50px;
        margin-top: 100px;
         justify-content: center;
        align-items: center;
    }
    .upload{
        display: none;
        text-align: left;
        width: 100%;
        color: #000;
        font-size: 20px;
        margin-top: 50px;
        
    }
    .wait{
        display: none;
        text-align: left;
        width: 100%;
        color: #000;
        /* height: 200px; */
        font-size: 20px;
        margin-top: 50px;
        justify-content: center;
        align-items: center;
    }
</style>
<script>
let formdata = new FormData();
import qs from "qs";
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        username:'',
        landlordname:'',
        address:'',
        area:'',
        rentday:'',
        start:'',
        end:'',
        active: 0,
        flag: 0,
        uploadFiles:[],
      }
    },
    methods: {
    submitAvatarHttp(val){
        formdata.append('file',val.file)
    },
      init(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/information/",
        data: qs.stringify({
          function_id: 6,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          house_id: sessionStorage.getItem('justhouseid'),
          start_day: JSON.parse(sessionStorage.getItem('justrenttime')).begin_time.split('T')[0],
          month: JSON.parse(sessionStorage.getItem('justrenttime')).finish_time,
          flag: 1
        }),
      })
        .then((res) => {
            this.username=res.data.Username,
            this.landlordname=res.data.Landlordname,
            this.address=res.data.Address,
            this.area=res.data.Area,
            this.rentday=res.data.Month,
            this.start=res.data.start_day,
            this.end=res.data.finish_day,
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
      genebond(){
        this.$axios({
        method: "post",
        url: "http://localhost:8000/information/",
        data: qs.stringify({
          function_id: 7,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          username: this.username,
          landlordname:this.landlordname,
          address:this.address,
          area:this.area,
          starttime:this.start,
          endtime:this.end,
          house_id: sessionStorage.getItem('justhouseid')
        }),
      })
        .then((res) => {
            this.$message.success('合同已生成')
            var pdf = res.data.pdf_url
            window.open(pdf)
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      },
      nextstep1(){
        this.init();
        this.genebond();
      },
      nextstep2(){
        
              
              //  let formdata = new FormData();
              //  formdata.append('file',file.file)
                this.$axios({
                method: "post",
                headers: { "Content-Type": "multipart/form-data" },
                url: "http://localhost:8000/information/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: {
                  function_id: 6,
                  user_id: JSON.parse(sessionStorage.getItem('user')).userId,
                  house_id: sessionStorage.getItem('justhouseid'),
                  start_day: JSON.parse(sessionStorage.getItem('justrenttime')).begin_time.split('T')[0],
                  month: JSON.parse(sessionStorage.getItem('justrenttime')).finish_time,
                  file: formdata.get('file'),
                  flag: 2
                },

              })
              .then((res) => {
                this.$message.success('提交成功，请您等待审批')
              })
              
      },
        next() {
        if (this.active++ > 2) this.active = 0;
        this.flag=this.flag+1;
        const  a = document.getElementsByClassName("basic");
        const  b = document.getElementsByClassName("upload");
        const  c = document.getElementsByClassName("wait");
        const  d = document.querySelector("#submit");
        if(this.flag==1){
            a[0].style.display = "none";
            b[0].style.display = "block";
            c[0].style.display = "none";
            this.nextstep1();
        }
        else if(this.flag==2){
            let file = formdata.get('file');
          if(file==null){
            this.$message.error('请上传合同图片')
            this.flag=this.flag-1;
            return;
          }
            a[0].style.display = "none";
            b[0].style.display = "none";
            c[0].style.display = "flex";
            d.innerHTML='返回';
            this.nextstep2();
        }
        else if(this.flag==3){
            this.flag=0;
            history.go(-1);
        }
        
      },
    },
    mounted(){
      this.init();
    }
  }
</script>