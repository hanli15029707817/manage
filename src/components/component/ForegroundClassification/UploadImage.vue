<template>
  <div>
    <el-upload
      :class="list && list.length > limit-1 ? 's-upload-limited': ''"
      :limit=limit
      :action="uploadURL"
      :headers="loadHeaders"
      name="uploadPic"
      :on-exceed = "handleExceed"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture-card" >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "upload-image",
    props: [
      'image','limit'
    ],
    data() {
      return {
        uploadURL: '',
        dialogImageUrl: '',
        dialogVisible: false,
        loadHeaders: { 'Authorization': 'Bearer'},
        fileList: [],
        list: []
      }
    },
    created(){
      var user_info=JSON.parse(sessionStorage.getItem('user_info'));
      this.loadHeaders = { 'Authorization': 'Bearer ' + user_info.access_token};
      this.uploadURL = 'http://sapi.shoppingyizhan.com' + this.$apis.kps.upload;
      // this.uploadURL = 'http://sapi.shoppingyizhan.com' + this.$apis.kps.upload;
    },
    methods: {
      changeData(){
        let arr = [], image = this.image;
        if(image && image.length){
          image.forEach((item) => {
            arr.push({
              name: "",
              url: item
            });
          });
        }

        this.fileList = arr;
        this.list = image;
      },
      handleExceed(file, fileList){
        this.$message.error('图片个数不能超过5个!');
      },
      beforeUpload(file){
        const isLt1M = file.size / 1024 / 300 < 1;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 300k!');
        }
        return isLt1M;
      },
      handleSuccess(response, file, fileList){
        this.handleChange(fileList);
      },
      handleError(err, file, fileList){
        //console.log('上传失败--->', err, file, fileList);
      },
      handleRemove(file, fileList){
        // console.log('删除文件--->', file);
        this.handleChange(fileList);

      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(fileList){
        let arr = [];

        fileList.length && fileList.forEach((item) => {
          arr.push(item.response ? item.response.data[0] : item.url)
        });

        this.list = arr;
        this.$emit('change', arr);
      }
    }
  }
</script>

<style>
.s-upload-limited .el-upload.el-upload--picture-card {
  display: none;
}
#w100 .el-form-item__content>div{
  width:100%!important;
}
  #w400 .el-upload--picture-card{
    width:400px!important;
  }
#w400 .el-upload-list--picture-card .el-upload-list__item{
  width:400px!important;
}
</style>
