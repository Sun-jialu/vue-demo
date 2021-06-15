<template>
  <div class="eamCoursework">
      <!-- 主页面 -->
    
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
                <el-form-item label="课程名称：" prop="courseId">
                     <el-select v-model="formData.courseId" clearable placeholder="请选择课程名称" @change="changeCourse">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所属章节：" prop="chapterId">
                    <el-select v-model="formData.chapterId" clearable placeholder="请选择所属章节">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseChapterIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
                <el-form-item label="课时名称：" prop="courseLessonName">
                    <el-input v-model="formData.courseLessonName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课时类型：" prop="courseLessonType">
                    <el-select v-model="formData.courseLessonType" clearable placeholder="请选择课时类型">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseStudyTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态：" prop="state">
                    <el-select v-model="formData.state" clearable placeholder="请选择状态">
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
        <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        >
            <el-table-column
                prop="courseName"
                header-align="center"
                align="center"
                label="课程名称">
            </el-table-column>
            <el-table-column
                prop="chapterName"
                header-align="center"
                align="center"
                label="所属章节">
            </el-table-column>
            <el-table-column
                prop="courseLessonName"
                header-align="center"
                align="center"
                label="课时名称">
            </el-table-column>
            <el-table-column
                prop="courseLessonTypeValue"
                header-align="center"
                align="center"
                label="课时类型">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                header-align="center"
                align="center"
                label="最后更新时间">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
                prop="stateValue"
                header-align="center"
                align="center"
                label="状态">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="goworkConfig(scope.row.courseId,scope.row.schoolId,scope.row.courseName,scope.row.courseLessonId,scope.row.chapterId,scope.row.courseLessonName)">课时作业配置</el-button>
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
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
         
        <!-- 是否显示课时作业信息 -->
        <!-- <div class="work" v-if="workShow">
            <div style="color:#664;font-size:14px;margin:10px 0;">课时作业信息[已选择：{{worknum}}题，总分：{{score}}分]</div>
            <el-table
            ref="multipleTable"
            :row-key="getRowKey"
            :data="workData"
            border
            @selection-change="handleSelectionChange"
            v-loading="workloading"
            >
                <el-table-column
                type="selection"
                align="center"
                :reserve-selection="true"
                width="55">
                </el-table-column>
                <el-table-column
                    prop="courseName"
                    header-align="center"
                    align="center"
                    label="课程名称">
                </el-table-column>
              
            </el-table>
            -->
    <!-- </div> -->
  
  </div>
</template>
<script>
import { getPageListByParam} from "@/api/eam/coursework";
import { getDropDownList,getConstantDownList } from "@/api/eam/select";
export default {
  data() {
    return {
      updateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseId: "",
        chapterId: "",
        courseLessonName: "",
        courseLessonType: "",
        state: ""
      },
      tableData: [],
      // workData:[{
      //     courseName:12,
      //     id:1
      // },
      // {
      //     courseName:15,
      //     id:3
      // },
      // {
      //     courseName:15,
      //     id:2
      // }],
      idArr:[15],
      extIdNameArr:[],
      stateArr:[],
      courseIdArr:[],
      multipleSelection:[],
      courseChapterIdArr:[],
      courseStudyTypeArr:[],
      // worknum:0,
      // score:0,
      workShow:false,
      loading:false,
      workloading:false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.workShow=false
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
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    //课时作业信息
    // courseWork(id){
    //    this.workShow=true
    //   this.$nextTick(()=>{
    //     this.workData.forEach(row => {
    //         console.log(this.idArr.indexOf(row.courseName))
    //         if(this.idArr.indexOf(row.courseName) >= 0){
    //             this.$refs.multipleTable.toggleRowSelection(row,true);
    //         }
    //     })
    //     })

    // },
    submitWork(){

    },
    //学校名称切换
      changeSchoolId(){
        this.formData.courseId=''
        this.formData.chapterId=''
         //课程名称
        getDropDownList({"code":"eam_course","id1":this.formData.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseIdArr = data;
            this.courseIdArr.unshift({'name':'全部','value':''})
          }
        });
      },
      //课程名称切换获取所属章节
      changeCourse(){
        this.formData.chapterId=''
          //所属章节
        getDropDownList({"code":"eam_course_chapter","id1":this.formData.schoolId,"id2":this.formData.courseId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseChapterIdArr = data;
            this.courseChapterIdArr.unshift({'name':'全部','value':''})
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
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
          this.stateArr.unshift({'name':'全部','value':''})
        }
      });
       //课时类型下拉
      getConstantDownList({"code":"courselessontype"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseStudyTypeArr = data;
           this.courseStudyTypeArr.unshift({'name':'全部','value':''})
        }
      });
       
    },
    //计算已选题数和分数
    // handleSelectionChange(val) {
    //     this.multipleSelection = val;
    //     console.log(this.multipleSelection)
    //     var courseIdsArr=[]
    //     for(let i in this.multipleSelection){
    //          courseIdsArr.push(this.multipleSelection[i].courseName)
    //     }
    //     if(courseIdsArr.length==0){
    //         this.score=0
    //         this.worknum=0
    //     }else{
    //         this.score = courseIdsArr.reduce((total, num) => { return total + num })
    //         this.worknum=this.multipleSelection.length
    //     }
       
        
    //   },
    //跳转到课时作业配置
    goworkConfig(courseId,schoolId,courseName,courseLessonId,chapterId,courseLessonName){
        this.$router.push({
            name:"eam/coursework/courseworkConfig",
        　　query:{
              courseId: courseId,
              schoolId: schoolId,
              courseName: courseName,
              courseLessonId:courseLessonId,
              chapterId:chapterId,
              courseLessonName:courseLessonName
            }
        }) 
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
.eamCoursework .btnBox{
  margin: 20px auto;
  float: right;
}
</style>