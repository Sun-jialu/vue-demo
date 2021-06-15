<template>
  <div class="admdeviceMgmtGroupAdd">
    <titleBar :title="!id ? '新增' : '修改'"></titleBar>
    <el-form
      :model="addOrUpdateForm"
      :rules="rules"
      ref="addOrUpdateForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <!-- 所属机构 版本号 版本平台 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属机构:" prop="orgId">
            <el-select
              v-model="addOrUpdateForm.orgId"
              clearable
              placeholder="请选择机构"
              :disabled="true"
            >
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
          <el-form-item label="版本号:" prop="verNo">
            <el-input v-model="addOrUpdateForm.verNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="版本平台:" prop="verTerrace">
            <el-select v-model="addOrUpdateForm.state" clearable placeholder="请选择">
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
      <!-- 状态 备注 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addOrUpdateForm.state" clearable placeholder="请选择状态">
              <el-option label="可用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" rows="1" v-model="addOrUpdateForm.remark" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 发包 url -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="发包:" prop="linkman">
            <el-button type="primary">发包</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="URL:" prop="url">
            <el-input v-model="addOrUpdateForm.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnBox">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addData, getDataById, updateData } from "@/api/eam/coursechapter";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";
export default {
  computed: {},
  mounted() {},
  data() {
    return {
      id: 0,
      addOrUpdateForm: {
        orgId: 1, //机构
        verTerrace:"",//版本平台
        verNo: "", //分组名称
        linkman: "", //联系人
        url: "",//url
        state: "",//状态
        remark: "",//备注
      },
      extIdNameArr: [],//机构下拉框
      stateArr: [],
      rules: {
        verNo: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
        ],
        linkman:[
          { required: true, message: "111", trigger: "blur" },
        ]
      },
    };
  },
  activated() {
    //  this.reset()
  },
  methods: {
    // 新增和修改
    addOrUpdate(id) {
      this.id = id || 0;
      this.$nextTick(() => {
        // this.$refs["addOrUpdateForm"].resetFields();
        this.extIdName();
      });
      if (this.id) {
        getDataById({ chapterId: this.id }).then((res) => {
          console.log("res", res);
          if (res.rsCode === "AAAAAAA") {
            this.addOrUpdateForm = res.data;
          }
        });
      } else {
        this.addOrUpdateForm.state = "1";
      }
    },
    submitForm() {
      this.$refs["addOrUpdateForm"].validate((valid) => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    },
    back() {
      this.$parent.addOrUpdateIsShow = true;
    },
    update() {
      if (this.id) {
        this.addOrUpdateForm.chapterId = this.id;
        updateData(this.addOrUpdateForm).then((res) => {
          //  console.log("res",res)
          if (res.rsCode === "AAAAAAA") {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
            });
            this.$parent.queryAbout();
            setTimeout(() => {
              this.$parent.addOrUpdateIsShow = true;
            }, 500);
          }
        });
      } else {
        addData(this.addOrUpdateForm).then((res) => {
          console.log("res", res);
          if (res.rsCode === "AAAAAAA") {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
            });
            this.$parent.queryAbout();
            setTimeout(() => {
              this.$parent.addOrUpdateIsShow = true;
            }, 500);
          }
        });
      }
    },
    //获取下拉框
    extIdName() {
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
      //状态下拉
      getConstantDownList({ code: "enabled" }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.admdeviceMgmtGroupAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>