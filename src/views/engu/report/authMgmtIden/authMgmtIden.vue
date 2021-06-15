<template>
  <div class="authMgmtIden">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="authMgmtIden1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 机构,客户名称 分组 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属机构:">
              <el-select v-model="dataForm.orgId" placeholder="请选择" clearable>
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in orgArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称:">
              <el-input v-model="dataForm.accName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分组:">
              <el-select v-model="dataForm.groupId" placeholder="请选择" clearable>
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in groupIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--设备名称 开始日期，结束日期-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备名称:">
              <el-input v-model="dataForm.deviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期:" prop="beginDate">
              <el-date-picker
                v-model="dataForm.beginDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="beginDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期:" prop="endDate">
              <el-date-picker
                v-model="dataForm.endDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="endDate"
              ></el-date-picker>
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
        <el-table-column prop="takePhotoUrl" header-align="center" align="center" label="抓拍照片"></el-table-column>
        <el-table-column prop="customerUrl" header-align="center" align="center" label="识别图片"></el-table-column>
        <el-table-column prop="accName" header-align="center" align="center" label="客户名称"></el-table-column>
        <el-table-column prop="certTypeId" header-align="center" align="center" label="证件类型"></el-table-column>
        <el-table-column prop="certNo" header-align="center" align="center" label="证件号码"></el-table-column>
        <el-table-column prop="deviceName" header-align="center" align="center" label="设备名称"></el-table-column>
        <el-table-column prop="groupId" header-align="center" align="center" label="分组"></el-table-column>
        <el-table-column prop="identDate" header-align="center" align="center" label="识别时间"></el-table-column>
        <el-table-column prop="identType" header-align="center" align="center" label="核验模式"></el-table-column>
        <el-table-column prop="identResult" header-align="center" align="center" label="识别结果"></el-table-column>
        <el-table-column prop="orgId" header-align="center" align="center" label="机构"></el-table-column>
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
export default {
  data() {
    return {
      dataForm: {
        orgId: "", //机构
        groupId: "", //分组类型
        deviceName: "", //设备名称
        accName:"",//客户名称
        beginDate: "", //开始日期
        endDate: "", //结束日期
      },
      beginDate: {
        disabledDate: (time) => {
          if (
            new Date(this.dataForm.beginDate).getTime() + 86400 * 90 * 1000 <
              new Date(this.dataForm.endDate).getTime() ||
            new Date(this.dataForm.beginDate).getTime() >
              new Date(this.dataForm.endDate).getTime() + 86400 * 90 * 1000
          ) {
            this.dataForm.endDate = this.dataForm.beginDate;
          }
          return time.getTime() > new Date().getTime();
        },
      },
      endDate: {
        //+ 3600 * 24 * 1000
        disabledDate: (time) => {
          if (this.dataForm.beginDate) {
            if (
              new Date(this.dataForm.beginDate).getTime() + 86400 * 90 * 1000 <
              time.getTime()
            ) {
              return (
                time.getTime() < new Date(this.dataForm.beginDate).getTime() ||
                time.getTime() >
                  new Date(this.dataForm.beginDate).getTime() +
                    86400 * 90 * 1000
              );
            } else {
              return (
                time.getTime() < new Date(this.dataForm.beginDate).getTime() ||
                time.getTime() > new Date().getTime()
              );
            }
          } else {
            return time.getTime() > new Date().getTime();
          }
        },
      },
      orgArr: [], //机构
      groupIdArr: [], //分组类型
      studentArr: [], //table数据
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      timestamp: "",
    };
  },
  computed: {},
  activated() {
    this.show = true;
    this.all();
  },
  methods: {
    all() {
      var timestamp = Date.parse(new Date());
      this.timestamp = timestamp;
      this.setTime();
      //   this.queryAbout();
    },
    setTime() {
      this.dataForm.beginDate = this.getLocalTime(this.timestamp);
      this.dataForm.endDate = this.getLocalTime(this.timestamp);
    },
    //时间戳转化时间yyyy-mm-dd
    getLocalTime(nS) {
      let data = new Date(parseInt(nS))
        .toLocaleString()
        .slice(0, 9)
        .replace(/\//g, "-");
      return data;
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
      this.dataForm.pageSize = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
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
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>