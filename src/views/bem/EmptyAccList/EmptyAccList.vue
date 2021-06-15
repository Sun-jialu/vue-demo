<template>
  <div class="EmptyAccList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="EmptyAccList1">
      <!-- 顶部form表单 -->
      <el-form
        :rules="rules"
        :model="dataForm"
        class="demo-form-inline search-form--wrap"
        label-width="120px"
      >
        <!-- 机构,账户，账号后四位 -->
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
        <!--子账户 ，子账户状态 -->
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
            <el-form-item label="子账户状态:">
              <el-select v-model="dataForm.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <br />
      </el-form>
      <!-- 表格组件 -->
      <el-table
        :data="studentArr"
        :header-cell-style="tableHeaderColor"
        border
        v-loading="listLoading"
      >
        <el-table-column prop="subAccount" align="center" label="子账号"></el-table-column>
        <el-table-column prop="subAccountName" align="center" label="子账户名称"></el-table-column>
        <el-table-column prop="availableBalance" align="center" label="可用资金(元)"></el-table-column>
        <el-table-column prop="openTime" align="center" label="开户日期"></el-table-column>
        <el-table-column prop="accountBalance" align="center" label="当前余额(元)"></el-table-column>
        <el-table-column prop="state" align="center" label="子账户状态"></el-table-column>
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
    <Ukey value="123123123" @getUkey="getUkey"></Ukey>
  </div>
</template>
<script>
import Ukey from "@/components/bemMod/ukey.vue";
import { getPageListByParam } from "@/api/sam/information";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import accountMod from "@/components/bemMod/account.vue";

export default {
  components: {
    accountMod,
    Ukey
  },
  data() {
    return {
      dataForm: {
        subAccountId: "", //子账户
        state: "", //子账户状态
        orgId: "", //机构
        ukey: "", //ukey钥匙
        accountId: "", //账户
        account: "" //账号后四位
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgIdNameArr: [], //机构名称
      newAccountArr: [], //v-modle绑定的账户下拉框
      rules: {}
    };
  },
  activated() {
    this.newAccountArr = this.accountArr;
    this.all();
  },
  computed: {},
  mounted() {},
  methods: {
    all() {
      this.queryAbout();
      this.TypeName();
    },
    //组件获取ukey
    getUkey(data) {
      console.log('data :>> ', data);
      this.dataForm.ukey = data;
      this.queryAbout();
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //账号后四位回调过来设置
    setData(item) {
      this.dataForm.accountId = item.accountName;
      this.dataForm.account = item.account;
    },
    // 查询
    async queryAbout() {
      if (this.dataForm.ukey) {
        this.listLoading = true;
        this.dataForm.pageNum = this.pageIndex;
        this.dataForm.pageCount = this.pageSize;
        let res = await getPageListByParam(this.dataForm);
        this.listLoading = false;
        if (res && res.rsCode == "AAAAAAA") {
          this.total = res.data.totalCount;
          this.studentArr = res.data.list;
        }
      }else{
        this.$notify({
          title: "警告",
          message: "无权限",
          type: "warning"
        });
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
