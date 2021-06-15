<template>
  <div>
    <titleBar></titleBar>
    <el-divider content-position="left">付款信息</el-divider>
    <el-form :model='dataForm' :rules='rules' ref="dataForm" label-width='110px' class="search-form--wrap">
        <el-row>
            <el-col :span='8'>
                <el-form-item label='所属银行：'>
                    <el-input v-model="dataForm.bankId"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span='16'>
                <el-form-item label='账户：'>
                      <el-select
                        v-model="dataForm.accountNo"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入账号后四位"
                        :remote-method="searchAccount"
                        :loading="loading">
                        <el-option
                            v-for="item in accountList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span='8'>
                <el-form-item label='账户余额：'>
                      <el-input disabled v-model="dataForm.balance"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-divider content-position="left">收款信息</el-divider>
        <el-row>
            <el-col :span='24'>
                <el-form-item style="text-align:right" label-width='0'>
                      <el-button type="primary" plain>批量导入</el-button>
                      <el-button type="primary" plain>下载模板</el-button>
                      <el-button type="primary" plain>导出</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
     prop=''
      header-align="center"
      align="center"
      label="收款账号"
      >
    </el-table-column>
    <el-table-column
       prop=''
      label="收款账户名称"
        header-align="center"
      align="center"
      >
    </el-table-column>
    <el-table-column
       prop=''
      header-align="center"
      align="center"
      label="所属银行">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="开户网点">
    </el-table-column>
        <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="银联号">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="付款金额">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="付款用途">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="备注">
    </el-table-column>
   <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="收款账户类型">
    </el-table-column>
    </el-table>
   <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[5,10,30,50,100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>

    <el-row style="margin-top:15px">
        <el-col :span='8'>
            <el-form-item label="合计金额：">
                <el-input v-model='dataForm.allMoney' disabled></el-input>
            </el-form-item>
        </el-col>
         <el-col :span='8'>
            <el-form-item label="合计笔数：">
                <el-input v-model='dataForm.totalNum' disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span='8'>
            <el-form-item label="支付方式：">
                 <el-radio v-model="dataForm.payType" label="1">普通</el-radio>
                 <el-radio v-model="dataForm.payType" label="2">加急</el-radio>
                 <el-radio v-model="dataForm.payType" label="3">特急</el-radio>
            </el-form-item>
        </el-col>
    </el-row>
     <el-divider content-position="left">附加信息</el-divider>
     <el-row>
         <el-col :span='8'>
            <el-form-item label="是否预约：">
                  <el-radio-group @change='timeTypeChange' v-model="dataForm.isMakeOrder">
                    <el-radio  label="1">是</el-radio>
                    <el-radio  label="2">否</el-radio>
                  </el-radio-group>
        
            </el-form-item>
        </el-col>
          <el-col :span='8' v-if='dataForm.isMakeOrder == "1"'>
            <el-form-item label="预约日期：" prop='time'>
                    <el-date-picker
                        v-model="dataForm.time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="maxTime"
                        placeholder="选择日期">
                     </el-date-picker>
            </el-form-item>
        </el-col>
     </el-row>
      <div style="text-align:right">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </el-form>
 </div>
</template>

<script>
export default {
  data() {
    return {
        loading:false,
        accountList:[],//银行搜索出的列表
        dataForm:{
            bankId:'',
            accountNo:'',//银行账号
            balance:'',//余额
            allMoney:'', //合计金额
            totalNum:'', //总笔数
            payType:'1',//支付方式
            isMakeOrder:'1',
            time:'',//预约时间

        },
        rules:{
            time:[{ required: true, message: "请选择预约日期", trigger: "blur" }]
        },
      maxTime:{
         disabledDate:time=> {
             return time.getTime() <= new Date().getTime();
          }
      },
      tableData:[{},{}],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
    };
  },
  components: {
  },

  mounted() {},

  activated() {
  },
  methods: {
      //搜索
    searchAccount(val){

    },
      getList(){
          
      },
      //切换预约
    timeTypeChange(val){
       if(this.dataForm.isMakeOrder == '2'){
           this.dataForm.time = ''
       }
    },
    submit(){
        this.$refs["dataForm"].validate(val=>{
            if(val){
                this.submitHand()
            }

        })
    },
    //提交
    submitHand(){

    },
        // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getList();
    }
  },
};
</script>

<style scoped lang="scss">

</style>


