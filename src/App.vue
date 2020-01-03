<template>
  <div id="app">
    <router-view replace/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  mounted(){
  },
  methods:{

  },
}
</script>

<style>
  body{
    margin:0;
    padding: 0;
  }
  body,html,.el-container{
    height:100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  overflow: hidden;
}
.mt60{
  margin-top: 60px;
}
  .el-header{
    background: #999;
    position: fixed;
    top:0;
    width: 100%;
  }
  .el-aside{
    overflow: inherit;
  }
  .el-menu-item,.el-submenu__title{
    color:#fff;
  }
  .el-submenu__title i{
    color:#fff;
  }
  .el-menu-item.is-active{
    color:red;
  }
  .el-menu-vertical-demo{
    width: 100%;
    height: 100%;
    background-color: #545c64;
    overflow-y: scroll;
    /*overflow-x: hidden;*/
  }
  .el-menu--inline{
    width: 100%;
    height: 100%;
    background-color: #545c64;
  }
  .el-footer{
    background: #999;
    position: fixed;
    bottom:0;
    width:100%;
  }
  .el-main{
    height:100%;
    overflow: scroll;
  }
</style>
