<template>
  <table class="s-operation">
    <tbody>
    <tr>
      <td class="tl">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="关键词">
            <el-input autofocus  v-model="searchForm.name" placeholder="
分类名称"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form>
      </td>
      <td style="display: flex;justify-content: flex-end">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleEdit(true)">添加</el-button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        name: "Search",
      data(){
          return{
            searchForm: {
              name: '',
            },
          }
      },
      mounted(){

      },
      methods:{
        handleEdit(type) { //添加
          if(type){
            this.$emit('edit', false);
          }
        },
        handleSearch() { //查询
          let arr = [],
            obj = {page: 0, size: 10,};
          this.searchForm.name && arr.push("name::" +  this.searchForm.name);
          if(arr.length){
            obj.filter = arr.join("|");
          }
          console.log('obj',obj)
          this.$emit('search', obj);
          this.search = obj;
        },
      }
    }
</script>

<style scoped>

</style>
