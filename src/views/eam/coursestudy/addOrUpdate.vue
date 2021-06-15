<template>
  <div class="eamcourseAdd">
    <titleBar :title="!id ? '新增课时' : '修改课时'"></titleBar>
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
                    v-for="(item,index) in courseChapterIdArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
                <el-form-item label="课时名称：" prop="courseLessonName">
                    <el-input v-model="addOrUpdateForm.courseLessonName" maxlength="50"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课时类型：" prop="courseLessonType">
                    <el-select v-model="addOrUpdateForm.courseLessonType" clearable placeholder="请选择课时类型" @change="courseStudyType">
                      <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseStudyTypeArr"
                    :key="index"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          <el-col :span="8">
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="完成时间：" prop="minutes">
                        <el-input v-model.number="addOrUpdateForm.minutes" style="width:85%;" placeholder="例：0"></el-input>分
                    </el-form-item>
                   </el-col>
                   <el-col :span="8">
                    <el-form-item label="" prop="seconds" label-width="0">
                        <el-input v-model.number="addOrUpdateForm.seconds" style="width:85%;" placeholder="例：0"></el-input>秒
                    </el-form-item>
                   </el-col>
              </el-row>
              
            </el-col>
            
          </el-row>
          <el-row>
          <el-col :span="8">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" rows="1" maxlength="200" v-model="addOrUpdateForm.remark" show-word-limit></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="开放作业：" prop="openHomeworkState">
                <el-select v-model="addOrUpdateForm.openHomeworkState" clearable placeholder="请选择">
                   <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in courseExpiryTimeArr"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
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
          <el-form-item label="课时内容：" prop="courseLessonIntr">
            <tinymce :maxHeight="400" v-model="addOrUpdateForm.courseLessonIntr"></tinymce>
          </el-form-item>
       </el-col>
      </el-row>
      <!-- 上传视频 -->
      <el-row v-if="isShowVideo">
        <el-col :span="24">
          <el-form-item label="课时附件：">
             <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div style="color:#ff4949;display:inline;margin-left:10px;">* 视频格式：mp4、avi、3gp，大小不超过 20M *</div>
            </el-upload>      
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 上传音频 -->
      <el-row v-if="isShowAudio">
        <el-col :span="24">
          <el-form-item label="课时附件：">
             <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :on-change="handleChange"
              :file-list="fileList1"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">选取文件</el-button>
              <div style="color:#ff4949;display:inline;margin-left:10px;">* 音频格式：mp3、m4a，大小不超过 5M *</div>
            </el-upload>      
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShowAudio || isShowVideo"> 
        <el-col :span="24">
          <el-form-item label="URL：">
            <el-input v-model="addOrUpdateForm.courseLessonUrl"></el-input>
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
import rules from "@/utils/verify";
import tinymce from '@/components/Tinymce'
import { getDropDownList,getConstantDownList } from "@/api/eam/select"
import { addData, getDataById, updateData} from "@/api/eam/coursestudy";
export default {
   components: {
      tinymce
    },
  computed: {

  },
  mounted(){
   
  },
   data(){
    return {
        id:0,
        addOrUpdateForm: {
          schoolId: 1,
          courseId: '',
          chapterId: '',
          courseLessonType: 0,
          minutes: '',
          seconds: '',
          openHomeworkState: 0,
          remark: '',
          state: 0,
          courseLessonName:'',
          courseLessonIntr:'',
          courseLessonUrl:''
        },
        fileList1: [],
        extIdNameArr:[],
        stateArr:[],
        courseIdArr:[],
        courseChapterIdArr:[],
        courseStudyTypeArr:[],
        courseExpiryTimeArr:[],
        isShowVideo:false,
        isShowAudio:false,
        rules: {
          courseId: [
            { required: true, message: '请选择课程名称', trigger: 'change' }
          ],
          chapterId: [
            { required: true, message: '请选择所属章节', trigger: 'change' }
          ],
          courseLessonName: [
            { required: true, message: '课时名称不能为空', trigger: 'blur' }
          ],
          courseLessonType: [
            { required: true, message: '请选择课时类型', trigger: 'change' }
          ],
          minutes: [
            { required: true,type: 'number', message: '只能输入纯数字', trigger: 'blur' }
          ],
           seconds: [
            { required: true, type: 'number', message: '只能输入纯数字', trigger: 'blur' }
          ],
           openHomeworkState: [
            { required: true, message: '请选择开放作业类型', trigger: 'change' }
          ],
          courseLessonIntr: [
            { required: true, message: '课时内容不能为空', trigger: 'change' }
          ],
           courseLessonUrl: [
            { required: true, message: '课时附件不能为空', trigger: 'change' }
          ],
          state:[
            { required: true, message: '请选择状态', trigger: 'change' }
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
    addOrUpdate(id,schoolId) { 
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.courseStudyType()
         this.extIdName()
        })
        if(this.id){
          getDataById({"courseLessonId":this.id,"schoolId":schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
                  //所属章节
                getDropDownList({"code":"eam_course_chapter","id1":this.addOrUpdateForm.schoolId,"id2":this.addOrUpdateForm.courseId}).then(res => {
                  if (res && res.rsCode == "AAAAAAA") {
                    let data = res.data;
                    this.courseChapterIdArr = data;
                  }
                });
                this.courseStudyType()
            }
        })
        }
       
    },
    submitForm() {
        console.log("neirong",this.addOrUpdateForm.courseStudyIntr)
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
    },
    update(){
       if(this.id){
          this.addOrUpdateForm.courseLessonId=this.id
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
     //课程名称切换获取所属章节
      changeCourse(){
          //所属章节
        getDropDownList({"code":"eam_course_chapter","id1":this.addOrUpdateForm.schoolId,"id2":this.addOrUpdateForm.courseId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.courseChapterIdArr = data;
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
         //课时类型下拉
      getConstantDownList({"code":"courselessontype"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseStudyTypeArr = data;
        }
      });
        //开放类型下拉
      getConstantDownList({"code":"openhomeworkstate"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.courseExpiryTimeArr = data;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
    },
    beforeAvatarUpload(file) {
      
    },
    handleChange(file, fileList) {
      this.fileList1 = fileList.slice(-3);
    },
    //课时类型下拉切换
    courseStudyType(){
      // console.log(this.addOrUpdateForm.courseStudyType)
      if(this.addOrUpdateForm.courseLessonType==0){
          this.isShowVideo=false
          this.isShowAudio=false
      }else if(this.addOrUpdateForm.courseLessonType==2){
          this.isShowVideo=true
          this.isShowAudio=false
      }else if(this.addOrUpdateForm.courseLessonType==1){
          this.isShowVideo=false
          this.isShowAudio=true
      }
        
    }
  }
    
}
</script>
<style lang="scss" scoped>
.eamcourseAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}

</style>