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
      data(){
          return{
            a:null
          }
      },
      mounted(){
        // this.$store.commit('SET_ManagerInfo', '123456789');
      },
      created(){
        // this.a=this.$store.state.managerInfo;
        console.log(44444,this);
      },
      methods:{
        loginOut(){
          sessionStorage.removeItem('user_info')
          this.$router.push({path:'/Login'})
        },
      }
    }
</script>

<style scoped>

</style>
