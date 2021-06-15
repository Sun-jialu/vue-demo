<template>
  <div class="eamCoursechapter">
      <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
        <titleBar></titleBar>  
        <!-- 顶部form表单 -->
        <el-form :model="formData" class="search-form--wrap" label-width="100px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="机构：" prop="schoolId">
                    <el-select v-model="formData.schoolId" placeholder="请选择机构">
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
                <el-form-item label="开始日期：" prop="startTime">
                    <el-date-picker v-model="formData.startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="结束日期：" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
       
        <el-row>
             <el-col :span="8">
                <el-form-item label="资讯标题：" prop="noticeTitle">
                    <el-input v-model="formData.noticeTitle"></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item label="状态：" prop="publishState">
                    <el-select v-model="formData.publishState" clearable placeholder="请选择状态">
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
                    <el-button plain type="primary" @click="updatestate()">发布</el-button>
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
            :reserve-selection="true"
            align="center"
            width="55">
            </el-table-column>
            <el-table-column
                prop="schoolName"
                header-align="center"
                align="center"
                label="机构">
            </el-table-column>
            <el-table-column
                prop="noticeTitle"
                header-align="center"
                align="center"
                label="资讯标题">
            </el-table-column>
            <el-table-column
                prop="operatorValue"
                header-align="center"
                align="center"
                label="发布人">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                header-align="center"
                align="center"
                label="最后更新时间">
            </el-table-column>
            <el-table-column
                prop="publishStateValue"
                header-align="center"
                align="center"
                label="状态">
            </el-table-column>
            <el-table-column
            label="操作" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNew(scope.row.noticeId,scope.row.schoolId)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteColumn(scope.row.noticeId,scope.row.schoolId)">删除</el-button>
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
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getPageListByParam,deleteData,publishData } from "@/api/eam/schoolnotice";
export default {
    components: {
        addOrUpdate
    },
  data() {
    return {
      addOrUpdateIsShow:true,
      formData: {
        schoolId: "",//学校名称
        noticeTitle: "",
        startTime: "",
        endTime: "",
        publishState: ""
      },
       extIdNameArr:[],
        stateArr:[],
      tableData: [],
      multipleSelection:[],
      loading:false,
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
    //删除
    deleteColumn(id,schoolId){
       this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
       deleteData({"noticeId":id,"schoolId":schoolId}).then(res => {
          if (res.rsCode=== 'AAAAAAA') {
              this.queryAbout()
               this.$refs.multipleTable.clearSelection()
          }
        })
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
      //咨询发布状态下拉
        getConstantDownList({"code":"publishState"}).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.stateArr = data;
            this.stateArr.push({'name':'全部','value':''})
            }
        });
      
    },
    //发布
    updatestate(){
         console.log("1",this.multipleSelection[0].schoolId)
         var noticeIdsArr=[]
         for(let i in this.multipleSelection){
             noticeIdsArr.push(this.multipleSelection[i].noticeId)
         }
         console.log(noticeIdsArr)
         if(noticeIdsArr.length==0){
             return false
         }else{
            this.$confirm('确定发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params={
                    "schoolId":this.multipleSelection[0].schoolId,
                    "noticeIds":noticeIdsArr
                }
                publishData(params).then(res => {
                    if (res.rsCode=== 'AAAAAAA') {
                        this.queryAbout()
                        this.$refs.multipleTable.clearSelection()
                    }
                });
            
            })
         }
    },
    getRowKey(row){
        return row.noticeId
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
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