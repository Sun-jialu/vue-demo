<template>
  <div class="eamteacherMessage">
    <!-- 头部标题 -->
    <titleBar :title="id?'修改教师信息':'新增教师信息'"></titleBar>
    <!-- 顶部form表单 -->
    <el-form :model="dataForm" class="demo-form-inline" :rules="rules" ref="dataForm">
      <!-- 学校名称，姓名，工号 -->
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
          <el-form-item label="姓名:" label-width="120px" prop="teacherName">
            <el-input v-model="dataForm.teacherName" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号:" label-width="120px" prop="teacherCode">
            <el-input v-model="dataForm.teacherCode" maxlength="50"></el-input>
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
            <el-input v-model="dataForm.certificateCode" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 部门 ,职务，教师证编号，-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门:" label-width="120px" prop="departmentId">
            <el-select v-model="dataForm.departmentId" clearable placeholder="部门">
              <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in deptIdArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务:" label-width="120px" prop="positionId">
            <el-select v-model="dataForm.positionId" clearable placeholder="职务">
              <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in departArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教师证编号:" label-width="120px" prop="teacherAuthCode">
            <el-input v-model="dataForm.teacherAuthCode" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 联系电话 现住址 教龄-->
      <el-row>
        
        <el-col :span="8">
          <el-form-item label="联系电话:" label-width="120px" prop="teacherPhone">
            <el-input v-model="dataForm.teacherPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系地址:" label-width="120px" prop="address">
            <el-input v-model="dataForm.address" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教龄:" label-width="120px" prop="teacherYears">
            <el-input v-model="dataForm.teacherYears"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="教师简介：" prop="teacherIntr" label-width="120px">
            <el-input type="textarea" v-model="dataForm.teacherIntr" maxlength="2000" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--，入校日期，离校日期 ，备注-->
      <el-row>
        
        <el-col :span="8">
          <el-form-item label="入校日期:" label-width="120px" prop="joinTime">
            <el-date-picker v-model="dataForm.joinTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离校日期:" label-width="120px" prop="leaveTime">
            <el-date-picker v-model="dataForm.leaveTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注 :" label-width="120px" prop="remark">
            <el-input type="textarea" rows="1" maxlength="200" v-model="dataForm.remark" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--，状态 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态:" label-width="120px" prop="teacherState">
            <el-select v-model="dataForm.teacherState" placeholder="状态">
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
          <el-form-item label="教师图片：" prop="teacherImage" label-width="120px">
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
import { getDataById, addData, updateData } from "@/api/eam/teacher";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  props: [],
  components: {},
  data() {
    return {
      id:'',
      dataForm: {
        schoolId: 1, //学校名称
        certificateType: "", //证件类型
        certificateCode: "", //证件号码
        teacherName: "", //姓名
        teacherCode: "", //工号
        teacherState: 0, //状态
        sex: 0, //性别
        teacherPhone: "", //联系电话
        address: "", //现住址
        remark: "", //备注
        departmentId: "", //部门
        positionId: "", //职务
        joinTime: "", //入校日期
        leaveTime: "", //离校日期
        teacherYears: "", //教龄
        teacherIntr: "",//教师简介
        teacherAuthCode: "", //教师证编号
        teacherImage: ""
      },
      imageUrl:'',
      cardTypeArr: [], //证件类型
      sexArr: [], //性别
      stateArr: [],
      deptIdArr: [],//部门
      departArr: [],//职务
      extIdNameArr: [],//学校下拉
      rules: {
        //姓名
        teacherName: [
          {
            required: true,
            validator: rules.FormValidate.Form().validatorName,
            trigger: "blur"
          }
        ],
        //工号
        teacherCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorStudentNumber,
            message: "工号不能为空",
            trigger: "blur"
          }
        ],
        //证件号码
        certificateCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorIdNumber,
            message: "证件号码不能为空",
            trigger: "blur"
          }
        ],
        //电话
        teacherPhone: [
          {
            required: true,
            validator: rules.FormValidate.Form().validatorTel,
            trigger: "blur"
          }
        ],
        //教师证编号
        teacherAuthCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorIdNumber,
            message: "教师证编号不能为空",
            trigger: "blur"
          }
        ],
        //教龄
        teacherYears: [
          {
            required: true,
            validator: rules.FormValidate.Form().validatorTeachYears,
            trigger: "blur"
          },
        ],
        //职务
        positionId: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorTeachYears,
            message: "职务不能为空",
            trigger: "change"
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
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
           this.dataForm.schoolId=data[0].value
           //部门下拉框
        getDropDownList({"code":"eam_department_code","id1":this.dataForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.deptIdArr = data;
          }
        });
         //部门下拉框
        getDropDownList({"code":"eam_teacher_position","id1":this.dataForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.departArr = data;
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
      //性别下拉
      getConstantDownList({"code":"sex"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.sexArr = data;
        }
      });
       
      //状态下拉
      getConstantDownList({"code":"studentState"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
    },
    //添加
    async add() {
      let res = await addData(this.dataForm);
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
      this.dataForm.teacherId=this.id
      let res = await updateData(this.dataForm);
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
    //根据id获取数据
    async init(id,schoolId) {
      this.id = id || "";
      this.$nextTick(() => {
          this.$refs["dataForm"].resetFields();
          this.extIdName()
        })
      // this.$refs["addForm"].resetFields();
      //id存在为编辑
      if (this.id) {
        this.dataForm.schoolId=schoolId
        let res = await getDataById({ "teacherId": this.id,"schoolId":this.dataForm.schoolId});
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.dataForm, data);
        }
      } else {
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
  },
  activated() {},
  mounted() {}
};
</script>
<style>
.eamteacherMessage .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .eamteacherMessage .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .eamteacherMessage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
 .eamteacherMessage .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>