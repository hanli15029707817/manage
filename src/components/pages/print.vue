<template>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发货单" name="first">
          <table id="form1" bordercolor="black" class="tableA">
            <tr class="title">
              <th colspan="4">学生信息</th>
            </tr>
            <tr>
              <th>名字</th>
              <th>性别</th>
              <th>年龄</th>
              <th>班级</th>
            </tr>
            <tr>
              <td>张三</td>
              <td>男</td>
              <td>19</td>
              <td>1班</td>
            </tr>
            <tr>
              <td>李四</td>
              <td>男</td>
              <td>20</td>
              <td>2班</td>
            </tr>
            <tr>
              <td>王五</td>
              <td>男</td>
              <td>21</td>
              <td>3班</td>
            </tr>
            <tr class="footer">
              <td colspan="4">总人数：3人</td>
            </tr>
          </table>
          <button @click="a">打印</button>
        </el-tab-pane>
        <el-tab-pane label="快递单" name="second">快递单</el-tab-pane>
        <el-tab-pane label="配货单" name="third">配货单</el-tab-pane>
        <el-tab-pane label="送货详单" name="fourth">送货详单</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import remoteLoad from './remoteLoad2.js'
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    mounted(){
      this.getClodop();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //加载CLodopfuncs
      async getClodop(){
        await remoteLoad.createScript(`https://localhost:8443/CLodopfuncs.js`)
      },
      //判断电脑是否安装CLODOP
      hasCLODOP(){
        var LODOPs;
        try {
          LODOPs=CLODOP;
        }
        catch(err) {
          LODOPs=null;
        }
        return LODOPs
      },
      //  打印
      a(){
        console.log(2222222222,this.hasCLODOP())

        let  LODOP =this.hasCLODOP();
        // LODOP.SET_PRINT_PAGESIZE(3,'','','');
        // LODOP.SET_PRINTER_INDEX(this.editForm.selectPrinter)
        // LODOP.PRINT_INITA("0mm","0mm","78.58mm",height,"");//控制纸的高度
        LODOP.SET_LICENSES("西安景兆信息科技有限公司","89A84F898EE17DE99DD5D1E8A683CAE9","","");//打印纸下方的文字
        // this.printerTitle(LODOP)
        // var app=(Number((this.printerHeight()*0.28).toFixed(2))+Number(30.16))+'mm';
        LODOP.ADD_PRINT_HTM("-0.05mm","0.53mm","110%","100%",document.getElementById("form1").innerHTML?document.getElementById("form1").innerHTML:'');
        // LODOP.PRINT();//直接打印
        LODOP.PREVIEW();//打印预览的方法
        // LODOP.PRINT_DESIGN();//打印设计的方法
        // this.dialogAddVisible = false;
        // let inputauto=document.querySelector('.inputauto input')
        // if(inputauto){
        //   inputauto.focus();
        // }
      },
    }
  };
</script>

<style scoped>
  .tableA {
    border-collapse: collapse;
  }
  .tableA .title th{
    height: 50px;
    font-size: 24px;
    font-family: '微软雅黑';
    font-weight: 700;
  }
  .tableA tr th {
    border: 1px #000 solid;
    height: 40px;
    background: #efefef;
  }
  .tableA tr td {
    padding: 0 40px;
    border: 1px #000 solid;
    height: 40px;
    text-align: center;
  }
  .tableA .footer td {
    font-size: 20px;
    font-weight: 700;
  }
</style>
