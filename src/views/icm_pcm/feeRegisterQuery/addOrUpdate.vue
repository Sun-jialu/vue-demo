<template>
  <div>
    <!-- 头部标题 -->
    <titleBar title="修改费用信息"></titleBar>
    <el-form label-width='100px' :model='dataForm' ref="dataForm" :rules="rules">
        <el-row>
            <el-col :span='8'>
                <el-form-item label="姓名：" prop='name'>
                    <el-input v-model='dataForm.name'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="客户号：" prop='customerNo'>
                    <el-input v-model='dataForm.customerNo'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="部门：" prop='departmentId'>
                    <el-input v-model='dataForm.departmentId'></el-input>
                </el-form-item>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span='8'>
                <el-form-item label="联系电话：" prop='phone'>
                    <el-input v-model='dataForm.phone'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="费用类型：" prop='feeType'>
                    <el-input v-model='dataForm.feeType'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="费用名称：" prop='feeName'>
                    <el-input v-model='dataForm.feeName'></el-input>
                </el-form-item>
            </el-col>
            
        </el-row>

          <el-row>
            <el-col :span='8'>
                <el-form-item label="费用金额：" prop='fee'>
                    <el-input v-model='dataForm.fee'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="失效日期：" prop='date'>
                       <el-date-picker
                        v-model="dataForm.date"
                        type="date"
                        :picker-options="timeMin"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="备注：">
                    <el-input v-model='dataForm.des'></el-input>
                </el-form-item>
            </el-col>
            
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
           date:'',
           des:'',

        },
        timeMin: {
            disabledDate: time => {
                return time.getTime() < new Date().getTime() ;
        }
      },
        rules:{
            name:[{ required: true, message: "请输入姓名", trigger: "blur" }],
           customerNo:[{ required: true, message: "请输入客户号", trigger: "blur" }],
           departmentId:[{ required: true, message: "请选择部门", trigger: "blur" }],
           phone:[{ required: true, message: "请输入电话", trigger: "blur" }],
           feeType:[{ required: true, message: "请选择费用类型", trigger: "blur" }],
           feeName:[{ required: true, message: "请输入费用名称", trigger: "blur" }],
           fee:[{ required: true, message: "请输入费用金额", trigger: "blur" }],
           date:[{ required: true, message: "请选择失效日期", trigger: "blur" }],

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