<template>
  <div class="PayMoneyList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="PayMoneyList1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 机构分组，账户，付款账号 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构分组:">
              <el-select v-model="dataForm.orgGroupId" placeholder="请选择">
                <!-- <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in orgIdNameArr"
                  :key="index"
                ></el-option>-->
                <el-option label="分组1" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
            <el-form-item label="付款账号:">
              <el-input v-model="dataForm.payAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 付款账户名称，收款账号,收款账户名称-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="付款账户名称:">
              <el-input v-model="dataForm.payAccName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号:">
              <el-input v-model="dataForm.payeeAccount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户名称:">
              <el-input v-model="dataForm.payeeAccName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--清算批次号 处理状态 查询-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="清算批次号:">
              <el-input v-model="dataForm.payeeAccName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理状态:">
              <el-select v-model="dataForm.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="待拨付" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期:" label-width="120px">
              <el-date-picker
                v-model="dataForm.starTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="starTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--结束日期  查询-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="结束日期:" label-width="120px">
              <el-date-picker
                v-model="dataForm.endTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="endTime"
              ></el-date-picker>
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
        <el-table-column prop="payAccount" header-align="center" align="center" label="付款账号"></el-table-column>
        <el-table-column prop="payAccName" header-align="center" align="center" label="付款账户名称"></el-table-column>
        <el-table-column prop="payeeAccount" header-align="center" align="center" label="收款账号"></el-table-column>
        <el-table-column prop="payeeAccName" header-align="center" align="center" label="收款账户名称"></el-table-column>
        <el-table-column prop="bankName" header-align="center" align="center" label="所属银行"></el-table-column>
        <el-table-column prop="outletsName" header-align="center" align="center" label="开户网点"></el-table-column>
        <el-table-column prop="bankNo" header-align="center" align="center" label="联行号"></el-table-column>
        <el-table-column prop="waitPayAmt" header-align="center" align="center" label="待拨付"></el-table-column>
        <el-table-column prop="purpose" header-align="center" align="center" label="付款用途"></el-table-column>
        <el-table-column prop="clearBatchNo" header-align="center" align="center" label="清算批次号"></el-table-column>
        <el-table-column prop="clear_cycle" header-align="center" align="center" label="清算周期"></el-table-column>
        <el-table-column prop="clearTime" header-align="center" align="center" label="清算时间"></el-table-column>
        <el-table-column prop="bpayAmtese" header-align="center" align="center" label="拨付额度"></el-table-column>
        <el-table-column prop="alrPayAmt" header-align="center" align="center" label="已拨付"></el-table-column>
        <el-table-column prop="state" header-align="center" align="center" label="处理状态"></el-table-column>
        <el-table-column prop="orgGroupName" header-align="center" align="center" label="机构分组"></el-table-column>
        <el-table-column prop="orgName" header-align="center" align="center" label="机构名称"></el-table-column>
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
      dataForm: {
        orgGroupId: "", ///机构分组
        orgId: "", //机构
        payAccount: "", //付款账号
        payAccName: "", //付款账户名称
        payeeAccount: "", //收款账号
        payeeAccName: "", //收款账号名称
        starTime: "", //开始时间
        endTime: "", //结束时间
        state: "", //处理状态
        payeeAccName: "" //清算批次号
      },
      starTime: {disabledDate: time => {if (!this.dataForm.endTime) {return false;} return time.getTime() > new Date(this.dataForm.endTime).getTime();}},
      endTime: {disabledDate: time => {return time.getTime() < new Date(this.dataForm.starTime).getTime();},disabledDate: time => { return new Date().getTime() <= time.getTime();}},
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
      // this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageCount = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        console.log("res.data :>> ", res.data);
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
