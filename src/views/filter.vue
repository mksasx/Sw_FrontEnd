<template>
  <div>
  <el-input class="ei1"
    placeholder="请输入内容"
    v-model="msg"
   clearable>
  </el-input>
  <el-input class="ei2"
    placeholder="请输入转化方式"
    v-model="msg2"
   clearable>
  </el-input>
    <h1 class="hi1">转换前内容：{{msg}}</h1>
    <h1 class="hi2" v-if="msg2==1">转换后内容：{{ msg | Cap(1) }}</h1>
    <h1 class="hi2" v-if="msg2==2">转换后内容：{{ msg | Cap(2) }}</h1>
    <h1 class="hi2" v-if="msg2==3">转换后内容：{{ msg | Cap(3) }}</h1>
    <h1 class="hi2" v-if="msg2==4">转换后内容：{{ msg | Cap(4) }}</h1>
    <h1 class="hi2" v-if="msg2==5">转换后内容：{{ msg | Cap(5) }}</h1>
  </div>
</template>
<script>
export default {
  name: "filter",
  data() {
    return {
      msg: "",
      msg2: "",
    };
  },
  filters: {
    //字母大小写切换
    /*type
                    1:首字母大写
                    2：首页母小写
                    3：大小写转换
                    4：全部大写
                    5：全部小写
                    * */
    Cap(str, type) {
      function ToggleCase(str) {
        var itemText = "";
        str.split("").forEach(function (item) {
          if (/^([a-z]+)/.test(item)) {
            itemText += item.toUpperCase();
          } else if (/^([A-Z]+)/.test(item)) {
            itemText += item.toLowerCase();
          } else {
            itemText += item;
          }
        });
        return itemText;
      }
      switch (type) {
        case 1:
          return str.replace(/\b\w+\b/g, function (word) {
            return (
              word.substring(0, 1).toUpperCase() +
              word.substring(1).toLowerCase()
            );
          });
        case 2:
          return str.replace(/\b\w+\b/g, function (word) {
            return (
              word.substring(0, 1).toLowerCase() +
              word.substring(1).toUpperCase()
            );
          });
        case 3:
          return ToggleCase(str);
        case 4:
          return str.toUpperCase();
        case 5:
          return str.toLowerCase();
        default:
          return str;
      }
    },
  },
};
</script>
<style scoped>
.ei1{
  padding-top:20px;
  padding-bottom:20px;
}
.hi1{
  padding-top:20px;
  padding-bottom:20px;
}
</style>