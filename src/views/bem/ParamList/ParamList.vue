<template>
  <div class="ParamList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="ParamList1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 机构,参数名称,查询按钮 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构:" label-width="80px">
              <el-select v-model="dataForm.extId" placeholder="请选择">
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
            <el-form-item label="参数名称:" label-width="120px">
              <el-input v-model="dataForm.parameterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
      >
        <el-table-column align="center" header-align="center" prop="extName" label="机构"></el-table-column>
        <el-table-column align="center" header-align="center" prop="parameterName" label="参数名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="parameterValue" label="参数值"></el-table-column>
        <el-table-column align="center" header-align="center" prop="parameterDesc" label="参数描述"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" style="text-align:center;">
          <template slot-scope="scope">
            <el-button @click="newAdd(scope.row.id)" type="text" size="small">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10,20,50,100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <addOrUpdate v-if="!show" @clickBack="changeShow" ref="addOrUpdate"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam } from "@/api/sam/parameter";
import { getDataListByTypeArray } from "@/api/common/dicLists";

export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        extId: "", //机构
        parameterName: "" //参数名称
      },
      show: true,
      imageUrl: "",
      extIdNameArr: [], //机构
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      listLoading: false,
      total: 0,
      form: {
        iconURL: ""
      }
    };
  },
  computed: {},
  activated() {
    this.show = true;
    this.queryAbout();
    this.TypeName();
  },
  mounted() {},
  methods: {
    getFileIcon(file) {
      // console.log("file :>> ", file);
      this.imgShrink(file, 120, 120).then(res => {
        // this.form.iconURL = res;
        // console.log(res)
      });
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageCount = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
    // 新增和修改
    newAdd(id) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //获取机构,
    TypeName() {
      getDataListByTypeArray({ type: ["METHOD_SAM_SCHOOLLIST"] }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
        }
      });
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
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
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
.campus .el-table th {
  background-color: #f5f7fa !important;
  text-align: center;
}
.campus .el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.campus .el-select {
  width: 100%;
}
</style>