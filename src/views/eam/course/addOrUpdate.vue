<template>
  <div class="eamCourseAdd">
    <titleBar :title="!id ? '新增课程' : '修改课程'"></titleBar>
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
            <el-form-item label="课程名称：" prop="courseName">
              <el-input v-model="addOrUpdateForm.courseName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="课程分类：" prop="courseType">
              <el-select v-model="addOrUpdateForm.courseType" clearable placeholder="请选择课程分类">
                 <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseTypeArr"
                    :key="index"
                    ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
            <el-form-item label="总课时：" prop="totalhours">
              <el-input v-model="addOrUpdateForm.totalhours" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="价格（元）：" prop="coursePrice">
              <el-input v-model="addOrUpdateForm.coursePrice" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="生效日期：" prop="courseCreateTime">
                  <el-date-picker v-model="addOrUpdateForm.courseCreateTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" :disabled="true" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
                <el-form-item label="失效日期：" prop="courseExpiryTime">
                    <el-date-picker v-model="addOrUpdateForm.courseExpiryTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
          <el-col :span="8">
              <el-form-item label="任课教师：" prop="teacherIds">
                <el-select v-model="addOrUpdateForm.teacherIds" multiple clearable placeholder="请选择任课教师">
                   <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in teacherIdArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="8">
              <el-form-item label="开放加入：" prop="openEntryState">
                <el-select v-model="addOrUpdateForm.openEntryState" placeholder="请选择">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in openEntryStateArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="课程简介：" prop="courseIntr">
                <el-input type="textarea" v-model="addOrUpdateForm.courseIntr" maxlength="2000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          
            <el-col :span="8">
                <el-form-item label="加入截止日期：" prop="openExpiryTime">
                    <el-date-picker v-model="addOrUpdateForm.openExpiryTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="addOrUpdateForm.remark" rows="1" maxlength="200" show-word-limit></el-input>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="课程图片：">
             <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip" style="color:#ff4949;">* 照片格式：jpg、png，推荐尺寸：640*480，大小不超过 100K *</div>
            </el-upload>      
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
import { addData, getDataById, updateData } from "@/api/eam/course";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        addOrUpdateForm: {
          schoolId: 1,
          courseName: '',
          courseType: '',
          totalhours: '',
          coursePrice: '',
          courseCreateTime: '',
          courseExpiryTime: '',
          teacherIds: [],
          courseIntr: '',
          openEntryState: 1,
          openExpiryTime: '',
          courseImage:"http://aaaaaaaaaaaaa.png",
          remark: ''
        },
        id:0,
        imageUrl: '',
        extIdNameArr:[],
        courseTypeArr:[],
        stateArr: [],
        teacherIdArr:[],
        openEntryStateArr:[],
        rules: {
          courseName: [
            { required: true, message: '请填写课程名称', trigger: 'blur' }
          ],
          totalhours: [
            { required: true, validator: rules.FormValidate.Form().validatorNumAndPoint, trigger: 'blur' }
          ],
          coursePrice: [
            { required: true, validator: rules.FormValidate.Form().validatorMoney, trigger: 'blur' }
          ],
          courseCreateTime: [
            { required: true, message: '创建日期不能为空', trigger: 'change' }
          ],
          courseExpiryTime: [
            { required: true, message: '失效日期不能为空', trigger: 'change' }
          ],
          teacherIds: [
            { required: true, message: '任课教师不能为空', trigger: 'change' }
          ],
          courseIntr:[
            { required: true, message: '请填写课程简介', trigger: 'blur' }
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
          this.addOrUpdateForm.courseCreateTime= this.getDate()
          // this.addOrUpdateForm.schoolId=schoolId
          this.extIdName()
        })
      
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolId
          getDataById({"courseId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
               this.addOrUpdateForm.coursePrice=moneyFormatter(res.data.coursePrice)
            }
        })
        }
       
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
      },
      update(){
        if(this.id){
          this.addOrUpdateForm.courseId=this.id
          this.addOrUpdateForm.coursePrice=this.addOrUpdateForm.coursePrice*100
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
          this.addOrUpdateForm.coursePrice=this.addOrUpdateForm.coursePrice*100
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
          this.addOrUpdateForm.schoolId=data[0].value
          //任课教师
        getDropDownList({"code":"eam_teachers","id1":this.addOrUpdateForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.teacherIdArr = data;
          }
        });
        //课程分类
        getDropDownList({"code":"eam_course_type","id1":this.addOrUpdateForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseTypeArr = data;
          }
        });
        }
      });
       
        //是否开放加入
        getConstantDownList({"code":"openentrystate"}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.openEntryStateArr = data;
          }
        });
    },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
      },
      beforeAvatarUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const extension =
          testmsg === "jpg" ||
          testmsg === "JPG" ||
          testmsg === "png" ||
          testmsg === "PNG";
        const isLt100k = file.size / 1024 / 1024 < 0.1;

        if (!extension) {
          this.$notify.error({
              message: '上传图片只能是 JPG或PNG 格式!'
            });
        }
        if (!isLt100k) {
          this.$notify.error({
              message: '上传图片大小不能超过 100k!'
            });
        }
        return extension && isLt100k;
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
<style>
.eamCourseAdd .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .eamCourseAdd .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .eamCourseAdd .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
 .eamCourseAdd .avatar {
    width: 160px;
    height: 120px;
    display: block;
  }
</style>