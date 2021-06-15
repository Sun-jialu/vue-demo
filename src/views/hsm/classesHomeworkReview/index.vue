<template>
  <div class="classesHomework">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="classesHomework1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 学校名称,班级名称,作业标题 -->
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
          <el-col :span="8">
            <el-form-item label="作业标题:">
              <el-input v-model="dataForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 学生姓名,发布人,开始日期-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学生姓名:">
              <el-input v-model="dataForm.studentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人:">
              <el-select v-model="dataForm.createUserId" disabled placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.classId"
                  v-for="(item,index) in creatList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期:" prop="startDate">
              <el-date-picker
                v-model="dataForm.startDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--结束日期,查询按钮-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="结束日期:" prop="endDate">
              <el-date-picker
                v-model="dataForm.endDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" header-align="center" align="center" label="作业标题"></el-table-column>
        <el-table-column prop="createUserName" header-align="center" align="center" label="发布人"></el-table-column>
        <el-table-column prop="studentName" header-align="center" align="center" label="学生姓名"></el-table-column>
        <el-table-column prop="commitContent" header-align="center" align="center" label="提交内容"></el-table-column>
        <el-table-column prop="commitTime" header-align="center" align="center" label="提交时间"></el-table-column>
        <el-table-column prop="className" header-align="center" align="center" label="班级名称"></el-table-column>
        <el-table-column prop="extName" header-align="center" align="center" label="学校名称"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100"
          style="text-align:center;"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">编辑</el-button>
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
    <addOrUpdate ref="addOrUpdate" v-if="!show" @clickBack="changeShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import {
  getPageListByParam,
  releaseOrDelData,
  releaseData
} from "@/api/hsm/classesHomeworkReview";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        title: "", //作业标题
        startDate: "", //开始日期
        endDate: "", //结束日期
        studentName: "", //学生姓名
        createUserId: "", //发布人
        classId: "" //班级名称
      },
      startDate: {
        disabledDate: time => {
          if (!this.dataForm.endDate) {
            return false;
          }
          return time.getTime() > new Date(this.dataForm.endDate).getTime();
        }
      },
      endDate: {
        disabledDate: time => {
          return time.getTime() < new Date(this.dataForm.startDate).getTime();
        }
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      show: true, //控制v-if
      extIdNameArr: [], //学校名称
      classList: [], //班级名称
      creatList: [], //发布人
      multipleSelection: [] //table多选
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
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //table多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取学校名称,班级名称,发布人
    TypeName() {
      getDataListByTypeArray({
        type: [
          "METHOD_SAM_SCHOOLLIST",
          "METHOD_SAM_CLASSLIST",
          "METHOD_SAM_CREATEUSERLIST"
        ]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          // this.classList = data.METHOD_SAM_CLASSLIST;
          // this.classList.unshift({ classId: "", className: "全部" });
          this.creatList = data.METHOD_SAM_CREATEUSERLIST;
          this.creatList.unshift({ classId: "", className: "全部" });
        }
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
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // //发布
    // async publish() {
    //   let res = await releaseData({ id: 0 });
    //   if (res && res.rsCode == "AAAAAAA") {
    //     console.log("res :>>", res);
    //     let data = res.data;
    //   }
    // },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
    },
    // //删除
    // remove(row) {
    //   console.log("row :>> ", row);
    //   this.$confirm("确定删除该行吗？", "确认信息", {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     releaseOrDelData({
    //       id: row.id,
    //       delState: row.delState
    //     }).then(res => {
    //       console.log("res :>> ", res);
    //       if (res && res.rsCode == "AAAAAAA") {
    //         this.$notify({
    //           title: "成功",
    //           message: "删除成功",
    //           type: "success"
    //         });
    //       }
    //     });
    //   });
    // },
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
<style lang="scss" scoped>
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>