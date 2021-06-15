<template>
  <div class="stucourseAdd">
    <titleBar title="加入学员"></titleBar>
    <el-form
      :model="addStudentForm"
      :rules="rules"
      ref="addStudentForm"
      label-width="120px"
      class="demo-ruleForm"
    >
    <el-row>
        <el-col :span="24">
              <div style="height:40px;line-height:40px;border-bottom:1px solid #EFEFEF;margin-bottom:10px;" >课程信息</div>
          </el-col>
    </el-row>
      <el-row>
        <el-col :span="8">
              <el-form-item label="课程名称：" prop="courseId">
                    <el-select v-model="addStudentForm.courseId" clearable placeholder="请选择课程名称" :disabled="true">
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
                    <el-input v-model="addStudentForm.totalhours" maxlength="50" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="价格（元）：" prop="coursePrice">
                    <el-input v-model="addStudentForm.coursePrice" maxlength="50" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="失效日期：" prop="courseExpiryTime">
            <el-date-picker
              v-model="addStudentForm.courseExpiryTime"
              type="datetime"
              placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :disabled="true">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生效日期：" prop="courseCreateTime">
            <el-date-picker
              v-model="addStudentForm.courseCreateTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :disabled="true">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
              <div style="height:40px;line-height:40px;border-bottom:1px solid #EFEFEF;margin-bottom:10px;" >学员信息</div>
          </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
            <el-form-item label="学员号：" prop="studentCode">
                <el-input v-model="addStudentForm.studentCode" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="学员姓名：" prop="studentName"> 
                <el-input v-model="addStudentForm.studentName" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话：" prop="studentPhone">
                <el-input v-model="addStudentForm.studentPhone" maxlength="50" :disabled="true"></el-input>
            </el-form-item>
        </el-col>
    </el-row>     
    <el-row>
        <el-col :span="24">
              <div style="height:40px;line-height:40px;border-bottom:1px solid #EFEFEF;margin-bottom:10px;" >操作</div>
          </el-col>
    </el-row> 
    <el-row>  
        <el-col :span="8">
            <el-form-item label="收费渠道：" prop="qudao">
                <el-select v-model="addStudentForm.qudao" clearable placeholder="请选择渠道名称">
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
            <el-form-item label="收费凭证：" prop="pingzheng">
                <el-input v-model="addStudentForm.pingzheng" maxlength="50"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item style="text-align:right;" prop="isCourse">
                <el-checkbox v-model="addStudentForm.isCourse" true-label="1" false-label="0">同步开立子账户</el-checkbox>
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
import { getDropDownList } from "@/api/eam/select";
import { moneyFormatter } from "@/utils/publicMethod";
import { getDataDetail,updateDate } from "@/api/eam/stucourse";
export default {
  computed: {},
  mounted() {},
  data() {
    return {
      addStudentForm: {
        courseId: "",
        courseCreateTime:'',
        courseExpiryTime:'',
        coursePrice:'',
        studentCode:'',
        studentName:'',
        studentPhone:'',
        totalhours:'',    
        qudao: "",
        pingzheng: "",
        isCourse:"0"
      },
      extIdNameArr: [],
      courseIdArr:[],
      rules: {}
    };
  },
  activated() {
    //  this.reset()
  },
  methods: {
    // 新增和修改
    addStudent(studentId,schoolId,courseId) {
        this.$refs["addStudentForm"].resetFields();
        this.addStudentForm.schoolId=schoolId
        this.addStudentForm.studentId=studentId
        this.addStudentForm.courseId=courseId
        this.extIdName();
      getDataDetail({"schoolId":schoolId,"studentId":studentId,"courseId":courseId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addStudentForm=res.data
               this.addStudentForm.coursePrice=moneyFormatter(res.data.coursePrice)
            }
        })
    },
    submitForm() {
      this.$refs["addStudentForm"].validate(valid => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    },
    back() {
      this.$parent.addStudentShow = true;
    },
    update() {
        let arrid=[]
         arrid.push(this.addStudentForm.studentId)
        let params={
            "isJoin":0,
            "courseId":this.addStudentForm.courseId,
            "schoolId":this.addStudentForm.schoolId,
            "studentIds":arrid
        }
      updateDate(params).then(res => {
      //  console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success'
            });
            this.$parent.queryAbout()
            setTimeout(() => {
                this.$parent.addStudentShow=true
            }, 500);
            
        }
      })
    },
    //获取下拉框
    extIdName(){
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
      //课程名称
        getDropDownList({"code":"eam_course","id1":this.addStudentForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseIdArr = data;
          }
        });
    
    }
  }
};
</script>
<style lang="scss" scoped>
.stucourseAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
  
}
</style>