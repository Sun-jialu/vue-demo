<template>
  <div class="add">
    <!-- 头部标题 -->
    <titleBar title="添加下级子账户"></titleBar>
    <!-- 顶部form表单 -->
    <el-form :model="dataForm" classid="demo-form-inline" :rules="rules" ref="dataForm">
      <!-- 归属账号，归属账户名称，子账号 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="归属账号:" label-width="120px" prop="oppositeAccount">
            <el-input v-model="dataForm.oppositeAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="归属账户名称:" label-width="120px" prop="oppositeAccount">
            <el-input maxlength="20" show-word-limit v-model="dataForm.oppositeAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子账号:" label-width="120px" prop="subAccount">
            <el-input v-model="dataForm.subAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 子账户名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="子账户名称:" label-width="120px" prop="subAccountName">
            <el-input maxlength="20" show-word-limit v-model="dataForm.subAccountName"></el-input>
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
        oppositeAccount: 1, //归属账号
        subAccount: "", //子账号
        subAccountName: "", //子账户名称
        oppositeAccount: "" //归属账户名称
      },
      rules: {
        //子账户名称
        subAccountName: [
          { required: true, message: "子账户名称不能为空", trigger: "blur" }
        ],
        //子账号
        subAccount: [
          { required: true, message: "子账号不能为空", trigger: "blur" }
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
    //提交
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
