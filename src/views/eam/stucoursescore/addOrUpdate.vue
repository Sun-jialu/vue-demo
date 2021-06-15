<template>
  <div class="eamClassAdd">
    <titleBar :title="!id ? '新增成绩信息' : '修改成绩信息'"></titleBar>
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
              <el-form-item label="课程分类：" prop="courseType">
                <el-select v-model="addOrUpdateForm.courseType" :disabled="disabled" clearable placeholder="请选择课程分类">
               <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseTypeArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
               <el-form-item label="课程名称：" prop="courseId">
                <el-select v-model="addOrUpdateForm.courseId" :disabled="disabled" clearable placeholder="请选择课程名称">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
              </el-form-item>
           
        </el-col>
        </el-row>
        <el-row>
           <!-- <el-col :span="8">
                <el-form-item label="任课老师：" prop="teacherName">
                    <el-input v-model="addOrUpdateForm.teacherName" :disabled="true"></el-input>
                </el-form-item>
            </el-col> -->
            <el-col :span="8">
                <el-form-item label="学员号：" prop="studentCode">
                    <el-input v-model="addOrUpdateForm.studentCode" :disabled="disabled" @blur="getStudentByCode" maxlength="50"></el-input>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="联系电话：" prop="studentPhone">
                    <el-input v-model="addOrUpdateForm.studentPhone"></el-input>
                </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="学员姓名：" prop="studentName" >
                  <el-input v-model="addOrUpdateForm.studentName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="成绩：" prop="score">
                    <el-input v-model="addOrUpdateForm.score" maxlength="50"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          
         <el-col :span="8">
            <el-form-item label="考试日期：" prop="examTime">
                <el-date-picker v-model="addOrUpdateForm.examTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" rows="1" maxlength="200" v-model="addOrUpdateForm.remark" show-word-limit></el-input>
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
import { getDropDownList} from "@/api/eam/select";
import { getStudentByCode } from "@/api/eam/family";
import { addData, getDataById, updateData} from "@/api/eam/stucoursescore";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        id:0,
        addOrUpdateForm: {
          schoolId: 1,
          courseType: '',
          courseId: '',
          teacherName: '',
          studentCode: '',
          studentName: '',
          score: '',
          examTime:'',
          remark: ''
        },
        disabled:false,
        extIdNameArr:[],
        courseTypeArr:[],
        courseIdArr:[],
        rules: {
          score: [
            { required: true, validator: rules.FormValidate.Form().validatorScore,trigger: 'blur' }
          ],
          examTime: [
            { required: true, message: '考试时间不能为空', trigger: 'change' }
          ],
          studentCode:[
            { required: true, message: '学员号不能为空', trigger: 'blur' }
          ]

        }
    }
   },
   activated (){
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolId) { 
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.extIdName()
        })
        this.disabled=false
        if(this.id){
         this.disabled=true
         this.addOrUpdateForm.schoolId=schoolId
         getDataById({"studentScoreId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
            }
          })
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
        if(this.id){
          this.addOrUpdateForm.studentScoreId=this.id
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
        }else{
          addData(this.addOrUpdateForm).then(res => {
           console.log("res",res)
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
        }
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
     //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
        //课程分类
        getDropDownList({"code":"eam_course_type","id1":this.addOrUpdateForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseTypeArr = data;
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
.eamClassAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>
<style>
.eamClassAdd .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .eamClassAdd .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .eamClassAdd .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
 .eamClassAdd .avatar {
    width: 160px;
    height: 120px;
    display: block;
  }
</style>