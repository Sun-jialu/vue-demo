<template>
  <div class="eamCoursechapterAdd">
    <titleBar :title="!id ? '新增课程章节' : '修改课程章节'"></titleBar>
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
            <el-form-item label="课程名称" prop="courseId">
              <el-select v-model="addOrUpdateForm.courseId" clearable placeholder="请选择课程名称">
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
            <el-form-item label="章节名称" prop="chapterName">
              <el-input v-model="addOrUpdateForm.chapterName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="所属章节：" prop="courseName">
              <el-select v-model="addOrUpdateForm.courseName" clearable placeholder="请选择所属章节">
                <el-option label="第一章" value="1"></el-option>
                <el-option label="第二章" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
         
            <el-col :span="8">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" rows="1" v-model="addOrUpdateForm.remark" maxlength="200" show-word-limit></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="8">
                <el-form-item label="状态：" prop="state">
                    <el-select v-model="addOrUpdateForm.state" clearable placeholder="请选择状态">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in stateArr"
                    :key="index"
                    ></el-option>
                    </el-select>
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
import { addData, getDataById, updateData } from "@/api/eam/coursechapter";
import { getDropDownList,getConstantDownList } from "@/api/eam/select";
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
          courseId: '',
          // courseName: '',
          chapterName: '',
          state: 0,
          remark: ''
        },
        extIdNameArr:[],
        stateArr:[],
        courseIdArr:[],
        rules: {
          courseId: [
            { required: true, message: '课程名称不能为空', trigger: 'change' }
          ],
          courseName: [
            { required: true, message: '所属章节不能为空', trigger: 'change' }
          ],
          chapterName: [
            { required: true, message: '章节名称不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
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
         this.extIdName()
        })
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolId
          getDataById({"chapterId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
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
          this.addOrUpdateForm.chapterId=this.id
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
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
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
.eamCoursechapterAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>