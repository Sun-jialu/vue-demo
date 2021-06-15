<template>
  <div>
    <div v-if='visible'>
       <titleBar></titleBar>
       <el-form :model="dataForm" class="search-form--wrap" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构：">
              <el-input v-model="dataForm.orgId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="收款账号：">
              <el-input v-model="dataForm.account"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
             <el-form-item label="收款账户名称：">
              <el-input v-model="dataForm.accountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="8">
             <el-form-item label="批次号：">
                <el-input v-model="dataForm.batchNo"></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="8">
             <el-form-item label="开始日期：">
              <el-date-picker
                v-model="dataForm.startTime"
                type="date"
                :picker-options="startTime"
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="结束日期：">
              <el-date-picker
                v-model="dataForm.endTime"
                type="date"
                :picker-options="endTime"
                value-format="yyyy-MM-dd"
                placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
           <el-col :span="24">
             <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="24">
             <el-form-item label-width='0'>
                <el-button :disabled="multipleSelection.length==0" plain type="primary" @click="checkAll">全部审核</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

   <el-table
    :data="tableData"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">
   <el-table-column
      type="selection"
      width="55">
    </el-table-column>
       <el-table-column
     prop=''
      header-align="center"
      align="center"
      label="批次号"
      >
    </el-table-column>
    <el-table-column
     prop=''
      header-align="center"
      align="center"
      label="付款账号"
      >
    </el-table-column>
    <el-table-column
       prop=''
      label="付款账户名称"
        header-align="center"
      align="center"
      >
    </el-table-column>
    <el-table-column
       prop=''
      header-align="center"
      align="center"
      label="收款账号">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="收款账户名称">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="收款账户类型">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="转账金额（元）">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="用途">
    </el-table-column>
   <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="提交时间">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="操作员">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="操作">
         <template slot-scope="scope">
             <el-button type="text" @click="checkItem(scope.row)">审核</el-button>
         </template>
    </el-table-column>
  </el-table>
   <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10,20,50,100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
  </div>
     <addOrUpdate @cancel='visible = true' @success='success()' v-else ref = 'addOrUpdate' />
 </div>
</template>

<script>
import addOrUpdate from './addOrUpdate'
export default {
  data() {
    return {
     visible:true,
     dataForm:{
         orgId:'',
         account:'',
         accountName:'',
         batchNo:'',//批次号
         startTime:'',
         endTime:'',
      
     },
     tableData:[{id:1},{id:2}],//数据
     multipleSelection:[], //选中的列
     startTime: {
        disabledDate: time => {
          if (!this.dataForm.endTime) {
            return false;
          }
          return time.getTime() > new Date(this.dataForm.endTime).getTime() ;
        }
      },
      endTime: {
        disabledDate: time => {
          return time.getTime() < new Date(this.dataForm.startTime).getTime() ;
        }
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    };
  },
  components: {
      addOrUpdate
  },
  
  mounted() {},

  activated() {
      this.visible = true
      this.getList()
  },
  methods: {
    
      getList(){
          
      },
      success(){
          this.visible = true
          this.getList()
      },
      //选中
      handleSelectionChange(val){
          console.log(val)
        this.multipleSelection = val;
      },
      //单个审核
      checkItem(item){
        this.visible = false
        this.$nextTick(()=>{
            this.$refs.addOrUpdate.init([item])
        })
      },
      //全部审核
      checkAll(){
        this.visible = false
        this.$nextTick(()=>{
            this.$refs.addOrUpdate.init(this.multipleSelection)
        })
      },
        // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getList();
    }
  },
  
};
</script>

<style scoped lang="scss">

</style>


