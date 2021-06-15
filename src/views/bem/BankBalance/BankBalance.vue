<template>
  <div class="BankBalance">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="BankBalance1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
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
        </el-row>
        <!-- 所属银行，账户，账号后四位 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属银行:">
              <el-input v-model="dataForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <!-- 账户和后四位 -->
          <accountMod @getValue="setData"></accountMod>
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
        <el-table-column prop="account" header-align="center" align="center" label="账号"></el-table-column>
        <el-table-column prop="accountName" header-align="center" align="center" label="账户名称"></el-table-column>
        <el-table-column prop="currency" header-align="center" align="center" label="币种"></el-table-column>
        <el-table-column prop="accountBalance" header-align="center" align="center" label="余额(元)"></el-table-column>
        <el-table-column
          prop="availableBalance"
          header-align="center"
          align="center"
          label="可用余额(元)"
        ></el-table-column>
        <el-table-column prop="transTime" header-align="center" align="center" label="交易日期"></el-table-column>
        <el-table-column prop="bankName" header-align="center" align="center" label="所属银行"></el-table-column>
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
    <!-- 存放ukey的div -->
    <Ukey value="" @getUkey="getUkey"></Ukey>
  </div>
</template>
<script>
import { getPageListByParam } from "@/api/sam/information";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import timeInterval from "@/components/bemMod/timeInterval";
import accountMod from "@/components/bemMod/account.vue";
import Ukey from "@/components/bemMod/ukey.vue";
export default {
  components: {
    accountMod,
    timeInterval,
    Ukey
  },
  data() {
    return {
      dataForm: {
        starTime: "", //开始时间
        endTime: "", //结束时间
        bankName: "", //所属银行
        orgId: "", //机构
        accountName: "", //账户
        account: "", //账号
        textIndex: 1 //日期段选择
      },
      studentArr: [],
      ukey: false, //是否插入ukey
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      orgIdNameArr: [], //机构名称
    };
  },
  activated() {
    this.all();
  },
  computed: {},
  methods: {
    all() {
      this.queryAbout();
      this.TypeName();
    },
    //组件获取ukey
    getUkey(data) {
      console.log('1 :>> ', 1);
      if (data.cnCode && data.signdata) {
        this.ukey = true;
        // this.all();
      } else {
        this.ukey = false;
      }
      // this.dataForm.keyId = data.cnCode;
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
    //账号后四位回调过来设置
    setData(item) {
      this.dataForm.accountName = item.accountName;
      this.dataForm.account = item.account;
    },
    // 查询
    async queryAbout() {
      console.log('2 :>> ', 2);
      if (this.ukey) {
        console.log("有权限,开始查询");
        // this.listLoading = true;
        // this.dataForm.pageNum = this.pageIndex;
        // this.dataForm.pageCount = this.pageSize;
        // let res = await getPageListByParam(this.dataForm);
        // this.listLoading = false;
        // if (res && res.rsCode == "AAAAAAA") {
        //   let data = res.data;
        //   // console.log("res.data :>> ", res.data);
        //   this.total = data.totalCount;
        //   this.studentArr = data.list;
        // }
      } else {
        console.log("没有权限");
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
    //时间戳转化时间yyyy-mm-dd
    getLocalTime(nS) {
      let data = new Date(parseInt(nS))
        .toLocaleString()
        .slice(0, 9)
        .replace(/\//g, "-");
      return data;
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

  created() {},
  mounted() {}
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
