<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改班级成绩':'新增班级成绩'  "></titleBar>
    <el-form
      :model="addForm"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <!-- 学校名称,学年学期,班级名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:" label-width="120px">
            <el-select
              v-model="addForm.extId"
              :disabled="addForm.id ?true:false"
              placeholder="请选择"              
            >
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in extIdNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学年学期:" label-width="120px">
            <el-select
              v-model="addForm.termId"
              :disabled="addForm.id ?true:false"
              placeholder="请选择"
            >
              <el-option
                :label="item.termName"
                :value="item.termId"
                v-for="(item,index) in termList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="班级名称" label-width="120px">
              <el-select v-model="addForm.classId" placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.id"
                  v-for="(item,index) in classList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <!-- 课程分类,课程名称,部门 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="课程分类:" label-width="120px">
            <el-select v-model="addForm.courseTypeId" @change="selectCourse" placeholder="请选择">
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in kcList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程名称:" label-width="120px">
            <el-select v-model="addForm.courseId" placeholder="请选择">
              <el-option
                :label="item.courseName"
                :value="item.courseId"
                v-for="(item,index) in courseList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门:" label-width="120px">
            <el-select v-model="addForm.deptId" placeholder="部门">
              <el-option label="甲" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 教师姓名,备注,状态 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="教师姓名:" label-width="120px">
            <el-select v-model="addForm.teacherId" placeholder="请选择">
              <el-option
                :label="item.teacherName"
                :value="item.teacherId"
                v-for="(item,index) in teacherList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注:" label-width="120px" prop="remarkMsg">
            <el-input maxlength="200" show-word-limit v-model="addForm.remarkMsg"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:" label-width="120px">
            <el-select v-model="addForm.state" placeholder="请选择">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交,取消 -->
      <el-row>
        <div style="text-align:right;">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getCourseListByType } from "@/api/sam/teachplan";
import { getDataById, addData, updateData } from "@/api/hsm/score";
import { assignment } from "@/utils/publicMethod";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  props:['data'],
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        id: "",
        extId: "", //学校名称
        termId: "", //学年学期id
        classId: "", //班级id
        courseTypeId: "", //课程分类
        courseId: "", //课程id
        deptId: "", //部门
        teacherId: "", //教师id
        state: "", //状态
        remarkMsg: "" //备注
      },
      extIdNameArr: [], //学校名称
      kcList: [], //课程类型
      courseList: [], //课程名称
      teacherList: [], //教师姓名
      termList: [], //学年学期
      classList: [], //班级名称
      dicLists: [], //字典表
      rules: {
        //备注
        remarkMsg: [
          { trigger: "change" },
          {
            min: 0,
            max: 200,
            message: "长度在200 个字符以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  activated() {},
  mounted(){},
  methods: {
    //获取学校,课程类型,教师姓名,学年学期,班级名称
    TypeName() {
      getDataListByTypeArray({
        type: [
          "METHOD_SAM_SCHOOLLIST",
          "ZXXKC",
          "METHOD_SAM_TEACHERLIST",
          "METHOD_SAM_TERMLIST",
          "METHOD_SAM_CLASSLIST"
        ]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.kcList = data.ZXXKC;
          this.teacherList = data.METHOD_SAM_TEACHERLIST;
          this.termList = data.METHOD_SAM_TERMLIST;
          // this.classList = data.METHOD_SAM_CLASSLIST;
        }
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.addForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.addForm.classId = data.classList[0].id;
        this.addForm.termId=data.termInfo.id
        // this.selectClass(this.addForm.classId);
      }
    },
    //根据课程分类查询出来课程名称
    selectCourse(item) {
      getCourseListByType({ dictCode: item }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseList = data;
          console.log("data :>> ", data);
          this.addForm.courseId = data[0].courseId;
        } else {
          this.courseList = [];
          this.addForm.courseId = "";
        }
      });
    },
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ scoreId: this.addForm.id });
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.state = "0";
        this.addForm.classId=this.data.classId
        this.addForm.extId=this.data.extId
        this.addForm.termId=this.data.termId
        console.log('this.data :>> ', this.data);
      }
    },
    //提交正则校验
    async submit(formclasstype) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (this.addForm.id) {
            //更改的时候
            this.change();
          } else {
            //新添加的时候
            this.add();
          }
        } else {
          return false;
        }
      });
    },
    //获取学校名称
    extIdName() {
      getSelect("extId").then(res => {
        if (res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
          this.dicLists.push(...data);
        }
      });
    },
    //添加
    async add() {
      console.log("this.addForm :>> ", this.addForm);
      let res = await addData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "新增成功",
          type: "success"
        });
        this.$emit("clickBack", true);
      }
    },
    //修改
    async change() {
      let res = await updateData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success"
        });
        this.$emit("clickBack", true);
      }
    },
    //返回
    cancel() {
      this.$emit("clickBack", true);
    }
  },
  created() {
    this.getClass()
    this.TypeName();
  }
};
</script>
