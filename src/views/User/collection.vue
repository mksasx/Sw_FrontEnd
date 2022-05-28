<template>
<el-container>
    <el-header>
        <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="房源ID" value="1"></el-option>
      <el-option label="房源关键词" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
    </el-header>
<el-main>
<div class="container">
    <div style="width:23.5%;background-color:white;float:left;" id="1">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round @click="delete_it" id="remove1">删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
    <div style="width:23.5%;background-color:white;float:left;margin-left:25px;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:left;margin-left:25px;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:left;margin-left:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>

       <div style="width:23.5%;background-color:white;float:left;margin-top:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
    <div style="width:23.5%;background-color:white;float:left;margin-left:25px;margin-top:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:left;margin-left:25px;margin-top:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
     <div style="width:23.5%;background-color:white;float:left;margin-left:25px;margin-top:25px">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="display:inline-block">
                        <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </li>
                <ul class="action">
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="info" round @click="info">查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
    <div class="clear"></div>
</div>

</el-main>
<el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</el-container>

</template>

<style>
.clear{
    clear: both;
}
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .container{
      height: 100%;
  }
  .el-container{
      background-color:rgb(240, 242, 245);
      height: 100vh;
  }
</style>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      value: 3.7,
      count:0
    }
  },
  methods: {
       info(){
        window.location.href="information";
      }
    }
}
</script>