<template>
  <div class="timeTable">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div v-if="show" class="timeTable1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 学校名称,学年学期,周次 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:" label-width="120px">
              <el-select v-model="dataForm.extId" disabled placeholder="请选择">
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
              <el-select v-model="dataForm.termId" @change="changeWeek" placeholder="请选择">
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
            <el-form-item label="周次:" label-width="120px">
              <el-select v-model="pitchWeek" placeholder="请选择">
                <el-option
                  v-for="item in week"
                  :key="item + ''"
                  :label="item + ''"
                  :value="item + ''"
                >第{{item}}周</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 班级名称,多选,查询按钮 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="班级名称:" label-width="120px">
              <el-select v-model="dataForm.classId" @change="selectClass" placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.id"
                  v-for="(item,index) in classList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="50px">
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox label="显示教室"></el-checkbox>
                <el-checkbox label="显示教师"></el-checkbox>
              </el-checkbox-group>-->
              <el-checkbox v-model="showClassRoom"></el-checkbox>显示教室
              <el-checkbox v-model="showTeacher"></el-checkbox>显示教师
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label-width="0px">
              <el-button
                plain
                type="primary"
                @click="addorupdata({extId:dataForm.extId,termId:dataForm.termId})"
              >公共时间段设置</el-button>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <div style="text-align:right;">
              <el-form-item label-width="0px">
                <el-button plain type="primary" @click="print">打印预览</el-button>
                <el-button plain type="primary" @click="expor">导出EXCEL</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <calender
        :data="studentArr"
        :commonData="data2"
        :tableData="tableList"
        name="timeTable"
        :checkS="newcheckList"
        :weekLen="dataForm.weekNum"
        @callBackWeek="callBackWeek"
      ></calender>
    </div>
  </div>
</template>
<script>
import calender from "./calender";
import {
  getPageListByParam1,
  exportData,
  timeTableConfig1
} from "@/api/sam/timeTable";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import { getPageListByParam } from "@/api/sam/parameter";

export default {
  props: {},
  components: {
    calender //课表组件
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称*
        termId: 1, //学年学期id*
        classId: "", //班级id*
        weekNum: "" //周次*
      },
      extIdNameArr: [], //学校名称
      teacherList: [], //教师姓名
      jsArr: [], //教室
      termList: [], //学年学期
      classList: [], //班级
      studentArr: [], //获取普通时间段
      checkList: [], //多选按钮
      newcheckList: [], //向组件传递的内容
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      showClassRoom: false, //显示教室
      showTeacher: false, //显示教师
      week: "", //根据学年学期获取的周次长度
      pitchWeek: "1", //具体v-modle周次绑定的值
      show: true, //控制新增，编辑的显示
      id: "", //带走参数的id
      listLoading: false,
      data2: [], //获取公共时间段
      dataArr: [], //课程时间段渲染列表
      tableList: [] //具体table内的数据
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass();
      this.TypeName();
      // this.queryAbout(); //查询
      this.show = true;
    },
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #eee;";
      }
    },
    //回调改变show
    changeShow(num) {
      this.all();
      this.show = num;
    },
    //回调改变下拉框的周数
    callBackWeek(n) {
      this.pitchWeek = n;
      // console.log("n :>> ", n);
    },
    //当学年学期下拉框进行选择，周数也跟着变化
    changeWeek(item) {
      this.pitchWeek = 1;
      // console.log('event :>> ', event);
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
      // console.log("this.getWeek(endTime) :>> ", endTime, endTime.length);
      // console.log('this.getWeek(startTime) :>> ', startTime.slice(0,4));
      //《--根据选择的学年学期得到的开始和结束的具体时间加入到周次中
      let setNum;
      if (endTime.slice(0, 4) > startTime.slice(0, 4)) {
        let endweek = this.getWeek(`${startTime.slice(0, 4)}-11-30`);
        // console.log('endweek :>> ', endweek);
        setNum =
          endweek - this.getWeek(startTime) + this.getWeek(endTime) + 5 - 1;
      } else {
        // console.log("《 :>> ");
        setNum = this.getWeek(endTime) - this.getWeek(startTime) + 1;
      }
      // console.log("setNum :>> ", setNum);
      startTime && endTime ? (this.week = setNum) : "";
      // console.log('this.week :>> ', this.week);
      //--》
    },
    //根据日期得到该日期是改年的第几周
    getWeek(dateTime) {
      let newDataTime = dateTime;
      // console.log("object :>> ", newDataTime);
      let temptTime = new Date(dateTime);
      // console.log("temptTime :>> ", temptTime);
      //周几
      let weekday = (temptTime && temptTime.getDay()) || 7;
      //周1+5天=周六
      temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
      let firstDay = new Date(temptTime.getFullYear(), 0, 1);
      let dayOfWeek = firstDay.getDay();
      let spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
      let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
      let result = Math.ceil(d / 7);
      return result + 1;
    },
    // 获取普通时间段
    async queryAbout() {
      let checkList = [];
      this.showClassRoom ? checkList.push("显示教室") : "";
      this.showTeacher ? checkList.push("显示教师") : "";
      this.dataForm.weekNum = this.pitchWeek;
      //《--根据点击的学年学期的下拉框获取该学期具体的开始和结束时间
      let startTime = "",
        endTime = "";
      this.termList.forEach((item, index) => {
        if (item.termId == this.dataForm.termId) {
          startTime = item.startTime;
          endTime = item.endTime;
        }
      }); //--》
      //《--根据选择的学年学期得到的开始和结束的具体时间加入到周次中
      let setNum;
      if (endTime.slice(0, 4) > startTime.slice(0, 4)) {
        let endweek = this.getWeek(`${startTime.slice(0, 4)}-11-30`);
        setNum =
          endweek - this.getWeek(startTime) + this.getWeek(endTime) + 5 - 1;
      } else {
        setNum = this.getWeek(endTime) - this.getWeek(startTime) + 1;
      }
      startTime && endTime ? (this.week = setNum) : "";
      // console.log('this.week :>> ', this.week);
      //--》
      this.listLoading = true;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res.rsCode == "AAAAAAA") {
        let data = res.data.list;
        let newData;
        data &&
          data.forEach((item, index) => {
            if (item.parameterName == "LTIME") {
              //根据LTIME拿到时间段
              newData = item.parameterValue;
            }
          });
        let newData1 = newData.split("|"); //根据|分割
        let strArr = {
          startTime: startTime, //开始时间
          endTime: endTime, //结束时间
          section: [] //每一节的时间段
        };
        newData1.forEach((item, index) => {
          //添加到section中时间段
          let arrStr = item.split("-");
          let str = {
            startTime: `${arrStr[0]}`,
            endTime: `${arrStr[1]}`,
            time: `${item}`
          };
          strArr.section.push(str);
        });
        // this.total = res.data.totalCount;
        strArr.section.sort((a, b) => {
          //根据开始时间进行递增排列
          return a.startTime.slice(0, 2) - b.startTime.slice(0, 2);
        });
        // console.log("strArr :>> ", strArr);
        this.studentArr = strArr;
        // console.log("this.studentArr :>> ", this.studentArr);
      }
      this.newcheckList = checkList;
      // console.log('this.newcheckList :>> ', this.newcheckList);
      this.getConcatArr(); //获取公共时间段
      this.queryTable(); //获取表格数据
    },
    //获取表格参数
    async queryTable() {
      let res = await getPageListByParam1(this.dataForm);
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.tableList = data;
        // console.log("res :>> ", res);
      }
    },
    //学校,教室,教师姓名,学年学期
    TypeName() {
      getDataListByTypeArray({
        type: [
          "METHOD_SAM_SCHOOLLIST",
          "METHOD_SAM_CLASSROOMLIST",
          "METHOD_SAM_TEACHERLIST",
          "METHOD_SAM_TERMLIST",
          "METHOD_SAM_CLASSLIST"
        ]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          // this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          this.jsArr = data.METHOD_SAM_CLASSROOMLIST;
          this.jsArr.unshift({ classroomId: "", classroomName: "全部" });
          // this.classList = data.METHOD_SAM_CLASSLIST;
          // this.classList.unshift({ classId: "", className: "全部" });
          this.teacherList = data.METHOD_SAM_TEACHERLIST;
          this.teacherList.unshift({ teacherId: "", teacherName: "全部" });
          this.termList = data.METHOD_SAM_TERMLIST;
          // this.termList.unshift({ termId: "", termName: "全部" });
        }
        this.queryAbout(); //查询
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.dataForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.dataForm.classId = data.classList[0].id;
        // this.dataForm.termId=data.termInfo.id
        // this.selectClass(this.dataForm.classId);
      }
    },
    //选择班级
    selectClass(item) {
      this.classList.forEach((item1, index1) => {
        if (item1.id == item) {
          this.dataForm.gradeName = item1.gradeName;
        }
      });
    },
    //公共时间段设置页面
    addorupdata(id) {
      // console.log("typeof id :>> ", typeof id);
      if (typeof id == "number") {
        this.show = false;
        this.$nextTick(() => {
          this.$refs.addupdata.init(id);
        });
      } else if (typeof id == "object") {
        if (this.dataForm.extId == "" || this.dataForm.termId == "") {
          this.$notify({
            title: "警告",
            message: "请先选择要添加的学校和学期",
            type: "warning"
          });
        } else {
          this.show = false;
          this.$nextTick(() => {
            this.$refs.addupdata.init(id);
          });
        }
      }
    },
    //获取公共时间段
    async getConcatArr() {
      let res = await timeTableConfig1();
      if (res.rsCode == "AAAAAAA") {
        let data = res.data;
        data &&
          data.list.sort((a, b) => {
            return a.startTime.slice(0, 2) - b.startTime.slice(0, 2);
          });
        this.data2 = data;
        // console.log("this.data2 :>> ", this.data2);
      }
    },
    // 打印预览
    print() {
      console.log("timeTable打印预览");
    },
    // 导出excel
    async expor() {
      console.log("timeTable导出excel");
      let res = await exportData();
      let data = res.data;
      console.log(res);
    }
  },
  created() {},
  mounted() {}
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
.el-checkbox{
  margin-right: 5px;
}
</style>