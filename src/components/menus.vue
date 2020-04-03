<template>
      <el-aside class="scroll" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          router
          :default-active="defaultActive"
          :default-openeds="defaultOpeneds">
          <template v-for="item in menulist">
            <el-menu-item
              v-if="item.isLeaf"
              :key="item.id"
              :index="item.index"
              :route="item.url"
              style="padding-left: 14px;"
            >
              <template slot="title">
                <!--<i :class="item.icon"></i>-->
                <i class="el-icon-user"></i>
                <span>{{item.name}}</span>
              </template>
            </el-menu-item>
            <el-submenu
              v-else
              :key="item.id"
              :index="item.index"
            >
              <template slot="title">
                <!--<i :class="item.icon"></i>-->
                <i class="el-icon-user"></i>
                <span>{{item.name}}</span>
              </template>
              <template v-for="child in item.children">
                <el-menu-item
                  v-if="child.isLeaf"
                  :key="child.id"
                  :index="child.index"
                  :route="child.url"
                >{{child.name}}</el-menu-item>
                <el-submenu
                  v-else
                  :key="child.id"
                  :index="child.index"
                >
                  <span slot="title">{{child.name}}</span>
                  <el-menu-item
                    v-for="child2 in child.children"
                    :key="child2.id"
                    :index="child2.index"
                    :route="child2.url"
                  >{{child2.name}}</el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
</template>

<script>
    export default {
        name: "menus",
      data(){
          return{
            menulist:[],
            defaultActive: "-1",
            defaultOpeneds: [],
          }
      },
      mounted(){
          this.getMenuList();

      },
      methods: {
        getMenuList() {
          //获取菜单信息
          let user = JSON.parse(sessionStorage.getItem('user_info'));
          console.log('user',user)
          if (user) {
            var params = {
              'user-id' :user.profile.attributes.user_id,
              'appIds':121002
            };
            var that=this;
            that.$http({
                method:'GET',
                url: that.$apis.uuc.menu,
                params: params,
              })
              .then(function (data) {
                that.renderData(data);
              })
              .catch(function (error) {
              })
          }
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        renderData(list) {
          let allList = [];
          list.forEach((item, i) => {
            if(!item.parentId){
              allList.push(this.renderItem(item,[]));
            }
          });
          this.menulist = allList;

          // this.tips = "暂无菜单...";
          this.getActive(this.$route.path, this.menulist);
          this.handleRefreshMenu(this.$route.path)
          this.getOpends();

        },
        handleRefreshMenu(path){
          this.$emit('handleRefreshMenu',path,this.menulist)
        },
        renderItem(item, arr) {
          let obj = {
            id: item.id,
            index: item.id + "",
            name: item.resName,
            isOpen: item.isOpen,
            icon: item.icon,
            nameArr: arr.concat([item.resName])
          };

          if (item && item.childrenResources && item.childrenResources.length) {
            obj.isLeaf = false;
            obj.children = [];
            item.childrenResources.forEach((child, j) => {
              obj.children.push(this.renderItem(child, obj.nameArr));
            });
          } else {
            obj.isLeaf = true;
            obj.url =
              item.resourceUrls && item.resourceUrls.length
                ? item.resourceUrls[0].url
                : "/";
          }
          return obj;
        },
        getActive(path, list) {

          list.forEach((x, i) => {
            if (x.isLeaf) {
              if (x.url == path) {
                this.defaultActive = x.index;
                this.$emit("change", x.nameArr);
              }
            } else {
              this.getActive(path, x.children);
            }
          });
        },
        getOpends() {
          let list = this.menulist,
            arr = [];
          list.forEach(item => {
            if (!item.isLeaf && item.children.length) {
              arr.push(item.index);
            }
          });
        },
        handleSelect(index, path) {

          this.$emit('handleMenuSelect',index,this.menulist)
          this.getActiveforIndex(index, this.menulist);
        },
        getActiveforIndex(index, list) {
          list.forEach((x, i) => {
            if (x.isLeaf) {
              if (x.index === index) {
                this.$emit("change", x.nameArr);
              }
            } else {
              this.getActiveforIndex(index, x.children);
            }
          });
        }
      }
    }
</script>

<style scoped>
  .el-menu::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .el-menu::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius   : 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  .el-menu::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #ededed;
    border-radius: 10px;
  }
  .el-submenu .el-menu-item{
    height:40px;
    line-height:40px;
    padding: 0 45px;
    min-width:150px;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    background:#fff!important;

    color:#000;
  }
  .el-submenu__title:hover{
    background:#fff!important;

    color:#000;
  }
</style>
