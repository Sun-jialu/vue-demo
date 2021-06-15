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
                    <el-select v-model="formData.schoolId" clearable placeholder="请选择学校名称">
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
                <el-form-item label="学生姓名：" prop="studentName">
                    <el-input v-model="formData.studentName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="学员号：" prop="studentCode">
                    <el-input v-model="formData.studentCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
             <el-col :span="8">
                <el-form-item label="课程名称：" prop="courseName">
                    <el-input v-model="formData.courseName"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="学习状态：" prop="dealState">
                    <el-select v-model="formData.dealState" clearable placeholder="请选择状态">
                     <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in stateArr"
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
                    <el-button plain type="primary" @click="deleteColumn()">删除</el-button>
                    <el-button plain type="primary" @click="deleteAll()">全部删除</el-button>
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
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
                prop="createTime"
                header-align="center"
                align="center"
                label="登记日期">
            </el-table-column>
            <el-table-column
                prop="studentName"
                header-align="center"
                align="center"
                label="学员姓名">
            </el-table-column>
            <el-table-column
                prop="studentCode"
                header-align="center"
                align="center"
                label="学员号">
            </el-table-column>
            <el-table-column
                prop="courseName"
                header-align="center"
                align="center"
                label="课程名称">
            </el-table-column>
            <el-table-column
                prop="totalhours"
                header-align="center"
                align="center"
                label="总课时">
            </el-table-column>
             <el-table-column
                prop="studyCountByday"
                header-align="center"
                align="center"
                label="当日学习课时">
            </el-table-column>
            <el-table-column
                prop="noStudyhours"
                header-align="center"
                align="center"
                label="剩余课时">
            </el-table-column>
             <el-table-column
                prop="remark"
                header-align="center"
                align="center"
                label="备注">
            </el-table-column>
             <el-table-column
                prop="updateTime"
                header-align="center"
                align="center"
                label="最后更新时间">
            </el-table-column>
             <el-table-column
                prop="dealStateValue"
                header-align="center"
                align="center"
                label="处理状态">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.studentLearnRecordId,scope.row.schoolId,scope.row.studentId)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.studentApplyId,scope.row.schoolId)">删除</el-button>
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
import { getPageListByParam,deleteData,deleteDataAll} from "@/api/eam/stucourselearncordquery";
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: 1,//学校名称
        courseName: "",
        dealState: "",
        studentCode: "",
        startTime: "",
        endTime: "",
        studentName: ""
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
    // 查询
    queryAbout(val) {
        if(val===1){
         this.$refs.multipleTable.clearSelection()
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
    //修改
    addNew(id,schoolId,studentId) {
        this.addOrUpdateIsShow=false
        this.$nextTick(() => {
            this.$refs.addOrUpdate.addOrUpdate(id,schoolId,studentId)
        })
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
      getConstantDownList({"code":"dealState"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
          this.stateArr.unshift({'name':'全部','value':''})
        }
      });
    },
    //删除
    deleteColumn(id,schoolId){
        console.log(this.multipleSelection[0].schoolId)
        var studentLearnRecordIdsArr=[]
         for(let i in this.multipleSelection){
             studentLearnRecordIdsArr.push(this.multipleSelection[i].studentLearnRecordId)
         }
         console.log(studentLearnRecordIdsArr)
         if(studentLearnRecordIdsArr.length==0){
             return false
         }else{
            this.$confirm('确定删除该数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params={}
                if(id){
                    let arrid=[]
                    arrid.push(id)
                    params={
                        "schoolId":schoolId,
                        "studentApplyIds":arrid
                     }
                }else{
                    params={
                        "schoolId":this.multipleSelection[0].schoolId,
                        "studentLearnRecordIds":studentLearnRecordIdsArr
                    }
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
    //删除全部
    deleteAll(){
        this.$confirm('确定删除全部数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deleteDataAll({"schoolId":this.formData.schoolId}).then(res => {
                if (res.rsCode=== 'AAAAAAA') {
                    this.queryAbout()
                }
            })
        })
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
    getRowKey(row){
        return row.studentLearnRecordId
    },
     handleSelectionChange(val) {
        this.multipleSelection = val
      },
    // 导出excel
    exportExcel() {
      this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/stucourseapplyquery/exportData`
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