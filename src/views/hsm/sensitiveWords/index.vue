<template>
  <div class="sensitiveWords">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="sensitiveWords1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 学校名称,班级名称,处理类型 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
              <el-select v-model="dataForm.extId" disabled placeholder="请选择学校名称">
                <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in extIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级名称" label-width="120px">
              <el-select v-model="dataForm.classId" placeholder="班级名称">
                <el-option
                  :label="item.className"
                  :value="item.id"
                  v-for="(item,index) in classList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理类型:">
              <el-select v-model="dataForm.dealType" placeholder="请选择处理类型">
                <el-option label="全部" value></el-option>
                <el-option label="替换" value="0"></el-option>
                <el-option label="屏蔽" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--敏感词, 状态-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="敏感词:">
              <el-input v-model="dataForm.sensitiveWords"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态:">
              <el-select v-model="dataForm.state" placeholder="状态">
                <el-option label="全部" value></el-option>
                <el-option label="可用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询按钮-->
        <el-row>
          <el-col :span="24">
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
              <!-- <el-button plain type="primary" @click="removeFile">删除文件</el-button> -->
              <!-- <el-button plain type="primary" @click="downloadFile">下载文件</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格组件 -->
      <el-table
        :data="studentArr"
        :header-cell-style="tableHeaderColor"
        border
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="sensitiveWords" header-align="center" align="center" label="敏感词"></el-table-column>
        <el-table-column prop="dealTypeValue" header-align="center" align="center" label="处理类型"></el-table-column>
        <el-table-column prop="replaceContent" header-align="center" align="center" label="替换内容"></el-table-column>
        <el-table-column prop="stateValue" header-align="center" align="center" label="状态"></el-table-column>
        <el-table-column prop="className" header-align="center" align="center" label="班级名称"></el-table-column>
        <el-table-column prop="extName" header-align="center" align="center" label="学校名称"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100"
          style="text-align:center;"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addorupdata(scope.row.id)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button> -->
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
    <!-- 新增弹出框 -->
    <addOrUpdate ref="addOrUpdate" v-if="!show" @clickBack="changeShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getPageListByParam } from "@/api/hsm/sensitiveWords";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        sensitiveWords: "", //敏感词
        state: "", //状态
        dealType: "", //处理类型
        classId: "" //班级名称
      },
      studentArr: [],
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      show: true, //控制v-if
      extIdNameArr: [], //学校名称
      classList: [], //班级名称
      multipleSelection: [] //table多选
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass();
      this.queryAbout();
      this.TypeName();
      this.show = true;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //table多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取学校名称,班级名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CLASSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          // this.classList = data.METHOD_SAM_CLASSLIST;
          // this.classList.unshift({ classId: "", className: "全部" });
        }
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.dataForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.dataForm.classId = data.classList[0].id;
        // this.selectClass(this.dataForm.classId);
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
    //新增或编辑
    addorupdata(id) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
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
    // //删除文件
    // async removeFile(item) {
    //   let res = awai(item.fileId);
    //   if (res && res.rsCode == "AAAAAAA") {
    //     let data = res.data;
    //     console.log(data.msg);
    //   }
    // },
    // //下载文件
    // async downloadFile(item) {
    //   let res = await exportData(item.fileId);
    //   if (res && res.rsCode == "AAAAAAA") {
    //     let data = res.data;
    //     console.log(data.msg);
    //   }
    // },
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
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>