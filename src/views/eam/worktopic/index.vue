<template>
  <div class="eamWorktopic">
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
                    v-for="(item,index) in chapterIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            
        </el-row>
        <el-row>
           <el-col :span="8">
                <el-form-item label="题目名称：" prop="workTopicName">
                    <el-input v-model="formData.workTopicName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="题目类型：" prop="workTopicType">
                    <el-select v-model="formData.workTopicType" clearable placeholder="请选择题目类型">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in workTopicTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
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
            <el-col :span="16">
                <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
            <el-col :span="12">
                <el-form-item label-width="0">
                    <el-button plain type="primary" @click="addNew()">新增</el-button>
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
                prop="workTopicTypeValue"
                header-align="center"
                align="center"
                label="题目类型">
            </el-table-column>
             <el-table-column
                header-align="center"
                align="center"
                label="题目名称">
                <template slot-scope="scope">
                  <div v-html="scope.row.workTopicName"></div>
                </template>
            </el-table-column>
            <el-table-column
                prop="chapterName"
                header-align="center"
                align="center"
                label="所属章节">
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
                prop="stateValue"
                header-align="center"
                align="center"
                label="状态">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.workTopicId,scope.row.workTopicType,scope.row.schoolId,scope.row.chapterId)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.workTopicId,scope.row.workTopicType,scope.row.schoolId,scope.row.chapterId)">删除</el-button>
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
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam,deleteData } from "@/api/eam/worktopic";
import { getDropDownList,getConstantDownList } from "@/api/eam/select";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseId: "",
        workTopicName: "",
        chapterId: "",//所属章节
        workTopicType: "",
        operatorId: "",
        state: ""
      },
      extIdNameArr:[],
      stateArr:[],
      courseIdArr:[],
      chapterIdArr:[],
      operatorArr:[],
      workTopicTypeArr:[],
      tableData: [
      ],
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
    //新增和修改
    addNew(id,type,schoolId,chapterId) {
        this.addOrUpdateIsShow=false
        this.$nextTick(()=>{
            this.$refs.addOrUpdate.addOrUpdate(id,type,schoolId,chapterId)
        })
    },
    //删除
    deleteColumn(id,type,schoolId,chapterId){
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           
           deleteData({"workTopicId":id,"workTopicType":type,"schoolId":schoolId,"chapterId":chapterId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                  
                    this.queryAbout()
                }
            })
          
        })
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
            this.chapterIdArr = data;
            this.chapterIdArr.unshift({'name':'全部','value':''})
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
       //操作员下拉
      getConstantDownList({"code":"operator"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.operatorArr = data;
          this.operatorArr.unshift({'name':'全部','value':''})
        }
      });
       //题目类型下拉
      getConstantDownList({"code":"worktopictype"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.workTopicTypeArr = data;
          this.workTopicTypeArr.unshift({'name':'全部','value':''})
        }
      });
    },
     // 打印预览
    printPreview() {
      console.log("打印预览");
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
      console.log("导出excel");
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