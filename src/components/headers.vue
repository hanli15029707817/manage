<template>
    <div style="display: flex;justify-content: space-between;align-items: center;height:100%;">
      <div></div>
      <div @click="loginOut">
        退出
      </div>
    </div>
</template>

<script>
    export default {
        name: "headers",
      methods:{
        loginOut(){
          sessionStorage.removeItem('user_info')
          // this.$emit('fun',false)
          // window.history.go(-1)
          this.$router.push({path:'/Login'})
        }
      }
    }
</script>

<style scoped>

</style>
