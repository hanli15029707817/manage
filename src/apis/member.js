//用于定义用户的登录，注册，注销等；
import req from './http.js';
//定义接口
//在这里定义一个登录的接口，吧登录的接口暴露出去给组件使用
 const LOGIN =params=>req('post','/lgn/pwdLogin',params)
 const MENULIST =params=>req('get','/uuc/menu',params)
//这里使用了箭头函数，转换一下写法
// export const LOGIN =function (req) {
//   return req('post','operator/login',params)
// }
export default {
  LOGIN:LOGIN,
  MENULIST:MENULIST
}
