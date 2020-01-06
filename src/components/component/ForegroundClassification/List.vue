<template>
  <div class="s-list">
    <el-table
      :data="list"
      border
      stripe
      :empty-text="!list.length ? loading ? '数据加载中...' : '暂无数据' : ''"
      element-loading-text="数据加载中..."
      v-loading="loading"
      style="width: 100%">
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="分类图片">
        <template slot-scope="item">
          <img style="width:60px;height:60px;" :src="item.row.image[0]" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="frontSort" label="排序"></el-table-column>
      <el-table-column label="首页-每日鲜栏目中显示">
        <template slot-scope="item">
          <span v-if="item.row.home" style="color:limegreen">是</span>
          <span v-else style="color:red;">否</span>
        </template>
      </el-table-column>
      <el-table-column label="关联商品类目">
        <template slot-scope="item">
          <span v-if="item.row.id!=0">共{{item.row.categoryNum}}个</span>
          <span v-if="item.row.id==0">/</span>
          <el-button style="margin-left:10px;" type="primary" v-if="item.row.id!=0" plain @click="setting(item.row)">设置</el-button>
        </template>
      </el-table-column>
      <el-table-column width="250px" label="操作">
        <template slot-scope="item">
          <div class="s-operate-div">
            <el-button v-if="item.row.id!=0" size="mini" type="primary" @click="handleEdit(item.row)">编辑</el-button>
            <el-popover placement="top" width="200" trigger="click" v-model="item.row.visible">
              <template>
                <p>确认删除{{item.row.name}}?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.row.visible=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(item)">确定</el-button>
                </div>
                <el-button v-if="item.row.id!=0" slot="reference" size="mini" type="danger">删除</el-button>
              </template>
            </el-popover>
            <el-button size="mini" type="success">
              <a href="javascript:;"  style="color: #fff;" @click="handleqrCode(item.row)">二维码</a>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="s-pagination"
      background
      layout="total, prev, pager, next"
      :current-page="parseInt(pages.number + 1)"
      :page-size="pages.size"
      :total="pages.totalElements"
      @current-change="handleChange">
    </el-pagination>

    <div id="capture" v-if="goodsqrCodeUrl">
      <img :src="goodsqrCodeUrl"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        loading: true,
        params: {page: 0, size: 10},
        pages: {size: 10, totalElements: 10, number: 0},
        list:[],
        item: null,
        goodsqrCodeUrl:'',
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      //设置
      setting(row){
        this.$emit('set', true, row)
      },
      handleEdit(row) { //编辑
        this.$emit('edit', true, row)
      },
      getList (params, page) { //获取生鲜柜列表
        var self = this;
        if(params){ self.params = params }
        if(page !== undefined){ self.params.page = page }
        self.loading = true;
        var url=self.$apis.kps.frontcategoryweb;
        // var url='http://10.41.1.136:8086/kps/front-category-web'
        self.$http({
          method:'GET',
          url: url,
          params:self.params,
        })
          .then(function (data) {
            data && self.renderData(data);
            self.loading = false;
          })
          .catch(function (error) {
            self.loading = false;
          })
      },
      renderData(data){ //处理列表数据
        if(data._embedded && data._embedded.frontCategoryListViews){
          data._embedded.frontCategoryListViews.forEach((item) => {
            let embedded = item._embedded;
            if(embedded){
              for (let key in embedded) {
                if(embedded.hasOwnProperty(key)){
                  item[key] = embedded[key];
                }
              }
            }
          })
        }
        this.list = data._embedded ?data._embedded.frontCategoryListViews : [];
        if(data.page){
          this.pages = data.page;
        }
      },
      handleChange(val){ //分页
        this.getList(false, parseInt(val-1));
      },
      handleDelete(item){ //删除
        item.row.visible=false;
        let self = this;
        var url=this.$apis.kps.frontcategoryweb + '/'+item.row.id;
        // var url='http://10.41.1.136:8086/kps/front-category-web'+ '/'+item.row.id
        this.$ajax.delete(url)
          .then(function (data) {
            self.getList();
            self.$message.success('删除类目成功！正在刷新数据...');
          })
          .catch(function (error) {})
      },
      //二维码
      handleqrCode(row){
        let that = this;
        that.goodsqrCodeUrl =that.$store.state.baseUrl+'/kps/front-category-web/qrCode?url=https://sapi.shoppingyizhan.com/list?cid='+row.id;
        that.tanchu(row);
      },
      //二维码弹出
      tanchu(row){
        var that=this;
        setTimeout(()=>{
          that.$html2canvas(document.getElementById('capture'),{
            useCORS: true,          //允许跨域
          }).then((canvas)=>{
            that.goodsqrCodeUrl='';
            that.$notify({
              dangerouslyUseHTMLString: true,
              position: 'bottom-right',
              duration:6000,
              message: "<a href="+canvas.toDataURL()+" download="+row.name+"><img style='width: 100%;height: 100%;' src='"+canvas.toDataURL()+"'/></a>",
            });
          })
        },10)
      },
    }
  }
</script>

<style scoped>
  #capture{
    width: 300px;
    height: 300px;
    position: absolute;
    right:0;
    display:flex;
  }
  #capture a,#capture img{
    display: block;
    width:166px;
    height:166px;
    margin:auto;
  }
</style>
