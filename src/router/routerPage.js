import Login from '../components/pages/login'
import noFound from '../components/pages/noFound'
import Default from '../components/pages/default'
import Index from '../components/pages/index'
import ForegroundClassification from '../components/pages/ForegroundClassification'
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
        path: '/noFound', name: 'noFound',
        component: noFound,
      },
      {
        path: '/ForegroundClassification', name: 'ForegroundClassification',
        meta: {
          requireAuth: true, // 判断是否需要登录
        },
        component: ForegroundClassification
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

