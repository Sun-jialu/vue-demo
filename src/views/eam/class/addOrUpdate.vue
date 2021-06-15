<template>
  <div class="eamClassAdd">
    <titleBar :title="!id ? '新增' : '修改'"></titleBar>
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
            <el-form-item label="班级编码：" prop="classCode">
              <el-input v-model="addOrUpdateForm.classCode" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级名称：" prop="className">
              <el-input v-model="addOrUpdateForm.className" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
              <el-form-item label="创建日期：" prop="classCreateTime">
                  <el-date-picker v-model="addOrUpdateForm.classCreateTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="失效日期：" prop="classExpiryTime">
                    <el-date-picker v-model="addOrUpdateForm.classExpiryTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
          <el-col :span="8">
              <el-form-item label="班主任：" prop="teacherId">
                <el-select v-model="addOrUpdateForm.teacherId" clearable placeholder="请选择班主任">
                 <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in teacherArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="8">
              <el-form-item label="班级类型：" prop="classType">
                <el-select v-model="addOrUpdateForm.classType" clearable placeholder="请选择班级类型">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in classTypeArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="8">
              <el-form-item label="教室名称：" prop="classroomId">
                <el-select v-model="addOrUpdateForm.classroomId" clearable placeholder="请选择教室名称">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in classroomIdArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="班级简介：" prop="remark">
            <el-input type="textarea" v-model="addOrUpdateForm.remark" maxlength="2000" show-word-limit></el-input>
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
import { addData, getDataById, updateData } from "@/api/eam/class";
import { getDropDownList} from "@/api/eam/select";
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
        classCode: '',
        className: '',
        classCreateTime: '',
        classExpiryTime: '',
        teacherId: '',
        classType: '',
        classroomId: '',
        remark: ''
      },
      extIdNameArr: [],
      classTypeArr:[],
      teacherArr:[],
      classroomIdArr:[],
      rules: {
        classCode: [
          { required: true, message: '请填写正确的班级编码', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请填写正确的班级名称', trigger: 'blur' }
        ],
        classCreateTime: [
          { required: true, message: '创建日期不能为空', trigger: 'change' }
        ],
        classExpiryTime: [
          { required: true, message: '失效日期不能为空', trigger: 'change' }
        ],
        teacherId: [
          { required: true, message: '班主任不能为空', trigger: 'change' }
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
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.addOrUpdateForm.classCreateTime= this.getDate()
         this.extIdName()
        })
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolId
           getDataById({"classId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
            }
          })
        }
       
    },
    update(){
        if(this.id){
          this.addOrUpdateForm.classId=this.id
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
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
       //班级类别下拉
        getDropDownList({"code":"eam_class_type","id1":this.addOrUpdateForm.schoolId}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classTypeArr = data;
            }
        });
        //班主任下拉
        getDropDownList({"code":"eam_teachers","id1":this.addOrUpdateForm.schoolId}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.teacherArr = data;
            }
        });
         //教室类别下拉
        getDropDownList({"code":"eam_classrom_type","id1":this.addOrUpdateForm.schoolId}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classroomIdArr = data;
            }
        });
      
    },
    //获取当前时间
    getDate(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      var nowDate = year + "-" + month + "-" + day;
      return nowDate
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
