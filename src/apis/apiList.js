import Vue from 'vue'

let apiList = {
  services: {
    lgn:'/lgn',
    kps: '/kps',
    // kps:'http://10.41.0.45:8086/kps',
    // sot:'http://10.41.0.139:8066/sot',
    sot:'/sot',
    uuc: '/uuc',
    // dmn: 'http://10.41.0.74:8096/dmn',
    dmn: '/dmn',
    sta:'http://10.41.1.20:8069/sta',//数据统计
    dic:'/dic',
    salelimit:'http://api.shoppingyizhan.com/salelimit'
    // sta:'http://datav.shequren.cn/sta'//数据统计
  },
  apis: {
    lgn:{
      pwdLogin:'/pwdLogin',//登录
    },
    kps: {
      products:'/products'
    },
    sot:{
      goodsregionsdmUsers:'/goods-regions/dm-users',
      goodsregionsregionsseDm:'/goods-regions/regions-set-dm',
      sorter_shelfPage:'/sorter-shelf/page',
      sorterShelf:'/sorter-shelf',
      sorter_shelfSet:'/sorter-shelf/set',
      pushConfig:'/push-config',
      pickup:'/pickup',
      pickupHistory:'/pickup-history',
      pickupRefund:'/pickup-refund', // 单品退款
      pickupCancel:'/pickup-cancel',
      afterSale:'/after-sale', // 售后订单操作
      pushmention:'/push-mention',
      pushpickup:'/push-pickup',
      orderError: '/order-error', // 异常订单列表
      orderErrorSta: '/order-error-sta', // 异常订单统计
    },
    uuc: {
      userName: '/users/user-name',
      admin_usersPage:'/admin/users/page',
      adminusersuserRole:'/admin/users/user-role',
      adminRoles:'/admin/roles',
      adminUsers:'/admin/users',
      usersresetpwd:'/users/reset-pwd',
      menu:'/roles/app-ids',
      resources:"/resources",
      batchRoleRes: '/roles/batch-role-res',
      users:"/users",
      roles:"/roles",
      userRole: '/roles/user-id',
    },
    dic:{
      codetables:'/code-tables'
    },
  }
}


for (let key1 in apiList.apis){
  for (let key2 in apiList.apis[key1]){
    apiList.apis[key1][key2] = apiList.services[key1] + apiList.apis[key1][key2];
  }
}
export default {
  apis:apiList.apis
}
// export default () => {
//   Vue.prototype.$apis = apiList.apis;
// }
