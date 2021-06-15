<template>
  <div class="eamStuCourse">
      <!-- 主页面 -->
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" ref="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="学校名称：" prop="schoolId">
                    <el-select v-model="formData.schoolId" clearable placeholder="请选择学校名称" :disabled="true">
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
                    <el-input v-model="formData.courseName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item label="所属章节：" prop="chapterId">
                    <el-select v-model="formData.chapterId" clearable placeholder="请选择所属章节" :disabled="true">
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
                    <el-input v-model="formData.courseLessonName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item style="text-align:right;" prop="isSelected">
                   <el-checkbox v-model="formData.isSelected" true-label="1" false-label="0">已选作业</el-checkbox>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item style="text-align:right;">
                    <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
            <el-col :span="24">
                <el-form-item label-width="0">
                    <el-button plain type="primary" @click="add()" :disabled="disabled">加入</el-button>
                    <el-button plain type="primary" @click="out()" :disabled="!disabled">移除</el-button>
                </el-form-item>
                
            </el-col>
        </el-row>
        </el-form>
        
        <!-- 表格组件 -->
        <div id="print">
            <el-table
            ref="multipleTable"
            :data="tableData"
            border
            :row-key="getRowKey"
            @selection-change="handleSelectionChange"
            v-loading="loading"
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
                <el-table-column
                    prop="workTopicTypeValue"
                    header-align="center"
                    align="center"
                    label="题目类型">
                </el-table-column>
                <el-table-column
                    prop="workTopicName"
                    header-align="center"
                    align="center"
                    label="题目名称">
                </el-table-column>
                <el-table-column
                    prop="chapterName"
                    header-align="center"
                    align="center"
                    label="所属章节">
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
     <div class="btnBox">
        <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getLessonTopicPageListByParam,addData,removeData} from "@/api/eam/courseworkConfig";
import { getDropDownList} from "@/api/eam/select";
export default {
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        chapterId: "",
       courseLessonName:'',
       courseName:'',
        isSelected: "1"
      },
      disabled:true,
      multipleSelection:[],
      stateArr: [],
      extIdNameArr: [],
      courseChapterIdArr: [],
      tableData: [],
      loading:false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.$refs['formData'].resetFields();
     this.queryAbout() 
     this.$refs.multipleTable.clearSelection()
     this.extIdName()
      
   },
  computed: {},
  methods: {
    //获取路由参数
    getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    // 查询
    queryAbout(num) {
        //判断点击查询按钮清空选中
    if(num===1){
        this.$refs.multipleTable.clearSelection()
        this.pageIndex=1
    }
      this.loading=true
     if(this.formData.isSelected==="1"){
        this.disabled=true
     }else{
         this.disabled=false
     }
      this.formData["pageSize"]=this.pageSize
      this.formData["pageNum"]=this.pageIndex
      this.formData.schoolId=parseInt(this.getUrlKey("schoolId"))
      this.formData["courseId"]=parseInt(this.getUrlKey("courseId"))
      this.formData.chapterId=parseInt(this.getUrlKey("chapterId"))
      this.formData["courseLessonId"]=parseInt(this.getUrlKey("courseLessonId"))
      this.formData.courseName=this.getUrlKey("courseName")
      this.formData.courseLessonName=this.getUrlKey("courseLessonName")
       getLessonTopicPageListByParam(this.formData).then(res => {
        if (res.rsCode==='AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //加入
    add(){
         console.log(this.multipleSelection)
         let arr = new Array;
        for(let i in this.multipleSelection){
            let obj = new Object;
            obj.courseLessonId=parseInt(this.getUrlKey("courseLessonId"));
            obj.schoolId=parseInt(this.getUrlKey("schoolId"));
            obj.workTopicId = this.multipleSelection[i].workTopicId;
            obj.workTopicType = this.multipleSelection[i].workTopicType;
            arr.push(obj)
        }
        if(arr.length===0){
            return false
        }else{
            this.$confirm('确定加入?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                addData(arr).then(res => {
                    if (res.rsCode=== 'AAAAAAA') {
                        this.queryAbout()
                        this.$refs.multipleTable.clearSelection()
                    }
                });
            
            })
        }
       
    },
    //移除
    out(){
        let courseLessonWorkIds=[]
        for(let i in this.multipleSelection){
            courseLessonWorkIds.push(this.multipleSelection[i].courseLessonWorkId)
        }
        if(courseLessonWorkIds.length===0){
            return false
        }else{
            this.$confirm('确定移除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let obj={
                    "schoolId":parseInt(this.getUrlKey("schoolId")),
                    "courseLessonWorkIds":courseLessonWorkIds
                }
                removeData(obj).then(res => {
                    if (res.rsCode=== 'AAAAAAA') {
                        this.queryAbout()
                        this.$refs.multipleTable.clearSelection()
                    }
                });
            
            })
        }
    },
    getRowKey(row){
         return row.courseLessonWorkId
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
         //所属章节
        getDropDownList({"code":"eam_course_chapter","id1":this.formData.schoolId,"id2":this.formData.courseId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseChapterIdArr = data;
            this.courseChapterIdArr.push({'name':'全部','value':''})
          }
        });
    },
    //删除
    deleteColumn(id){
        console.log(id)
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            message: '删除成功',
            type: 'success'
          });
        })
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
    },
    // 当前页
    currentChangeHandle (val) {
        this.pageIndex = val
    },
    back(){
        this.$router.go(-1);//返回上一层
    }
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.eamStuCourse .btnBox{
  margin: 0 auto 20px;
  float: right;
}
</style>