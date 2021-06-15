<template>
  <div class="eamCourse">
      <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="学校名称：" prop="schoolId">
                    <el-select v-model="formData.schoolId" placeholder="请选择学校名称" @change="changeSchoolId">
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
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
                    <el-button plain type="primary" @click="updatestate(0)">发布</el-button>
                    <el-button plain type="primary" @click="updatestate(1)">下架</el-button>
                </el-form-item>
                
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
                prop="courseTypeValue"
                header-align="center"
                align="center"
                label="课程分类">
            </el-table-column>
            <el-table-column
                prop="totalhours"
                header-align="center"
                align="center"
                label="总课时">
            </el-table-column>
            <el-table-column
                prop="coursePrice"
                header-align="center"
                align="right"
                label="价格（元）">
                <template slot-scope="scope">{{money(scope.row.coursePrice)}}</template>
            </el-table-column>
            <el-table-column
                prop="studentTotal"
                header-align="center"
                align="center"
                label="学员数">
            </el-table-column>
            <el-table-column
                prop="courseCreateTime"
                header-align="center"
                align="center"
                label="生效日期">
            </el-table-column>
            <el-table-column
                prop="courseExpiryTime"
                header-align="center"
                align="center"
                label="失效日期">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                header-align="center"
                align="center"
                label="任课教师">
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
            label="操作" fixed="right" align="center" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.courseId,scope.row.schoolId)">编辑</el-button>
                    <el-button type="text" size="small" @click="goStucourse(scope.row.courseId,scope.row.schoolId,scope.row.courseName)">课程学员</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.courseId,scope.row.schoolId)">删除</el-button>
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
import { isNull,moneyFormatter} from "@/utils/publicMethod";
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam, updateState, deleteData } from "@/api/eam/course";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
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
        courseType: "",
        startTime: "",
        endTime: "",
        state: ""
      },
      multipleSelection:[],
      tableData: [],
      extIdNameArr: [],
      courseTypeArr: [],
      stateArr: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
    
     this.$refs.multipleTable.clearSelection()
     this.extIdName()
   },
  computed: {},
  methods: {
    money(val){
      return moneyFormatter(val)
    },
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
    addNew(id,schoolId) {
        this.addOrUpdateIsShow=false
        this.$nextTick(() => {
            this.$refs.addOrUpdate.addOrUpdate(id,schoolId)
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
          this.formData.schoolId=data[0].value
          //课程分类
        getDropDownList({"code":"eam_course_type","id1":this.formData.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseTypeArr = data;
            this.courseTypeArr.unshift({'name':'全部','value':''})
          }
        });
         this.queryAbout()
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
           deleteData({"courseIds":arrid,"schoolId":schoolId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.queryAbout()
                }
            })
          
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
    //发布下架
    updatestate(state){
         console.log(this.multipleSelection)
         var courseIdsArr=[]
         for(let i in this.multipleSelection){
             courseIdsArr.push(this.multipleSelection[i].courseId)
         }
         console.log(courseIdsArr)
         if(courseIdsArr.length==0){
             return false
         }else{
            var text=''
            if(state==0){
                text="发布"
            }else{
                text="下架"
            }
            this.$confirm('确定'+text+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params={
                    "state":state,
                    "courseIds":courseIdsArr
                }
                updateState(params).then(res => {
                    if (res.rsCode=== 'AAAAAAA') {
                        this.queryAbout()
                        this.$refs.multipleTable.clearSelection()
                    }
                });
            
            })
         }
         
        
    },
    getRowKey(row){
        return row.courseId
    },
     handleSelectionChange(val) {
        this.multipleSelection = val
      },
    // 导出excel
    exportExcel() {
      this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/course/exportData`
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
    },
    //跳转到课程学员管理
    goStucourse(courseId,schoolId,courseName){
        this.$router.push({
            name:"eam/course/stucourse",
        　　query:{
            courseId: courseId,
            schoolId: schoolId,
            courseName: courseName
          }
        }) 
    }
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

</style>