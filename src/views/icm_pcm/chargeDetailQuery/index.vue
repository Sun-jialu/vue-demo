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
             <el-form-item label="姓名：">
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
             <el-form-item label="客户号：">
              <el-input v-model="dataForm.customerNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span='8'>
            <el-form-item label='部门：'>
               <el-select v-model="dataForm.departmentId" placeholder="--全部--">
                <el-option
                  v-for="item in departmentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span='8'>
            <el-form-item label='费用类型：'>
               <el-select v-model="dataForm.feeType" placeholder="--全部--">
                <el-option
                  v-for="item in feeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
             <el-form-item label="缴费渠道：">
                 <el-select v-model="dataForm.payChannel" placeholder="--全部--">
                <el-option
                  v-for="item in payChannelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
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
           <el-col  :span="8">
             <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-col>
            <el-col :span="24">
             <el-form-item label-width='0' style="text-align:right">
                <el-button  plain type="primary" >打印预览</el-button>
                <el-button  plain type="primary" >导出excel</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
     prop=''
      header-align="center"
      align="center"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
       prop=''
      label="客户号（证件号）"
        header-align="center"
      align="center"
      >
    </el-table-column>
    <el-table-column
       prop=''
      header-align="center"
      align="center"
      label="部门（班级）">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="缴费编号">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="费用类型">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="费用名称">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="费用金额（元）">
    </el-table-column>
     <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="收费时间">
    </el-table-column>
     <el-table-column
      prop=''
      header-align="center"
      align="center"
      label="收费渠道">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="机构">
    </el-table-column>
    <el-table-column
        prop=''
      header-align="center"
      align="center"
      label="操作">
         <template slot-scope="scope">
             <el-button type="text" @click="checkItem(scope.row)">查看</el-button>
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
     <addOrUpdate @cancel='cancelHand()' @success='success()' v-else ref = 'addOrUpdate' />
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
         name:'',
         customerNo:'',
         departmentId:'',
         feeType:'',
         payChannel:'',//缴费渠道
         startTime:'',
         endTime:'',
      
     },
     departmentList:[],//部门列表
     feeList:[],//费用列表
     payChannelList:[],//缴费渠道列表
     tableData:[{id:1},{id:2}],//数据
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
      //单个审核
      checkItem(item){
        this.visible = false
        this.$nextTick(()=>{
            this.$refs.addOrUpdate.init(item)
        })
      },
      cancelHand(){
        this.visible = true
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


