<template>
  <el-container>
    <el-header><headers/></el-header>
    <div class="mt60" style="height: 100%;">
      <el-container>
        <menus @handleMenuSelect="handleMenuSelect" @handleRefreshMenu="handleRefreshMenu"/>
        <!--<el-main><router-view replace/></el-main>-->
       <el-main>
         <breadcrumb :currentPath="breads"/>
         <router-view replace/>
       </el-main>

      </el-container>
    </div>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  import menus from '../menus'
  import headers from '../headers'
  import breadcrumb from '../breadcrumb'
    export default {
        name: "default",
      data(){
          return{
            breads:[],
          }
      },
      components: {
        menus,headers,breadcrumb
      },
      methods:{
        handleMenuSelect(index,menulist){
          menulist.forEach((x, i) => {
            x.children && x.children.forEach((y)=>{
              if(index==y.id){
                this.breads=[x.name,y.name];
              }
            })
          })
        },
        handleRefreshMenu(path,menulist){
          menulist.forEach((x, i) => {
            x.children && x.children.forEach((y)=>{
              if(path==y.url){
                this.breads=[x.name,y.name];
              }
            })
          })
        }
      },
    }
</script>

<style scoped>

</style>
