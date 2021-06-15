<template>
  <div class="classroom">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="classroom1" v-if="btnShow">
      <!-- 首部标题 -->
      <titleBar></titleBar>
      <!-- 顶部form表单 -->
      <el-form :model="formInline" ref="formInline" class="demo-form-inline" label-width="90px">
        <!-- 学校名称,校区名称,教室类型 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
              <el-select v-model="formInline.schoolId" clearable placeholder="请选择学校名称" @change="changeSchoolId">
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
            <el-form-item label="校区名称:">
              <el-select v-model="formInline.campusId" clearable placeholder="请选择校区名称">
                 <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in campusIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教室类型:">
              <el-select v-model="formInline.classroomType" clearable placeholder="请选择教室类型">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in classroomTypeArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--教学楼名称 ,教室名称,状态 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="教学楼名称:">
              <el-input v-model="formInline.classroomBuildName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教室名称:">
              <el-input v-model="formInline.classroomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态:">
              <el-select v-model="formInline.state" clearable placeholder="请选择状态">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询按钮 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row style="margin:10px 0;">
          <el-col :span="12">
            <el-button plain type="primary" @click="newAdd()">新增</el-button>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="action1"
              :on-success="handleAvatarSuccess" 
              :data="upLoadData" 
              accept=".xls, .xlsx"
              :show-file-list="false"
              :auto-upload="true"
              style="display:inline-block;margin:0 10px;">
              <el-button plain type="primary">批量导入</el-button>
            </el-upload>
            <el-button plain type="primary" @click="downloadTemplate">下载模板</el-button>
          </el-col>
          <el-col :span="12">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="printPreview">打印预览</el-button>
              <el-button plain type="primary" @click="exportExcel">导出EXCEL</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格组件 -->
      <div id="print">
        <el-table
          :data="studentArr"
          border
          v-loading="listLoading"
        >
          <el-table-column align="center" header-align="center" prop="campusName" label="校区名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="classroomBuildName" label="教学楼名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="classroomName" label="教室名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="classroomTypeValue" label="教室类型"></el-table-column>
          <el-table-column align="center" header-align="center" prop="floor" label="所在楼层"></el-table-column>
          <el-table-column align="center" header-align="center" prop="acreage" label="面积（平米）"></el-table-column>
          <el-table-column align="center" header-align="center" prop="seatNumber" label="座位数"></el-table-column>
          <el-table-column align="center" header-align="center" prop="schoolName" label="学校名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="stateValue" label="状态"></el-table-column>
          <el-table-column label="操作" fixed="right" style="text-align:center;" width="100">
            <template slot-scope="scope">
              <el-button @click="newAdd(scope.row.classroomId,scope.row.campusId,scope.row.schoolId)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="remove(scope.row.classroomId,scope.row.campusId,scope.row.schoolId)">删除</el-button>
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
    <!-- 新增弹出框 -->
    <addOrUpdate v-if="!btnShow" ref="addOrUpdate" @clickBack="changeShow" @success="queryAbout"></addOrUpdate>
  </div>
</template>
<script>
const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
import addOrUpdate from "./addOrUpdate";
import { isNull } from "@/utils/publicMethod";
import { getPageListByParam,deleteData } from "@/api/eam/classroom";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      formInline: {
        schoolId: 1, //学校名称
        campusId: "", //校区名称
        classroomType: "", //教室类型
        classroomBuildName: "", //教学楼名称
        state: 0, //状态
        classroomName: "" //教室名称
      },
      action1:`${eamUrl}/eam/classroom/importData`,
      upLoadData:{
        _method:"post"
      },
      btnShow: true,
      extIdNameArr: [], //学校名称
      studentArr: [],
      campusIdArr: [],//校区名称
      classroomTypeArr: [], //教室类型
      dicLists: [],
      stateArr:[],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      listLoading: false
    };
  },
  computed: {
  },
  activated() {
    this.queryAbout();
    this.extIdName();
    this.show = true;
  },
  methods: {
    // 查询
    async queryAbout(val) {
      if(val===1){
         this.pageIndex = 1
      }
      this.listLoading = true;
      this.formInline.pageNum = this.pageIndex;
      this.formInline.pageSize = this.pageSize;
      let res = await getPageListByParam(this.formInline);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
     //学校名称切换
      changeSchoolId(){
      //   //获取教室类型
      //   getDropDownList({"code":"eam_classrom_type","id1":this.formInline.schoolId}).then(res => {
      //     if (res && res.rsCode == "AAAAAAA") {
      //       let data = res.data;
      //       this.classroomTypeArr = data;
      //     }
      //   });
      //    //获取校区列表
      // getDropDownList({"code":"eam_campus","id1":this.formInline.schoolId}).then(res => {
      //   if (res && res.rsCode == "AAAAAAA") {
      //     let data = res.data;
      //     this.campusIdArr = data;
      //     this.campusIdArr.push({'name':'全部','value':''})
      //     console.log(this.campusIdArr)
      //   }
      // });
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
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
          this.stateArr.unshift({'name':'全部','value':''})
        }
      });
      //获取教室类型
        getDropDownList({"code":"eam_classrom_type","id1":this.formInline.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classroomTypeArr = data;
            this.classroomTypeArr.unshift({'name':'全部','value':''})
          }
        });
         //获取校区列表
      getDropDownList({"code":"eam_campus","id1":this.formInline.schoolId}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.campusIdArr = data;
          this.campusIdArr.unshift({'name':'全部','value':''})
        }
      });
    },
    // 新增和修改
    newAdd(id,campusId,schoolId) {
      this.btnShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,campusId,schoolId);
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.btnShow = num;
    },
    
    //删除
    remove(id,campusId,schoolId) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let arrid=[]
        arrid.push(id)
       deleteData({"classroomIds":arrid,"campusId":campusId,"schoolId":schoolId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.queryAbout()
                }
            })
      });
    },
    // 批量导入
    handleAvatarSuccess(res, file) {
      if(res && res.rsCode == "AAAAAAA"){
          this.$notify({
          title: "成功",
          message: res.rsMsg,
          type: "success"
        });
        this.$refs['formInline'].resetFields();
        this.queryAbout();
      }else{
        this.$notify.error({
              message:  res.rsMsg
            });
      }		  
    },
    //下载模板
    downloadTemplate() {
      window.location.href=`${eamUrl}/eam/classroom/exportTemplate`
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
      this.$delete(this.formInline,'pageNum')
      this.$delete(this.formInline,'pageSize')
      let url=`${eamUrl}/eam/classroom/exportData`
      console.log(isNull(this.formInline))
      window.location.href= url + '?' + isNull(this.formInline)

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