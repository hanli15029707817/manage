import axios from 'axios'
import { Message } from 'element-ui';
//创建axios的一个实例
var instance=axios.create({
  baseURL:'http://sapi.shoppingyizhan.com',
  // timeout:6000,//请求6000之后 没有返回数据 则自动停止访问
})
//-------请求的拦截器
instance.interceptors.request.use(function(config){
  var user_info=JSON.parse(sessionStorage.getItem('user_info'));
  if(user_info){
    config.headers['Authorization'] = "Bearer "+ user_info.access_token;
  }
  return config;
},function(error){
//  对请求的错误做处理
  return Promise.reject(error);
})
//--------响应拦截器
instance.interceptors.response.use(function(response){
  console.log('响应拦截器',response)
  return response.data;
},function(error){
//  对响应错误做处理
  let response = error.response;
  console.log('response',response)
  if(response){
    console.error('error  response --->', response);
    if(window && (response.status == 401 || response.status == 403)){
      sessionStorage.removeItem('user_info')//调取后台的接口 401 或者403 返回后台的登录页面
      window.location.reload()
    }
    if(response.data.validateErrors){
      if(response.data.validateErrors.length){
        if(response.data.validateErrors[0].message){
          Message.error(response.data.validateErrors[0].message);
        }else{
          Message.error(response.data.message);
        }
      }else{
        Message.error(response.data.message);
      }
    }else{
      if(response.data.message){
        Message.error(response.data.message);
      }else{
        Message.error('服务器报错，快点去检查~~~');
      }
    }
    return Promise.reject(error);
  }else {
    Message.error(error.message);
    return Promise.reject(error);
  }
})
export default {
  instance:instance
}
