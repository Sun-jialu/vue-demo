<template>
  <div class="eamClassAdd">
    <titleBar :title="!id ? '批量批阅' : '批阅'"></titleBar>
    <el-form :model="addOrUpdateForm" :rules="rules" ref="addOrUpdateForm" label-width="120px" class="demo-ruleForm">
      <el-row v-if="showWTNameAndAnswer">
        <el-col :span="24">
            <el-form-item label="题目名称：" prop="workTopicName">
              <el-input type="textarea" v-model="addOrUpdateForm.workTopicName" :disabled="true"></el-input>
            </el-form-item>
         </el-col>
      </el-row>
      <el-row v-if="showWTNameAndAnswer">
        <el-col :span="24">
         <el-form-item label="学员作答：" prop="answer">
              <el-input type="textarea" v-model="addOrUpdateForm.answer" :disabled="true"></el-input>
            </el-form-item>
       </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
         <el-form-item label="批阅结果：" prop="resultFlag">
              <el-radio v-model="addOrUpdateForm.resultFlag" :label="0">正确</el-radio>
              <el-radio v-model="addOrUpdateForm.resultFlag" :label="1">错误</el-radio>
          </el-form-item>
       </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
         <el-form-item label="批阅内容：" prop="result">
              <el-input type="textarea" v-model="addOrUpdateForm.result"></el-input>
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
import { getDataById, updateData } from "@/api/eam/stucoursecheck";
export default {
  computed: {

  },
  mounted(){
   
  },
   data(){
    return {
        id:0,
        addOrUpdateForm: {
          workTopicName: '',
          answer: '',
          result: '',
          resultFlag: 0
        },
        schoolId:2,
        showWTNameAndAnswer:false,
        fileList1: [],
        rules: {
          result: [
            { required: true, message: '批阅内容不能为空', trigger: 'blur' }
          ]
        }
    }
   },
   activated(){
    //  console.log("lalal")
   },
 
   destoryed(){
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolId) { 
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.schoolId=schoolId
        })
        console.log("studentWorkanswerIdsArr",this.$parent.studentWorkanswerIdArr)
        if(this.id){
          this.showWTNameAndAnswer=true
          this.schoolId=schoolId
         getDataById({"studentWorkanswerId":this.id,"schoolId":this.schoolId}).then(res => {
              console.log("res",res)
              if (res.rsCode=== 'AAAAAAA') {
                this.addOrUpdateForm=res.data
              }
          })
        }else{
          this.showWTNameAndAnswer=false
        }
       
    },
       submitForm() {
        this.$refs['addOrUpdateForm'].validate((valid) => {
          if (valid) {
            this.update()
          } else {
            return false;
          }
        });
      },
      back(){
        this.$parent.addOrUpdateIsShow=true
      },
      update(){
        console.log(this.addOrUpdateForm.schoolId)
        let arrid=[]
         if(this.id){
          arrid.push(this.id)
         }else{
           arrid=this.$parent.studentWorkanswerIdArr
         }
         let obj={
                "studentWorkanswerIds":arrid,
                "resultFlag":this.addOrUpdateForm.resultFlag,
                "result":this.addOrUpdateForm.result,
                "schoolId":this.schoolId
          }
            updateData(obj).then(res => {
            //  console.log("res",res)
              if (res.rsCode=== 'AAAAAAA') {
                  this.$notify({
                    title: '成功',
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$parent.queryAbout()
                  setTimeout(() => {
                    this.$parent.addOrUpdateIsShow=true
                  }, 500);
                
              }
          })
       },
       handleAvatarSuccess(res, file) {
        console.log(res)
      },
      beforeAvatarUpload(file) {
       
      },
      handleChange(file, fileList) {
        this.fileList1 = fileList.slice(-3);
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