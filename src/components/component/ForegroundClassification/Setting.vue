<template>
  <el-dialog
    title="关联商品类目"
    :close-on-click-modal="false"
    :visible.sync="dialogAddVisible"
    @open="handleOpen"
    @close="handleClose"
    class="s-form-dialog"
    width="800px"
    height="300px"
  >
    <el-form label-width="100px">
       <div style="display: flex;border:1px solid #eee;border-radius: 4px;">
         <div style="width:50%">
           <el-input
             placeholder="类目筛选"
             v-model="filterText" maxlength="20"
             filterable
             style=""></el-input>
           <el-tree
             v-loading="loading"
             empty-text="暂无数据"
             :data="data"
             show-checkbox
             node-key="id"
             ref="tree"
             @check="getChecked"
             :filter-node-method="filterNode"
             :default-expanded-keys="[]"
             :default-checked-keys="[]"
             :props="defaultProps">
           </el-tree>
         </div>
         <div class="tag" style="width:50%;border:1px solid #eee;display: flex;flex-direction: column;padding:20px;">
           <el-tag
             style="min-width:250px;margin-bottom:10px;"
             :key="item.name"
             v-for="item in selectedList"
             closable
             :disable-transitions="false"
             @close="handleClosetag(item)">
             {{item.forefathersName}} / {{item.name}}
           </el-tag>
         </div>

       </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible=false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="isDisabled">{{isDisabled ? '正在提交...':'提交'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "edit",
    data(){
      return {
        loading:false,
        isEdit: false, //false添加 true修改
        dialogAddVisible: false, //窗口:false关闭 true打开
        isDisabled: false, //是否可编辑:true不可编辑 false-可编辑
        item: null,
        filterText:'',
        data: [],
        defaultProps: {
          children: 'childrenViewList',
          label: 'name'
        },
        len: 0,
        selectedList:[],
        CheckedNodes:null,
        isDeleTree: true, // 子删除
        rules: {
          userName:[
            { required: true, message: '请输入账号登录', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z][a-zA-Z0-9]*$/, message: '请输入字母或数字，首位只能是字母', trigger: 'blur' }
          ],
        },
      }
    },
    created() {

    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted(){

    },
    methods: {
      //设置的时候显示当前选中的
      setCheckedKeyss() {
        let id = [];
        let name = [];
        let forefathersName = [];
        var selectedList=this.selectedList;
        if (selectedList) {
          selectedList.forEach(item => {
            id.push(item.id);
            name.push(item.name);
            forefathersName.push(item.forefathersName);
          });
        }
        if (id) {
          this.$nextTick(() => {
            let tree = this.$refs.tree;
            tree.setCheckedKeys(id);
            this.len = tree.getCheckedKeys().length;
          })
        }
      },
      //点击树获取选择数据的数组
      getChecked(data, cheked){
        let len = cheked.checkedNodes.length;
        if (len > this.len) {
          this.appendNode(data);
        } else {
          this.removeNode(data);
        }
        this.len = len;
      },
      //处理当前选择的数据
      appendNode(data) {
        if (data.childrenViewList && data.childrenViewList.length) {
          data.childrenViewList.forEach(item => {
            this.appendNode(item);
          });
        } else {
          let appendObj = {
            name: data.name,
            id: data.id,
            forefathersName: this.data[data.index].name,
            goodsCategoriesId: data.id
          };
          if (this.selectedList.length == 0) {
            this.selectedList.push(appendObj);
          } else {
            if (
              JSON.stringify(this.selectedList).indexOf(
                JSON.stringify(appendObj)
              ) == -1
            ) {
              this.selectedList.push(appendObj);
            }
          }
        }
      },
      removeNode(data) {
        if (data.childrenViewList && data.childrenViewList.length) {
          data.childrenViewList.forEach(item => {
            this.removeNode(item);
          });
        } else {
          let id = data.id;
          this.selectedList.forEach((x, i) => {
            if (x.id == id) {
              this.selectedList.splice(i, 1);
            }
          });
        }
      },
      //输入框支持搜索的方法
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //关闭选中的分类
      handleClosetag(item) {
        let id = item.goodsCategoriesId;
        this.$refs.tree.setChecked(id, false);
        this.selectedList = this.selectedList.filter(x => {
          return x.goodsCategoriesId !== id;
        });
        if (this.isDeleTree) {
          this.$emit("handleTagClose", item, true);
        }
        this.len -= 1;
      },
      setting(isEdit, obj){ //编辑
        this.isEdit = isEdit;
        this.item =JSON.parse(JSON.stringify(obj));//解决在编辑的时候需要修改该行里面的数据的话在关闭弹窗之后再次点击弹窗出现数据丢失的问题
        this.dialogAddVisible = true;
      },
      handleOpen(){ //打开状态
        let isEdit = this.isEdit,
          item = this.item;
        var that=this;
        if(window.sessionStorage.getItem('categorydesk')){
          that.loading=false;
          let data = JSON.parse(window.sessionStorage.getItem('categorydesk'));
          that.data=data._embedded.content;
          if(that.item.productCategoryList.length){
            that.item.productCategoryList.forEach((item)=>{
              item.goodsCategoriesId=item.id;
            })
            that.selectedList=that.item.productCategoryList;
            that.setCheckedKeyss();
          }
        }else{
          that.loading=true;
          that.$http({
            method:'GET',
            url: that.$apis.kps.category,
          })
            .then(function (data) {
              that.loading=false;
              that.data=data._embedded.content;

              if(that.item.productCategoryList.length){
                that.item.productCategoryList.forEach((item)=>{
                  item.goodsCategoriesId=item.id;
                })
                that.selectedList=that.item.productCategoryList;
                that.setCheckedKeyss();
              }
              window.sessionStorage.setItem("categorydesk",JSON.stringify(data));
            })
            .catch(function (error) {
            })
        }
      },
      handleClose(){ //关闭状态
        this.filterText='';
        this.selectedList=[];
        this.len=0;
        this.item=null;
        this.$refs.tree.setCheckedKeys([]);
      },
      handleSubmit: function () {
        var FrontCategorySetIdView={};
        var categoryIds=[];
        if(this.selectedList.length){
          this.selectedList.forEach((item)=>{
            categoryIds.push(item.id)
          })
          FrontCategorySetIdView.categoryIds=categoryIds;
          FrontCategorySetIdView.id=this.item.id;
        }else{
          this.$message.error('请选择关联的商品类目');
          return
        }
        let that = this;
        if(!that.isDisabled){
          that.isDisabled = true;
          var url=that.$apis.kps.frontcategorywebsetCategoryIds;
          // var url='http://10.41.1.136:8086/kps/front-category-web/setCategoryIds'
          that.$http({
            method: 'PUT',
            url: url,
            data: FrontCategorySetIdView
          })
            .then(function (response) {
              that.$emit('list', {page: 0, size: 10});
              that.dialogAddVisible = false;
              that.isDisabled = false;
              that.$message.success(that.isEdit ? '修改成功！正在刷新数据...' : '添加成功！正在刷新数据...');
            })
            .catch(function (error) {
              that.isDisabled = false;
            })
        }
      },
    }
  }
</script>

<style>
.el-tree{
  overflow: overlay;
  height:300px;
}
/*滚动条样式*/
.el-tree::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-tree::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(67, 74, 80,0.2);
  background: rgba(67, 74, 80,0.2);
}
.el-tree::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(67, 74, 80,0.2);
  border-radius: 0;
  background: rgba(67, 74, 80,0.1);
}
  .tag{
    overflow: scroll;
    height:300px;
  }
/*滚动条样式*/
.tag::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.tag::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(67, 74, 80,0.2);
  background: rgba(67, 74, 80,0.2);
}
.tag::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(67, 74, 80,0.2);
  border-radius: 0;
  background: rgba(67, 74, 80,0.1);
}
</style>
