<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!id ? '新增社区信息' : '修改社区信息'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <!-- 学校名称, 校区名称,负责人-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:" prop="schoolId">
            <el-select v-model="addForm.schoolId" placeholder="学校名称" :disabled="true">
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
          <el-form-item label="校区名称:" prop="campusName">
            <el-input v-model="addForm.campusName" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人:" prop="campusContact">
            <el-input v-model="addForm.campusContact" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 联系电话,地址,邮编 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话:" prop="campusPhone">
            <el-input v-model="addForm.campusPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址:" prop="campusAddress">
            <el-input v-model="addForm.campusAddress" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮编:" prop="postalCode">
            <el-input v-model="addForm.postalCode" maxlength="6"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注,状态 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" v-model="addForm.remark" rows="2" maxlength="200" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addForm.state" placeholder="请选择状态">
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
      <!-- 提交,取消-->
      <el-row>
        <div style="text-align:right;">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import rules from "@/utils/verify";
import { assignment } from "@/utils/publicMethod";
import { getDataById, addData, updateData } from "@/api/eam/campus";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  data() {
    return {
      dialogFormVisible: false,
      id: "",
      addForm: {
        schoolId: 1,
        campusName: "",
        campusContact: "",
        campusPhone: "",
        postalCode: "",
        campusAddress: "",
        remark: "",
        state: 0
      },
      extIdNameArr:[],
      stateArr:[],
      rules: {
        campusName: [
          { required: true, message: "请填写正确的校区名称", trigger: "blur" }
        ],
        postalCode: [
          { required: true, validator: rules.FormValidate.Form().postalCode, trigger: "blur" }
        ],
        campusAddress: [
          { required: true, message: "请填写正确的地址", trigger: "blur" }
        ],
        campusPhone: [
          { required: true, validator: rules.FormValidate.Form().validatorTel, trigger: "blur" }
        ],
        state:[
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        campusContact: [{ required: true, message: "请填写负责人", trigger: "blur" }]
      }
    };
  },
  activated() {
    
  },
  methods: {
    //提交正则校验
    async submit(formName) {
      this.$refs["addForm"].validate(valid => {
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
    //下拉列表内容获取
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
    //添加
    async add() {
      let res = await addData(this.addForm);
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
      this.addForm.campusId=this.id
      let res = await updateData(this.addForm);
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
    cancel() {
      this.$emit("clickBack", true);
    },
    //根据id获取数据
    async init(id,schoolId) {
      this.id = id || "";
      this.$nextTick(() => {
          this.$refs["addForm"].resetFields();
          this.extIdName()
        })
      // console.log(this.addForm.schoolId)
      //id存在为编辑
      if (this.id) {
        this.addForm.schoolId=schoolId
        let res = await getDataById({ campusId: this.id ,schoolId:this.addForm.schoolId});
        // console.log(res);
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
      }
    }
  }
};
</script>