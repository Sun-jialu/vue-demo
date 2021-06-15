<template>
  <div class="leaveResult">
    <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
      <titleBar></titleBar>
      <!-- 顶部form表单 -->
      <el-form :model="formData" class="search-form--wrap" label-width="115px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="customerName">
              <el-input v-model="formData.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="certTypeId">
              <el-select v-model="formData.certTypeId" clearable placeholder="请选择证件类型">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in certTypeIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="certNo">
              <el-input v-model="formData.certNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="8">
                <el-form-item label="卡类别：" prop="cardType">
                    <el-select v-model="formData.cardType" clearable placeholder="请选择卡类别">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in cardTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="卡号：" prop="cardNo">
              <el-input v-model="formData.cardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门：" prop="departmentId">
              <el-select v-model="formData.departmentId" clearable placeholder="请选择部门">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in departmentIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="请假/出差类型：" prop="leaveType">
              <el-select v-model="formData.leaveType" clearable placeholder="请选择请假/出差类型">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in leaveTypeArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开始时间：" prop="leaveBeginTimes">
              <el-date-picker
                v-model="formData.leaveBeginTimes"
                type="datetime"
                placeholder="选择开始时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间：" prop="leaveEndTimes">
              <el-date-picker
                v-model="formData.leaveEndTimes"
                type="datetime"
                placeholder="选择结束时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- button按钮区 -->
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align:right;">
              <el-button plain type="primary" @click="printPreview">打印预览</el-button>
              <el-button plain type="primary" @click="exportExcel">导出EXCEL</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 表格组件 -->
      <div id="print">
        <el-table :data="tableData" border v-loading="loading">
          <el-table-column prop="customerName" header-align="center" align="center" label="客户名称"></el-table-column>
          <el-table-column prop="cardNo" header-align="center" align="center" label="卡号"></el-table-column>
          <el-table-column prop="certTypeId" header-align="center" align="center" label="证件类型"></el-table-column>
          <el-table-column prop="certNo" header-align="center" align="center" label="证件号码"></el-table-column>
          <el-table-column prop="orgId" header-align="center" align="center" label="部门"></el-table-column>
          <el-table-column prop="leaveType" header-align="center" align="center" label="出差/请假类型"></el-table-column>
          <el-table-column prop="leaveBeginTime" header-align="center" align="center" label="开始时间"></el-table-column>
          <el-table-column prop="leaveEndTime" header-align="center" align="center" label="结束时间"></el-table-column>
          <el-table-column prop="leaveReason" header-align="center" align="center" label="出差/请假原因"></el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="录入时间"></el-table-column>
          <el-table-column prop="updateUser" header-align="center" align="center" label="操作员姓名"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addNew(scope.row.customerName)">申请</el-button>
              <el-button type="text" size="small" @click="deleteColumn(scope.row.chapterId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 新增和修改 -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam, deleteData } from "@/api/eam/coursechapter";
import { getDropDownList } from "@/api/eam/select";
export default {
  components: {
    addOrUpdate,
  },
  data() {
    return {
      addOrUpdateIsShow: true,
      formData: {
        departmentId: "", //部门
        customerName: "", //客户名称
        cardNo: "", //卡号
        certNo: "", //证件号
        leaveType: "", //出差请假类型
        certTypeId: "",
        leaveBeginTimes: "",
        leaveEndTimes: "",
      },
      departmentIdArr: [],
      stateArr: [],
      certTypeIdArr: [], //证件类型下拉
      cardTypeArr: [], //卡类别
      leaveTypeArr: [],
      tableData: [
        {
          orgId: "",
          customerName: "数学",
        },
      ],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    };
  },
  activated() {
    this.queryAbout();
    this.addOrUpdateIsShow = true;
    this.extIdName();
  },
  computed: {},
  methods: {
    // 查询
    queryAbout() {
      //   this.loading=true
      //   this.formData.pageSize=this.pageSize
      //   this.formData.pageNum=this.pageIndex
      //    getPageListByParam(this.formData).then(res => {
      //        console.log("res",res)
      //     if (res.rsCode=== 'AAAAAAA') {
      //         this.tableData=res.data.list
      //         this.total=res.data.totalCount
      //         this.loading=false
      //     }
      //   });
    },
    //新增和修改
    addNew(id) {
      this.addOrUpdateIsShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.addOrUpdate(id);
      });
    },

    //获取下拉框
    extIdName() {
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
    },
    //删除
    deleteColumn(id) {
      this.$confirm("确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let arrid = [];
        arrid.push(id);
        deleteData({ chapterIds: arrid }).then((res) => {
          if (res.rsCode === "AAAAAAA") {
            this.queryAbout();
          }
        });
      });
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
      console.log("导出excel");
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
};
</script>
<style lang="scss" scoped>
</style>