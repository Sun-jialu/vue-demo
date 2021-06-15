<template>
  <div class="eamschoolconfigAdd">
    <titleBar title="修改"></titleBar>
    <el-table
            :data="tableData"
            border
            v-loading="loading"
            >
            <el-table-column
                prop="configName"
                header-align="center"
                align="center"
                label="参数名称">
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="参数值">
                <template slot-scope="scope">
                  <div v-if="!scope.row.editing">
                    <span>{{ scope.row.schoolConfigVal }}</span>
                  </div>
                  <div v-else>
                    <el-input v-model="scope.row.schoolConfigVal" ref="gain"></el-input>
                  </div>
		          </template>
            </el-table-column>
            <!-- <el-table-column
                prop="schoolConfigValId"
                header-align="center"
                align="center"
                label="参数描述">
            </el-table-column> -->
            <el-table-column
            label="操作" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="text" v-if="!scope.row.editing" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				          <el-button type="text" v-else-if="scope.row.editing" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                  <!-- <el-button type="text" @click="deleteColumn(scope.row.schoolConfigValId)">删除</el-button> -->
                </template>
            </el-table-column>
            </el-table>
  <div class="btnBox">
    <el-button type="primary" @click="add()">新增</el-button>
    <el-button @click="back()">返回</el-button>
  </div>
  <div class="addBox" v-show="addBoxShow">
     <el-form
     :model="addForm"
     :rules="rules"
      ref="addForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        
        <el-col :span="8">
          <el-form-item label="参数名称：" prop="configName">
            <el-input v-model="addForm.configName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数值：" prop="schoolConfigVal">
            <el-input v-model="addForm.schoolConfigVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item style="text-align:right;">
                <el-button plain type="primary" @click="addSubmit">提交</el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  </div>
</template>

<script>
import { getConfigValList,updateConfigVal,addConfigVal} from "@/api/eam/schoolconfig";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        tableData:[],
        loading:true,
        schoolConfigId:'',
        schoolId:'',
        addForm:{
          configName:'',
          schoolConfigVal:''
        },
        addBoxShow:false,
        rules: {
          schoolConfigVal: [
            { required: true, message: "参数值不能为空", trigger: "blur" }
          ]
        }
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
      // 获取详情
    addOrUpdate(id,schoolId) { 
     this.addBoxShow=false
       this.$nextTick(() => {
          this.schoolConfigId=id
          this.schoolId=schoolId
          this.updata()
        })
        // this.updata()
       
    },
    updata(){
       this.loading=true
       getConfigValList({"schoolConfigId":this.schoolConfigId,"schoolId":this.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
              this.tableData=res.data
              this.loading=false
              this.addForm.configName=res.data[0].configName
            }
        })
    },
      back(){
        this.$parent.addOrUpdateIsShow=true
      },
       handleEdit(index, row){
          this.$set(this.tableData[index], 'editing', true);
         //  点击编辑后input聚焦到文末
      	 this.$nextTick( () =>{
	        this.$refs.gain.focus()
          })
          this.$set(this.tableData[index], 'editing', true);
      // 点击编辑后input聚焦到文末
          this.$nextTick( () =>{
            this.$refs.gain.focus()
          })
       },
       handleSave(index,row) {
         this.$confirm("确定保存此修改吗？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          updateConfigVal({"schoolConfigValId":this.tableData[index].schoolConfigValId,"schoolConfigVal":this.tableData[index].schoolConfigVal,"schoolId":this.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
              this.$set(this.tableData[index], 'editing', false)
              this.$parent.queryAbout()
                
            }
          })
          
        })
      },
      add(){
        this.addForm.schoolConfigVal='';
        this.addBoxShow=true
      },
      addSubmit(){
         addConfigVal({"schoolConfigId":this.schoolConfigId,"schoolConfigVal":this.addForm.schoolConfigVal,"schoolId":this.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
              this.updata()
             this.$parent.queryAbout()
             this.addBoxShow=false
            }
        })
      }
      //删除
    // deleteColumn(id){
    //     this.$confirm('确定删除该条数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //        deleteConfigVal({"schoolConfigValId":id,"schoolId":this.schoolId}).then(res => {
    //           if (res.rsCode=== 'AAAAAAA') {
    //               this.$parent.queryAbout()
    //               this.updata()
    //           }
    //         })
          
    //     })
    // }
      
    }
}
</script>
<style lang="scss" scoped>
.eamschoolconfigAdd .btnBox{
  margin: 10px auto 20px;
  float: right;
}
.eamschoolconfigAdd .addBox{
  float: left;
  width: 100%;
}
</style>