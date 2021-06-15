<template>
  <div class="stucourseAdd">
    <titleBar title="设置学员上课周期"></titleBar>
    <el-form
      :model="addOrUpdateForm"
      :rules="rules"
      ref="addOrUpdateForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
              <el-form-item label="课程名称：" prop="courseId">
                    <el-select v-model="addOrUpdateForm.courseId" clearable placeholder="请选择课程名称" :disabled="true">
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
          <el-form-item label="课程开始日期：" prop="startTime">
            <el-date-picker
              v-model="addOrUpdateForm.startTime"
              type="datetime"
              placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程结束日期：" prop="endTime">
            <el-date-picker
              v-model="addOrUpdateForm.endTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
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
import { addStuCoursePeriod } from "@/api/eam/stucourse";
export default {
  computed: {},
  mounted() {},
  data() {
    return {
      addOrUpdateForm: {
        courseId: "",
        startTime: "",
        endTime: ""
      },
      extIdNameArr: [],
      courseIdArr:[],
      rules: {
        startTime: [
          { required: true, message: "请选择开始日期", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择结束日期", trigger: "change" }
        ]
      }
    };
  },
  activated() {
    //  this.reset()
  },
  methods: {
    // 新增和修改
    addOrUpdate(studentIdsArr,schoolId,courseId) {
      this.$nextTick(() => {
        this.$refs["addOrUpdateForm"].resetFields();
        this.addOrUpdateForm.schoolId=schoolId
        this.addOrUpdateForm.studentIds=studentIdsArr
        this.addOrUpdateForm.courseId=courseId
        this.extIdName();
      });
      
    },
    submitForm() {
      this.$refs["addOrUpdateForm"].validate(valid => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    },
    back() {
      this.$parent.addOrUpdateIsShow = true;
    },
    update() {
      addStuCoursePeriod(this.addOrUpdateForm).then(res => {
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
    extIdName(){
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then(res => {
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
};
</script>
<style lang="scss" scoped>
.stucourseAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>