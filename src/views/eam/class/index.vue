<template>
  <div class="eamClass">
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
                <el-form-item label="班级名称：" prop="className">
                    <el-input v-model="formData.className"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="班主任：" prop="teacherName">
                    <el-input v-model="formData.teacherName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="班级类型：" prop="classType">
                    <el-select v-model="formData.classType" clearable placeholder="请选择班级类型">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in classTypeArr"
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
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
                <el-form-item label-width="0">
                    <el-button plain type="primary" @click="addNew()">新增</el-button>
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
            :data="tableData"
            border
            v-loading="loading"
            >
            <el-table-column
                prop="classCode"
                header-align="center"
                align="center"
                label="班级编码">
            </el-table-column>
            <el-table-column
                prop="className"
                header-align="center"
                align="center"
                label="班级名称">
            </el-table-column>
            <el-table-column
                prop="classCreateTime"
                header-align="center"
                align="center"
                label="创建日期">
            </el-table-column>
            <el-table-column
                prop="classExpiryTime"
                header-align="center"
                align="center"
                label="失效日期">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                header-align="center"
                align="center"
                label="班主任">
            </el-table-column>
            <el-table-column
                prop="teacherPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="classTypeValue"
                header-align="center"
                align="center"
                label="班级类型">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
            label="操作" align="center" fixed="right" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.classId,scope.row.schoolId)">编辑</el-button>
                    <el-button type="text" size="small" @click="goClasscourse(scope.row.classId,scope.row.schoolId,scope.row.className)">班级课程</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.classId,scope.row.schoolId)">删除</el-button>
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
import { getPageListByParam, deleteData } from "@/api/eam/class";
import { getDropDownList} from "@/api/eam/select";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        className: "",//班级名称
        teacherName: "",
        classType: "",
        startTime: "",
        endTime: ""
      },
      tableData: [],
      extIdNameArr: [],
      classTypeArr: [],
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
      this.loading=true
       if(val===1){
         this.pageIndex = 1
      }
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
    //删除
    deleteColumn(id,schoolId){
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             let arrid=[]
            arrid.push(id)
           deleteData({"classIds":arrid,"schoolId":schoolId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                  
                    this.queryAbout()
                }
            })
          
        })
    },
    //学校名称切换
      changeSchoolId(){
          this.formData.classType=''
        //班级类别下拉
        getDropDownList({"code":"eam_class_type","id1":this.formData.schoolId}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classTypeArr = data;
            this.classTypeArr.unshift({'name':'全部','value':''})
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
      
    },
    //跳转到班级课程管理
    goClasscourse(classId,schoolId,className){
         this.$router.push({
            name:"eam/class/classcourse",
        　　query:{
                classId: classId,
                schoolId: schoolId,
                className: className
            }
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
    // 导出excel
    exportExcel() {
       this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/class/exportData`
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