<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改入账信息':'新增入账信息'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 学校名称,收费日期,汇总费用-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:">
            <el-select v-model="addForm.extId" disabled placeholder="请选择学校名称">
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
          <el-form-item label="收费日期:" prop="overDate">
            <el-date-picker
              v-model="addForm.overDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="overDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇总费用:" prop="money">
            <el-input v-model="addForm.money"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="2"
              maxlength="200"
              show-word-limit
              v-model="addForm.remark"
              placeholder="请输入字符在200字以内"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交,取消 -->
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
import { getDataById, addData, updateData } from "@/api/hsm/classCircle";
import { assignment } from "@/utils/publicMethod";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        remark: "", //备注
        extId: "", //学校名称
        overDate: "", //收费日期
        money: "" //汇总费用
      },
      overDate: {
        disabledDate: time => {
          return time.getTime() >= new Date().getTime();
        }
      },
      extIdNameArr: [], //学校名称
      rules: {
        //日期
        overDate: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        //汇总费用
        money: [
          { required: true, message: "汇总费用不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.TypeName();
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          // console.log("data :>> ", data);
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
      }
    },
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
    //获取学校名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    },
    //添加
    async add() {
      let res = await addData(this.addForm);
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
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
        let data = res.data;
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
    }
  }
};
</script>
<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.divImg {
  margin-top: 3 0px;
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: #eee;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.none {
  text-align: center;
  line-height: 150px;
}
</style>
