<template>
  <div class="eamStucoursescore">
      <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" ref="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="学校名称：" prop="schoolId">
                    <el-select v-model="formData.schoolId" clearable placeholder="请选择学校名称" @change="changeSchoolId">
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
                <el-form-item label="课程名称：" prop="courseName">
                   <el-input v-model="formData.courseName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课程分类：" prop="courseType">
                    <el-select v-model="formData.courseType" clearable placeholder="请选择课程分类">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="任课老师：" prop="teacherName">
                    <el-input v-model="formData.teacherName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="学员姓名：" prop="studentName">
                    <el-input v-model="formData.studentName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="联系电话：" prop="studentPhone">
                    <el-input v-model="formData.studentPhone"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="考试日期：" prop="examTime">
                    <el-date-picker v-model="formData.examTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="操作员：" prop="operatorId">
                    <el-select v-model="formData.operatorId" clearable placeholder="请选择操作员">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in operatorArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
            <el-col :span="12">
                <el-button plain type="primary" @click="addNew()">新增</el-button>
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
                <el-form-item style="text-align:right;">
                    <el-button plain type="primary" @click="printPreview">打印预览</el-button>
                    <el-button plain type="primary" @click="exportExcel">导出EXCEL</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        
        <!-- 表格组件 -->
        <div id="print">
            <el-table
            :data="tableData"
            border
            v-loading="loading"
            >
            <el-table-column
                prop="courseName"
                header-align="center"
                align="center"
                label="课程名称">
            </el-table-column>
            <el-table-column
                prop="courseTypeValue"
                header-align="center"
                align="center"
                label="课程分类">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                header-align="center"
                align="center"
                label="任课老师">
            </el-table-column>
            <el-table-column
                prop="studentCode"
                header-align="center"
                align="center"
                label="学员号">
            </el-table-column>
            <el-table-column
                prop="studentName"
                header-align="center"
                align="center"
                label="学员姓名">
            </el-table-column>
            <el-table-column
                prop="score"
                header-align="center"
                align="center"
                label="成绩">
            </el-table-column>
            <el-table-column
                prop="studentPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="examTime"
                header-align="center"
                align="center"
                label="考试日期">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                header-align="center"
                align="center"
                label="最后更新时间">
            </el-table-column>
            <el-table-column
                prop="operatorValue"
                header-align="center"
                align="center"
                label="操作员">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column 
            label="操作" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.studentScoreId,scope.row.schoolId)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.studentScoreId,scope.row.schoolId)">删除</el-button>
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
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
    <!-- 新增和修改 -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
  </div>
</template>
<script>
const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
import { isNull } from "@/utils/publicMethod";
import addOrUpdate from "./addOrUpdate";
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getPageListByParam,deleteData } from "@/api/eam/stucoursescore";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseName: "",
        teacherName: "",
        studentName: "",
        courseType: "",
        studentPhone: "",
        examTime: "",
        operatorId: ""
      },
      action1:`${eamUrl}/eam/score/importData`,
      upLoadData:{
        _method:"post"
      },
      extIdNameArr:[],
      courseTypeArr:[],
      operatorArr:[],
      tableData: [],
      loading:true,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.queryAbout()
     this.extIdName()
   },
  computed: {},
  methods: {
    // 查询
    queryAbout(val) {
        if(val===1){
         this.pageIndex = 1
      }
      this.loading=true
      this.formData["pageSize"]=this.pageSize
      this.formData["pageNum"]=this.pageIndex
       getPageListByParam(this.formData).then(res => {
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    
    //新增和修改
    addNew(id,schoolId) {
        this.addOrUpdateIsShow=false
        this.$nextTick(() => {
            this.$refs.addOrUpdate.addOrUpdate(id,schoolId)
        })
        
    },
    //删除
    deleteColumn(id,schoolId){
       this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let arrid=[]
        arrid.push(id)
       deleteData({"studentScoreIds":arrid,"schoolId":schoolId}).then(res => {
          if (res.rsCode=== 'AAAAAAA') {
              this.queryAbout()
          }
        })
      })
    },
    //学校名称切换
      changeSchoolId(){
          this.formData.courseType=''
         //课程分类
        getDropDownList({"code":"eam_course_type","id1":this.formData.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseTypeArr = data;
            this.courseTypeArr.unshift({'name':'全部','value':''})
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
        }
      });
      //操作员下拉
      getConstantDownList({"code":"operator"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.operatorArr = data;
          this.operatorArr.unshift({'name':'全部','value':''})
        }
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
        this.$refs['formData'].resetFields();
        this.queryAbout();
      }else{
        this.$notify.error({
              message:  res.rsMsg
            });
      }		  
    },
    //下载模板
    downloadTemplate() {
      window.location.href=`${eamUrl}/eam/score/exportTemplate`
    },
     // 打印预览
    printPreview() {
      var print= document.getElementById('print');
      var newContent = print.innerHTML;
      var oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      document.getElementsByTagName('body')[0].style.zoom=0.92;
      window.print();
      window.location.reload();
      //将原有页面还原到页面
      document.body.innerHTML = oldContent;
      return false;
    },
    // 导出excel
    exportExcel() {
       this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
       
      let url=`${eamUrl}/eam/score/exportData`
      window.location.href= url + '?' + isNull(this.formData)
    },
    // 每页数
    sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.queryAbout()
    },
    // 当前页
    currentChangeHandle (val) {
        this.pageIndex = val
        this.queryAbout()
    }
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

</style>