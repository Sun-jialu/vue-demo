<template>
  <div class="EmptyAccTransList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="EmptyAccTransList1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 机构，账户，账号后四位 -->
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
          <!-- 账户和后四位 -->
          <accountMod @getValue="setData"></accountMod>
        </el-row>
        <!-- 子账户 -->
        <el-row>
          <el-col :span="16">
            <el-form-item label="子账户:">
              <el-select v-model="dataForm.subAccountId" placeholder="请选择">
                <!-- <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in orgIdNameArr"
                  :key="index"
                ></el-option>-->
                <el-option label="1262222222" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 开始日期，结束日期,日期内，查询-->
        <el-row>
          <!-- 时间区间选择 -->
          <timeInterval @timeBack="setTime"></timeInterval>
          <el-col :span="3">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
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
        <el-table-column prop="subAccount" header-align="center" align="center" label="子账号"></el-table-column>
        <el-table-column prop="subAccountName" header-align="center" align="center" label="子账户名称"></el-table-column>
        <el-table-column prop="creditAmount" header-align="center" align="center" label="借方发生额(元)"></el-table-column>
        <el-table-column prop="creditAmount" header-align="center" align="center" label="贷方发生额(元)"></el-table-column>
        <el-table-column
          prop="availableBalance"
          header-align="center"
          align="center"
          label="可用资金(元)"
        ></el-table-column>
        <el-table-column prop="transTime" header-align="center" align="center" label="交易时间"></el-table-column>
        <el-table-column prop="oppositeAccount" header-align="center" align="center" label="对方账号"></el-table-column>
        <el-table-column
          prop="oppositeAccountName"
          header-align="center"
          align="center"
          label="对方账户名称"
        ></el-table-column>
        <el-table-column prop="remark" header-align="center" align="center" label="摘要"></el-table-column>
        <!-- <el-table-column label="操作" style="text-align:center;">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">编辑</el-button>
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
import { getPageListByParam } from "@/api/sam/information";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import timeInterval from "@/components/bemMod/timeInterval";
import accountMod from "@/components/bemMod/account.vue";

export default {
  components: {
    accountMod,
    timeInterval
  },
  data() {
    return {
      dataForm: {
        starTime: "", //开始时间
        endTime: "", //结束时间
        subAccountId: "", //子账户
        orgId: "", //机构
        accountId: "", //账户
        account: "", //账号后四位
        textIndex: 1 //日期段选择
      },
      starTime: {
        disabledDate: time => {
          if (!this.dataForm.endTime) {
            return false;
          }
          return time.getTime() > new Date(this.dataForm.endTime).getTime();
        }
      },
      endTime: {
        disabledDate: time => {
          return time.getTime() < new Date(this.dataForm.starTime).getTime();
        }
      },
      studentArr: [],
      //text文字点击
      textData: [
        { title: "当日", id: 1 },
        { title: "七日内", id: 2 },
        { title: "一月内", id: 3 },
        { title: "三月内", id: 4 }
      ],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgIdNameArr: [], //机构名称
      //日期范围的控制
      pickerOptions: {
        shortcuts: [
          {
            text: "当天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, start]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [end, start]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [end, start]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [end, start]);
            }
          }
        ],
        disabledDate: time => {
          return time.getTime() >= new Date().getTime();
        }
      }
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
      this.TypeName();
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //时间区间获取
    setTime(data) {
      this.dataForm.starTime = data.starTime;
      this.dataForm.endTime = data.endTime;
    },
    //回调过来设置
    setData(item) {
      this.dataForm.accountId = item.accountName;
      this.dataForm.account = item.account;
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
        this.studentArr = data.list;
      }
    },
    //获取学段,机构，课程类型
    TypeName() {
      getDataListByTypeArray({
        type: ["RKXD", "METHOD_SAM_SCHOOLLIST", "ZXXKC"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.orgIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
        }
      });
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
    //点击文本按钮
    clickData(item) {
      this.dataForm.textIndex = item.id;
    },
    // 打印预览
    print() {
      console.log("打印预览");
    },
    // 导出excel
    async expor() {
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
