<template>
  <el-breadcrumb style="position: fixed;z-index: 21;" separator-class="el-icon-arrow-right">
    <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
    <el-breadcrumb-item v-for="list in currentPath" >{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
      props:['currentPath'],
        data() {
            return {}
        },
        mounted() {
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>
