<template>
  <div class="eamClassAdd">
    <titleBar :title="!id ? '新增作业' : '修改作业'"></titleBar>
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
              <el-form-item label="课程名称：" prop="courseId">
                  <el-select v-model="addOrUpdateForm.courseId" clearable placeholder="请选择课程名称" @change="changeCourse">
                   <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所属章节：" prop="chapterId">
                    <el-select v-model="addOrUpdateForm.chapterId" clearable placeholder="请选择所属章节">
                    <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in chapterIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
           
        </el-row>
        <el-row>
          <el-col :span="8">
                <el-form-item label="题目类型：" prop="workTopicType">
                    <el-select v-model="addOrUpdateForm.workTopicType" clearable placeholder="请选择题目类型" @change="changeWorkTopicTpe" :disabled="disabled">
                      <el-option 
                        v-for="item in workTopicTypeArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          <el-col :span="8">
               <el-form-item label="难易程度：" prop="workTopicLevel">
                <el-select v-model="addOrUpdateForm.workTopicLevel" clearable placeholder="请选择难易程度">
                  <el-option 
                        v-for="item in worktopiclevelArr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分值：" prop="score">
                <el-input v-model="addOrUpdateForm.score"></el-input>
            </el-form-item>
          </el-col>
        
      </el-row>
      <el-row>
       <el-col :span="8">
          <el-form-item label="状态：" prop="state">
              <el-select v-model="addOrUpdateForm.state" clearable placeholder="请选择状态">
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="题目名称：" prop="workTopicName">
            <tinymce :maxHeight="400" v-model="addOrUpdateForm.workTopicName"></tinymce>
          </el-form-item>
       </el-col>
      </el-row>
         <component 
        ref='quesRef'
        :is="cmpName" 
        :quesData='addOrUpdateForm'
       ></component>
  </el-form>
    
  <div class="btnBox">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="back()">返回</el-button>
  </div>
  </div>
</template>

<script>
import rules from "@/utils/verify";
import tinymce from '@/components/Tinymce'
import { getDropDownList,getConstantDownList } from "@/api/eam/select"
import { addData, getDataById, updateData} from "@/api/eam/worktopic";
import tureOrfalseQuestion from './tureOrfalseQuestion' //判断题
import singleChoice from './singleChoice'           //单选题
import multipleChoice from './multipleChoice'           //多选题
import completion from './completion'               //填空题
import essayQuestion from './essayQuestion'               //问答题
export default {
   components: {
      tinymce,
      tureOrfalseQuestion,
      multipleChoice,
      completion,
      singleChoice,
      essayQuestion,
    },
  computed: {
    cmpName(){
      var quesType = this.addOrUpdateForm.workTopicType
      var map={
        '1':'singleChoice',        //单选题
        '2':'multipleChoice',     //多选题
        '3':'tureOrfalseQuestion', // 判断题
        '4':'completion', //填空题
        '5':'essayQuestion'       //问答题
      }
       return  map[quesType] || null
    }
  },
  mounted(){
   
  },
   data(){
    return {
      isNewQuestion:false,
      id:0,
      type:"",
      addOrUpdateForm: {
        schoolId: 1,
        courseId: '',
        chapterId:'',
        workTopicType: '', //1
        workTopicLevel: '', //难度级别
        score: '',
        state: 0,
        workTopicName:'',
        workTopicAnswer:'',//题目答案  
        workTopicContent:'', //题目答案内容
        remark:''     //备注
      },
      disabled:true,
      extIdNameArr:[],
      stateArr:[],
      chapterIdArr:[],
      courseIdArr:[],
      workTopicTypeArr:[],
      worktopiclevelArr:[],
      rules: {
        courseId: [
          { required: true, message: '请选择课程名称', trigger: 'change' }
        ],
        workTopicType: [
          { required: true, message: '请选择题目类型', trigger: 'change' }
        ],
        workTopicLevel: [
          { required: true, message: '请选择难易程度', trigger: 'change' }
        ],
          workTopicName: [
          { required: true, message: '题目名称不能为空', trigger: 'change' }
        ],
        workTopicAnswer: [
          { required: true, message: '问题答案不能为空', trigger: 'change' }
        ],
        chapterId: [
          { required: true, message: '所属章节不能为空', trigger: 'change' }
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        score: [
          { required: true, message: '分值不能为空', trigger: 'blur' }
        ]
      }
    }
   },
   activated(){
    //  console.log("lalal")
   },
 
   destoryed(){
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,type,schoolId,chapterId) { 
      this.id =  id || 0
      this.type = type
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.addOrUpdateForm.workTopicType = id ? "" : 1
         this.extIdName()
       })
        
        this.disabled=false
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolId
          this.addOrUpdateForm.chapterId=chapterId
            getDataById({"workTopicId":this.id,"workTopicType":this.type,"schoolId":this.addOrUpdateForm.schoolId,"chapterId":this.addOrUpdateForm.chapterId}).then(res => {
              console.log("res1",res)
              if (res.rsCode=== 'AAAAAAA') {
                this.addOrUpdateForm=res.data
                 //所属章节
                getDropDownList({"code":"eam_course_chapter","id1":this.addOrUpdateForm.schoolId,"id2":this.addOrUpdateForm.courseId}).then(res => {
                  if (res && res.rsCode == "AAAAAAA") {
                    let data = res.data;
                    this.chapterIdArr = data;
                  }
                });
              }
          })
          
          this.disabled=true
        }
       
    },
       submitForm() {
         //获取子组件的 校验方法
         var quesComVali =this.$refs.quesRef && this.$refs.quesRef.checkValidate
         //获取子组件的校验结果 
         var childCheck =  quesComVali ? quesComVali() : true
         console.log(this.addOrUpdateForm.workTopicContent)
        this.$refs['addOrUpdateForm'].validate((valid) => {
          if (valid && childCheck) {
            this.update()
          }
        });
      },
      back(){
        this.$parent.addOrUpdateIsShow=true
      },
      update(){
         if(this.id){
          this.addOrUpdateForm.workTopicId=this.id
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
          addData(this.addOrUpdateForm).then(res => {
           console.log("res",res)
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
        }
       },
       //切换题目类型
       changeWorkTopicTpe(){
         //清空答案
          this.addOrUpdateForm.workTopicContent = ''
       },
        //课程名称切换获取所属章节
      changeCourse(){
          //所属章节
        getDropDownList({"code":"eam_course_chapter","id1":this.addOrUpdateForm.schoolId,"id2":this.addOrUpdateForm.courseId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.chapterIdArr = data;
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
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
       //课程名称
        getDropDownList({"code":"eam_course","id1":this.addOrUpdateForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseIdArr = data;
          }
        });
         //题目类型下拉
      getConstantDownList({"code":"worktopictype"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.workTopicTypeArr = data;
        }
      });
         //难易程度
      getConstantDownList({"code":"worktopiclevel"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.worktopiclevelArr = data;
        }
      });
       
    },
       handleAvatarSuccess(res, file) {
        console.log(res)
      },
      beforeAvatarUpload(file) {
       
      }
    }
    
}
</script>
<style lang="scss" scoped>
.eamClassAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>