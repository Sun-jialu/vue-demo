<template>
  <div class="eamClassCourse">
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
                <el-form-item label="班级名称：" prop="className">
                    <el-input v-model="formData.className" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课程名称：" prop="courseName">
                    <el-input v-model="formData.courseName"></el-input>
                </el-form-item>
            </el-col>
             
        </el-row>
        <el-row>
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
            <el-col :span="8">
              <el-form-item label="任课教师：" prop="teacherName">
                 <el-input v-model="formData.teacherName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item style="text-align:right;" prop="isClassCouseFlag">
                   <el-checkbox v-model="formData.isClassCouseFlag" true-label="1" false-label="0">非本班级课程</el-checkbox>
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
            <el-col :span="12">
                <el-form-item label-width="0">
                    <el-button plain type="primary" @click="add()" :disabled="disabled">加入</el-button>
                    <el-button plain type="primary" @click="deleteColumn()" :disabled="!disabled">移除</el-button>
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
                label="总学时">
            </el-table-column>
            <el-table-column
                prop="coursePrice"
                header-align="center"
                align="center"
                label="价格（元）">
            </el-table-column>
            <el-table-column
                prop="courseCreateTime"
                header-align="center"
                align="center"
                label="创建日期">
            </el-table-column>
            <el-table-column
                prop="courseExpiryTime"
                header-align="center"
                align="center"
                label="失效日期">
            </el-table-column>
            <el-table-column
                prop="teacherNames"
                header-align="center"
                align="center"
                label="任课教师">
            </el-table-column>
            <!-- <el-table-column
            label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrout(scope.row)">{{scope.row.state==0 ? `退出` : `加入`}}</el-button>
                </template>
            </el-table-column> -->
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
const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
import { isNull } from "@/utils/publicMethod";
import { getPageListByParam,addData,deleteData } from "@/api/eam/classcourse";
import { getDropDownList } from "@/api/eam/select";
export default {
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseName: "",//课程名称
        courseType: "",
        teacherName: "",
        startTime: "",
        endTime: "",
        classId:"",
        isClassCouseFlag: "0"
      },
      disabled:true,
      multipleSelection:[],
      extIdNameArr:[],
      tableData: [],
      courseTypeArr:[],
      teacherArr:[],
      loading:false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.extIdName()
     this.$refs['formData'].resetFields();
     this.$refs.multipleTable.clearSelection()
     this.queryAbout()
   },
  computed: {},
  methods: {
    //获取路由参数
    getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    // 查询
    queryAbout(val) {
       if(val===1){
         this.pageIndex = 1
      }
      this.loading=true
      if(this.formData.isClassCouseFlag==="0"){
        this.disabled=true
      }else{
        this.disabled=false
      }
      this.formData.pageSize=this.pageSize
      this.formData.pageNum=this.pageIndex
      this.formData.schoolId=parseInt(this.getUrlKey("schoolId"))
      this.formData.classId=parseInt(this.getUrlKey("classId"))
      this.formData.className=this.getUrlKey("className")
       getPageListByParam(this.formData).then(res => {
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
     handleSelectionChange(val) {
        this.multipleSelection = val;
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
      //获取课程分类
      getDropDownList({"code":"eam_course_type","id1":parseInt(this.getUrlKey("schoolId"))}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseTypeArr = data;
        }
      });
       //班主任下拉
        getDropDownList({"code":"eam_teachers","id1":parseInt(this.getUrlKey("schoolId"))}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.teacherArr = data;
            }
        });
      
    },
    //加入
    add(){
      var courseIdsArr=[]
       for(let i in this.multipleSelection){
            courseIdsArr.push(this.multipleSelection[i].courseId)
        }
        console.log(courseIdsArr)
        if(courseIdsArr.length==0){
            return false
        }else{
          this.$confirm('确定加入?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params={
                    "courseIds":courseIdsArr,
                    "classId": parseInt(this.getUrlKey("classId")),  
                    "schoolId": parseInt(this.getUrlKey("schoolId"))
                }
                addData(params).then(res => {
                    if (res.rsCode=== 'AAAAAAA') {
                        this.queryAbout()
                        this.$refs.multipleTable.clearSelection()
                    }
                });
            
            })
        }  
    },
    //删除
    deleteColumn(){
       var courseIdsArr=[]
       for(let i in this.multipleSelection){
            courseIdsArr.push(this.multipleSelection[i].courseId)
        }
        console.log(courseIdsArr)
        if(courseIdsArr.length==0){
            return false
        }else{
          this.$confirm('确定移除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let params={
                      "courseIds":courseIdsArr,
                      "classId": parseInt(this.getUrlKey("classId")),  
                      "schoolId": parseInt(this.getUrlKey("schoolId"))
                  }
            deleteData(params).then(res => {
              console.log("res",res)
                  if (res.rsCode=== 'AAAAAAA') {
                      this.queryAbout()
                      this.$refs.multipleTable.clearSelection()
                  }
              })
            
          })
        }  
    },
    getRowKey(row){
        return row.courseId
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
       this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/classcourse/exportData`
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
    back(){
        this.$router.go(-1);//返回上一层
    }
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.eamClassCourse .btnBox{
  margin: 0 auto 20px;
  float: right;
}
</style>