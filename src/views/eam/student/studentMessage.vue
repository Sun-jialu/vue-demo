<template>
  <div class="studentMessage">
    <!-- 头部标题 -->
    <titleBar :title="id?'修改学员信息':'新增学员信息'"></titleBar>
    <!-- 顶部form表单 -->
    <el-form :model="dataForm" classid="demo-form-inline" :rules="rules" ref="dataForm">
      <!-- 学校名称，姓名，学号 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:" label-width="120px" prop="schoolId">  
            <el-select v-model="dataForm.schoolId" clearable placeholder="学校名称" :disabled="true">
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
          <el-form-item label="学员号:" label-width="120px" prop="studentCode" >
            <el-input v-model="dataForm.studentCode" maxlength="30" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名:" label-width="120px" prop="studentName">
            <el-input v-model="dataForm.studentName" maxlength="30" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
       
      </el-row>
      <!-- 性别，证件类型，证件号码 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="性别:" label-width="120px" prop="sex">
            <el-select v-model="dataForm.sex" placeholder="性别">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in sexArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型:" label-width="120px" prop="certificateType">
            <el-select v-model="dataForm.certificateType" placeholder="证件类型">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in cardTypeArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码:" label-width="120px" prop="certificateCode">
            <el-input v-model="dataForm.certificateCode" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话:" label-width="120px" prop="studentPhone">
            <el-input v-model="dataForm.studentPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系地址:" label-width="120px" prop="studentAddress">
            <el-input v-model="dataForm.studentAddress" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="班级:"  label-width="120px" prop="classIds">
              <el-select v-model="dataForm.classIds" clearable multiple placeholder="班级">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in classIdArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <!--联系电话，现住址，备注 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注 :" label-width="120px" prop="remark">
            <el-input type="textarea" rows="1" maxlength="200" v-model="dataForm.remark" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:" label-width="120px" prop="studentState">
            <el-select v-model="dataForm.studentState" placeholder="状态">
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
          <el-form-item label="学员图片：" prop="studentImage" label-width="120px">
             <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip" style="color:#ff4949;">* 照片格式：jpg、png，推荐尺寸：480*480，大小不超过 100K *</div>
            </el-upload>      
          </el-form-item>
        </el-col>
      </el-row> 
      <!-- 提交和返回 -->
      <el-row>
        <div style="text-align:right;">
          <el-button type="primary" plain @click="submitForm">提交</el-button>
          <el-button type="primary" plain @click="back">返回</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import rules from "@/utils/verify";
import { assignment } from "@/utils/publicMethod";
// 根据id查询数据,保存数据信息,修改数据信息
import { getDataById, addData, updateData} from "@/api/eam/student";
import { getStudentByCode } from "@/api/eam/family";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";

export default {
  props: [],
  components: {},
  data() {
    return {
      id: "",
      dataForm: {
        schoolId: '', //学校名称
        certificateType: "", //证件类型
        certificateCode: "", //证件号码
        studentName: "", //姓名
        studentCode: "", //学号
        studentState:0, //状态
        sex: 0, //性别
        classIds: "", //班级
        studentPhone: "", //联系电话
        studentAddress: "", //现住址
        studentImage: "",
        remark: "" //备注
      },
      imageUrl:'',
      disabled:false,//新增修改是否禁止填写姓名及学号字段
      cardTypeArr: [], //证件类型
      classIdArr: [], //班级
      sexArr: [], //性别
      extIdNameArr:[],//学校
      stateArr: [],
      rules: {
        //姓名
        studentName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        //学号
        studentCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorStudentNumber,
            message: "学号不能为空",
            trigger: "blur"
          }
        ],
        //证件号码
        certificateCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorIdNumber,
            message: "证件号码不能为空",
            trigger: "change"
          }
        ],
        //联系电话
        studentPhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          {
            validator: rules.FormValidate.Form().validatorTel,
            trigger: "blur"
          }
        ],
        //联系地址
        studentAddress: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorNativePlace,
            message: "联系地址不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //提交正则校验
    async submitForm(formName) {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.id) {
            //更改的时候
            this.change();
          } else {
            //新添加的时候
            this.add();
          }
        } else {
          return false;
        }
      });
    },
    //添加
    async add() {
      let res = await addData(this.dataForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "新增成功",
          type: "success"
        });
        this.$emit("clickBack", true);
      }
    },
    //修改
    async change() {
      this.dataForm.studentId=this.id
      let res = await updateData(this.dataForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success"
        });
        this.$emit("clickBack", true);
      }
    },
    //返回
    back() {
      this.$emit("clickBack", true);
    },
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
          this.dataForm.schoolId=data[0].value
          //班级下拉框
        getDropDownList({"code":"eam_classes","id1":this.dataForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classIdArr = data;
          }
        });
        }
      });
       //获取证件类型
      getDropDownList({"code":"eam_certificate_type"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.cardTypeArr = data;
          this.dataForm.certificateType=this.cardTypeArr[0].value
        }
      });
      //状态下拉
      getConstantDownList({"code":"studentState"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
      //性别下拉
      getConstantDownList({"code":"sex"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.sexArr = data;
        }
      });
       
    },
      //通过学员编号查询学生基本信息
   async getStudentByCode(){
      let res = await getStudentByCode({ "studentCode":this.dataForm.studentCode,"schoolId":this.dataForm.schoolId });

      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        console.log("data",data)
         this.dataForm.studentName=data.studentName;
         this.dataForm.studentId=data.studentId
      }else{
        this.dataForm.studentName='';
        this.dataForm.studentId=''
      }
    },
    //根据id获取数据
    async init(id,schoolId) {
      this.id = id || "";
       this.$nextTick(() => {
          this.$refs["dataForm"].resetFields();
          this.extIdName()
        })
      
      //id存在为编辑
      if (this.id) {
        this.disabled=true
        this.dataForm.schoolId=schoolId
        let res = await getDataById({ "studentId": this.id,"schoolId":this.dataForm.schoolId});
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.dataForm, data);
        }
      } else {
        this.disabled=false
        //id不存在为新增
        assignment(this.dataForm, {});
      }
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(imageUrl)
      },
      beforeAvatarUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const extension =
          testmsg === "jpg" ||
          testmsg === "JPG" ||
          testmsg === "png" ||
          testmsg === "PNG";
        const isLt100k = file.size / 1024 / 1024 < 0.1;

        if (!extension) {
          this.$notify.error({
              message: '上传图片只能是 JPG或PNG 格式!'
            });
        }
        if (!isLt100k) {
          this.$notify.error({
              message: '上传图片大小不能超过 100k!'
            });
        }
        return extension && isLt100k;
      }
  },
  created() {
    // this.TypeName();
  },
  mounted() {}
};
</script>
<style>
.studentMessage .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .studentMessage .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .studentMessage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
 .studentMessage .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>