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
            <el-form-item label="登记日期：" prop="createTime">
             <el-date-picker v-model="addOrUpdateForm.createTime" :disabled="true" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :span="8">
                <el-form-item label="学员号：" prop="studentCode">
                    <el-input v-model="addOrUpdateForm.studentCode" :disabled="true" @blur="getStudentByCode" maxlength="50"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
              <el-form-item label="学员姓名：" prop="studentName" >
                  <el-input v-model="addOrUpdateForm.studentName" :disabled="true"></el-input>
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
            <el-form-item label="总课时：" prop="totalhours">
              <el-input v-model="addOrUpdateForm.totalhours" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          </el-row>
          <el-row>
            <el-col :span="8">
            <el-form-item label="当日学习课时：" prop="studyCountByday">
              <el-input v-model="addOrUpdateForm.studyCountByday" maxlength="50" @keyup.native="count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="剩余课时：" prop="noStudyhours">
              <el-input v-model="addOrUpdateForm.noStudyhours" maxlength="50" :disabled="true"></el-input>
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
import { getStudentByCode } from "@/api/eam/family";
import { getDataById, updateData,getCourseById } from "@/api/eam/stucourselearncordquery";
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
          noStudyhours:'',
          studyCountByday: '',
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
          studyCountByday: [
            { required: true, message: '当日学习课时不能为空', trigger: 'blur' }
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
          noStudyhours:[
            { required: true, message: '剩余课时不能为空', trigger: 'blur' }
          ]
        }
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolId,studentId) {
      this.id =  id 
      this.addOrUpdateForm.studentId=studentId
      this.addOrUpdateForm.schoolId=schoolId
     this.extIdName()
      getDataById({"studentLearnRecordId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
        console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.addOrUpdateForm=res.data
        }
    })
     
       
    },
    //通过学员编号查询学生基本信息
    async getStudentByCode(){
        let res = await getStudentByCode({ "studentCode":this.addOrUpdateForm.studentCode,"schoolId":this.addOrUpdateForm.schoolId });

        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          console.log("data",data)
          this.addOrUpdateForm.studentName=data.studentName;
          this.addOrUpdateForm.studentId=data.studentId
        }
      },
      //根据课程名称联动获取课程信息
      getCourseInfo(){
        getCourseById({"courseId":this.addOrUpdateForm.courseId,"studentId":this.addOrUpdateForm.studentId,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
                console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.addOrUpdateForm.totalhours=res.data.totalhours
                    this.addOrUpdateForm.noStudyhours=res.data.noStudyhours
                    this.addOrUpdateForm.studyCountByday=res.data.studyCountByday
                }
            })
      },
      //当日学习变化后计算剩余课时
      count(){
        this.addOrUpdateForm.noStudyhours=this.addOrUpdateForm.totalhours-this.addOrUpdateForm.studyCountByday
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
          this.addOrUpdateForm.studentLearnRecordId=this.id
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
        getDropDownList({"code":"eam_student_course","id1":this.addOrUpdateForm.schoolId,"id2":this.addOrUpdateForm.studentId}).then(res => {
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
