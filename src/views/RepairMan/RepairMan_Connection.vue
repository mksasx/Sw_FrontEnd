<template>
<el-container>
    <div class="talk">
         <span style="color:grey;font-size:25px">留言板</span>
    <el-divider></el-divider>
    <div class="content">
        <div v-for="item in showarea" :key="item">
            <div v-if="item.errnum==0" style="margin-left:10px;margin-top:20px;font-size:15px;color:blue">
              {{item.name}}:{{item.text}}
            </div>
             <div v-if="item.errnum==1" style="margin-left:10px;margin-top:20px;font-size:15px;color:red">
              {{item.name}}:{{item.text}}
            </div>
             <div v-if="item.errnum==2" style="margin-left:10px;margin-top:20px;font-size:15px;color:purple">
              {{item.name}}:{{item.text}}
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
.talk{
    width: 100%;
    text-align: left;
}
.content{
    height: 700px;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 50px;
    overflow-y: scroll;
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
      errnum:'2',
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
      }
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


