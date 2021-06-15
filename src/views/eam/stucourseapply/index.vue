<template>
  <div class="eamStucoursescore">
      <!-- 主页面 -->
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form class="search-form--wrap" label-width="100px">
            <!-- button按钮区 -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width="0px">
                        <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="action1"
                        :on-success="handleAvatarSuccess" 
                        :data="upLoadData" 
                        accept=".xls, .xlsx"
                        :show-file-list="false"
                        :auto-upload="true"
                        style="display:inline-block;margin:0 10px;">
                        <el-button plain type="primary">批量导入</el-button>
                     </el-upload>
                    <el-button plain type="primary" @click="downloadTemplate">下载模板</el-button>
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
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
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
                prop="coursePrice"
                header-align="center"
                align="right"
                label="课程费用（元）">
                <template slot-scope="scope">{{money(scope.row.coursePrice)}}</template>
            </el-table-column>
            <el-table-column
                prop="totalhours"
                header-align="center"
                align="center"
                label="总课时">
            </el-table-column>
            <el-table-column
                prop="startTime"
                header-align="center"
                align="center"
                label="开始日期">
            </el-table-column>
            <el-table-column
                prop="endTime"
                header-align="center"
                align="center"
                label="结束日期">
            </el-table-column>
            <el-table-column
                prop="studentPhone"
                header-align="center"
                align="center"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="remark"
                header-align="center"
                align="center"
                label="备注">
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
import { getPageListByParam} from "@/api/eam/stucourseapply";
import { moneyFormatter} from "@/utils/publicMethod"
export default {
  data() {
    return {
      action1:`${eamUrl}/eam/stucourseapply/importData`,
      upLoadData:{
        _method:"post"
      },
      extIdNameArr:[],
      courseTypeArr:[],
      operatorArr:[],
      tableData: [],
      loading:true,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated (){
     this.queryAbout()
   },
  computed: {},
  methods: {
    money(val){
      return moneyFormatter(val)
    },
    // 查询
    queryAbout() {
      this.loading=true
       getPageListByParam({"pageSize":this.pageSize,"pageNum":this.pageIndex}).then(res => {
           console.log(res)
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
     // 批量导入
    handleAvatarSuccess(res) {
      if(res && res.rsCode == "AAAAAAA"){
          this.$notify({
          title: "成功",
          message: res.rsMsg,
          type: "success"
        });
        this.queryAbout();
      }else{
        this.$notify.error({
              message:  res.rsMsg
            });
      }		  
    },
    //下载模板
    downloadTemplate() {
      window.location.href=`${eamUrl}/eam/stucourseapply/exportTemplate`
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