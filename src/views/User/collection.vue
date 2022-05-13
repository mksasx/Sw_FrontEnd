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
    <div style="width:25%;max-width:25%;background-color:white;">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="width:33.33%;display:inline-block">
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
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
    <div style="width:25%;max-width:25%;background-color:white">
        <div class="content" style="padding-left: 8px;padding-right:8px;flex:1 1 auto">
            <div class="content-item">
                <div class="house_pic">
                    <img src="../../assets/example.jpg" alt="" style="width:90%;height:90%;padding-top:30px">
                </div>
                <p class="intro">
                    万柳小区
                </p>
                <li style="width:33.33%;display:inline-block">
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
                       <el-button type="info" round>查看</el-button>
                    </li>
                    <li style="width:50%;display:inline-block;padding-bottom:10px">
                       <el-button type="danger" round>删除</el-button>
                    </li>
                </ul> 
            </div>
        </div>
        
    </div>
</div>
</el-main>

</el-container>

</template>

<style>
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
      background-color:rgb(240, 242, 245) ;
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
      value: 3.7
    }
  }
}
</script>