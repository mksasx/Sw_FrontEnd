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
    无
  </el-form-item>
  <el-form-item label="承租方:">
    无
  </el-form-item>
  <el-form-item label="房源地址:">
    无
  </el-form-item>
  <el-form-item label="房源面积:">
    无
  </el-form-item>
  <el-form-item label="租赁期:">
    无
  </el-form-item>
  <el-form-item label="租赁期起止时间:">
    无
  </el-form-item>
  
    
</el-form>
    </div>

        <div class="upload">
            <span>上传线下签约的合同</span>
            <el-divider></el-divider>
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
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
        active: 0,
        flag: 0
      }
    },
    methods: {
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
        }
        else if(this.flag==2){
            a[0].style.display = "none";
            b[0].style.display = "none";
            c[0].style.display = "flex";
            d.innerHTML='返回';
            
        }
        else if(this.flag==3){
            this.flag=0;
            history.go(-1);
        }
        
      }
    }
  }
</script>