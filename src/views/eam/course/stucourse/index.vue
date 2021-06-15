<template>
  <div class="eamStuCourse">
      <!-- 主页面 -->
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <div v-if="addOrUpdateIsShow&&addStudentShow">
        <el-form :model="formData" ref="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="学校名称：" prop="schoolId">
                    <el-select v-model="formData.schoolId" placeholder="请选择学校名称" :disabled="true">
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
                <el-form-item label="加入渠道：" prop="joinSource">
                    <el-select v-model="formData.joinSource" clearable placeholder="请选择加入渠道">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in joinSourceArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
            <el-col :span="4">
                <el-form-item style="text-align:right;" prop="isCourse">
                   <el-checkbox v-model="formData.isCourse" true-label="1" false-label="0">非本课程学员</el-checkbox>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item style="text-align:right;">
                    <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row>
            <el-col :span="12">
                <el-form-item label-width="0">
                    <!-- <el-button plain type="primary" @click="addOrout(0,'check')" :disabled="disabled">加入</el-button>
                    <el-button plain type="primary" @click="addOrout(1,'check')" :disabled="!disabled">退出</el-button> -->
                    <el-button plain type="primary" @click="addStuCoursePeriod()" :disabled="!disabled">设置学员上课周期</el-button>
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
                prop="studentId"
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
                prop="studentPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="joinSourceValue"
                header-align="center"
                align="center"
                label="加入渠道">
            </el-table-column>
            <el-table-column
                prop="joinTime"
                header-align="center"
                align="center"
                label="加入日期">
            </el-table-column>
            <el-table-column
                prop="quitTime"
                header-align="center"
                align="center"
                label="退出日期">
            </el-table-column>
             <el-table-column
                prop="periodStartTime"
                header-align="center"
                align="center"
                label="上课开始日期">
            </el-table-column>
             <el-table-column
                prop="periodEndTime"
                header-align="center"
                align="center"
                label="上课结束日期">
            </el-table-column>
            <el-table-column
                prop="learnStateValue"
                header-align="center"
                align="center"
                label="状态">
            </el-table-column>
            <el-table-column  
            label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrout(scope.row.isBKStudent,'radio',scope.row.studentId)">{{scope.row.isBKStudent==0 ? `退出` : `加入`}}</el-button>
                    <!-- <el-button type="text" size="small" @click="deleteColumn(scope.row)">删除</el-button> -->
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
     <div class="btnBox">
        <el-button type="primary" @click="back()">返回</el-button>
    </div>
    </div>
    <!-- 设置学员上课周期 -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
    <!-- 加入学员 -->
    <addStudent ref="addStudent" v-if="!addStudentShow"></addStudent>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import addStudent from "./addStudent";

import { getPageListByParam,updateDate } from "@/api/eam/stucourse";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
     components: {
        addOrUpdate,
        addStudent
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      addStudentShow:true,
      formData: {
        schoolId: "",//学校名称
        courseId: "",
        schoolName: "",
        courseName: "",//课程名称
        studentName: "",
        studentPhone: "",
        joinSource: "",
        startTime: "",
        endTime: "",
        state: "",
        isCourse: "0"
      },
      disabled:true,
      multipleSelection:[],
      stateArr: [],
      extIdNameArr: [],
      joinSourceArr: [],
      tableData: [
        {
          studentId: "18",
          studentName: "啦啦啦",
          studentPhone: "122222222",
          joinSource: "一",
          joinTime: "2019-10",
          quitTime: "2020-10",
          teacherName: "",
          state:"发布"
        }
      ],
      loading:false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.addOrUpdateIsShow=true
     this.addStudentShow=true
     this.$refs['formData'].resetFields();
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
     if(this.formData.isCourse==="0"){
        this.disabled=true
     }else{
         this.disabled=false
     }
      this.formData.pageSize=this.pageSize
      this.formData.pageNum=this.pageIndex
      this.formData.schoolId=parseInt(this.getUrlKey("schoolId"))
      this.formData.courseId=parseInt(this.getUrlKey("courseId"))
      this.formData.courseName=this.getUrlKey("courseName")
      console.log("res",this.formData.courseName)
       getPageListByParam(this.formData).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
    },
    //设置学员上课周期
    addStuCoursePeriod(){
        var studentIdsArr=[]
         for(let i in this.multipleSelection){
             studentIdsArr.push(this.multipleSelection[i].studentId)
         }
         console.log(studentIdsArr)
        if(studentIdsArr.length===0){
            return false
        }else{
            this.addOrUpdateIsShow=false
            this.$nextTick(() => {
                this.$refs.addOrUpdate.addOrUpdate(studentIdsArr,parseInt(this.getUrlKey("schoolId")),parseInt(this.getUrlKey("courseId")))
            })
        }
    },
    //加入退出
    addOrout(state,val,id){
         console.log(this.multipleSelection)
         var studentIdsArr=[]
         for(let i in this.multipleSelection){
             studentIdsArr.push(this.multipleSelection[i].studentId)
         }
         console.log(studentIdsArr)
         //多选
         if(val === 'check'){
             if(studentIdsArr.length===0){
                return false
            }else{
                var text=''
                if(state===0){
                    text="加入"
                }else{
                    text="退出"
                }
                this.$confirm('确定'+text+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let params={
                        "isJoin":state,
                        "courseId":parseInt(this.getUrlKey("courseId")),
                        "schoolId":parseInt(this.getUrlKey("schoolId")),
                        "studentIds":studentIdsArr
                    }
                    updateDate(params).then(res => {
                        if (res.rsCode=== 'AAAAAAA') {
                            this.queryAbout()
                            this.$refs.multipleTable.clearSelection()
                        }
                    });
                
                })
            }
         }
        //单选
        if(val==='radio'){
            let stateR
            let text
            if(state===0){
                stateR=1
                text="退出"
                let arrid=[]
                arrid.push(id)
                this.$confirm('确定'+text+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={
                        "isJoin":stateR,
                        "courseId":parseInt(this.getUrlKey("courseId")),
                        "schoolId":parseInt(this.getUrlKey("schoolId")),
                        "studentIds":arrid
                    }
                    updateDate(params).then(res => {
                        if (res.rsCode=== 'AAAAAAA') {
                            this.queryAbout()
                            this.$refs.multipleTable.clearSelection()
                        }
                    });
                
                })
            }else{
                // stateR=0
                // text="加入"
                //console.log("lalla",parseInt(this.getUrlKey("schoolId")))
                this.addStudentShow=false
                this.$nextTick(() => {
                    this.$refs.addStudent.addStudent(id,parseInt(this.getUrlKey("schoolId")),parseInt(this.getUrlKey("courseId")))
                })
            }
            
        }
    },
    getRowKey(row){
        return row.studentId
    },
    //获取下拉框
    extIdName() {
      //获取学校名称
        getDropDownList({"code":"eam_schools"}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.extIdNameArr = data;
            this.formData.schoolId=data[0].value
            this.queryAbout() 
            }
        });
       //状态下拉
        getConstantDownList({"code":"learnState"}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.stateArr = data;
            }
        });
         //渠道下拉
        getConstantDownList({"code":"joinsource"}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.joinSourceArr = data;
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
.eamStuCourse .btnBox{
  margin: 0 auto 20px;
  float: right;
}
</style>