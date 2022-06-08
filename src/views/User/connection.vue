<template>
<el-container>
    <div class="talk">
         <span style="color:grey;font-size:25px">留言板</span>
    <el-divider></el-divider>
    <div class="content">
        <div v-for="item in showarea" :key="item">
            <div v-if="item.errnum==0" class="user">
              <div class="usericon">
                  <img src="../../assets/backgroundimg/用户.png" alt="">
              </div>
                <div class="usertext">
                     <div class="user_name">
                <span>{{item.name}}</span>
                </div>
              <div class="user_content">
                <span>{{item.text}}</span>
              </div>
                </div>
              <div class="clear"></div>
            </div>
             <div v-if="item.errnum==1" class="user">
                <div class="usericon">
                  <img src="../../assets/backgroundimg/管理员.png" alt="">
              </div>
                <div class="usertext">
                     <div class="user_name">
                <span>{{item.name}}</span>
                </div>
              <div class="user_content">
                <span>{{item.text}}</span>
              </div>
                </div>
              <div class="clear"></div>
            </div>
             <div v-if="item.errnum==2" class="user">
                    <div class="usericon">
                  <img src="../../assets/backgroundimg/师傅.png" alt="">
              </div>
                <div class="usertext">
                     <div class="user_name">
                <span>{{item.name}}</span>
                </div>
              <div class="user_content">
                <span>{{item.text}}</span>
              </div>
                </div>
              <div class="clear"></div>
            </div>
        </div>
    </div>
    <span style="color:grey;font-size:25px">我的回复</span>
    <el-divider></el-divider>
     <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="textarea">
    </el-input>
    <el-button type="primary" plain @click="addintext">提交</el-button>
    </div>
   

</el-container>
</template>
<style scoped>
.user{
  margin-top:20px;
  font-size:15px;
  color: black;
  margin-left: 20px;
  width: 500px;
}
.user .usericon{
  width: 50px;
  height: 50px;
  float: left;
}
.user img{
  width:30px;
  height:30px;
  border-radius: 50%;
  
}
.user_name{
  color: grey;
  font-size: 10px;
}
.user_content{
  border-radius: 5px;
  background-color: rgb(240, 242, 245);
  width:fit-content;
  margin-top: 10px;
  word-break:break-all;
  text-align: left;
  margin-left: 40px;
  color: black;
  font-size: 15px;
  padding: 10px;
}
.user_content p{
  font-size: 15px;
}










.clear{
  clear: both;
}
.talk{
    width: 100%;
    text-align: left;
}
.content{
   
    height: 700px;
    width: 1000px;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 50px;
    overflow-y: scroll;
    margin-left: 200px;
    /* background-color: rgb(240, 242, 245); */
}
.content p{
    padding: 20px;
}
.el-input{
    width: 100%;
}
.el-button{
  margin-top: 20px;
}
</style>
<script>
import qs from "qs";
export default {
  data() {
    return {
      name:JSON.parse(sessionStorage.getItem('user')).username,
      errnum:'0',
      id:JSON.parse(sessionStorage.getItem('user_work')).userId,
      showarea: [
      //   {
      //     errnum: 1,
      //     id: 1,
      //     text: '您好很高兴为您服务！',
      //     name: '客服一号',
      // },
      //   {
      //     errnum: 0,
      //     id: 1,
      //     text: '能不能快点，房子要被淹了！',
      //     name: '超级暴龙战神',
      // },
      //   {
      //     errnum: 2,
      //     id: 1,
      //     text: '别着急，老子快到了！',
      //     name: '王师傅',
      // },
      ],
      textarea: '',
    }
  },
  created(){
      
  },
  methods: {
    	addintext(){
        var obj = {
          errnum: this.errnum,
          id:this.id,
          text:this.textarea,
          name:this.name
          };
        this.showarea.push(obj);
        this.textarea='';
         this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 14,
          user_id: JSON.parse(sessionStorage.getItem('user_work')).userId,
          work_id: JSON.parse(sessionStorage.getItem('user_work')).workId,
          errornumber: obj.errnum,
          id:obj.id,
          text:obj.text,
          name:obj.name
        }),
      })
        .then((res) => {
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
      init(){
         this.$axios({
        method: "post",
        url: "http://localhost:8000/service/",
        data: qs.stringify({
          function_id: 11,
          work_id: JSON.parse(sessionStorage.getItem('user_work')).workId,
          user_id: JSON.parse(sessionStorage.getItem('user_work')).userId,
        }),
      })
        .then((res) => {
          this.showarea = res.data.massagelist;
          console.log(this.showarea)
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
    },
     mounted(){
    	// var that=this,data={}
      //   $.post("{:url('indexApi/client')}",data,function(e){
      //       // 赋值给data 中list
      //   	that.list=e
      //   })
        this.init();
    }
}
</script>


