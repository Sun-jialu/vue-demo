<template>
  <div class="timeTable">
    <div v-if="show" class="timeTable1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 学校名称,学年学期,周次 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学年学期:" label-width="120px">
              <el-select
                v-model="dataForm.termId"
                @change="changeWeek($event)"
                placeholder="请选择"
              >
                <el-option
                  :label="item.termName"
                  :value="item.termId"
                  v-for="(item, index) in termList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="周次:" label-width="120px">
              <el-select v-model="pitchWeek" placeholder="请选择">
                <el-option
                  v-for="item in week"
                  :key="item + ''"
                  :label="`第${item}周`"
                  :value="item + ''"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="50px">
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox label="显示班级"></el-checkbox>
                <el-checkbox label="显示教室"></el-checkbox>
                <el-checkbox label="显示教师"></el-checkbox>
              </el-checkbox-group>-->
              <el-checkbox v-model="showClass"></el-checkbox>显示班级
              <el-checkbox v-model="showClassRoom"></el-checkbox>显示教室
              <el-checkbox v-model="showTeacher"></el-checkbox>显示教师
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="text-align: right">
              <el-button plain type="primary" @click="queryAbout(1)"
                >查询</el-button
              >
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
          <el-col :span="12">
            <el-form-item style="text-align: left" label-width="0px">
              <el-button
                plain
                type="primary"
                @click="
                  addorupdata({
                    extId: dataForm.extId,
                    termId: dataForm.termId,
                  })
                "
                >公共时间段设置</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-form-item label-width="0px">
                <el-button plain type="primary" @click="expor"
                  >导出EXCEL</el-button
                >
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <calender
        ref="calenderRef"
        :data="studentArr"
        :commonData="data2"
        :tableData="tableList"
        :checkS="newcheckList"
        :caleData="caleList"
        :weekLen="dataForm.weekNum"
        @callBackWeek="callBackWeek"
        @monChange="addorupdata"
        @removeCom="backRemove"
      ></calender>
    </div>
    <!-- 新增，修改组件 -->
    <addOrUpdate
      v-if="!show"
      ref="addupdata"
      @clickBack="changeShow"
    ></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import calender from "./calender.vue";
export default {
  data() {
    return {
      teacherList: [], //教师姓名
      jsArr: [], //教室
      termList: [], //学年学期
      classList: [], //班级
      studentArr: [], //获取普通时间段
      checkList: [], //多选按钮
      newcheckList: [], //向组件传递的内容
      pageIndex: 1,
      pageSize: 1000,
      total: 0,
      week: "", //根据学年学期获取的周次长度
      pitchWeek: "", //具体v-modle周次绑定的值
      show: true, //控制新增，编辑的显示
      id: "", //带走参数的id
      listLoading: false,
      data2: [], //获取公共时间段
      dataArr: [], //课程时间段渲染列表
      tableList: [], //具体table内的数据
      showClass: "", //显示班级
      showClassRoom: "", //显示教室
      showTeacher: "", //显示教师,
      treeVisible1: false,
      depData: [], //部门树
      label1: "", //树选中的值,
      defaultTerm: "", //默认显示的学年学期
      caleList: [], //日期类型列表：休假，学习，默认
      loading: true,
      dataForm: {
        extId: "", //学校名称*
        termId: "", //学年学期id*
        classId: "", //班级id*
        weekNum: "", //周次*
        deptId: "", //部门*
        classroomId: "", //教室id
        teacherId: "", //教师id*
      },
    };
  },
  components: {
    //组件
    calender,
    addOrUpdate,
  },
  mounted() {
    this.gradeIdName();
    this.show = true;
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #eee;";
      }
    },
    //回调改变show
    changeShow(num) {
      this.gradeIdName();
      this.show = num;
    },
    //回调删除公共时间段
    backRemove(item) {},
    //回调改变下拉框的周数
    callBackWeek(n) {
      this.pitchWeek = n + "";
      this.queryAbout();
    },
    //当学年学期下拉框进行选择，周数也跟着变化
    changeWeek(event) {
      this.pitchWeek = "1";
      this.termList.forEach((item, index) => {
        if (item.termId == event) {
          this.week = item.weekNum;
        }
      });
    },
    // 获取默认学年学期下拉框
    gradeIdName() {
      let grade = "";
      this.TypeName();
    },
    // 获取普通时间段
    queryAbout(one) {
      this.queryAboutCale(); //查询当天类型：学习、休假、默认
      if (one && one) {
        this.pageIndex = 1;
      }
      let checkList = [];
      this.showClass ? checkList.push("显示班级") : "";
      this.showClassRoom ? checkList.push("显示教室") : "";
      this.showTeacher ? checkList.push("显示教师") : "";
      // console.log('this.checkList', this.checkList);
      this.dataForm.weekNum = this.pitchWeek;
      //《--根据点击的学年学期的下拉框获取该学期具体的开始和结束时间
      let startTime = "",
        endTime = "";
      this.termList &&
        this.termList.forEach((item, index) => {
          if (item.termId == this.dataForm.termId) {
            startTime = item.startTime;
            endTime = item.endTime;
          }
        }); //--》
      var id = "getTimeList";
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageCount = this.pageSize;
      let timeq =
        "08:00-08:40|08:55-09:40|10:00-10:45|10:55-11:40|14:00-14:45|14:55-15:40";
      let newData1 = timeq && timeq.split("|"); //根据|分割
      let strArr = {
        startTime: startTime, //开始时间
        endTime: endTime, //结束时间
        section: [], //每一节的时间段
      };
      newData1.forEach((item, index) => {
        //添加到section中时间段
        let arrStr = item.split("-");
        let str = {
          startTime: `${arrStr[0]}`,
          endTime: `${arrStr[1]}`,
          time: `${item}`,
        };
        strArr.section.push(str);
      });
      strArr.section.sort((a, b) => {
        //根据开始时间进行递增排列
        return a.startTime.slice(0, 2) - b.startTime.slice(0, 2);
      });
      this.studentArr = strArr;
      this.newcheckList = checkList;
      // console.log('this.newcheckList :>> ', this.newcheckList);
      this.getConcatArr(); //获取公共时间段
      this.queryTable(); //获取表格数据
    },
    //获取表格参数
    queryTable() {},
    //获取教材 部门
    TypeName() {
      this.classList = [
        {
          gradeName: "一年级",
          classId: 1797,
          className: "小雨幼儿园01班",
          yearNumber: "2020",
        },
      ]; //data.METHOD_SAM_CLASSROOMLIST;
      this.jsArr = [
        { classroomId: 5, classroomName: "101" },
        { classroomId: 6, classroomName: "202" },
        { classroomId: 7, classroomName: "305" },
        { classroomId: 8, classroomName: "102" },
        { classroomId: 9, classroomName: "203" },
        { classroomId: 10, classroomName: "501" },
      ]; // data.METHOD_SAM_CLASSLIST;
      this.teacherList = [
        { teacherName: "小赵", teacherId: 8 },
        { teacherName: "小钱", teacherId: 9 },
        { teacherName: "小孙", teacherId: 10 },
        { teacherName: "小李", teacherId: 11 },
        { teacherName: "杨老师", teacherId: 16 },
        { teacherName: "王王", teacherId: 17 },
        { teacherName: "456", teacherId: 18 },
      ]; //data.METHOD_SAM_TEACHERLIST;
      this.termList = [
        {
          termId: 8,
          startTime: "2021-03-02",
          weekNum: 18,
          endTime: "2021-06-28",
          termName: "2021-2021-2",
        },
        {
          termId: 9,
          startTime: "2020-09-30",
          weekNum: 21,
          endTime: "2021-02-16",
          termName: "2020-2021-1",
        },
      ]; //data.METHOD_SAM_TERMLIST;
      this.dataForm.classId =
        this.classList && this.classList.length
          ? this.classList[0].classId
          : "";
      if (this.termList && this.termList.length) {
        this.dataForm.termId = this.termList[0].termId;
        this.pitchWeek = this.dataForm.weekNum ? this.dataForm.weekNum : "1";
      }
      this.termList &&
        this.termList.forEach((item, index) => {
          if (item.termId == this.dataForm.termId) {
            this.week = item.weekNum;
          }
        });
      for (let i = 0; i < this.termList.length; i++) {
        if (this.termList[i].termName == this.defaultTerm) {
          this.dataForm.termId = this.termList[i].termId;
          break; //中断循环  forEach无法中断
        } else {
          this.dataForm.termId = this.termList[0].termId;
        }
      }
      let tree = [
        {
          DEPARTMENT_NAME: "小雨幼儿园",
          DEPARTMENT_NO: 1892,
          DEPARTMENT_PARENT: -1,
          DEPARTMENT_PATH: "R",
          DEPARTMENT_SHORT_NAME: "小雨幼儿园",
          LAST_UPDATE_CLIENT: 0,
          LAST_UPDATE_DATE: 1600740764000,
          LAST_UPDATE_OPERATOR: 1,
          ORG_ID: 440,
          STATE: "0",
        },
        {
          DEPARTMENT_NAME: "教职工",
          DEPARTMENT_NO: 1893,
          DEPARTMENT_PARENT: 1892,
          DEPARTMENT_PATH: "R-001",
          DEPARTMENT_SHORT_NAME: "教职工",
          LAST_UPDATE_CLIENT: 0,
          LAST_UPDATE_DATE: 1600740764000,
          LAST_UPDATE_OPERATOR: 1,
          ORG_ID: 440,
          STATE: "0",
        },
      ];
      this.queryAbout(); //查询
    },
    //公共时间段设置页面
    addorupdata(id) {
      if (typeof id == "number") {
        this.show = false;
        this.$nextTick(() => {
          this.$refs.addupdata.init(id, this.defaultTerm);
        });
      } else if (typeof id == "object") {
        if (this.dataForm.termId == "") {
          this.$notify({
            title: "警告",
            message: "请先选择要添加的学校和学期",
            type: "warning",
          });
        } else {
          this.show = false;
          this.$nextTick(() => {
            this.$refs.addupdata.init(id, this.defaultTerm);
          });
        }
      }
    },
    // 查询
    queryAboutCale() {
      this.caleList = [
        {
          markDate: "2020-10-12",
          startTime: "2020-09-30",
          id: 13,
          endTime: "2021-02-16",
          type: "2",
        },
        {
          markDate: "2020-10-30",
          startTime: "2020-09-30",
          id: 29,
          endTime: "2021-02-16",
          type: "2",
        },
        {
          markDate: "2020-10-11",
          startTime: "2020-09-30",
          id: 12,
          endTime: "2021-02-16",
          type: "1",
        },
        {
          markDate: "2020-10-31",
          startTime: "2020-09-30",
          id: 28,
          endTime: "2021-02-16",
          type: "1",
        },
        {
          markDate: "2020-10-10",
          startTime: "2020-09-30",
          id: 11,
          endTime: "2021-02-16",
          type: "2",
        },
        {
          markDate: "2020-10-25",
          startTime: "2020-09-30",
          id: 27,
          endTime: "2021-02-16",
          type: "1",
        },
      ];
    },
    //获取公共时间段
    getConcatArr() {
      let data = {
        list: [
          {
            endTime: "10:00",
            extId: 440,
            id: 6,
            name: "课间操",
            schoolName: "小雨幼儿园",
            startTime: "09:40",
            termId: 9,
            termName: "2020-2021-1",
          },
        ],
      };
      data &&
        data.list.sort((a, b) => {
          return a.startTime.slice(0, 2) - b.startTime.slice(0, 2);
        });
      this.data2 = data;
    },
    // 导出excel
    expor() {
      this.$refs.calenderRef.exportExcel("table", "课程表");
    },
  },
};
</script>
<style scoped lang="scss">
.el-form {
  width: 100%;
  .el-form-item {
    .el-form-item__label {
      width: 20%;
    }
    .el-form-item__content {
      width: 100%;
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
.el-table th {
  background-color: #eee;
  text-align: center;
}
.el-checkbox {
  margin-right: 5px;
}
</style>