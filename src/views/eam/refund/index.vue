<template>
  <div class="eamClass">
      <!-- 主页面 -->
    <div v-if="examineOrderIsShow">
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
                <el-form-item label="联系电话：" prop="studentPhone">
                   <el-input v-model="formData.studentPhone"></el-input>
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
                align="center"
                label="订单金额（元）">
                <template slot-scope="scope">{{money(scope.row.payAmt)}}</template>
            </el-table-column>
            <el-table-column
                prop="payTypeValue"
                header-align="center"
                align="center"
                label="支付渠道">
            </el-table-column>
            <el-table-column
                prop="reason"
                header-align="center"
                align="center"
                label="退款说明">
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
                prop="applyTime"
                header-align="center"
                align="center"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="examine(scope.row.orderId,scope.row.refundId,scope.row.schoolId)">审核</el-button>
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
    <examineOrder ref="examineOrder" v-if="!examineOrderIsShow"></examineOrder>
  </div>
</template>
<script>
import examineOrder from "./examineOrder";
import { moneyFormatter} from "@/utils/publicMethod"
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getPageListByParam} from "@/api/eam/refund";
export default {
    components: {
        examineOrder
    },
  data() {
    return {
      examineOrderIsShow:true,
      formData: {
        schoolId: "",//学校名称
        orderCode: "",//订单编号
        studentName: "",
        payType: "",
        studentPhone: "",
        startTime: "",
        endTime: ""
      },
      extIdNameArr:[],
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
     this.examineOrderIsShow=true
     
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
      this.formData["pageSize"]=this.pageSize
      this.formData["pageNum"]=this.pageIndex
       getPageListByParam(this.formData).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
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
      //支付渠道
      getConstantDownList({"code":"payType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.payTypeArr = data;
          this.payTypeArr.push({'name':'全部','value':''})
        }
      });
      
    },
    //审核
    examine(orderId,refundId,schoolId) {
        this.examineOrderIsShow=false
        this.$nextTick(() => {
            this.$refs.examineOrder.examineOrder(orderId,refundId,schoolId)
        })
     
    },
    //删除
    // deleteColumn(id){
    //     console.log(id)
    //     this.$confirm('确定删除该条数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$notify({
    //         message: '删除成功',
    //         type: 'success'
    //       });
    //     })
    // },
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