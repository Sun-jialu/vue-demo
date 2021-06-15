<template>
  <div class="eamStucourseeval">
      <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" class="search-form--wrap" label-width="100px">
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
                <el-form-item label="评价内容：" prop="evalContent">
                    <el-input v-model="formData.evalContent"></el-input>
                </el-form-item>
            </el-col>
          <el-col :span="8">
                <el-form-item label="评分：" prop="evalScore">
                    <el-select v-model="formData.evalScore" clearable placeholder="请选择评分">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in evalScoreArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="学员姓名：" prop="studentName">
                    <el-input v-model="formData.studentName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="联系电话：" prop="studentPhone">
                    <el-input v-model="formData.studentPhone"></el-input>
                </el-form-item>
            </el-col>
          <el-col :span="8">
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"> </el-date-picker>
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
                prop="evalContent"
                header-align="center"
                align="center"
                label="评价内容">
            </el-table-column>
             <el-table-column
                prop="evalScore"
                header-align="center"
                align="center"
                label="评分">
            </el-table-column>
           <el-table-column
                prop="studentName"
                header-align="center"
                align="center"
                label="学员姓名">
            </el-table-column>
            <el-table-column
                prop="studentPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="evalTime"
                header-align="center"
                align="center"
                label="评价时间">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.studentEvaluationId,scope.row.schoolId)">删除</el-button>
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
  </div>
</template>
<script>
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getPageListByParam,deleteData } from "@/api/eam/stucourseeval";
export default {
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseName: "",
        courseType: "",
        evalContent: "",
        evalScore: "",
        studentName: "",
        studentPhone: "",
        startTime: "",
        endTime:""
      },
      extIdNameArr:[],
      courseTypeArr:[],
      evalScoreArr:[],
      tableData: [],
      loading:false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.extIdName()
     this.queryAbout()
     
   },
  computed: {},
  methods: {
    // 查询
    queryAbout(val) {
      if(val===1){
         this.pageIndex = 1
      }
      this.loading=true
      this.formData.pageSize=this.pageSize
      this.formData.pageNum=this.pageIndex
       getPageListByParam(this.formData).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    //删除
    deleteColumn(id,schoolId){
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             let arrid=[]
            arrid.push(id)
           deleteData({"studentEvaluationIds":arrid,"schoolId":schoolId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.queryAbout()
                }
            })
          
        })
    },
    //学校名称切换
      changeSchoolId(){
        this.formData.courseType=''
        this.formData.courseId=''
         //课程分类
        getDropDownList({"code":"eam_course_type","id1":this.formData.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseTypeArr = data;
            this.courseTypeArr.unshift({'name':'全部','value':''})
          }
        });
          //课程名称
        getDropDownList({"code":"eam_course","id1":this.formData.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseIdArr = data;
            this.courseIdArr.unshift({'name':'全部','value':''})
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
       //评分
      getConstantDownList({"code":"evalScore"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.evalScoreArr = data;
           this.evalScoreArr.unshift({'name':'全部','value':''})
        }
      });
      
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