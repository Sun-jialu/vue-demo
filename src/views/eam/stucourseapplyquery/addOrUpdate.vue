<template>
  <div class="eamCourseAdd">
    <titleBar title="报名信息修改"></titleBar>
    <el-form :model="addOrUpdateForm" :rules="rules" ref="addOrUpdateForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
            <el-form-item label="学校名称：" prop="schoolId">
              <el-select v-model="addOrUpdateForm.schoolId" clearable placeholder="请选择学校名称" :disabled="true">
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
            <el-form-item label="报名日期：" prop="createTime">
             <el-date-picker v-model="addOrUpdateForm.createTime" :disabled="true" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :span="8">
                <el-form-item label="学员号：" prop="studentCode">
                    <el-input v-model="addOrUpdateForm.studentCode" maxlength="50"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
              <el-form-item label="学员姓名：" prop="studentName" >
                  <el-input v-model="addOrUpdateForm.studentName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="课程名称：" prop="courseId">
              <el-select v-model="addOrUpdateForm.courseId" clearable placeholder="请选择课程名称" @change="getCourseInfo">
              <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item,index) in courseIdArr"
              :key="index"
              ></el-option>
              </el-select>
          </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="课程费用：" prop="coursePrice">
              <el-input v-model="addOrUpdateForm.coursePrice" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          </el-row>
          <el-row>
            <el-col :span="8">
            <el-form-item label="总课时：" prop="totalhours">
              <el-input v-model="addOrUpdateForm.totalhours" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="开始日期：" prop="startTime">
                  <el-date-picker v-model="addOrUpdateForm.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="addOrUpdateForm.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="8">
              <el-form-item label="联系电话：" prop="studentPhone">
                <el-input v-model="addOrUpdateForm.studentPhone" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="addOrUpdateForm.remark" rows="1" maxlength="200" show-word-limit></el-input>
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
import rules from "@/utils/verify";
import { moneyFormatter } from "@/utils/publicMethod";
import { getDataById, updateData,getCourseInfo } from "@/api/eam/stucourseapplyquery";
import { getDropDownList} from "@/api/eam/select";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        addOrUpdateForm: {
          schoolId: 1,
          courseId: '',
          studentName: '',
          totalhours: '',
          studentPhone:'',
          coursePrice: '',
          startTime: '',
          endTime: '',
          studentCode:"",
          createTime:'',
          remark: ''  
        },
        id:'',
        extIdNameArr:[],
        courseIdArr:[],
        rules: {
          courseId: [
            { required: true, message: '请选择课程名称', trigger: 'change' }
          ],
          totalhours: [
            { required: true, validator: rules.FormValidate.Form().validatorNumAndPoint, trigger: 'blur' }
          ],
          coursePrice: [
            { required: true, validator: rules.FormValidate.Form().validatorMoney, trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '报名日期不能为空', trigger: 'change' }
          ],
          studentCode: [
            { required: true, message: '学员号不能为空', trigger: 'blur' }
          ],
          studentName: [
            { required: true, message: '学生姓名不能为空', trigger: 'blur' }
          ],
          studentPhone:[
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ]
        }
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolId) {
      this.id =  id 
      this.extIdName()
      this.addOrUpdateForm.schoolId=schoolId
      getDataById({"studentApplyId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
        console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.addOrUpdateForm=res.data
             this.addOrUpdateForm.coursePrice=moneyFormatter(res.data.coursePrice)
        }
    })
     
       
    },
      //根据课程名称联动获取课程信息
      getCourseInfo(){
          getCourseInfo({"courseId":this.addOrUpdateForm.courseId,"studentId":this.addOrUpdateForm.studentId,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
                console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.addOrUpdateForm.totalhours=res.data.totalhours
                    this.addOrUpdateForm.coursePrice=moneyFormatter(res.data.coursePrice)
                }
            })
      },
     submitForm() {
         console.log(this.addOrUpdateForm.teacherId)
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
        this.addOrUpdateForm.coursePrice=this.addOrUpdateForm.coursePrice*100
          this.addOrUpdateForm.studentApplyId=this.id
          updateData(this.addOrUpdateForm).then(res => {
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
       //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
       //课程名称
        getDropDownList({"code":"eam_course","id1":this.addOrUpdateForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseIdArr = data;
          }
        });
       
    }
    

  }
}
</script>
<style lang="scss" scoped>
.eamCourseAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}
</style>
