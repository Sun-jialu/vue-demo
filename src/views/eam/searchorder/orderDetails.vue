<template>
  <div class="eamClassAdd">
    <titleBar title="订单详情"></titleBar>
    <el-form :model="orderDetailsForm" ref="orderDetailsForm" label-width="140px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
            <el-form-item label="订单编号：" prop="orderCode">
              <el-input v-model="orderDetailsForm.orderCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="订单状态：" prop="orderState">
              <el-select v-model="orderDetailsForm.orderState" clearable placeholder="请选择订单状态" :disabled="true">
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
              <el-form-item label="下单时间：" prop="orderCreateTime">
                  <el-date-picker v-model="orderDetailsForm.orderCreateTime" :disabled="true" type="datetime" placeholder="选择下单时间" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
              <el-form-item label="支付时间：" prop="payTime">
                  <el-date-picker v-model="orderDetailsForm.payTime" :disabled="true" type="datetime" placeholder="选择支付时间" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学员姓名：" prop="studentName">
                <el-input v-model="orderDetailsForm.studentName" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="studentPhone">
              <el-input v-model="orderDetailsForm.studentPhone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="8">
              <el-form-item label="支付渠道：" prop="payType">
                <el-select v-model="orderDetailsForm.payType" clearable placeholder="请选择支付渠道" :disabled="true">
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
            <el-form-item label="第三方订单号：" prop="paySerialCode">
              <el-input v-model="orderDetailsForm.paySerialCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="交易凭证：" prop="tradProof">
              <el-input v-model="orderDetailsForm.tradProof" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品金额（元）：" prop="totalAmt">
            <el-input v-model="orderDetailsForm.totalAmt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="实付金额（元）：" prop="payAmt">
              <el-input v-model="orderDetailsForm.payAmt" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  <el-table
    :data="orderData"
    border
    stripe
    v-loading="loading"
    >
      <el-table-column
          prop="corseCode"
          header-align="center"
          align="center"
          label="课程编码">
      </el-table-column>
      <el-table-column
          prop="courseName"
          header-align="center"
          align="center"
          label="课程名称">
      </el-table-column>
      <el-table-column
          prop="totalhours"
          header-align="center"
          align="center"
          label="总学时">
      </el-table-column>
      <el-table-column
          prop="coursePrice"
          header-align="center"
          align="right"
          label="价格（元）">
          <template slot-scope="scope">{{money(scope.row.coursePrice)}}</template>
      </el-table-column>
    </el-table>
  <div class="btnBox">
      <el-button type="primary" @click="back()">返回</el-button>
  </div>
  </div>
</template>

<script>
import { moneyFormatter } from "@/utils/publicMethod";
import { getOrderDetailById} from "@/api/eam/searchorder";
import { getConstantDownList} from "@/api/eam/select";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        orderDetailsForm: {
          orderCode: '',
          orderState: '',
          orderCreateTime: '',
          payTime: '',
          studentName: '',
          studentPhone: '',
          payType: '',
          paySerialCode: '',
          tradProof:'',
          totalAmt: '',
          payAmt: ''
        },
        orderStateArr:[],
        orderData:[],
        payTypeArr:[],
        loading:true
    }
   },
   activated (){
    //  this.update()
   },
    methods: {
    money(val){
      return moneyFormatter(val)
    },
    orderDetails(id,schoolId) { 
       this.$nextTick(() => {
          this.$refs['orderDetailsForm'].resetFields();
          this.extIdName()
        })
       getOrderDetailById({"orderId":id,"schoolId":schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.orderDetailsForm=res.data
               this.orderDetailsForm.totalAmt=moneyFormatter(res.data.totalAmt)
               this.orderDetailsForm.payAmt=moneyFormatter(res.data.payAmt)
               this.loading=false
               this.orderData=res.data.listCourse
            }
        })   
      
    },
  
    //获取下拉框
     extIdName() {
      //订单状态
      getConstantDownList({"code":"orderStates"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orderStateArr = data;
        }
      });
       //支付渠道
      getConstantDownList({"code":"payType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.payTypeArr = data;
        }
      });
      
    },
    back(){
        this.$parent.orderDetailsIsShow=true
      }
    }
}
</script>
<style lang="scss" scoped>
.eamClassAdd .btnBox{
  margin: 10px auto 20px;
  float: right;
}

</style>
