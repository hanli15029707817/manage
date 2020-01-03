import Login from '../components/pages/login'
import Default from '../components/pages/default'
import Index from '../components/pages/index'
import Account from '../components/pages/account'
export default [
  {
    path: '/', name: 'Default',
    meta: {
      requireAuth: true, // 判断是否需要登录
    },
    component: Default,
    redirect: '/',
    children: [
      {
        path: '/', name: 'Index',
        meta: {
          requireAuth: true, // 判断是否需要登录
        },
        component: Index,
      },
      {
        path: '/Account', name: 'Account',
        meta: {
          requireAuth: true, // 判断是否需要登录
        },
        component: Account
      }
    ]
  },
  {
    path: '/Login', name: 'login',
    component: Login
  },
];

