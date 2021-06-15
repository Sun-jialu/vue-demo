<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!addForm.id ? '新增基础代码' : '修改基础代码'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 代码类别名称, 代码类别简称,代码-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="代码类别名称:" prop="codeTypeName">
            <el-input v-model="addForm.codeTypeName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代码类别简称:" label-width="120px" prop="codeTypeShortName">
            <el-input v-model="addForm.codeTypeShortName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代码:" prop="code">
            <el-input v-model="addForm.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 名称,序号,备注 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称:" prop="codeName">
            <el-input v-model="addForm.codeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="序号:" prop="serialNumber">
            <el-input v-model="addForm.serialNumber" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注:" prop="remark">
            <el-input
              maxlength="200"
              show-word-limit
              type="textarea"
              v-model="addForm.remark"
              rows="1"
              placeholder="请输入字符在200字以内"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 状态 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addForm.state" placeholder="请选择状态">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
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
import { getDataById, addData, updateData } from "@/api/sam/campus";
import { getDataListByTypeArray } from "@/api/common/dicLists";

export default {
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        id: "",
        codeTypeName: "", //代码类别名称
        codeTypeShortName: "", //代码类别简称
        code: "", //代码
        codeName: "", //名称
        serialNumber: "", //序号
        remark: "", //备注信息
        state: "0" //状态
      },
      codeTypeNameNameArr: [], //代码类别名称
      rules: {
        //代码类别名称
        codeTypeName: [
          {
            required: true,
            message: "请填写正确的代码类别名称",
            trigger: "blur"
          },
          { min: 0, max: 50, message: "长度在50 个字符以内", trigger: "blur" }
        ],
        //代码类别简称
        codeTypeShortName: [
          {
            required: true,
            message: "请填写正确的代码类别简称",
            trigger: "blur"
          },
          { min: 0, max: 50, message: "长度在50 个字符以内", trigger: "blur" }
        ],
        //序号
        serialNumber: [
          { required: true, message: "请填写正确的序号", trigger: "blur" },
          { min: 0, max: 50, message: "长度在50 个字符以内", trigger: "blur" }
        ],
        //名称
        codeName: [
          {
            required: true,
            validator: rules.FormValidate.Form().validatorcodeName,
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请填写代码", trigger: "blur" }],
        //备注
        remark: [
          { trigger: "change" },
          { min: 0, max: 200, message: "长度在200 个字符以内", trigger: "blur" }
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
    //代码类别名称,代码类别简称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_METHOD_SAM_CAMPUSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.codeTypeNameNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    },
    //添加
    async add() {
      let res = await addData(this.addForm);
      let data = res.data;
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
      let res = await updateData(this.addForm);
      let data = res.data;
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
    async init(id) {
      this.addForm.id = id || "";
      this.$refs["addForm"].resetFields();
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        if (res && res.rsCode == "AAAAAAA") {
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