<template>
  <div class="family">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <!-- 顶部form表单 -->
    <div v-if="show" class="family1">
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 学校名称,姓名,学号 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:" label-width="120px">
              <el-select v-model="dataForm.schoolId" placeholder="学校名称">
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
            <el-form-item label="姓名:" label-width="120px">
              <el-input v-model="dataForm.studentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号:" label-width="120px">
              <el-input v-model="dataForm.studentCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 家庭成员姓名,证件类型,证件号码 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="家庭成员姓名:" label-width="120px">
              <el-input v-model="dataForm.stufamilyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型:" label-width="120px">
              <el-select v-model="dataForm.certificateType" placeholder="证件类型">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in cardTypeArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" label-width="120px">
              <el-input v-model="dataForm.certificateCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 是否监护人,联系电话,,查询按钮 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否监护人:" label-width="120px">
              <el-select v-model="dataForm.isGuardian" placeholder="是否监护人">
               <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in guardianArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" label-width="120px">
              <el-input v-model="dataForm.familyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
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
      <el-table
        :data="studentArr"
        border
        v-loading="listLoading"
      >
        <el-table-column align="center" header-align="center" prop="studentName" label="姓名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="studentCode" label="学号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="familyName" label="家庭成员姓名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="relationValue" label="关系"></el-table-column>
        <el-table-column align="center" header-align="center" prop="certificateTypeValue" label="证件类型"></el-table-column>
        <el-table-column align="center" header-align="center" prop="certificateCode" label="证件号码"></el-table-column>
        <el-table-column align="center" header-align="center" prop="familyPhone" label="联系电话"></el-table-column>
        <el-table-column align="center" header-align="center" prop="familyAddress" label="联系地址"></el-table-column>

        <el-table-column align="center" header-align="center" prop="isGuardianValue" label="是否监护人"></el-table-column>
        <el-table-column align="center" header-align="center" prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="addorupdata(scope.row.stuFamilyId,scope.row.schoolId)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.stuFamilyId,scope.row.schoolId)">删除</el-button>
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
    <studentMessage v-if="!show" ref="addupdata" :id="id" @clickBack="changeShow"></studentMessage>
  </div>
</template>
<script>
import studentMessage from "./familyMessage";
import { getPageListByParam, deleteData } from "@/api/eam/family";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  props: {},
  components: {
    studentMessage //组件
  },
  data() {
    return {
      dataForm: {
        schoolId: "", //学校名称
        certificateType: "", //证件类型
        certificateCode: "", //证件号码
        studentName: "", //姓名
        stufamilyName: "", //家庭成员姓名
        studentCode: "", //学号
        isGuardian: "", //是否监护人
        familyPhone: "" //电话
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      studentArr: [], //数据
      show: true, //控制新增，编辑的显示
      classroomType: [], //教室类型
      id: "", //带走参数的id
      listLoading: false,
      extIdNameArr: [], //学校名称
      cardTypeArr: [], //证件类型
      guardianArr: [] //是否监护人
    };
  },
  computed: {
   
  },
  activated() {
    this.queryAbout();
    this.show = true;
    this.extIdName();
  },
  methods: {
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
    },
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
       //获取证件类型
      getDropDownList({"code":"eam_certificate_type"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.cardTypeArr = data;
         this.cardTypeArr.unshift({'name':'全部','value':''})
        }
      });
      //是否监护人下拉
      getConstantDownList({"code":"guardianType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.guardianArr = data;
           
        }
      });
    },
    //删除
    remove(id,schoolId) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         let arrid=[]
        arrid.push(id)
       deleteData({"stufamilyIds":arrid,"schoolId":schoolId}).then(res => {
          if (res.rsCode=== 'AAAAAAA') {
              this.queryAbout()
          }
        })
      })
    },
    // 查询
    async queryAbout(val) {
      if(val===1){
         this.pageIndex = 1
      }
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
    addorupdata(id,schoolId) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addupdata.init(id,schoolId);
      });
    },
    // 批量导入
    impor() {
      console.log("family批量导入");
    },
    // 下载模板
    download() {
      console.log("family下载模板");
    },
    // 打印预览
    print() {
      console.log("family打印预览");
    },
    // 导出excel
    expor() {
      console.log("family导出excel");
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