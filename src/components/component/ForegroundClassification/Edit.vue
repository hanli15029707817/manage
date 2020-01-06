<template>
  <el-dialog
    :title="isEdit? '编辑分类' : '添加分类'"
    :close-on-click-modal="false"
    :visible.sync="dialogAddVisible"
    @open="handleOpen"
    @close="handleClose"
    class="s-form-dialog"
    width="600px">
    <el-form ref="EditForm" :model="editForm" :rules="rules" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input placeholder="分类名称" v-model="editForm.name" maxlength="6" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="image" id="w100">
        <UploadImage style="width:400px;" ref="UploadImage" :image="editForm.image"  :limit="1" @change="handleChangeImage" />
      </el-form-item>
      <el-form-item label="分类排序" prop="frontSort">
        <el-input placeholder="分类排序" type="number" v-model.number="editForm.frontSort" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="首页">
        <el-radio-group v-model="editForm.home">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
        <span style="color:#999;">&nbsp;&nbsp;&nbsp;(每日鲜栏目中显示)</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible=false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="isDisabled">{{isDisabled ? '正在提交...':'提交'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import UploadImage from "./UploadImage.vue"
  export default {
    name: "edit",
    components: {
      UploadImage,
    },
    data(){
      var validatefrontSort=(rule,value,callback)=>{
        var number=/^[0-9]+\d*$/;
        if(!number.test(value)){
          callback(new Error("输入格式不正确"));
        }else{
          callback();
        }
      };
      var validatename=(rule,value,callback)=>{
        var number=/^[\u4e00-\u9fa5]+$/;
        if(value===''){
          callback(new Error("输入类目名称"));
        }else{
          if(!number.test(value)){
            callback(new Error("只能输入汉字"));
          }else{
            callback();
          }
        }
      };
      return {
        isEdit: false, //false添加 true修改
        dialogAddVisible: false, //窗口:false关闭 true打开
        isDisabled: false, //是否可编辑:true不可编辑 false-可编辑
        item: null,
        defaultForm: {},
        editForm: {
          name:'',
          frontSort:'',
          image: [],
          home:false,
        },
        rules: {
          name:[
            { required: true, trigger: 'blur',validator: validatename},
          ],
          frontSort:[
            {required:true, trigger:"blur",validator: validatefrontSort}
          ],
          image: [
            { required: true, type: 'array', message: '请选择一张分类图片', trigger: 'change' }
          ],
        },
      }
    },
    created() {
      let editForm = this.editForm, defaultForm = this.defaultForm;
      for(let key in editForm){
        if(editForm.hasOwnProperty(key)){
          defaultForm[key] = editForm[key];
        }
      }
    },
    mounted(){

    },
    methods: {
      changeHome(val){
        this.editForm.home=val;
      },
      handleChangeImage(arr) { //主图-change
        this.editForm.image = arr;
        this.$refs['EditForm'].validateField('image');
      },
      handleEdit(isEdit, obj){ //编辑
        this.isEdit = isEdit;
        this.item = obj;
        this.dialogAddVisible = true;
      },
      handleOpen(){ //打开状态
        let isEdit = this.isEdit,
          item = this.item,
          editForm = this.editForm,
          defaultForm = this.defaultForm;
        if(isEdit){
          this.editForm.id=this.item.id;
        }
        for(let key in defaultForm){
          if(defaultForm.hasOwnProperty(key)){
            editForm[key] = isEdit ? item[key] : defaultForm[key];
          }
        }
        setTimeout(()=>{
          this.$refs.UploadImage.changeData();
        },1)
      },
      handleClose(){ //关闭状态
        this.editForm = {
          name:'',
          frontSort:'',
          image: [],
          home:false,
        }
        this.$refs['EditForm'].clearValidate();
      },
      handleSubmit: function () {
        let that = this;
        if(!that.isDisabled){
          that.isDisabled = true;
          that.$refs['EditForm'].validate((valid) => {
            if (valid){
              var url=that.$apis.kps.frontcategoryweb;
              // var url='http://10.41.1.136:8086/kps/front-category-web'
              that.$http({
                method: that.isEdit ? 'PUT' : 'POST',
                url: url,
                data: that.editForm
              })
                .then(function (response) {
                  that.$message.success(that.isEdit ? '修改成功！正在刷新数据...' : '添加成功！正在刷新数据...');
                  that.$emit('list', {page: 0, size: 10});
                  that.dialogAddVisible = false;
                  that.isDisabled = false;
                  })
                .catch(function (error) {
                  that.isDisabled = false;
                })
            }else{
              that.isDisabled = false;
              return false;
            }
          })
        }
      },
    }
  }
</script>

<style>
  .s-form-inline .el-form-item {
    display: inline-block;
    width: 49.5%;
    box-sizing: border-box;
  }
  .change-pic-btn{
    margin: -28px 0 30px 310px;
  }
  .change-pic-btn .btn{
    margin-left:100px;
    color:#409EFF;
  }
  .change-pic-btn .btn:first-child{
    margin-left:0;
  }
</style>
