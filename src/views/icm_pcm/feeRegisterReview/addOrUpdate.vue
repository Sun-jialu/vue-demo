<template>
  <div>
    <!-- 头部标题 -->
    <titleBar title="费用登记审核"></titleBar>
    <el-form label-width='100px' :model='dataForm' ref="dataForm" :rules="rules">
        <el-row>
        <el-col :span='24'>
            <el-form-item prop='result' label='审核结果：'>
                 <el-radio v-model="dataForm.result" label="1">同意</el-radio>
                 <el-radio v-model="dataForm.result" label="2">拒绝</el-radio>
            </el-form-item>
        </el-col>
    </el-row>
     <el-row>
        <el-col :span='24'>
            <el-form-item prop='suggest' label='审核意见：'>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入意见"
                    v-model="dataForm.suggest">
                    </el-input>
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
        items:[],
        dataForm:{
            result:'2',
            suggest:'',
        },
        rules:{
            result:[{ required: true, message: "请选择审核结果", trigger: "blur" }],
            suggest:[{ required: true, message: "请输入审核意见", trigger: "blur" }]
        }
    };
  },

  methods: {
      init(checkItems){
          this.items = checkItems

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