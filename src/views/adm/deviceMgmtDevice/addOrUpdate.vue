<template>
  <div class="admdeviceMgmtDeviceAdd">
    <titleBar :title="!id ? '新增' : '修改'"></titleBar>
    <el-form
      :model="addOrUpdateForm"
      :rules="rules"
      ref="addOrUpdateForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构：" prop="orgId">
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
          <el-form-item label="子系统：" prop="subsystemId">
            <el-select v-model="addOrUpdateForm.subsystemId" clearable placeholder="请选择子系统">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in groupParentArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分组：" prop="groupId">
            <el-select v-model="addOrUpdateForm.groupId" clearable placeholder="请选择所属分组">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in groupParentArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备名称：" prop="deviceName">
            <el-input v-model="addOrUpdateForm.deviceName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备序列号：" prop="deviceCode">
            <el-input v-model="addOrUpdateForm.deviceCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：" prop="state">
            <el-select v-model="addOrUpdateForm.state" clearable placeholder="请选择状态">
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
          <el-form-item label="备注：" prop="remake">
            <el-input type="textarea" rows="1" v-model="addOrUpdateForm.remake" maxlength="200"></el-input>
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
        orgId: 1,
        subsystemId: "",
        groupId: "",
        deviceName: "",
        deviceCode: "",
        state: "",
        remake: "",
      },
      extIdNameArr: [],
      stateArr: [],
      groupParentArr: [],
      rules: {
        deviceName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
        ],
        deviceCode: [
          { required: true, message: "设备序列号不能为空", trigger: "blur" },
        ],
        groupId: [
          { required: true, message: "请选择所属分组", trigger: "change" },
        ],
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
        this.$refs["addOrUpdateForm"].resetFields();
        this.extIdName();
      });
      if (this.id) {
        getDataById({ chapterId: this.id }).then((res) => {
          console.log("res", res);
          if (res.rsCode === "AAAAAAA") {
            this.addOrUpdateForm = res.data;
          }
        });
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
.admdeviceMgmtDeviceAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>