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
    /*height:100%;*/
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow:hidden;
  height:100%;
}
  .el-main{
    overflow: inherit!important;
  }
.mt60{
  margin-top: 60px;
}
  .el-header{
    background: #999;
    position: fixed;
    top:0;
    width: 100%;
    z-index:20;
  }
  .el-aside{
    overflow: inherit;
  }
  .el-menu-item,.el-submenu__title{
    color:#fff;
  }
  .el-menu-item,.el-submenu__title{
    height: 40px!important;
    line-height:40px!important;
    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
  }
  .el-submenu__title i{
    color:#fff;
  }
  .el-menu-item.is-active{
    color:#000;
    background: #fff;
    border-left:3px solid red;
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
    z-index: 20;
  }
  .el-main{
    height:100%;
    overflow: scroll;
  }
</style>
