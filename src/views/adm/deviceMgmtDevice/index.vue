<template>
  <div class="deviceMgmtDevice">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div v-if="addOrUpdateIsShow">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="search-form--wrap" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构:">
              <el-select
                v-model="dataForm.orgId"
                placeholder="机构"
                clearable
                @change="changeSchoolId"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in extIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="子系统:">
              <el-select v-model="dataForm.subsystemId" clearable placeholder="子系统">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in subsystemIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分组:">
              <el-select v-model="dataForm.groupId" clearable placeholder="所属分组">
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备号:">
              <el-input v-model="dataForm.deviceCode"></el-input>
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
          <el-col :span="12">
            <el-form-item label-width="0px">
              <el-button plain type="primary" @click="addorupdata()">新增</el-button>
              <el-button plain type="primary" @click="impor">批量导入</el-button>
              <el-button plain type="primary" @click="download">下载模板</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
      <el-table :data="tableData" border v-loading="listLoading">
        <el-table-column align="center" header-align="center" prop="orgId" label="机构"></el-table-column>
        <el-table-column align="center" header-align="center" prop="deviceCode" label="设备号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="groupId" label="所属分组"></el-table-column>
        <el-table-column align="center" header-align="center" prop="subsystemId" label="子系统"></el-table-column>
        <el-table-column align="center" header-align="center" prop="contact" label="设备序列号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="commumode" label="通讯状态"></el-table-column>
        <el-table-column align="center" header-align="center" prop="remake" label="备注"></el-table-column>
        <el-table-column align="center" header-align="center" prop="stateValue" label="状态"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="addorupdata(scope.row.studentId)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.studentId)">删除</el-button>
          </template>
        </el-table-column>
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
    <!-- 新增，修改组件 -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam, deleteData } from "@/api/eam/student";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  props: {},
  components: {
    addOrUpdate,
  },
  data() {
    return {
      dataForm: {
        orgId: "", //机构名称
        subsystemId: "", //子系统
        groupId: "", //所属分组
        deviceCode: "", //设备号
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: [], //数据
      addOrUpdateIsShow: true, //控制新增，编辑的显示
      id: "", //带走参数的id
      listLoading: false,
      extIdNameArr: [], //学校名称
      subsystemIdArr: [], //子系统下拉
      groupIdArr: [], //所属分组
    };
  },
  computed: {},
  activated() {
    this.dicLists = [];
    this.queryAbout();
    this.show = true;
    this.extIdName();
  },
  methods: {
    //学校名称切换
    changeSchoolId() {
      //所属分组
      getDropDownList({
        code: "eam_classes",
        id1: this.dataForm.schoolId,
      }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.groupIdArr = data;
        }
      });
    },
    //获取下拉框
    extIdName() {
      //机构名称
      getDropDownList({ code: "eam_schools" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
      //子系统下拉
      getDropDownList({ code: "eam_certificate_type" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.subsystemIdArr = data;
        }
      });
    },
    //删除
    remove(id) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let arrid = [];
        arrid.push(id);
        deleteData({ studentIds: arrid }).then((res) => {
          if (res.rsCode === "AAAAAAA") {
            this.queryAbout();
          }
        });
      });
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageSize = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.tableData = res.data.list;
      }
    },
    //新增或编辑
    addorupdata(id) {
      this.addOrUpdateIsShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.addOrUpdate(id);
      });
    },
    // 批量导入
    impor() {
      console.log("studet批量导入");
    },
    // 下载模板
    download() {
      console.log("studet下载模板");
    },
    // 打印预览
    print() {
      console.log("studet打印预览");
    },
    // 导出excel
    expor() {
      console.log("studet导出excel");
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
<style scoped lang="scss">
.el-form {
  width: 100%;
  .el-form-item {
    .el-form-item__label {
      width: 20%;
    }
    .el-form-item__content {
      width: 100%;
      .el-input {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
.el-table th {
  background-color: #eee;
  text-align: center;
}
</style>
