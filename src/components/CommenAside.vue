<template>
  <el-menu
    background-color="#fff"
    text-color="black"
    active-text-color="#ffd04b"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      :route="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.path"
      :key="item.path"
      :route="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem) in item.children"
        :key="subItem.path"
        :route="subItem.path" 
      >
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)" > <i :class="'el-icon-' + subItem.icon"></i>{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: "/FirstPage",
          name: "FirstPage",
          label: "首页",
          icon: "s-home",
        },
        // {
        //   path: "/Login",
        //   name: "Login",
        //   label: "登录",
        //   icon: "s-promotion",
        // },
        {
          path: "/Mall",
          name: "Mall",
          label: "房源管理",
          icon: "goods",
        },
        {
          path: "/UserManage",
          name: "User",
          label: "用户管理",
          icon: "user",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/filter",
              name: "Filter",
              label: "大小写转换",
              icon: "s-order",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  /* border: none; */
  height: 100%;
}
.el-menu h3 {
  color: black;
  text-align: center;
  line-height: 48px;
  height: 60px;
}
</style>