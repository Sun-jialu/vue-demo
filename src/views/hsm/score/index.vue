<template>
  <div class="score">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div v-if="show" class="score1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 学校名称,学年学期,班级名称 -->
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
              <el-select v-model="dataForm.termId" placeholder="请选择">
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
              <el-select v-model="dataForm.classId" placeholder="请选择">
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
        <!-- 课程名称,学号,学生姓名 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="课程名称:" label-width="120px">
              <el-select v-model="dataForm.courseId" placeholder="请选择">
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
            <el-form-item label="学号:" label-width="120px">
              <el-input v-model="dataForm.studentNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学生姓名:" label-width="120px">
              <el-input v-model="dataForm.studentName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询按钮 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <br />
        <!-- button按钮区 -->
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label-width="0px">
              <el-button plain type="primary" @click="addorupdata()">新增</el-button>
              <el-button plain type="primary" @click="impor">批量导入</el-button>
              <el-button plain type="primary" @click="download">下载模板</el-button>
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
        <!-- 表格组件 -->
        <el-row>
          <el-table
            :data="studentArr"
            :header-cell-style="tableHeaderColor"
            border
            v-loading="listLoading"
          >
            <el-table-column align="center" header-align="center" prop="termName" label="学年学期"></el-table-column>
            <el-table-column align="center" header-align="center" prop="examTime" label="考试日期"></el-table-column>
            <el-table-column align="center" header-align="center" prop="className" label="班级名称"></el-table-column>
            <el-table-column align="center" header-align="center" prop="courseName" label="课程名称"></el-table-column>
            <el-table-column align="center" header-align="center" prop="studentNumber" label="学号"></el-table-column>
            <el-table-column align="center" header-align="center" prop="studentName" label="学生姓名"></el-table-column>
            <el-table-column align="center" header-align="center" prop="score" label="成绩"></el-table-column>
            <el-table-column align="center" header-align="center" prop="extName" label="学校名称"></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="addorupdata(scope.row.score)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </el-row>
        <!-- 分页 -->
        <el-row>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page.sync="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-row>
      </el-form>
    </div>
    <!-- 新增，修改组件 -->
    <!-- <addOrUpdate v-if="!show" :data="dataForm" ref="addupdata" @clickBack="changeShow" @success="queryAbout"></addOrUpdate> -->
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import {
  getPageListByParam,
  importData,
  exportData,
  downloadExcel
} from "@/api/hsm/score";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  props: {},
  components: {
    // addOrUpdate
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        termId: "", //学年学期id
        classId: "", //班级id
        studentNumber: "", //学号
        courseId: "", //课程id
        studentName: "" //学生姓名
      },
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      show: true, //控制新增，编辑的显示
      id: "", //带走参数的id
      listLoading: false,
      extIdNameArr: [], //学校名称
      courseList: [], //课程名称
      termList: [], //学年学期
      classList: [], //班级名称
      dicLists: [] //字典表
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass();
      this.queryAbout();
      this.TypeName();
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
      this.queryAbout();
      this.show = num;
    },
    //删除
    remove(row) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
      });
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageSize = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
    //新增或编辑
    addorupdata(id) {
      this.show = false;
      // console.log(id);
      this.$nextTick(() => {
        this.$refs.addupdata.init(id);
      });
    },
    //获取课程,学校,学年学期,班级名称
    TypeName() {
      getDataListByTypeArray({
        type: [
          "METHOD_SAM_COURSELIST",
          "METHOD_SAM_SCHOOLLIST",
          "METHOD_SAM_TERMLIST",
          "METHOD_SAM_CLASSLIST"
        ]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseList = data.METHOD_SAM_COURSELIST;
          this.courseList.unshift({ courseId: "", courseName: "全部" });
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          this.termList = data.METHOD_SAM_TERMLIST;
          this.termList.unshift({ termId: "", termName: "全部" });
          // this.classList = data.METHOD_SAM_CLASSLIST;
          // this.classList.unshift({ classId: "", className: "全部" });
        }
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        console.log('data :>> ', data);
        this.dataForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.dataForm.classId = data.classList[0].id;
        // this.dataForm.termId = data.termInfo.id;
        // this.selectClass(this.dataForm.classId);
      }
    },
    //选择班级
    // selectClass(item) {
    //   this.classList.forEach((item1, index1) => {
    //     if (item1.id == item) {
    //       this.dataForm.gradeName = item1.gradeName;
    //     }
    //   });
    // },
    // 批量导入
    async impor() {
      let res = await importData();
      if (res && res.rsCode == "AAAAAAA") {
        console.log("score批量导入");
      }
    },
    // 下载模板
    async download() {
      let res = await downloadExcel();
      if (res && res.rsCode == "AAAAAAA") {
        console.log("score下载模板");
      }
    },
    // 打印预览
    print() {
      console.log("score打印预览");
    },
    // 导出excel
    async expor() {
      this.$delete(this.dataForm, "pageNum");
      this.$delete(this.dataForm, "pageSize");
      let url = "http://192.168.115.123:8066/hsm/score/exportData";
      // console.log(this.isNull(this.dataForm));
      window.location.href = url + "?" + this.isNull(this.dataForm);
    },
    isNull(obj) {
      return Object.keys(obj)
        .map(function(key) {
          if (!obj[key]) {
            delete obj[key];
          } else if (typeof obj[key] === "number") {
            return key + "=" + obj[key];
          } else {
            return key + "='" + obj[key] + "'";
          }
        })
        .join("&");
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryAbout();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.queryAbout();
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
</style>