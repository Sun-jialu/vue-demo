<template>
  <div class="eamClassAdd">
    <titleBar title="退款审核"></titleBar>
    <el-form :model="examineOrderForm" ref="examineOrderForm" label-width="140px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
            <el-form-item label="订单编号：" prop="orderCode">
              <el-input v-model="examineOrderForm.orderCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="支付渠道：" prop="payType">
              <el-select v-model="examineOrderForm.payType" clearable placeholder="请选择订单状态" :disabled="true">
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
            <el-form-item label="退款金额（元）：" prop="payAmt">
              <el-input v-model="examineOrderForm.payAmt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <el-form-item label="学员姓名：" prop="studentName">
                <el-input v-model="examineOrderForm.studentName" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="studentPhone">
              <el-input v-model="examineOrderForm.studentPhone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <!-- <el-col :span="8">
              <el-form-item label="退款状态：" prop="refundState">
                <el-select v-model="examineOrderForm.refundState" clearable placeholder="请选择退款状态" :disabled="true">
                   <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in refundStateArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="退款原因：" prop="reason">
                <el-input type="textarea" v-model="examineOrderForm.reason" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <el-form-item label="审核结果：" prop="refundState">
                <el-radio v-model="examineOrderForm.refundState" :label="1">通过</el-radio>
                <el-radio v-model="examineOrderForm.refundState" :label="2">拒绝</el-radio>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核意见：" prop="refundSuggest">
            <el-input type="textarea" v-model="examineOrderForm.refundSuggest"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  <div class="btnBox">
      <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="back()">返回</el-button>
  </div>
  </div>
</template>

<script>
import { moneyFormatter } from "@/utils/publicMethod";
import { getDataById, updateData } from "@/api/eam/refund";
import {getConstantDownList} from "@/api/eam/select";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
      examineOrderForm: {
        orderCode: '',
        payAmt: '',
        studentName: '',
        studentPhone: '',
        payType: '',
        reason: '',
        refundState: 1,
        refundSuggest: ''
      },
      refundId:'',
      payTypeArr:[],
      refundStateArr:[]
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
    examineOrder(orderId,refundId,schoolId) { 
      this.$nextTick(() => {
          this.$refs['examineOrderForm'].resetFields();
          this.refundId=refundId
        })
         this.examineOrderForm["schoolId"]=schoolId
       getDataById({"orderId":orderId,"refundId":refundId,"schoolId":this.examineOrderForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.examineOrderForm=res.data
               this.examineOrderForm.payAmt=moneyFormatter(res.data.payAmt)
            }
        })   
    },
     //获取下拉框
     extIdName() {
      //支付渠道
      getConstantDownList({"code":"payType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.payTypeArr = data;
        }
      });
       //退款状态
      getConstantDownList({"code":"auditState"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.refundStateArr = data;
        }
      });
    },
     submitForm() {
        this.$refs['examineOrderForm'].validate((valid) => {
          if (valid) {
            let obj={
              "schoolId":this.examineOrderForm.schoolId,
              "orderId":this.examineOrderForm.orderId,
              "refundId":this.refundId,
              "refundState":this.examineOrderForm.refundState,
              "refundSuggest":this.examineOrderForm.refundSuggest
            }
            updateData(obj).then(res => {
              console.log("res",res)
              if (res.rsCode=== 'AAAAAAA') {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
                this.$parent.queryAbout()
                setTimeout(() => {
                   this.$parent.examineOrderIsShow=true
                }, 500);
               
            }
            })   
          } else {
            return false;
          }
        });
      },
    back(){
        this.$parent.examineOrderIsShow=true
      }
    }
}
</script>
<style lang="scss" scoped>
.eamClassAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>
