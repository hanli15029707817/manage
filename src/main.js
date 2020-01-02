// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import '@/assets/style.css'//公共的样式
import http from '../src/apis/http.js'//调取后台接口的封装
import apis from '../src/apis/apiList.js'//调取所有的接口
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false;
Vue.prototype.$http = http.instance;//全局调用axios的方法
Vue.prototype.$apis = apis.apis;//全局调用某个接口的方法
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('user_info')) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/Login',
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
