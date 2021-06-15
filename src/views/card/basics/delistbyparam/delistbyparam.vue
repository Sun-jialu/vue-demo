<template>
  <div class="campus">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="campus1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline" label-width="120px">
        <!-- 代码类别名称,状态 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="代码类别名称:">
              <el-select v-model="dataForm.baseCodeId" placeholder="请选择">
                <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in baseCodeIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
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
        <el-row style="margin:10px 0;">
          <el-col :span="24">
            <el-button plain type="primary" @click="newAdd()">新增</el-button>
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
        <el-table-column align="center" header-align="center" prop="codeTypeName" label="代码类别名称"></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          prop="codeTypeShortName"
          label="代码类别简称"
        ></el-table-column>
        <el-table-column align="center" header-align="center" prop="code" label="代码"></el-table-column>
        <el-table-column align="center" header-align="center" prop="codeName" label="名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="serialNumber" label="序号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" header-align="center" prop="state" label="状态">
          <!-- <template v-slot="scope">
            <div>{{keyVal(scope.row.state)}}</div>
          </template>-->
        </el-table-column>
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
        baseCodeId: "", //代码类别名称
        state: "" //状态
      },
      show: true,
      baseCodeIdNameArr: [], //代码类别名称
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      listLoading: false,
      total: 0,
      stateList: [
        //状态字典表
        {
          id: 0,
          value: "可用"
        },
        {
          id: 1,
          value: "禁用"
        }
      ]
    };
  },
  computed: {
    //状态字典表
    keyVal() {
      let map = {};
      this.stateList.forEach((item, index) => {
        if (!map[item.id]) {
          map[item.id] = item.value;
        }
      });
      return key => {
        return map[key] || key;
      };
    }
  },
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
    //获取代码类别名称,状态
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.baseCodeIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.baseCodeIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
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
      this.all()
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