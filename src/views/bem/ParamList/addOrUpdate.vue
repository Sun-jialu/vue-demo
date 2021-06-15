<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!addForm.id ? '新增账户管理参数' : '修改账户管理参数'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <!-- 学校名称, 参数名称,参数值-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:">
            <el-select v-model="addForm.extId" disabled placeholder="请选择">
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in extIdNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数名称:" prop="parameterName">
            <el-input
              v-model="addForm.parameterName"
              maxlength="20"
              show-word-limit
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数值:" prop="parameterValue">
            <el-input v-model="addForm.parameterValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 参数描述 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="参数描述:">
            <el-input maxlength="50" :disabled="true" show-word-limit v-model="addForm.parameterDesc"></el-input>
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
import { assignment } from "@/utils/publicMethod";
import { getDataById, addData, updateData } from "@/api/sam/parameter";
import { getDataListByTypeArray } from "@/api/common/dicLists";

export default {
  data() {
    // 参数值
    var vaparameterValue = (rule, value, callback) => {
      if (value == ""||value==null) {
        callback(new Error("不能为空"));
      } else {
        let aArr = value.split("").filter((item, index) => {
          if (item == "|") {
            return item;
          }
        });
        let newArr = value.split("|").filter((item, index) => {
          if (item != "") {
            return item;
          }
        });
        if (newArr.length != aArr.length + 1) {
          callback("请按格式输入内容");
        } else {
          //输入时间格式
          if (this.addForm.parameterName == "LTIME") {
            newArr.forEach((item, index) => {
              if (item[5] == "-" && item[2] == ":" && item[8] == ":") {
                console.log(value);
                this.addForm.parameterValue = value;
              } else {
                callback("时间请按照'08:00-12:00|13:30-15:30'书写");
              }
            });
          } else {
            this.addForm.parameterValue = value;
          }
          // newArr.forEach((item, index) => {
          //   if (item.includes("-") && item.includes(":")) {
          //     if (item[5] == "-" && item[2] == ":" && item[8] == ":") {
          //       console.log(value);
          //       this.addForm.parameterValue = value;
          //     } else {
          //       callback("时间请按照'08:00-12:00|13:30-15:30'书写");
          //     }
          //   } else {
          //     this.addForm.parameterValue = value;
          //   }
          // });
        }
        callback();
      }
    };
    // 参数名称
    var vaparameterName = (rule, value, callback) => {
      let newValue = value.trim();
      if (newValue === "") {
        callback(new Error("不能为空"));
      } else {
        if (/^[A-Z]+$/.test(newValue)) {
          this.addForm.parameterName = newValue;
          callback();
        } else {
          // console.log('value :>> ', value);
          callback(new Error("必须为大写"));
        }
      }
    };
    return {
      dialogFormVisible: false,
      addForm: {
        id: "",
        extId: "", //所属学校
        parameterName: "", //参数名称
        parameterValue: "", //参数值
        parameterDesc: "" //参数描述
      },
      extIdNameArr: [], //学校名称
      rules: {
        // 参数值
        parameterValue: [{ required: true, validator: vaparameterValue, trigger: "blur" }],
        // 参数名称
        parameterName: [{ required: true, validator: vaparameterName, trigger: "blur" }]
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
    //添加
    async add() {
      let res = await addData(this.addForm);
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
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
      }
    },
    //获取学校名称,
    TypeName() {
      getDataListByTypeArray({ type: ["METHOD_SAM_SCHOOLLIST"] }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    }
  }
};
</script>