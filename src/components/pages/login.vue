<template>
  <div class="login">
    <el-form style="padding-top:350px;" class="flex-ac-js flex flex-ac flex-dc" ref="EditForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item style="width:350px;"  label="用户名" prop="username">
          <el-input v-model='editForm.username' placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item style="width:350px;" label="密码" prop="password">
          <el-input v-model='editForm.password' placeholder="请输入内容"></el-input>
        </el-form-item>
      <el-button type="primary" @click="login" :disabled="isDisabled">{{isDisabled ? '正在登录...':'登录'}}</el-button>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return {
            editForm:{
              login_type:4,
              username:'',
              password:''
            },
            isDisabled:false,
            rules:{
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ]
            }
          }
        },
      created() {
        let that = this;
        document.onkeypress = function(e) {
          console.log(e)
          var keycode = document.all ? event.keyCode : e.which;
          if (keycode == 13) {
            that.login();// 登录方法名
            return false;
          }
        };
      },
      methods:{
        //2. 定义登录的逻辑
        login(){
          var that=this;
          if(!that.isDisabled){
            that.isDisabled = true;
            that.$refs['EditForm'].validate((valid) => {
              if (valid) {
                that.$http({
                  method: 'POST',
                  url: that.$apis.lgn.pwdLogin,
                  data: that.editForm,
                })
                  .then(function (data) {
                    that.isDisabled=false;
                    that.$message.success('登录成功');
                    that.$emit('fun',true)
                    sessionStorage.setItem("user_info",JSON.stringify(data));
                    that.$router.replace({path:'/'}) //登录成功之后 使用push 的问题是 点击浏览器的返回按钮的时候有问题 所以换成replace
                    that.$refs['EditForm'].resetFields();
                  })
                  .catch(function (error) {
                    that.isDisabled = false;
                  })
              }else{
                that.isDisabled = false;
                return false;
              }
            });
          }
        },
      },
      mounted(){
        //3. 执行登录
        // this.login()
      }
    }
</script>

<style scoped>
 .login{
   width: 100%;
   height:100%;
   margin:0 auto;
   background:#017ca8;
   /*box-shadow: 10px 10px 10px 10px rgba(255,255,0,0.5), -10px 10px 10px 10px rgba(255,255,255,0.5)*/
 }

</style>
