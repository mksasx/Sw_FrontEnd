<template>
  <div class="a">
      <p>个人中心</p>
      <p>{{ msg }}</p>
  </div>
  
</template>

<script>
export default {
    name:"Self",
    data () {
        return {
             msg:'ma'
        }
    },
}
</script>

<style scoped>
 .a {
     font-weight: bold;
     text-align: center;
 }

</style>