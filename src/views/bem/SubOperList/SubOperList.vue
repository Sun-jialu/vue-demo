<template>
  <div class="SubOperList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="SubOperList1">
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
          <!-- <el-col :span="13">
            <el-form-item label="账户:">
              <el-select v-model="dataForm.accountId" placeholder="请选择">
                <el-option label="12611111111111111111" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="20px">
              <el-input :disabled="true" v-model="dataForm.account" placeholder="账号后四位"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <!-- 子账户，操作类型-->
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
          <el-col :span="8">
            <el-form-item label="操作类型:">
              <el-select v-model="dataForm.operType" placeholder="操作">
                <el-option label="全部" value></el-option>
                <el-option label="开户" value="1"></el-option>
                <el-option label="销户" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 开始日期，结束日期,，查询-->
        <el-row>
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
          <el-col :span="8">
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
        <el-table-column prop="operType" header-align="center" align="center" label="操作类型"></el-table-column>
        <el-table-column prop="bese" header-align="center" align="center" label="备注/销户原因"></el-table-column>
        <el-table-column prop="useTime" header-align="center" align="center" label="操作时间"></el-table-column>
        <el-table-column prop="username" header-align="center" align="center" label="操作员姓名"></el-table-column>
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
import accountMod from "@/components/bemMod/account.vue";
export default {
  components: {
    accountMod
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
        operType: "" //操作类型
      },
      starTime: {
        disabledDate: time => {
          if (!this.dataForm.endTime) {
            return false;
          }
          return time.getTime() > new Date(this.dataForm.endTime).getTime() ;
        }
      },
      endTime: {
        disabledDate: time => {
          return time.getTime() < new Date(this.dataForm.starTime).getTime() ;
        }
      },
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
    //回调过来设置
    setData(item) {
      this.dataForm.accountName = item.accountName;
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
