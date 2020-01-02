import Login from '../components/pages/login'
import Index from '../components/pages/index'
import Account from '../components/pages/account'
export default [
  {
    path: '/', name: 'Index',
    meta: {
      requireAuth: true, // 判断是否需要登录
    },
    component: Index,
  },
  {
    path: '/Login', name: 'login',
    component: Login
  },
  {
    path: '/Account', name: 'Account',
    meta: {
      requireAuth: true, // 判断是否需要登录
    },
    component: Account
  }
];

