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
      :index="item.id+''"
      :key="item.path"
      :route="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.id+''"
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
        <el-menu-item :index="subItem.id+''" @click="clickMenu(subItem)" > <i :class="'el-icon-' + subItem.icon"></i>{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "RepairMan_Aside",
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: "/Commander_FirstPage",
          name: "Commander_FirstPage",
          label: "主页",
          icon: "s-home",
          id:"1",
        },
        {
        path: "/Manage_User",
          name: "Manage_User",
          label: "管理租客",
          icon: "user",
          id:"2",
        },
        {
          label: "管理合同",
          icon: "s-order",
          id:"3",
           children:[
            {
              path: '/Manage_Contract',
              name: 'Manage_Contract',
              label:"已审批合同",
              icon: "check",
              id:"3-1",
            },
            {
              path: '/UnManaged_Contract',
              name: 'UnManaged_Contract',
              label:"未审批合同",
              icon: "s-check",
              id:"3-2",
            }
          ]
        },
        {
        path: "/Manage_House",
          name: "Manage_House",
          label: "管理房间",
          icon: "office-building",
          id:"4",
        },
        {
        path: "/Manage_RM",
          name: "Manage_RM",
          label: "管理师傅",
          icon: "s-custom",
          id:"5",
        },
        {
          label: "处理申诉",
          icon: "warning-outline",
          id:"6",
          children:[
            {
               path: "/Manage_Complain",
              name: "Manage_Complain",
              label:"待处理申诉",
              icon: "s-check",
              id:"6-1",
            },
            {
              path: "/Managed_Complain",
              name: "Managed_Complain",
              label:"已处理申诉",
              icon: "check",
              id:"6-2"  
            }
          ]
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