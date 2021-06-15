<template>
  <div class="regist">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="regist1">
      <!-- 顶部form表单 -->
      <el-form class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- button按钮区 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:left;">
              <el-form-item label-width="0px">
                <el-button plain type="primary" @click="print">批量新增</el-button>
                <el-button plain type="primary" @click="submit">提交</el-button>
                <el-button plain type="primary" @click="download">下载模板</el-button>
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
        <el-table-column prop="schoolName" header-align="center" align="center" label="学校名称"></el-table-column>
        <el-table-column prop="subAccountName" header-align="center" align="center" label="收费日期"></el-table-column>
        <el-table-column prop="operType" header-align="center" align="center" label="汇总费用"></el-table-column>
        <el-table-column prop="remark" header-align="center" align="center" label="备注"></el-table-column>
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
import { getPageListByParam } from "@/api/sam/information";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {},
  data() {
    return {
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgIdNameArr: [] //机构名称
    };
  },
  activated() {
    this.all();
  },
  computed: {},
  mounted() {},
  methods: {
    all() {
      this.queryAbout();
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    // 查询
    async queryAbout() {
      let res = await getPageListByParam();
      // this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        console.log("res.data :>> ", res.data);
        this.total = data.totalCount;
        this.studentArr = data.list;
      }
    },
    // 下载模板
    download(){
      console.log('下载模板' );
    },
    // 打印预览
    print() {
      console.log("打印预览");
    },
    // 导出excel
    async submit() {
      //   this.$delete(this.dataForm, "pageNum");
      //   this.$delete(this.dataForm, "pageSize");
      //   let url = "http://192.168.115.123:8066/sam/timeTable/exportData";
      //   // console.log(this.isNull(this.dataForm));
      //   window.location.href = url + "?" + this.isNull(this.dataForm);
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
  created() {}
};
</script>
<style lang="scss">
.term .el-table th {
  background-color: #f5f7fa !important;
  text-align: center;
}
.term .el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.term .el-select {
  width: 100%;
}
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.textColor {
  color: red;
  font-size: 12px;
  margin: 0 5px;
  cursor: pointer;
}
.notColor {
  font-size: 12px;
  color: skyblue;
  margin: 0 5px;
  cursor: pointer;
}
</style>
