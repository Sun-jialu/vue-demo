<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!addForm.id ? '新增基础参数值' : '修改基础参数值'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 机构, 参数名称,参数值-->
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
        <el-col :span="8">
          <el-form-item label="参数名称:" label-width="120px" prop="paramName">
            <el-input v-model="addForm.paramName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数值:" prop="parmName">
            <el-input v-model="addForm.parmName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 参数描述 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="参数描述:" prop="description">
            <el-input v-model="addForm.description" maxlength="50" show-word-limit></el-input>
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
import { getDataById, addData, updateData } from "@/api/sam/campus";
import { getDataListByTypeArray } from "@/api/common/dicLists";

export default {
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        id: "",
        orgId: "", //机构
        paramName: "", //参数名称
        parmName: "", //参数值
        description: "" //参数描述
      },
      orgIdNameArr: [], //机构
      rules: {
        //参数值
        parmName: [
          { required: true, message: "请填写正确的参数值", trigger: "blur" },
          { min: 0, max: 50, message: "长度在50 个字符以内", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.TypeName();
  },
  mounted() {},
  methods: {
    //提交正则校验
    async submit(formName) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (this.addForm.id) {
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
    //机构,参数名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_METHOD_SAM_CAMPUSLIST"]
      }).then(res => {
        if (res && res.rsparmName == "AAAAAAA") {
          let data = res.data;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    },
    //添加
    async add() {
      let res = await addData(this.addForm);
      let data = res.data;
      if (res && res.rsparmName == "AAAAAAA") {
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
      let res = await updateData(this.addForm);
      let data = res.data;
      if (res && res.rsparmName == "AAAAAAA") {
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
    async init(id) {
      this.addForm.id = id || "";
      this.$refs["addForm"].resetFields();
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        if (res && res.rsparmName == "AAAAAAA") {
          let data = res.data;
          data.state = data.state + "";
          assignment(this.addForm, data);
          // console.log("this.addForm :>> ", this.addForm);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.state = "0";
      }
    }
  }
};
</script>



