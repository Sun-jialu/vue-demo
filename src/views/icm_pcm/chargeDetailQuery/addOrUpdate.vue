<template>
  <div>
    <!-- 头部标题 -->
    <titleBar title="收费详情"></titleBar>
    <el-form label-width='100px' disabled :model='dataForm' ref="dataForm" :rules="rules">
     <el-divider content-position="left">费用信息</el-divider>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="姓名：" prop='name'>
                    <el-input disabled v-model='dataForm.name'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="客户号：" prop='customerNo'>
                    <el-input disabled v-model='dataForm.customerNo'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="部门：" prop='departmentId'>
                    <el-input disabled v-model='dataForm.departmentId'></el-input>
                </el-form-item>
            </el-col>
        </el-row>

         <el-row>
          
            <el-col :span='8'>
                <el-form-item label="联系电话：" prop='phone'>
                    <el-input  disabled v-model='dataForm.phone'></el-input>
                </el-form-item>
            </el-col>
                <el-col :span='8'>
                <el-form-item label="缴费编号：" prop='chargeNo'>
                    <el-input  disabled v-model='dataForm.chargeNo'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="费用类型：" prop='feeType'>
                    <el-input  disabled  v-model='dataForm.feeType'></el-input>
                </el-form-item>
            </el-col>
         
            
        </el-row>

          <el-row>
            <el-col :span='8'>
                <el-form-item label="费用名称：" prop='feeName'>
                    <el-input  disabled  v-model='dataForm.feeName'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item    label="费用金额：" prop='fee'>
                    <el-input type="number" disabled v-model='dataForm.fee'>
                        <span slot="suffix">
                          元
                        </span>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item    label="备注：">
                    <el-input disabled v-model='dataForm.des'></el-input>
                </el-form-item>
            </el-col>
            
        </el-row>
     <el-divider content-position="left">操作</el-divider>

     <el-row>
         <el-col :span="8">
             <el-form-item label='收费渠道：'>
                  <el-select v-model="dataForm.chargeChannel" placeholder="--请选择--">
                    <el-option
                    v-for="item in chargeChannelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
             </el-form-item>
         </el-col>
           <el-col :span="8">
             <el-form-item label='收费凭证：'>
                  <el-input v-model='dataForm.chargeCer'></el-input>
             </el-form-item>
         </el-col>
         <el-col :span="8">
             <el-form-item label='收费时间：'>
               <el-date-picker
                v-model="dataForm.chargeTime"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="收费时间">
                </el-date-picker>
             </el-form-item>
         </el-col>
     </el-row>
     <el-row>
          <el-form-item label='操作员：'>
                  <el-input v-model='dataForm.operator'></el-input>
             </el-form-item>
     </el-row>
    </el-form>
    <div style="text-align:right">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cb">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        item:'',
        dataForm:{
           name:'',
           customerNo:'',
           departmentId:'',
           phone:'',
           feeType:'',
           feeName:'',
           fee:'',
           chargeNo:'',
           des:'',
           chargeChannel:'',//收费渠道
           chargeCer:'',//收费凭证
            chargeTime:'',//收费时间
            operator:'',//操作员
        },
        chargeChannelList:[],
        timeMin: { disabledDate: time => { return time.getTime() < new Date().getTime() ;  } },
        rules:{
        //     name:[{ required: true, message: "请输入姓名", trigger: "blur" }],
        //    customerNo:[{ required: true, message: "请输入客户号", trigger: "blur" }],
        //    departmentId:[{ required: true, message: "请选择部门", trigger: "blur" }],
        //    phone:[{ required: true, message: "请输入电话", trigger: "blur" }],
        //    feeType:[{ required: true, message: "请选择费用类型", trigger: "blur" }],
        //    feeName:[{ required: true, message: "请输入费用名称", trigger: "blur" }],
        //    fee:[{ required: true, message: "请输入费用金额", trigger: "blur" }],
        //    date:[{ required: true, message: "请选择失效日期", trigger: "blur" }],

        }
    };
  },

  methods: {
      init(checkItem){
          this.item = checkItem

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
          this.$emit('success')
      },
    cb(){
        this.$emit('cancel')
    }
  }
};
</script>