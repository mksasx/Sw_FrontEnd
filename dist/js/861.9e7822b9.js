"use strict";(self["webpackChunkproject_test"]=self["webpackChunkproject_test"]||[]).push([[861],{3861:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-aside",{attrs:{width:"auto"}},[n("common-aside")],1),n("el-container",[n("el-header",[n("div",{staticClass:"h"},[e._v("20373793 马泽远")])]),n("el-main",[n("router-view")],1)],1)],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b","default-active":"1-4-1",collapse:e.isCollapse},on:{open:e.handleOpen,close:e.handleClose}},[n("h3",[e._v("青年在线租房系统")]),e._l(e.noChildren,(function(t){return n("el-menu-item",{key:t.path,attrs:{index:t.path,route:t.path},on:{click:function(n){return e.clickMenu(t)}}},[n("i",{class:"el-icon-"+t.icon}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])])})),e._l(e.hasChildren,(function(t){return n("el-submenu",{key:t.path,attrs:{index:t.path,route:t.path}},[n("template",{slot:"title"},[n("i",{class:"el-icon-"+t.icon}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])]),e._l(t.children,(function(t,l){return n("el-menu-item-group",{key:t.path,attrs:{route:t.path}},[n("el-menu-item",{attrs:{index:t.path},on:{click:function(n){return e.clickMenu(t)}}},[n("i",{class:"el-icon-"+t.icon}),e._v(e._s(t.label))])],1)}))],2)}))],2)},i=[],r={name:"CommonAside",data(){return{isCollapse:!1,menu:[{path:"/FirstPage",name:"FirstPage",label:"首页",icon:"s-home"},{path:"/Login",name:"Login",label:"登录",icon:"s-promotion"},{path:"/Mall",name:"Mall",label:"房源管理",icon:"goods"},{path:"/UserManage",name:"User",label:"用户管理",icon:"user"},{label:"其他",icon:"location",children:[{path:"/filter",name:"Filter",label:"大小写转换",icon:"s-order"}]}]}},methods:{handleOpen(e,t){console.log(e,t)},handleClose(e,t){console.log(e,t)},clickMenu(e){this.$router.push({name:e.name})}},computed:{noChildren(){return this.menu.filter((e=>!e.children))},hasChildren(){return this.menu.filter((e=>e.children))}}},s=r,c=n(1001),u=(0,c.Z)(s,o,i,!1,null,"b260e606",null),h=u.exports,m={name:"Home",components:{CommonAside:h},data(){return{msg:""}}},p=m,d=(0,c.Z)(p,l,a,!1,null,"6c8e0e5f",null),f=d.exports}}]);
//# sourceMappingURL=861.9e7822b9.js.map