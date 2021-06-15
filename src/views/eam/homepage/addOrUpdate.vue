<template>
  <div class="homepageAdd">
    <titleBar :title="!id ? '新增' : '修改'"></titleBar>
    <el-form :model="addOrUpdateForm" :rules="rules" ref="addOrUpdateForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
            <el-form-item label="学校名称：" prop="schoolId">
              <el-select v-model="addOrUpdateForm.schoolId" clearable placeholder="请选择学校名称" :disabled="true">
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
            <el-form-item label="栏目名称：" prop="columnName">
              <el-input v-model="addOrUpdateForm.columnName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栏目序号：" prop="columnNumber">
              <el-input type="number" v-model="addOrUpdateForm.columnNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="8">
            <el-form-item label="功能名称：" prop="functionName">
              <el-input v-model="addOrUpdateForm.functionName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="功能序号：" prop="functionNumber">
              <el-input type="number" v-model="addOrUpdateForm.functionNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addOrUpdateForm.state" placeholder="请选择状态">
              <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
          
     
  </el-form>
  <div class="btnBox">
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="back()">返回</el-button>
  </div>
  </div>
</template>

<script>
import { getDataById, updateData } from "@/api/eam/homepage";
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
      id:0,
      addOrUpdateForm: {
        schoolId: '',
        columnName: '',
        columnNumber: '',
        functionName: '',
        functionNumber: '',
        state: ''
      },
      extIdNameArr: [],
      stateArr:[],
      rules: {
        columnNumber: [
          { required: true, message: '栏目序号不能为空', trigger: 'blur' }
        ],
        functionNumber: [
          { required: true, message: '功能序号不能为空', trigger: 'blur' }
        ]
      }
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolId) { 
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.addOrUpdateForm.schoolId=schoolId
         this.extIdName()
        })
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolId
           getDataById({"homepageSetId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
            }
          })
        }
       
    },
    update(){
        if(this.id){
          this.addOrUpdateForm.classId=this.id
          updateData(this.addOrUpdateForm).then(res => {
          //  console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
                this.$parent.queryAbout()
                setTimeout(() => {
                   this.$parent.addOrUpdateIsShow=true
                }, 500);
               
            }
        })
        }else{
        //   addData(this.addOrUpdateForm).then(res => {
        //    console.log("res",res)
        //     if (res.rsCode=== 'AAAAAAA') {
        //         this.$notify({
        //           title: '成功',
        //           message: '提交成功',
        //           type: 'success'
        //         });
        //         this.$parent.queryAbout()
        //         setTimeout(() => {
        //            this.$parent.addOrUpdateIsShow=true
        //         }, 500);
               
        //     }
        //   })
         }
        
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
       //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
    },
    submitForm() {
        this.$refs['addOrUpdateForm'].validate((valid) => {
          if (valid) {
            this.update()
          } else {
            return false;
          }
        });
      },
    back(){
      this.$parent.addOrUpdateIsShow=true
    }
    
  }
}
</script>
<style lang="scss" scoped>
.homepageAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>
