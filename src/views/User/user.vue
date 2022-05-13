<template>
    <el-container>
  <el-header style="height:400px">
      <img src="../../assets/home.webp" alt="">
      <div class="container">
        <div class="userlogo">
          <i class="el-icon-picture-outline-round" style=" width: 80px;
    height: 80px;"></i>
      </div>
      <div class="username">
          <h3>未登录用户</h3>
      </div>
      </div>
  </el-header>
  <el-main>
        <el-tabs type="border-card">
        <el-tab-pane label="个人介绍">
            <div class="content">
                 <p>
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                这个人很懒，什么都没写
                </p>
            </div>
            <div class="edit">
                <el-button type="primary" size="">编辑</el-button>
            </div>
            </el-tab-pane>
        <el-tab-pane label="详细资料">
            <el-radio-group v-model="size">
    <el-radio label="" style="display:none">默认</el-radio>
    <!-- <el-radio label="medium">中等</el-radio>
    <el-radio label="small">小型</el-radio>
    <el-radio label="mini">超小</el-radio> -->
  </el-radio-group>

  <el-descriptions class="margin-top" title="个人信息列表" :column="2" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="">个人设置</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      超级暴龙战神
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18992393149
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      北京市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        身份
      </template>
      <el-tag size="">学生</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      北京市海淀区学院路37号北京航空航天大学
    </el-descriptions-item>
  </el-descriptions>
        </el-tab-pane>
        </el-tabs>
  </el-main>
 
</el-container>
</template>



<style scoped>
.container{
    position: absolute;
    top: 350px;
    left: 300px;
}
.userlogo{
    display: inline-block;
    top: 100px;
    font-size: 80px;
}
.username{
    font-size: bold;
    font-size: 25px;
    display: inline-block;
    padding-left: 10px;
}
.el-header .userlogo{
    width: 80px;
    height: 80px;
}

.el-header img{
    padding-top: 30px;
    padding-bottom: 30px;
    width: 100%;
    height: 90%;
}
.el-tab-pane{
    height: 300px;
}
.content{
    display: inline-block;
    width: 90%;
    text-align: left;
}
.edit{
    float:right;
}
</style>

<script>
  export default {
    data () {
      return {
        size: ''
      };
    }
  }
</script>