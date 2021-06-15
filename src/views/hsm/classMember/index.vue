<template>
  <div class="classMember">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="classMember1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 学校名称,年级,班级名称 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
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
            <el-form-item label="年级:" label-width="120px">
              <el-select v-model="dataForm.gradeName" disabled placeholder="请选择">
                <el-option
                  :label="item"
                  :value="index"
                  v-for="(item,index) in gradeIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级名称:">
              <el-select v-model="dataForm.classId" @change="selectClass" placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.id"
                  v-for="(item,index) in classArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询按钮-->
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
      <!-- 表格组件 -->
      <el-table
        :data="studentArr"
        :header-cell-style="tableHeaderColor"
        border
        v-loading="listLoading"
      >
        <el-table-column prop="memberName" header-align="center" align="center" label="姓名"></el-table-column>
        <el-table-column prop="number" header-align="center" align="center" label="工号/学号"></el-table-column>
        <el-table-column prop="cardType" header-align="center" align="center" label="证件类型"></el-table-column>
        <el-table-column prop="cardNumber" header-align="center" align="center" label="证件号码"></el-table-column>
        <el-table-column prop="deptName" header-align="center" align="center" label="部门"></el-table-column>
        <el-table-column prop="teachNumber" header-align="center" align="center" label="教师证编号"></el-table-column>
        <el-table-column prop="telephone" header-align="center" align="center" label="联系电话"></el-table-column>
        <el-table-column prop="extName" header-align="center" align="center" label="学校名称"></el-table-column>
        <!-- <el-table-column label="操作" style="text-align:center;">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getPageListByParam } from "@/api/hsm/classMember";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import axios from "axios";
const SITE = require("SITE");
const sam = SITE["samUrl"];
export default {
  components: {},
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        gradeName: "", //年级
        classId: "" //班级
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      jcArr: [], //教材版本
      dicLists: {}, //字典表
      gradeIdArr: [], //年级
      classArr: [], //班级名称
      map: {},
      show: true, //控制v-if
      extIdNameArr: [], //学校名称
      dicLists: [] //字典表
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass()
      this.queryAbout();
      this.TypeName();
      // this.gradeIdName();
      this.show = true;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageSize = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
    //新增或编辑
    addorupdata(id) {
      this.show = false;
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
    },
    //学校名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CLASSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          // this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          // this.classArr = data.METHOD_SAM_CLASSLIST;
          // this.classArr.unshift({ classId: "", className: "全部" });
        }
      });
    },    
    // 获取年级
    gradeIdName() {
      let grade = "";
      axios
        .post(`${sam}/sam/parameter/getPageListByParam`, this.dataForm)
        .then(res => {
          let data = res.data.data.list;
          data.forEach((item, index) => {
            if (item.parameterName == "GRADE") {
              grade = item.parameterValue;
            }
          });
          // let newGrade = grade.split("|");
          // this.gradeIdArr = newGrade;
        });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.dataForm.extId = data.orgextInfo.id;
        this.classArr = data.classList;
        this.dataForm.classId = data.classList[0].id;
        this.selectClass(this.dataForm.classId);
      }
    },
    //选择班级
    selectClass(item) {
      this.classArr.forEach((item1, index1) => {
        if (item1.id == item) {
          this.dataForm.gradeName = item1.gradeName;
        }
      });
    },
    // 打印预览
    print() {
      console.log("teacher打印预览");
    },
    // 导出excel
    async expor() {
      this.$delete(this.dataForm, "pageNum");
      this.$delete(this.dataForm, "pageSize");
      let url = "http://192.168.115.123:8066/hsm/classMember/exportData";
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
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>