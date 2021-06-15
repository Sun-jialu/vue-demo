<template>
  <div class="InsideAccCancel">
    <!-- 顶部form表单 -->
    <el-form :model="dataForm" classid="demo-form-inline" :rules="rules" ref="dataForm">
      <!-- 归属账号，内部账号,内部账户名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="归属账号:" label-width="120px" prop="accountId">
            <el-input :disabled="true" v-model="dataForm.accountId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="内部账号:" label-width="120px" prop="subAcc">
            <el-input :disabled="true" v-model="dataForm.subAcc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="内部账户名称:" label-width="120px" prop="subAccName">
            <el-input :disabled="true" v-model="dataForm.subAccName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 销户原因 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="销户原因:" label-width="120px" prop="reason">
            <el-input type="textarea" rows="2" maxlength="200" v-model="dataForm.reason"></el-input>
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
export default {
  props: [],
  components: {},
  data() {
    return {
      dataForm: {
        accountId: 1, //归属账号
        subAcc: "", //内部账号
        subAccName: "", //内部账户名称
        reason: "" //归属账户名称
      },
      rules: {
        //销毁原因
        reason: [
          { required: true, message: "销毁原因不能为空", trigger: "change" },
          { min: 0, max: 200, message: "长度在200 个字符以内", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    //提交正则校验
    async submitForm(formName) {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.sub();
        } else {
          return false;
        }
      });
    },
    sub() {
      this.$emit("clickBack", true);
    },
    //返回
    back() {
      this.$emit("clickBack", true);
    }
  },
  created() {}
};
</script>
