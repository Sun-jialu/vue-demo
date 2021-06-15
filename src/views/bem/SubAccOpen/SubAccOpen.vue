<template>
  <div>
    <!-- 头部标题 -->
    <titleBar></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-width="120px"
    >
      <!-- 机构,账户,后四位 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构:">
            <el-select v-model="addForm.orgId" placeholder="请选择">
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in orgIdNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 账户和后四位 -->
        <accountMod @getValue="setData"></accountMod>
      </el-row>
      <!-- 子账号，子账户名称,是否保证金账户 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="子账号:" prop="subAcc">
            <el-input v-model="addForm.subAcc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子账户名称:" prop="subAccName">
            <el-input maxlength="20" show-word-limit v-model="addForm.subAccName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-checkbox v-model="addForm.checked"></el-checkbox>是否保证金账户
          </el-form-item>
        </el-col>
      </el-row>
      <!--备注 状态 -->
      <el-row>
        <el-col :span="16">
          <el-form-item label="备注:" prop="remark">
            <el-input
              maxlength="200"
              show-word-limit
              placeholder="请输入字符在200字以内"
              type="textarea"
              rows="1"
              v-model="addForm.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交,取消 -->
      <el-row>
        <div style="text-align:right;">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">返回</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { assignment } from "@/utils/publicMethod";
import { getDataById, addData, updateData } from "@/api/sam/classroom";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import { getAreaList } from "@/api/sam/orgext";
import accountMod from "@/components/bemMod/account.vue";
export default {
  components: {
    accountMod
  },
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        orgId: "", //机构
        remark: "", //备注信息
        subAcc: "", //子账号
        subAccName: "", //子账户名称
        accountId: "", //账户名称
        account: "", //账号
        checked: false,
        id: ""
      },
      newAccountArr: [], //v-modle绑定的账户下拉框
      orgIdNameArr: [], //机构
      rules: {
        //子账号
        subAcc: [
          { required: true, message: "子账号不能为空", trigger: "blur" }
        ],
        //子账户名称
        subAccName: [
          { required: true, message: "子账户名称不能为空", trigger: "blur" },
          { min: 0, max: 20, message: "长度在20 个字符以内", trigger: "blur" }
        ],
        //备注
        remark: [
          { trigger: "blur" },
          { min: 0, max: 200, message: "长度在200 个字符以内", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.newAccountArr = this.accountArr;
    this.TypeName();
  },
  mounted() {},
  methods: {
    //账号后四位回调过来设置
    setData(item) {
      this.addForm.accountId = item.accountName;
      this.addForm.account = item.account;
    },
    //提交正则校验
    async submit(formName) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.sub();
        } else {
          return false;
        }
      });
    },
    //获取机构
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    },
    //修改
    async sub() {
      let res = await updateData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "提交成功",
          type: "success"
        });
        assignment(this.addForm, {});
      }
    },
    //返回
    cancel() {
      console.log("返回 :>> ");
      // this.$emit("clickBack", true);
    }
  }
};
</script>