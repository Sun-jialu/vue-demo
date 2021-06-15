<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改拨付规则':'新增拨付规则'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 机构分组名称,监管模式,保证金额度-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构分组名称:">
            <el-select
              v-model="addForm.orgGroupName"
              :disabled="addForm.id?true:false"
              placeholder="请选择"
            >
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in orgGroupNameNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="监管模式:">
            <el-select v-model="addForm.superModel" placeholder="请选择">
              <!-- <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in orgGroupNameNameArr"
                :key="index"
              ></el-option>-->
              <el-option label="监管模式" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保证金额度:" prop="bailAmt">
            <el-input v-model="addForm.bailAmt">
              <span class="input-group-addon">元</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--保证金比例 清算周期 备注-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="保证金比例:" prop="bailRatio">
            <el-input v-model="addForm.bailRatio"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-col :span="16">
            <el-form-item label="清算周期:" prop="clearDate">
              <el-input v-model="addForm.clearDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0px">
              <div class="spanS">
                <span
                  @click="clickSpan(index)"
                  v-for="(item,index) in spanList"
                  :key="index"
                  :class="index==textIndex?'spanColor':''"
                >{{item.title}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="1"
              maxlength="200"
              show-word-limit
              v-model="addForm.remark"
              placeholder="请输入字符在200字以内"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态" label-width="120px">
            <el-select v-model="addForm.state" placeholder="请选择">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
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
        orgGroupName: "", //机构分组名称
        bailAmt: "", //保证金额度
        state: "", //状态
        superModel: "", //监管模式
        clearDate: "", //清算周期
        bailRatio: "" //保证金比例
      },
      textIndex: 0, //默认点击的span
      orgGroupNameNameArr: [], //机构分组名称
      spanList: [
        { title: "周", id: 0, days: 7 },
        { title: "半月", id: 1, days: 15 },
        { title: "月", id: 2, days: 30 }
      ], //点击按钮
      rules: {
        //日期
        overDate: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        //保证金额度
        bailAmt: [
          { required: true, message: "保证金额度不能为空", trigger: "blur" }
        ],
        //保证金比例
        bailRatio: [
          { required: true, message: "保证金比例不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.TypeName();
  },
  mounted() {},
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
        this.addForm.state = "0";
        this.addForm.clearDate = 7;
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
    //获取机构分组名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.orgGroupNameNameArr = data.METHOD_SAM_SCHOOLLIST;
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
    //点击span
    clickSpan(index) {
      this.textIndex = index;
      this.addForm.clearDate = this.spanList[this.textIndex].days;
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
.spanS {
  width: 100%;
  height: 100%;
  span {
    margin: 5px;
    cursor: pointer;
  }
}
.reEl {
  position: relative;
  display: block;
  .abDiv {
    position: relative;
    right: 5px;
    top: 0px;
  }
}
.spanColor {
  color: red;
}
</style>
