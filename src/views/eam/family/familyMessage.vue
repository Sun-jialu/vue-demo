<template>
  <div class="studentMessage">
    <!-- 头部标题 -->
    <titleBar :title="id?'修改家庭信息':'新增家庭信息'"></titleBar>
    <!-- 顶部form表单 -->
    <el-form :model="dataForm" class="demo-form-inline" :rules="rules" ref="dataForm">
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
          <el-form-item label="学号:" label-width="120px" prop="studentCode">
            <el-input v-model="dataForm.studentCode" :disabled="disabled" @blur="getStudentByCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名:" label-width="120px" prop="studentName">
            <el-input v-model="dataForm.studentName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        
      </el-row>
      <!-- 家庭成员姓名，关系，证件类型 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="家庭成员姓名:" label-width="120px" prop="familyName">
            <el-input v-model="dataForm.familyName" placeholder="家庭成员姓名" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关系:" label-width="120px" prop="relation">
            <el-select v-model="dataForm.relation" clearable placeholder="关系">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in gxArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型:" label-width="120px" prop="certificateType">
            <el-select v-model="dataForm.certificateType" clearable placeholder="证件类型">
             <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in cardTypeArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
     
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件号码:" label-width="120px" prop="certificateCode">
            <el-input v-model="dataForm.certificateCode" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" label-width="120px" prop="familyPhone">
            <el-input v-model="dataForm.familyPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否监护人:" label-width="120px" prop="isGuardian">
            <el-select v-model="dataForm.isGuardian" clearable placeholder="是否监护人">
              <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in guardianArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--现住址，工作单位，职务 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系地址:" label-width="120px" prop="familyAddress">
            <el-input v-model="dataForm.familyAddress" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单位 :" label-width="120px" prop="workUnits">
            <el-input v-model="dataForm.workUnits" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务 :" label-width="120px" prop="workPosition">
            <el-input v-model="dataForm.workPosition" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注:" label-width="120px" prop="remark">
            <el-input type="textarea" rows="1" maxlength="200" v-model="dataForm.remark" show-word-limit></el-input>
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
import { getDataById, addData, updateData, getStudentByCode } from "@/api/eam/family";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  props: [],
  components: {},
  data() {
    return {
      id:"",
      dataForm: {
        schoolId: 1, //学校名称
        certificateType: "", //证件类型
        certificateCode: "", //证件号码
        studentName: "", //姓名
        studentCode: "", //学号
        familyName: "", //家庭成员姓名
        workUnits: "", //工作单位
        relation: "", //关系
        isGuardian: "", //是否监护人
        familyPhone: "", //联系电话
        familyAddress: "", //现住址
        workPosition: "", //职务
        studentId: "",
        remark: "" //备注
      },
      disabled:false,//新增修改是否禁止填写姓名及学号字段
      cardTypeArr: [], //证件类型
      extIdNameArr: [], //学校名称
      guardianArr: [],//是否监护人
      gxArr: [], //家庭关系
      rules: {
        //姓名
        studentName: [
          {
            required: true,
            validator: rules.FormValidate.Form().validatorName,
            trigger: "blur"
          },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
        ],
        //学号
        studentCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorStudentNumber,
            message: "请输入学号",
            trigger: "blur"
          }
        ],
        //证件类型
        certificateType: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorIdNumber,
            message: "请选择证件类型",
            trigger: "change"
          }
        ],
        //证件号码
        certificateCode: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorIdNumber,
            message: "请输入证件号码",
            trigger: "blur"
          }
        ],
        //家庭成员姓名
        familyName: [
          {
            required: true,
             validator: rules.FormValidate.Form().validatorName,
            trigger: "blur"
          }
        ],
        //电话
        familyPhone: [
          {
            required: true,
             validator: rules.FormValidate.Form().validatorTel,
            trigger: "blur"
          }
        ],
        //联系地址
        familyAddress: [
          {
            required: true,
            // validator: rules.FormValidate.Form().validatorTel,
            message: "请输入联系地址",
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
      this.dataForm.stufamilyId=this.id
      let res = await updateData(this.dataForm);
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
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
       //获取证件类型
      getDropDownList({"code":"eam_certificate_type"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.cardTypeArr = data;
        }
      });
       //家庭关系
      getDropDownList({"code":"eam_family_relation","id1":this.dataForm.schoolId}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.gxArr = data;
        }
      });
      //是否监护人下拉
      getConstantDownList({"code":"guardianType"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.guardianArr = data;
        }
      });
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
        let res = await getDataById({ "stufamilyId": this.id,"schoolId":this.dataForm.schoolId});
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.dataForm, data);
        }
      } else {
        //id不存在为新增
        this.disabled=false
        assignment(this.dataForm, {});
      }
    }
  },
  created() {
    // this.TypeName();
  },
  mounted() {}
};
</script>
<style scoped lang="">
</style>