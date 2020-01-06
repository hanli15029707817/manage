<template>
  <div class="main">
    <search @edit="handleEdit" @set="setting"  @search="getList"/>
    <edit ref="Edit" @list="getList"/>
    <setting ref="set" @list="getList"/>
    <list @edit="handleEdit" @set="setting" ref="List"/>
  </div>
</template>

<script>
  import list from "../component/ForegroundClassification/List.vue"
  import edit from "../component/ForegroundClassification/Edit.vue"
  import search from "../component/ForegroundClassification/Search.vue"
  import setting from "../component/ForegroundClassification/Setting.vue"
  export default {
    components: { //引入的组件
      list,
      search,
      edit,
      setting
    },
    data(){
      return{

      }
    },
    mounted(){

    },
    methods: {
      // 列表
      getList: function(params, page){
        this.$refs.List.getList(params, page);
      },
      //编辑
      handleEdit: function(isEdit, banner){
        this.$refs.Edit.handleEdit(isEdit, banner);
      },
    //  设置
      setting:function (isEdit, banner) {
        this.$refs.set.setting(isEdit, banner);
      }
    }
  }
</script>

<style scoped>

</style>
