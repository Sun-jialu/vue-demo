<template>
  <div class="BailAccList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="BailAccList1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 机构,保证金账号，保证金账号名称 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构:">
              <el-select v-model="dataForm.orgId" placeholder="请选择">
                <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in orgIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证金账号:">
              <el-input v-model="dataForm.bzjzh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证金账号名称:">
              <el-input v-model="dataForm.bzjzhmz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 所属银行,状态，查询 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属银行:">
              <el-input v-model="dataForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态:">
              <el-select v-model="dataForm.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="可用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="0px">
              <el-button plain type="primary" @click="addorupdata()">设置</el-button>
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
        <el-table-column prop="orgName" align="center" label="机构"></el-table-column>
        <el-table-column prop="subAccountName" align="center" label="保证金账号"></el-table-column>
        <el-table-column prop="availableBalance" align="center" label="保证金账户名称"></el-table-column>
        <el-table-column prop="bankName" align="center" label="所属银行"></el-table-column>
        <el-table-column prop="accountBalance" align="center" label="银行网点"></el-table-column>
        <el-table-column prop="state" align="center" label="联行号"></el-table-column>
        <el-table-column prop="state" align="center" label="状态"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">修改</el-button>
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
import { getPageListByParam } from "@/api/sam/classroom";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        orgId: "", //机构
        bzjzh: "", //保证金账户
        bzjzhmz: "", //保证金账户名称
        bankName: "", //所属银行
        state: "" //状态
      },
      studentArr: [],
      show: true,
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgIdNameArr: [] //机构名称
    };
  },
  activated() {
    this.show = true;
    this.all();
  },
  computed: {},
  mounted() {},
  methods: {
    all() {
      this.queryAbout();
      this.TypeName();
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
      this.dataForm.pageCount = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        // console.log("res.data :>> ", res.data);
        this.total = data.totalCount;
        this.studentArr = data.list;
      }
    },
    //获取机构
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.orgIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
        }
      });
    },
    addorupdata(id) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //回调
    changeShow() {
      this.all();
      this.show = true;
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
