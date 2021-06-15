<template>
  <div class="eamClass">
      <!-- 主页面 -->
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
            <el-form-item label="开始日期：" prop="startTime">
                <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label="结束日期：" prop="endTime">
                <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
                prop="courseCode"
                header-align="center"
                align="center"
                label="课程编码">
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
                prop="coursePrice"
                header-align="center"
                align="right"
                label="课程价格（元）">
                <template slot-scope="scope">{{money(scope.row.coursePrice)}}</template>
            </el-table-column>
            <el-table-column
                prop="totalAmt"
                header-align="center"
                align="right"
                label="总销售额（元）">
                 <template slot-scope="scope">{{money(scope.row.totalAmt)}}</template>
            </el-table-column>
            <el-table-column
                prop="totalCount"
                header-align="center"
                align="center"
                label="总销量">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
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
</template>
<script>
const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
import { isNull,moneyFormatter} from "@/utils/publicMethod";
import { getDropDownList} from "@/api/eam/select";
import { getCollectPageListByParam} from "@/api/eam/getCollectOrder";
export default {
  data() {
    return {
      orderDetailsIsShow:true,
      formData: {
        schoolId: "",//学校名称
        courseName: "",
        courseType: "",
        startTime: "",
        endTime: ""
      },
      extIdNameArr:[],
      courseTypeArr:[],
      tableData: [],
      loading:true,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
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
       getCollectPageListByParam(this.formData).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
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
          this.formData.schoolId=data[0].value
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
          this.queryAbout()
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
      this.$delete(this.formData,'pageNum')
      this.$delete(this.formData,'pageSize')
      let url=`${eamUrl}/eam/order/exportCollectPageListData`
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