<template>
  <div class="workRuleAdd">
    <titleBar :title="!id ? '新增' : '修改'"></titleBar>
    <el-form
      :model="addOrUpdateForm"
      :rules="rules"
      ref="addOrUpdateForm"
      label-width="100px"
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
          <el-form-item label="规则名称：" prop="ruleName">
            <el-input v-model="addOrUpdateForm.ruleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上班时间：" prop="workTime">
            <el-date-picker
              v-model="addOrUpdateForm.workTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="下班时间：" prop="closingTime">
            <el-date-picker
              v-model="addOrUpdateForm.closingTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="16">
              <el-form-item label="迟到：" prop="isLate">
                <el-input type="number" v-model="addOrUpdateForm.isLate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div style="color:#606266;font-size:14px;line-height:32px;">分钟以内不算迟到</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="12">
              <el-form-item label="迟到：" prop="lateTimeIsAbsent">
                <el-input type="number" v-model="addOrUpdateForm.lateTimeIsAbsent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <div style="color:#606266;font-size:14px;line-height:32px;">分钟算旷工</div>
            </el-col>
            <el-col :span="5" class="timeBox">
              <el-form-item prop="lateToAbsentDays">
                <el-input type="number" v-model="addOrUpdateForm.lateToAbsentDays"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div style="color:#606266;font-size:14px;line-height:32px;">天</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-row>
            <el-col :span="16">
              <el-form-item label="早退：" prop="isLeaveEarly">
                <el-input type="number" v-model="addOrUpdateForm.isLeaveEarly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div style="color:#606266;font-size:14px;line-height:32px;">分钟以内不算早退</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="12">
              <el-form-item label="早退：" prop="leaveEarlyTimeIsAbsent">
                <el-input type="number" v-model="addOrUpdateForm.leaveEarlyTimeIsAbsent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <div style="color:#606266;font-size:14px;line-height:32px;">分钟算旷工</div>
            </el-col>
            <el-col :span="5" class="timeBox">
              <el-form-item prop="leaveEarlyToAbsentDays">
                <el-input type="number" v-model="addOrUpdateForm.leaveEarlyToAbsentDays"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div style="color:#606266;font-size:14px;line-height:32px;">天</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="14">
              <el-form-item label="下班：" prop="overTime">
                <el-input type="number" v-model="addOrUpdateForm.overTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <div style="color:#606266;font-size:14px;line-height:32px;">分钟后刷卡算作加班</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" rows="1" v-model="addOrUpdateForm.remark" maxlength="200"></el-input>
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
        ruleName: "",
        workTime: "",
        closingTime: "",
        isLate: "",
        lateTimeIsAbsent: "",
        lateToAbsentDays: "",
        isLeaveEarly: "",
        leaveEarlyTimeIsAbsent: "",
        leaveEarlyToAbsentDays: "",
        overTime: "",
        state: "",
        remark: "",
      },
      extIdNameArr: [],
      stateArr: [],
      groupParentArr: [],
      rules: {
        ruleName: [
          { required: true, message: "规则名称不能为空", trigger: "blur" },
        ],
        workTime: [
          { required: true, message: "请选择上班时间", trigger: "change" },
        ],
        closingTime: [
          { required: true, message: "请选择下班时间", trigger: "change" },
        ],
        isLate: [{ required: true, message: "不能为空", trigger: "blur" }],
        lateTimeIsAbsent: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        lateToAbsentDays: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        isLeaveEarly: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        leaveEarlyTimeIsAbsent: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        leaveEarlyToAbsentDays: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        overTime: [{ required: true, message: "不能为空", trigger: "blur" }],
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
<style lang="scss">
.workRuleAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
.workRuleAdd .timeBox .el-form-item .el-form-item__content {
  margin-left: 0 !important;
}
</style>