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
          label: "主页",
          icon: "s-home",
        },
        {
          path: "/search",
          name: "User",
          label: "我要租房",
          icon: "goods",
        },
        {
          label: "个人中心",
          icon: "s-unfold",
          children: [
            {
              path: "/order",
              name: "order",
              label: "我的订单",
              icon: "s-order",
            },
            {
              path: "/service",
              name: "service",
              label: "报修投诉",
              icon: "message",
            },
            {
              path: "/collection",
              name: "collection",
              label: "我的收藏",
              icon: "star-off",
            },
            {
              path: "/user",
              name: "user",
              label: "个人资料",
              icon: "user",
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
</style>