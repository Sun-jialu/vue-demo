<template>
  <div class="classAlbum">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="classAlbum1" v-if="show">
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
              <el-select v-model="dataForm.gradeId" disabled placeholder="请选择">
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
        <!-- 相册名称,查询按钮-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="相册名称:">
              <el-input v-model="dataForm.albumName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="0px">
              <el-button plain type="primary" @click="addorupdata()">新增</el-button>
            </el-form-item>
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
        <el-table-column prop="albumName" header-align="center" align="center" label="相册名称"></el-table-column>
        <el-table-column prop="className" header-align="center" align="center" label="班级名称"></el-table-column>
        <el-table-column prop="gradeName" header-align="center" align="center" label="年级"></el-table-column>
        <el-table-column prop="updateTime" header-align="center" align="center" label="最后更新日期"></el-table-column>
        <el-table-column prop="extName" header-align="center" align="center" label="学校名称"></el-table-column>
        <el-table-column prop="stateValue" header-align="center" align="center" label="状态"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100"
          style="text-align:center;"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.albumId)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
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
    <!-- 新增弹出框 -->
    <addOrUpdate ref="addOrUpdate" v-if="!show" @clickBack="changeShow" :data="dataForm"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getPageListByParam } from "@/api/hsm/classAlbum";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import axios from "axios";
const SITE = require("SITE");
const sam = SITE["samUrl"];
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        gradeId: "", //年级
        classId: "", //班级
        albumName: "" //相册名称
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dicLists: {}, //字典表
      map: {},
      show: true, //控制v-if
      extIdNameArr: [], //学校名称
      gradeIdArr: [], //年级
      classArr: [], //班级名称
      dicLists: [] //字典表
    };
  },
  computed: {},
  async activated() {
    await this.getClass();
    // this.gradeIdName();
    this.queryAbout();
    this.TypeName();
    this.show = true;
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //获取学校名称
    TypeName() {
      getDataListByTypeArray({
        type: [
          "METHOD_SAM_SCHOOLLIST"
          //  "METHOD_SAM_CLASSLIST"
        ]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
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
          let newGrade = grade.split("|");
          this.gradeIdArr = newGrade;
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
          this.dataForm.gradeId = item1.gradeName;
        }
      });
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageSize = this.pageSize;
      // console.log("object1 :>> ", this.dataForm);
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
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.getClass();
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
    }
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