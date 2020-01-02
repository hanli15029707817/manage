<template>
    <div>
      <search/>
      <list/>
      <edit/>
    </div>
</template>

<script>
    import search from '../component/account/search'
    import list from '../component/account/list'
    import edit from '../component/account/edit'
    export default {
      name: "account",
      components:{search,list,edit}
    }
</script>

<style scoped>

</style>
