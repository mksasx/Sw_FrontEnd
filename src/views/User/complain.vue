<template>
<el-container>
    <el-head>
        <el-page-header @back="goBack" content="">
        </el-page-header>
        </el-head>
    <el-main>
    <div class="basic">
        <span style="color:black;font-size:20px">房源信息</span>
        <el-divider></el-divider>
    <el-descriptions title="" :column="1">
    
    <el-descriptions-item label="房源ID">{{houseid}}</el-descriptions-item>
    <el-descriptions-item label="房源名称">{{housename}}</el-descriptions-item>
    <el-descriptions-item label="租金">{{money}}</el-descriptions-item>
    <el-descriptions-item label="户型">{{model}}</el-descriptions-item>
    <el-descriptions-item label="面积">{{area}}</el-descriptions-item>
    <el-descriptions-item label="楼层">{{floor}}</el-descriptions-item>
    <el-descriptions-item label="类型">{{housestyle}}</el-descriptions-item>
    <el-descriptions-item label="房东联系方式">{{housephone}}</el-descriptions-item>
    <el-descriptions-item label="租住起始日期">{{start}}</el-descriptions-item>
    <el-descriptions-item label="租住结束日期">{{end}}</el-descriptions-item>
    </el-descriptions>
    </div>
    <div class="complain_content">
        <span style="color:black;font-size:20px">上传报修/投诉信息</span>
        <el-divider></el-divider>
        <el-upload
            class="upload-demo"
            drag
            action=""
            :on-change="loadJsonFromFile"
            :http-request="submitAvatarHttp"
            :file-list="uploadFiles"
            limit="1"
            list-type="picture">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <el-button type="primary" round style="margin-top:50px" @click="submit">点击提交</el-button>
    </div>
    </el-main>

</el-container>
</template>

<style scoped>
.el-main{
    text-align: left;
}
.complain_content{
    float: left;
    margin-top: 50px;
}
.upload-demo{
    margin-bottom: 50px;
}
.el-divider{
    width: 1000px;
}
</style>

<script>
let formdata = new FormData();
import qs from 'qs';
export default {
  data() {
    return {
      imageUrl:'',
      textarea: '',
      houseid:'',
      housename:'',
      money:'',
      model:'',
      area:'',
      floor:'',
      housestyle:'',
      hosterphone:'',
      start:'',
      end:'',
      uploadFiles:[]
    }
  },
   methods: {
     submitAvatarHttp(val){
       
       formdata.append('file',val.file)
      
      //   this.$axios({
      //   method: "post",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   url: "http://localhost:8000/service/" ,
      //   data: {
      //     function_id: 13,
      //     user_id: JSON.parse(sessionStorage.getItem('user')).userId,
      //     order_id: sessionStorage.getItem('justorderid'),
      //     picture: formdata.get('file'),
      //     description: this.textarea
      //   },
        
      // })
      //   .then((res) => {
      //         this.imageUrl = res.data.avatar_url
              
              
      //   });
     },
    loadJsonFromFile(file, fileList) {
      this.uploadFiles = fileList
    },
      goBack() {
        console.log('go back');
        history.go(-1);
      },
      submit(){
          if(this.textarea==''){
              this.$message.warning("请输入内容");
          }
          else{

            let file = this.uploadFiles[0];
            console.log(file)
              
              //  let formdata = new FormData();
              //  formdata.append('file',file.file)
               this.$message.success("提交成功");
                this.$axios({
                method: "post",
                headers: { "Content-Type": "multipart/form-data" },
                url: "http://localhost:8000/service/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: {
                  function_id: 13,
                  user_id: JSON.parse(sessionStorage.getItem('user')).userId,
                  order_id: sessionStorage.getItem('justorderid'),
                  picture: formdata.get('file'),
                  description: this.textarea
                },

              })
                .then((res) => {
                      this.imageUrl = res.data.avatar_url
                      // this.$store.dispatch("saveUserInfo", user);

                });



              history.go(-1);
          }
      },
      init(){
          this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 9,
          user_id: JSON.parse(sessionStorage.getItem('user')).userId,
          order_id: sessionStorage.getItem('justorderid'),
        }),
      })
        .then((res) => {
          this.houseid=res.data.HouseID;
          this.housename=res.data.Housename;
          this.money=res.data.Rent;
          this.model=res.data.Housetype;
          this.area=res.data.Area;
          this.floor=res.data.Floor;
          this.housestyle=res.data.Type;
          this.hosterphone=res.data.LandlordPhone;
          this.start = res.data.OrderDate;
          this.end = res.data.DueDate;
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
        })
        .catch((err) => {
          console.log(err); 
        });
      }
    },
    mounted(){
        this.init();
    }
}
</script>