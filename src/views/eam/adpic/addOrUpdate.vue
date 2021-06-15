<template>
  <div class="eamCourseAdd">
    <titleBar :title="!id ? '新增广告轮播图配置' : '修改广告轮播图配置'"></titleBar>
    <el-form :model="addOrUpdateForm" :rules="rules" ref="addOrUpdateForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <!-- <el-col :span="8">
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
          </el-col> -->
        <el-col :span="8">
            <el-form-item label="标题：" prop="adpicName">
              <el-input v-model="addOrUpdateForm.adpicName" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="序号：" prop="adpicNumber">
              <!-- <el-select v-model="addOrUpdateForm.adpicNumber" clearable placeholder="请选择序号" :disabled="true">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select> -->
              <el-input v-model="addOrUpdateForm.adpicNumber" :disabled="true"></el-input>
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
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="addOrUpdateForm.remark" maxlength="200" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="轮播照片：" prop="adpicUrl">
             <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :on-change="handleChange"
              :file-list="fileList1"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">上传</el-button>
              <div style="color:#ff4949;display:inline;margin-left:10px;">*建议尺寸：900*300，照片大小不能超出200KB*</div>
            </el-upload>      
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row> 
        <el-col :span="24">
          <el-form-item label="URL：">
            <el-input v-model="addOrUpdateForm.adpicUrl" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row> 
        <el-col :span="24">
          <el-form-item>
            <img :src="addOrUpdateForm.adpicUrl" alt="" style="width:300px;height:100px;">
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
import { getDropDownList,getConstantDownList} from "@/api/eam/select";
import { getDataById,updateData,addData} from "@/api/eam/adpic";
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        addOrUpdateForm: {
          schoolId: 1,
          adpicNumber: '',
          state: '',
          adpicName: '',
          adpicUrl:'',
          remark: ''
        },
        id:0,
        fileList1: [],
        extIdNameArr:[],
        stateArr:[],
        rules: {
          adpicName: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          adpicUrl: [
            { required: true, message: '请选择轮播照片', trigger: 'change' }
          ]
        }
    }
   },
   activated (){
    //  this.reset()
   },
    methods: {
      // 新增和修改
    addOrUpdate(id,schoolid) { 
      this.id =  id || 0
       this.$nextTick(() => {
         this.$refs['addOrUpdateForm'].resetFields();
         this.extIdName()
        })
        if(this.id){
          this.addOrUpdateForm.schoolId=schoolid
          getDataById({"adpicId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
            }
          })
        }
       
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
      },
      update(){
       if(this.id){
          this.addOrUpdateForm.adpicId=this.id
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
       handleAvatarSuccess(res, file) {
        console.log('file',URL.createObjectURL(file.raw))
        this.addOrUpdateForm.adpicUrl = URL.createObjectURL(file.raw);
      },
      handleChange(file, fileList) {
        this.fileList1 = fileList.slice(-3);
      },
      beforeAvatarUpload(file) {
        // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        // const extension =
        //   testmsg === "jpg" ||
        //   testmsg === "JPG" ||
        //   testmsg === "png" ||
        //   testmsg === "PNG";
        const isLt200k = file.size / 1024 / 1024 < 0.2;

        // if (!extension) {
        //   this.$notify.error({
        //       message: '上传图片只能是 JPG或PNG 格式!'
        //     });
        // }
        if (!isLt200k) {
          this.$notify.error({
              message: '上传图片大小不能超过 200k!'
            });
        }
        // return extension && isLt100k;
        return isLt200k;
      }

    }
}
</script>
<style lang="scss" scoped>
.eamCourseAdd .btnBox{
  margin: 0 auto 20px;
  float: right;
}
</style>
<style>
.eamCourseAdd .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .eamCourseAdd .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .eamCourseAdd .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
 .eamCourseAdd .avatar {
    width: 160px;
    height: 120px;
    display: block;
  }
</style>