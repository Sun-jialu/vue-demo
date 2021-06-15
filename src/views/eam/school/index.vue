<template>
  <div class="school">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <el-form
      :model="orgextForm"
      :rules="rules"
      ref="orgextForm"
      label-width="120px"
      class="demo-ruleForm"
      v-loading="loading"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校代码:" prop="schoolCode">
            <el-input v-model="orgextForm.schoolCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学校名称:" prop="schoolName">
            <el-input v-model="orgextForm.schoolName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址:" prop="schoolAddress">
            <el-input v-model="orgextForm.schoolAddress" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="邮政编码:" prop="postalCode">
            <el-input v-model="orgextForm.postalCode" maxlength="6"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="orgextForm.email" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" prop="schoolPhone">
            <el-input v-model="orgextForm.schoolPhone"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="网址:" prop="website">
            <el-input v-model="orgextForm.website"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人:" prop="contact">
            <el-input v-model="orgextForm.contact" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建校年月:" prop="schoolCreateTime">
            <el-date-picker v-model="orgextForm.schoolCreateTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            
          </el-form-item>
        </el-col>
        
        </el-row>
        <el-row>
          <el-col :span="8">
          <el-form-item label="行政区划:" prop="provinceId">
            <el-select v-model="orgextForm.provinceId" placeholder="请选择行政区划" @change="changeCity" :disabled="true">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in provinceArr"
                :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label prop="cityId">
            <el-select v-model="orgextForm.cityId" placeholder="市辖区" @change="changeArea" :disabled="true">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in cityArr"
                :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label prop="areaId">
            <el-select v-model="orgextForm.areaId" placeholder="区/县" :disabled="true">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in areaArr"
                :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="组织机构代码:" prop="orgCode">
            <el-input v-model="orgextForm.orgCode" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经度:" prop="positionX">
            <el-input v-model="orgextForm.positionX" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纬度:" prop="positionY">
            <el-input v-model="orgextForm.positionY" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="备注:" prop="remark"> 
            <el-input type="textarea" v-model="orgextForm.remark" maxlength="200" rows="1" show-word-limit></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="orgextForm.state" placeholder="请选择状态" :disabled="true">
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
        <el-col :span="8">
          <el-form-item label="学校简介:" prop="schoolIntr">
            <el-input type="textarea" v-model="orgextForm.schoolIntr" rows="12" maxlength="2000" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
              <mapMessage v-if="mapShow" ref="mapMessage" :quesData="orgextForm" style="width:90%;height:100px;margin:-50px 5% 10px 5%;"></mapMessage>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnBox">
      <el-button type="primary" @click="submitForm()">修改</el-button>
      <el-button @click="cancel()">返回</el-button>
    </div>
  </div>
</template>

<script>
import mapMessage from "./mapMessage";
import rules from "@/utils/verify";
import { assignment } from "@/utils/publicMethod";
import { getDataById, updateData } from "@/api/eam/school";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  name: "school",
   components: {
        mapMessage
    },
  mounted() {},
  data() {
    return {
      orgextForm: {
        schoolId: "1",
        schoolName: "",
        schoolCode: "",
        schoolAddress: "",
        schoolIntr: "",
        postalCode: "",
        email: "",
        schoolPhone: "",
        website: "",
        contact: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        schoolCreateTime: "",
        orgCode: "",
        positionX: "",
        positionY: "",
        remark: "",
        state: ""
      },
      mapShow:false,
      loading:false,
      stateArr:[],
      provinceArr: [],//省
      cityArr:[],//市
      areaArr:[],//区/县
      rules: {
        schoolName: [
          { required: true, message: "请填写正确的学校名称", trigger: "blur" }
        ],
        schoolAddress: [
          { required: true, message: "请填写正确的学校地址", trigger: "blur" }
        ],
        postalCode: [
          { required: false, validator: rules.FormValidate.Form().validatorPostcode, trigger: "blur" }
        ],
        email: [
          { required: false,  validator: rules.FormValidate.Form().validatorEmail, trigger: "blur" }
        ],
        schoolPhone: [
          {
            required: false,
            validator: rules.FormValidate.Form().validatorTel,
            trigger: "blur"
          }
        ],
        website: [
          { required: false, validator: rules.FormValidate.Form().validatorWebsite, trigger: "blur" }
        ],
        positionX: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        positionY: [
          { required: true, message: "纬度不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    
  },
  activated() {
    this.reset();
    this.getData();
    
  },
  methods: {
    submitForm() {
      this.$refs["orgextForm"].validate(valid => {
        if (valid) {
          //修改
          this.update();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs["orgextForm"].resetFields();
    },
    //返回
    cancel() {
      console.log("返回");
    },
  
    //根据id获取数据
    async getData() {
      let schoolid = {
        schoolId:1
      }
      let res = await getDataById(schoolid);
      let data = res.data;
      assignment(this.orgextForm, data);
      this.extIdName();
      this.mapShow=true
      
    },
     //获取下拉框
    extIdName() {
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
        })
        //获取省份
        getDropDownList({"code":"eam_province"}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.provinceArr = data;
          }
        });
        getDropDownList({"code":"eam_city","id1":this.orgextForm.provinceId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.cityArr = data;
          }
        });
        getDropDownList({"code":"eam_county","id1":this.orgextForm.cityId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.areaArr = data;
          }
        });
      this.loading=false
    },
    //获取市级下拉
    changeCity(){
      console.log(this.orgextForm.provinceId)
      this.orgextForm.cityId=""
      this.orgextForm.areaId=""
      getDropDownList({"code":"eam_city","id1":this.orgextForm.provinceId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.cityArr = data;
          }
        });
    },
    //获取区县
    changeArea(){
      getDropDownList({"code":"eam_county","id1":this.orgextForm.cityId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.areaArr = data;
          }
        });
    },
    //修改
    async update() {
      let res = await updateData(this.orgextForm);
      // let data = res.data;
       if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.school .el-form-item--medium .el-form-item__content {
  margin-left: 120px !important;
}
.school .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>
