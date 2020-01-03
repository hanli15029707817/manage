<template>
  <el-container>
    <el-header><headers/></el-header>
    <div class="mt60" style="height: 100%;">
      <el-container>
        <menus/>
        <!--<el-main><router-view replace/></el-main>-->
        <router-view replace/>
      </el-container>
    </div>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  import menus from '../menus'
  import headers from '../headers'
    export default {
        name: "default",
      components: {
        menus,headers
      },
    }
</script>

<style scoped>

</style>
