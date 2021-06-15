<template>
  <div class="PayRulesList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="PayRulesList1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 机构分组名称,状态 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构分组名称:">
              <el-select v-model="dataForm.orgGroupId" placeholder="请选择">
                <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in orgGroupIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" label-width="120px">
              <el-select v-model="dataForm.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="可用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
        <el-table-column prop="orgGroupName" header-align="center" align="center" label="机构分组名称"></el-table-column>
        <el-table-column prop="superModel" header-align="center" align="center" label="监管模式"></el-table-column>
        <el-table-column prop="bailAmt" header-align="center" align="center" label="保证金额度(元)"></el-table-column>
        <el-table-column prop="bailRatio" header-align="center" align="center" label="保证金比例"></el-table-column>
        <el-table-column prop="clearDate" header-align="center" align="center" label="清算周期(天)"></el-table-column>
        <el-table-column prop="remark" header-align="center" align="center" label="备注"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100"
          style="text-align:center;"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
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
import { getPageListByParam } from "@/api/hsm/classCircle";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        orgGroupId: "", //机构分组名称
        state: "" //状态
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgGroupIdNameArr: [], //机构分组名称
      show: true //控制v-if
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  mounted() {},
  methods: {
    async all() {
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
    //获取机构分组名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgGroupIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.orgGroupIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
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
      if (id) {
        this.show = false;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id);
        });
      } else {
        this.show = false;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init();
        });
      }
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
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
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-table .cell {
  padding: 0;
  .addListImg {
    height: auto;
    width: 80px;
  }
}
</style>