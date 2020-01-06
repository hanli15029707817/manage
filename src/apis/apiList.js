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
      business: '/business',
      businessExport: '/business/export',
      businessList: '/business/province/items',
      activities: '/activities',
      activityCabinets: '/marketing-activities/cabinets',
      cabinets: '/cabinets',
      citys:'/business/citys',
      productsBussiness:'/products-business/status',
      cabinetsExport: '/cabinets-export',
      productsCabinet: '/products/cabinet',
      products: '/products',
      productsNew: '/products-new',
      productsStore: '/products-store',
      store: '/products/store',
      upload: '/upload',
      withdraws: '/operation-platform/withdraw-details',
      withdrawsVoucher: '/operation-platform/withdraw-voucher',
      withdrawsFlow: '/operation-platform/withdraw-flow',
      withdrawsHistory: '/operation-platform/withdraw-history',
      setAdminStatus: '/withdraws/operation-platform/set-admin-status',
      withdrawRules: '/withdraw-rules',
      withdrawRulesId: '/withdraw-rules/id',
      orders: '/orders',
      ordersExport: '/orders-export',
      ordersExportCsv: '/orders-export-csv',
      productNum:'/orders/productNum',
      commissions: '/operation-platform/commissions',
      commissionsExport: '/operation-platform/commissions/export',
      sumAmount: '/operation-platform/withdraw-details/sum-amount',
      subsidy: '/subsidy-rule',
      coupons: '/coupons',
      saleStatistics: '/sales-volume-statistics',
      tradeStatistics: '/trade-statistics',
      banners: '/banners',
      bannerStatus:'/banners/OpenOrClose',
      bannerSort:'/banners/sort',
      users_operatingAccount_list:'/users/operatingAccount/list',
      users_operatingAccount:'/users/operatingAccount',
      users_groupLeader_list:'/users/groupLeader/list',
      users_groupLeader:'/users/groupLeader',
      users_groupLeader_pc:'/users/groupLeader/pc',
      users_potential:'/users/potential',
      manager:'/users/operatingAccount/self',
      users_groupLeader_reject:'/users/groupLeader/reject',
      business_provinces:'/business/provinces',
      orderAfterSaleState:'/newAfterSale/newUpdate',
      customerServieDetail:'/newAfterSale/orderAfterSaleDetails',
      afterSaleStatus:'/orders/afterSaleStatus',
      onlineTime:'/products-business/status',
      remarks:'/order/remark',
      menuGet:'/menu/get',
      authority_user_get:'/authority/user/get',
      authority_role_get:'/authority/role/get',
      authority_user_add:'/authority/user/add',
      authority_get:'/authority/get',
      authority_role_add:'/authority/role/add',
      authority_user_put:'/authority/user/put',
      authority_user_delete:'/authority/user/delete',
      products_judgeIsManager:'/products/judgeIsManager',
      addCommonProblem :'/commonProblem/saveOrUpdate',
      checkCommonProblem:'/commonProblem/contentTwo',
      authority_role_update:'/authority/role/update',
      authority_getIdList:'/authority/getIdList',
      sales_volume_statistics_export:'/sales-volume-statistics/export',
      financial_statistics:'/getSupplierBalanceLog',
      financial_statistics_export:'/supplierBalanceLog/export',
      setFictitiousSalesVolume:'/products/setFictitiousSalesVolume',
      findRecycleBill:'/newAfterSale/findRecycleBill',
      getSupplierProductLog:'/getSupplierProductLog',
      supplierProductLog_export:'/supplierProductLog/export',
      productSales:'/products/getProductTodayNum',
      judgeAuthority:'/judgeAuthority',
      supplierProfitRule:'/supplierProfitRule',
      city_countyInfo:'/city/countyInfo',
      networkLevel:'/networkLevel',
      supplierBalanceInfo_export:'/supplierBalanceInfo/export',
      networkLevel_NLEnable:'/networkLevel/NLEnable',
      goodsType:'/product-category',
      businessSelect:'/business-select',
      getUserCity:'/getUserCity',
      repurchaseActivity:'/RepurchaseActivity',
      repurchaseGoodsList:'/RepurchaseActivity/findRepurchaseActivityProductList',
      openOrClose:'/RepurchaseActivity/openOrCloseRepurchaseActivity',
      category: '/category',
      categorySelect: '/category-select',
      downloadQR: '/qrCode/goods/pic', //下载商品二维码图片
      qrCodeUrl: '/qrCode/goods', //获取商品二维码地址
      qrCodeZip: '/qrCode/goods/zip', //二维码压缩包
      productExport: '/product-export', // 导出商品信息列表
      productsweb: '/products-web',
      importProduct: '/importProduct', // 商品批量导入
      productsBusinessStatus: '/products-business/status', //上下架
      warehouses: '/warehouses', // 查询仓库信息列表
      warehousesStatus: '/warehouses/status', // 启用禁用仓库
      partition: '/partition', // 库区
      partitionSetPartitionIsValid:'/partition/setPartitionIsValid', // 分区的开启与关闭
      partitionSetPartitionCategory: '/partition/setPartitionCategory', // 添加分区类目
      topCategory: '/top-category', // 获取顶级商品类目
      warehouseentry: '/warehouseentry', // 商品入库管理列表
      warehouseentryHistory:'/warehouseentryHistory',
      warehouseStocks:'/warehouseStock',
      warehouseentrys:'/warehouseentry',
      warehouseentryProduct:'/warehouseentry/product',
      deliveryExplainWeb: '/delivery-explain-web', // 获取配送说明[WEB展现]
      warehouseentryStock: '/warehouseentry/stock', // 实际库存量
      warehousedelivery: '/warehousedelivery', // 商品出库明细
      deliveryExport: '/delivery-export', // 导出商品出库明细
      warehouseStockLogs: '/warehouseStockLogs', // 商品入库明细
      warehouseStockLogExcel: '/warehouseStockLogExcel', // 商品入库excel导出
      warehouseStockexcel:'/warehouseStock/excel',
      deliveryRule:'/deliveryRule',
      deliveryRuleBatch:'/deliveryRuleBatch',
      ordersafterSaleSummary:'/orders/afterSaleSummary',
      blacklist: '/blacklist', // 黑名单
      faqs:'/faqs',
      faqsusType:'/faqs/cusType',
      faqscusTime:'/faqs/cusTime',
      userStatistics:'/userStatistics',
      orderNumStatistics:'/orderNumStatistics',
      actualTimeStatistics:'/actualTimeStatistics',
      frontcategoryweb:'/front-category-web',
      frontcategorywebsetCategoryIds:'/front-category-web/setCategoryIds',
      newAfterSaleaddRecoveryExplain:'/newAfterSale/addRecoveryExplain',
      reviews: '/reviews', //评价
      reviewsReply: '/reviews/reply', // 新增评论回复
      uploadFile: '/uploadFile', //上传视频
      sampleapplys:'/sample-applys',
      samples:'/samples',
      sampleallot:'/sample-allot',
      samplecounts:'/sample-counts',
      samplesadjust:'/samples-adjust',
      sampleadjust:'/sample-adjust',
      theme:'/theme',
      qrCode:'/qrCode',
      qrCodebar:'/qrCode/bar',
      limitProducts:'/products-limited',
      dicgrade:'/dic/grade'
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
