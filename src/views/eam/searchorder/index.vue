<template>
  <div class="eamClass">
      <!-- 主页面 -->
    <div v-if="orderDetailsIsShow">
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="学校名称：" prop="schoolId">
                    <el-select v-model="formData.schoolId" placeholder="请选择学校名称">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in extIdNameArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="订单编号：" prop="orderCode">
                    <el-input v-model="formData.orderCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="学员姓名：" prop="studentName">
                    <el-input v-model="formData.studentName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="支付渠道：" prop="payType">
                    <el-select v-model="formData.payType" clearable placeholder="请选择支付渠道">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in payTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="订单状态：" prop="orderState">
                    <el-select v-model="formData.orderState" clearable placeholder="请选择订单状态">
                     <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in orderStateArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
            <el-col :span="24">
                <el-form-item style="text-align:right;">
                    <el-button plain type="primary" @click="printPreview">打印预览</el-button>
                    <el-button plain type="primary" @click="exportExcel">导出EXCEL</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        
        <!-- 表格组件 -->
        <div id="print">
            <el-table
            :data="tableData"
            border
            v-loading="loading"
            >
            <el-table-column
                prop="orderCode"
                header-align="center"
                align="center"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="payAmt"
                header-align="center"
                align="right"
                label="订单金额（元）">
                 <template slot-scope="scope">{{money(scope.row.payAmt)}}</template>
            </el-table-column>
            <el-table-column
                prop="orderCreateTime"
                header-align="center"
                align="center"
                label="下单时间">
            </el-table-column>
            <el-table-column
                prop="payTime"
                header-align="center"
                align="center"
                label="支付时间">
            </el-table-column>
            <el-table-column
                prop="studentName"
                header-align="center"
                align="center"
                label="学员姓名">
            </el-table-column>
            <el-table-column
                prop="studentPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="payTypeValue"
                header-align="center"
                align="center"
                label="支付渠道">
            </el-table-column>
            <el-table-column
                prop="orderStateValue"
                header-align="center"
                align="center"
                label="订单状态">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="searchOrder(scope.row.orderId,scope.row.schoolId)">查看</el-button>
                    <!-- <el-button type="text" size="small" @click="deleteColumn(scope.row.classCode)">删除</el-button> -->
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
         <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page.sync="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
    <!-- 新增和修改 -->
    <orderDetails ref="orderDetails" v-if="!orderDetailsIsShow"></orderDetails>
  </div>
</template>
<script>
const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
import { isNull,moneyFormatter} from "@/utils/publicMethod";
import orderDetails from "./orderDetails";
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getPageListByParam} from "@/api/eam/searchorder";
export default {
    components: {
        orderDetails
    },
  data() {
    return {
      orderDetailsIsShow:true,
      formData: {
        schoolId: "",//学校名称
        orderCode: "",//订单编号
        studentName: "",
        payType: "",
        orderState: "",
        startTime: "",
        endTime: ""
      },
      extIdNameArr:[],
      orderStateArr:[],
      payTypeArr:[],
      tableData: [
      ],
      loading:true,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.orderDetailsIsShow=true
     this.extIdName()
   },
  computed: {},
  methods: {
    money(val){
      return moneyFormatter(val)
    },
    // 查询
    queryAbout(val) {
        if(val===1){
         this.pageIndex = 1
      }
     this.loading=true
      this.formData.pageSize=this.pageSize
      this.formData.pageNum=this.pageIndex
       getPageListByParam(this.formData).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    
    //查询
    searchOrder(id,schoolId) {
        this.orderDetailsIsShow=false
        this.$nextTick(() => {
            this.$refs.orderDetails.orderDetails(id,schoolId)
        })
        // this.$router.push({name:'sam/course/orderDetails'})
        
    },
    //删除
    deleteColumn(id){
        console.log(id)
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            message: '删除成功',
            type: 'success'
          });
        })
    },
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
          this.formData.schoolId=data[0].value
          this.queryAbout()
        }
      });
      //订单状态
      getConstantDownList({"code":"orderStates"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orderStateArr = data;
           this.orderStateArr.push({'name':'全部','value':''})
        }
      });
       //支付渠道
      getConstantDownList({"code":"payType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.payTypeArr = data;
           this.payTypeArr.push({'name':'全部','value':''})
        }
      });
      
    },
     // 打印预览
    printPreview() {
      console.log("打印预览");
      var print= document.getElementById('print');
      var newContent = print.innerHTML;
      var oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      document.getElementsByTagName('body')[0].style.zoom=0.92;
      window.print();
      window.location.reload();
      //将原有页面还原到页面
      document.body.innerHTML = oldContent;
      return false;
    },
    // 导出excel
    exportExcel() {
      this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/order/exportOrderPageListData`
      window.location.href= url + '?' + isNull(this.formData)
    },
    // 每页数
    sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.queryAbout()
    },
    // 当前页
    currentChangeHandle (val) {
        this.pageIndex = val
        this.queryAbout()
    }
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

</style>