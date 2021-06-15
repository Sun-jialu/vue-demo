<template>
  <div class="BankAccList">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="BankAccList1" v-if="btnShow">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline" label-width="120px">
        <!-- 机构,账号,账户名称 -->
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
            <el-form-item label="账号:" label-width="120px">
              <el-input v-model="dataForm.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称:">
              <el-input v-model="dataForm.accountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--所属银行,状态 -->
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
        </el-row>
        <!-- 查询按钮 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row style="margin:10px 0;">
          <el-col :span="12">
            <el-button plain type="primary" @click="newAdd()">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格组件 -->
      <div id="print">
        <el-table
          :data="studentArr"
          :header-cell-style="tableHeaderColor"
          border
          v-loading="listLoading"
        >
          <el-table-column align="center" header-align="center" prop="account" label="账号"></el-table-column>
          <el-table-column align="center" header-align="center" prop="accountName" label="账户名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="bankName" label="所属银行"></el-table-column>
          <el-table-column align="center" header-align="center" prop="outletsId" label="银行网点"></el-table-column>
          <el-table-column align="center" header-align="center" prop="bankNo" label="联行号"></el-table-column>
          <el-table-column align="center" header-align="center" prop="isPayeeAcc" label="默认收款账号"></el-table-column>
          <el-table-column align="center" header-align="center" prop="state" label="状态"></el-table-column>
          <el-table-column align="center" header-align="center" prop="orgId" label="机构"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" style="text-align:center;">
            <template slot-scope="scope">
              <el-button @click="newAdd(scope.row.id)" type="text" size="small">编辑</el-button>
              <!-- <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 存放ukey的div -->
    <Ukey :value="`${this.dataForm.account}`" @getUkey="getUkey"></Ukey>
    <!-- 新增弹出框 -->
    <addOrUpdate v-if="!btnShow" ref="addOrUpdate" @clickBack="changeShow" @success="queryAbout"></addOrUpdate>
  </div>
</template>
<script>
import Ukey from "@/components/bemMod/ukey.vue";
import addOrUpdate from "./addOrUpdate";
// import "@/utils/jquery.min.js";
import { getPageListByParam } from "@/api/sam/classroom";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate,
    Ukey,
  },
  data() {
    return {
      dataForm: {
        orgId: "", //机构
        account: "", //账号
        accountName: "", //账户名称
        bankName: "", //所属银行
        keyId: "", //UKE编号
        signdata: "", //加密DATA
        state: "", //状态
      },
      ukey: false, //是否插入ukey
      btnShow: true,
      orgIdNameArr: [], //机构
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      CryptoAgent: "",
      listLoading: false,
    };
  },
  computed: {},
  activated() {
    this.ad();
    // this.TypeName();
    this.btnShow = true;
    this.queryAbout();
  },
  methods: {
    ad() {
      let str = "【现金;云】123;【现金;云】123;【现金云】;123;";
      var index = this.find(str, "【", 1); //字符串res中第二个‘-’的下标
      var ress = str.substring(0, index);
      console.log("ress :>> ", ress);
    },
    find(str, cha, num) {
        var x = str.indexOf(cha);
        for (var i = 0; i < num; i++) {
          x = str.indexOf(cha, x + 1);
        }
        return x;
      },
    //组件获取ukey
    getUkey(data) {
      if (data.cnCode && data.signdata) {
        this.ukey = true;
      } else {
        this.ukey = false;
      }
      // this.dataForm.keyId = data.cnCode;
      // this.dataForm.signdata=data.signdata
    },

    // 查询
    async queryAbout() {
      if (this.ukey) {
        console.log("有权限");
        // this.listLoading = true;
        // this.dataForm.pageNum = this.pageIndex;
        // this.dataForm.pageCount = this.pageSize;
        // console.log('this.dataForm :>> ', this.dataForm);
        // let res = await getPageListByParam(this.dataForm);
        // this.listLoading = false;
        // if (res && res.rsCode == "AAAAAAA") {
        //   this.total = res.data.totalCount;
        //   this.studentArr = res.data.list;
        // }
      } else {
        console.log("没有权限");
      }
    },

    //获取学校
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"],
      }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.orgIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
        }
      });
    },
    // 新增和修改
    newAdd(id) {
      this.btnShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.TypeName();
      this.btnShow = num;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //删除
    remove(row) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
        });
      });
    },
    // 批量导入
    batchImport() {
      console.log("批量导入");
    },
    //下载模板
    downloadTemplate() {
      this.$delete(this.dataForm, "pageNum");
      this.$delete(this.dataForm, "pageSize");
      let url = "http://192.168.115.123:8066/sam/classroom/downloadExcel";
      // console.log(this.isNull(this.dataForm));
      window.location.href = url + "?" + this.isNull(this.dataForm);
    },
    // 打印预览
    printPreview() {
      console.log("打印预览");
      var print = document.getElementById("print");
      var newContent = print.innerHTML;
      var oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      document.getElementsByTagName("body")[0].style.zoom = 0.92;
      window.print();
      window.location.reload();
      //将原有页面还原到页面
      document.body.innerHTML = oldContent;
      return false;
    },
    // 导出excel
    exportExcel() {
      this.$delete(this.dataForm, "pageNum");
      this.$delete(this.dataForm, "pageSize");
      let url = "http://192.168.115.123:8066/sam/classroom/exportData";
      // console.log(this.isNull(this.dataForm));
      window.location.href = url + "?" + this.isNull(this.dataForm);
    },
    isNull(obj) {
      return Object.keys(obj)
        .map(function (key) {
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
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
.classroom .el-table th {
  background-color: #f5f7fa !important;
  text-align: center;
}
.classroom .el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.classroom .el-select {
  width: 100%;
}
</style>