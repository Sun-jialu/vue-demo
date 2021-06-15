<template>
  <div class="workRule">
    <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
      <titleBar></titleBar>
      <!-- 顶部form表单 -->
      <el-form :model="formData" class="search-form--wrap" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构：" prop="orgId">
              <el-select v-model="formData.orgId" clearable placeholder="请选择机构">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in extIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- button按钮区 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label-width="0">
              <el-button plain type="primary" @click="addNew()">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 表格组件 -->
      <div id="print">
        <el-table :data="tableData" border v-loading="loading">
          <el-table-column prop="orgId" header-align="center" align="center" label="机构"></el-table-column>
          <el-table-column prop="ruleName" header-align="center" align="center" label="规则名称"></el-table-column>
          <el-table-column prop="workTime" header-align="center" align="center" label="上班时间"></el-table-column>
          <el-table-column prop="closingTime" header-align="center" align="center" label="下班时间"></el-table-column>
          <el-table-column prop="isLate" header-align="center" align="center" label="允许迟到"></el-table-column>
          <el-table-column
            prop="lateTimeIsAbsent"
            header-align="center"
            align="center"
            label="迟到多久算旷工"
          ></el-table-column>
          <el-table-column
            prop="lateToAbsentDays"
            header-align="center"
            align="center"
            label="迟到算旷工天数"
          ></el-table-column>
          <el-table-column prop="isLeaveEarly" header-align="center" align="center" label="允许早退"></el-table-column>
          <el-table-column
            prop="leaveEarlyTimeIsAbsent"
            header-align="center"
            align="center"
            label="早退多久算旷工"
          ></el-table-column>
          <el-table-column
            prop="leaveEarlyToAbsentDays"
            header-align="center"
            align="center"
            label="早退算旷工天数"
          ></el-table-column>
          <el-table-column prop="overTime" header-align="center" align="center" label="下班多久算加班"></el-table-column>
          <el-table-column prop="stateValue" header-align="center" align="center" label="状态"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addNew(scope.row.chapterId)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteColumn(scope.row.chapterId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 新增和修改 -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam, deleteData } from "@/api/eam/coursechapter";
import { getDropDownList } from "@/api/eam/select";
export default {
  components: {
    addOrUpdate,
  },
  data() {
    return {
      addOrUpdateIsShow: true,
      formData: {
        orgId: "", //机构名称
      },
      extIdNameArr: [],
      tableData: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    };
  },
  activated() {
    this.queryAbout();
    this.addOrUpdateIsShow = true;
    this.extIdName();
  },
  computed: {},
  methods: {
    // 查询
    queryAbout() {
      //   this.loading=true
      //   this.formData.pageSize=this.pageSize
      //   this.formData.pageNum=this.pageIndex
      //    getPageListByParam(this.formData).then(res => {
      //        console.log("res",res)
      //     if (res.rsCode=== 'AAAAAAA') {
      //         this.tableData=res.data.list
      //         this.total=res.data.totalCount
      //         this.loading=false
      //     }
      //   });
    },
    //新增和修改
    addNew(id) {
      this.addOrUpdateIsShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.addOrUpdate(id);
      });
    },

    //获取下拉框
    extIdName() {
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
    },
    //删除
    deleteColumn(id) {
      this.$confirm("确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let arrid = [];
        arrid.push(id);
        deleteData({ chapterIds: arrid }).then((res) => {
          if (res.rsCode === "AAAAAAA") {
            this.queryAbout();
          }
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
  },
};
</script>
<style lang="scss" scoped>
</style>