<template>
  <div class="signMgmtAdd">
    <titleBar title="签到"></titleBar>
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
          <el-form-item label="客户名称：" prop="customerName">
            <el-input v-model="addOrUpdateForm.customerName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卡号：" prop="cardNo">
            <el-input v-model="addOrUpdateForm.cardNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型：" prop="certTypeId">
            <el-select
              v-model="addOrUpdateForm.certTypeId"
              :disabled="true"
              clearable
              placeholder="请选择证件类型"
            >
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in certTypeIdArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码：" prop="certNo">
            <el-input v-model="addOrUpdateForm.certNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签到时间：" prop="signTimes">
            <el-date-picker
              v-model="addOrUpdateForm.signTimes"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="签到原因：" prop="signRemake">
            <el-input type="textarea" rows="1" v-model="addOrUpdateForm.signRemake" maxlength="200"></el-input>
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
        customerName: "",
        cardNo: "",
        certTypeId: "",
        certNo: "",
        signTimes: "",
        signRemake: "",
      },
      extIdNameArr: [],
      stateArr: [],
      rules: {
        signTimes: [
          { required: true, message: "请选择签到时间", trigger: "change" },
        ],
        signRemake: [
          { required: true, message: "签到原因不能为空", trigger: "blur" },
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
        // addData(this.addOrUpdateForm).then(res => {
        //  console.log("res",res)
        //   if (res.rsCode=== 'AAAAAAA') {
        //       this.$notify({
        //         title: '成功',
        //         message: '提交成功',
        //         type: 'success'
        //       });
        //       this.$parent.queryAbout()
        //       setTimeout(() => {
        //          this.$parent.addOrUpdateIsShow=true
        //       }, 500);
        //   }
        // })
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
    },
  },
};
</script>
<style lang="scss" scoped>
.signMgmtAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>