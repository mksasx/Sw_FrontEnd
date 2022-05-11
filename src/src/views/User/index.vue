<template>
  <el-tabs type="border-card">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="房源管理">
      <el-button size="small" @click="jump()">先登录吧</el-button>
    </el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "user",
  data() {
    return {};
  },
  methods: {
    jump() {
      window.location.href = 'login';
    },
  },
};
</script>

<style scoped>
</style>