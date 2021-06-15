<template>
  <div class="teacher">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div v-if="show" class="teacher1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline" label-width="80px">
        <!-- 学校名称,证件类型,证件号码 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
              <el-select v-model="dataForm.schoolId" placeholder="学校名称" clearable @change="changeSchoolId">
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
            <el-form-item label="证件类型:">
              <el-select v-model="dataForm.certificateType" clearable placeholder="证件类型">
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
            <el-form-item label="证件号码">
              <el-input v-model="dataForm.certificateCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 姓名,学号,部门 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名:">
              <el-input v-model="dataForm.teacherName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工号:">
              <el-input v-model="dataForm.teacherCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门:">
              <el-select v-model="dataForm.departmentId" clearable placeholder="部门">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in deptIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 职务,状态,,查询按钮 -->
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item label="年级:">
              <el-select v-model="dataForm.work" clearable placeholder="年级">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="状态:">
              <el-select v-model="dataForm.teacherState" clearable placeholder="状态">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
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
        <el-table-column align="center" header-align="center" prop="teacherName" label="姓名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="teacherCode" label="工号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="sexValue" label="性别"></el-table-column>
        <el-table-column align="center" header-align="center" prop="certificateTypeValue" label="证件类型"></el-table-column>
        <el-table-column align="center" header-align="center" prop="certificateCode" label="证件号码"></el-table-column>
        <el-table-column align="center" header-align="center" prop="departmentName" label="部门"></el-table-column>
        <el-table-column align="center" header-align="center" prop="positionValue" label="职务"></el-table-column>
        <el-table-column align="center" header-align="center" prop="teacherAuthCode" label="教师证编号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="teacherPhone" label="联系电话"></el-table-column>
        <el-table-column align="center" header-align="center" prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="teacherStateValue" label="状态"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="addorupdata(scope.row.teacherId,scope.row.schoolId)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.teacherId,scope.row.schoolId)">删除</el-button>
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
    <teacherMessage v-if="!show" ref="addupdata" @clickBack="changeShow" @success="queryAbout"></teacherMessage>
  </div>
</template>
<script>
import teacherMessage from "./teacherMessage";
import { getPageListByParam,deleteData } from "@/api/eam/teacher";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  props: {},
  components: {
    teacherMessage //组件
  },
  data() {
    return {
      dataForm: {
        schoolId: "", //学校名称
        certificateType: "", //证件类型
        certificateCode: "", //证件号码
        teacherName: "", //姓名
        teacherCode: "", //工号
        departmentId: "", //部门
        teacherState: "" //状态
      },
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      show: true, //控制新增，编辑的显示
      extIdNameArr: [], //学校名称
      cardTypeArr: [], //证件类型
      classIdArr: [], //年级
      stateArr: [], //状态
      deptIdArr: [], //部门
      id: "", //带走参数的id
      listLoading: false
    };
  },
  computed: {
  },
  activated() {
    
    this.extIdName();
    this.show = true;
  },
  methods: {
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
    },
    //学校名称切换
      changeSchoolId(){
        this.dataForm.departmentId=''
       //部门下拉框
        getDropDownList({"code":"eam_department_code","id1":this.dataForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.deptIdArr = data;
            this.deptIdArr.unshift({'name':'全部','value':''})
          }
        });
      },
     //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
           this.dataForm.schoolId=data[0].value
           //部门下拉框
        getDropDownList({"code":"eam_department_code","id1":this.dataForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.deptIdArr = data;
            this.deptIdArr.unshift({'name':'全部','value':''})
          }
        });
        this.queryAbout();
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
      //状态下拉
      getConstantDownList({"code":"studentState"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
          this.stateArr.unshift({'name':'全部','value':''})
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
       deleteData({"teacherIds":arrid,"schoolId":schoolId}).then(res => {
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
      // console.log(res);
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
      console.log("teacher批量导入");
    },
    // 下载模板
    download() {
      console.log("teacher下载模板");
    },
    // 打印预览
    print() {
      console.log("teacher打印预览");
    },
    // 导出excel
    expor() {
      console.log("teacher导出excel");
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