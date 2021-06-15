<template>
  <div class="homepageAdd">
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
           
            <el-col :span="16">
                <el-form-item style="text-align:right;">
                    <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <!-- button按钮区 -->
        </el-form>
        
        <!-- 表格组件 -->
        <div id="print">
            <el-table
            :data="tableData"
            border
            v-loading="loading"
            >
            <el-table-column
                prop="columnName"
                header-align="center"
                align="center"
                label="栏目名称">
            </el-table-column>
            <el-table-column
                prop="columnNumber"
                header-align="center"
                align="center"
                label="栏目序号">
            </el-table-column>
            <el-table-column
                prop="functionName"
                header-align="center"
                align="center"
                label="功能名称">
            </el-table-column>
            <el-table-column
                prop="functionNumber"
                header-align="center"
                align="center"
                label="功能序号">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                header-align="center"
                align="center"
                label="更新时间">
            </el-table-column>
            <el-table-column
                prop="stateValue"
                header-align="center"
                align="center"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="学校名称">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.homepageSetId,scope.row.schoolId)">修改</el-button>
                    <!-- <el-button type="text" size="small" @click="deleteColumn(scope.row.schoolConfigValId)">删除</el-button> -->
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
import { getDropDownList} from "@/api/eam/select";
import { getPageListByParam} from "@/api/eam/homepage";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: ""//学校名称
      },
      extIdNameArr:[],
      tableData: [],
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
    addNew(id,schoolId) {
        this.addOrUpdateIsShow=false
        this.$nextTick(() => {
            this.$refs.addOrUpdate.addOrUpdate(id,schoolId)
        })
        
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
  },
  
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

</style>