<template>
  <div class="campus">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="campus1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline" label-width="120px">
        <!-- 机构 -->
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
        ref="multipleTable"
        v-loading="listLoading"
      >
        <el-table-column align="center" header-align="center" prop="orgId" label="机构"></el-table-column>
        <el-table-column align="center" header-align="center" prop="parmName" label="参数名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="parmName" label="参数值"></el-table-column>
        <el-table-column align="center" header-align="center" prop="editState" label="修改标志"></el-table-column>
        <el-table-column align="center" header-align="center" prop="description" label="参数描述"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" style="text-align:center;">
          <template slot-scope="scope">
            <el-button @click="newAdd(scope.row.id)" type="text" size="small">编辑</el-button>
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
import { dataNull } from "@/utils/publicMethod";
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam } from "@/api/sam/campus";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        orgId: "" //机构
      },
      show: true,
      orgIdNameArr: [], //机构
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      listLoading: false,
      total: 0
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  mounted() {},
  methods: {
    all() {
      this.queryAbout();
      this.TypeName();
      this.show = true;
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
        this.total = data.totalCount;
        dataNull(data.list);
        this.studentArr = data.list;
        // console.log('data.list :>> ', data.list);
      }
    },
    //获取机构,状态
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_METHOD_SAM_CAMPUSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.orgIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
        }
      });
    },
    // 新增和修改
    newAdd(id) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.TypeName();
      this.show = num;
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