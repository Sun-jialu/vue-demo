<template>
  <div>
    <el-form
      :model="dataForm"
      ref="dataForm"
      class="demo-form-inline"
      label-position="right"
      :rules="rules"
      label-width="100px"
    >
      <!-- 学校名称,学年学期,时间段名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学年学期:" label-width="120px">
            <el-select v-model="dataForm.termId" disabled placeholder="请选择">
              <el-option
                :label="item.termName"
                :value="item.termId"
                v-for="(item, index) in termList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间段名称" label-width="120px" prop="name">
            <el-input
              v-model="dataForm.name"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 开始时间,结束时间 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始时间" label-width="120px" prop="startTime">
            <el-time-picker
              v-model="dataForm.startTime"
              format="HH:mm"
              value-format="HH:mm"
              :editable="false"
              :clearable="false"
              :picker-options="{
                selectableRange: `00:00:00 -${
                  dataForm.endTime ? dataForm.endTime + ':00' : '23:59:00'
                }`,
              }"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间" label-width="120px" prop="endTime">
            <el-time-picker
              v-model="dataForm.endTime"
              format="HH:mm"
              value-format="HH:mm"
              :clearable="false"
              :editable="false"
              :picker-options="{
                selectableRange: `${
                  dataForm.startTime ? dataForm.startTime + ':00' : '00:00:00'
                }-23:59:00`,
              }"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 提交,取消 -->
    <el-row>
      <div style="text-align: right">
        <el-button type="primary" @click="submit" :loading="btnLoding"
          >提交</el-button
        >
        <el-button @click="cancel">返回</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      termList: [
        {
          termId: 8,
          startTime: "2021-03-02",
          weekNum: 18,
          endTime: "2021-06-28",
          termName: "2021-2021-2",
        },
        {
          termId: 9,
          startTime: "2020-09-30",
          weekNum: 21,
          endTime: "2021-02-16",
          termName: "2020-2021-1",
        },
      ], //学年学期
      btnLoding: false, //提交loding
      dataForm: {
        id: "",
        extId: "", //学校名称
        termId: "", //学年学期id
        name: "", //时间段名称
        startTime: "", //开始时间
        endTime: "", //结束时间
      },
      rules: {
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  components: {
  },
  mounted() {
    this.dataForm.extId = this.$store.getters.getOrgId;
    this.TypeName();
  },
  methods: {
    //根据id获取数据
    init(id, defaultTerm) {
      //id为number为修改
      if (typeof id == "number") {
        this.dataForm.id = id || "";
        this.dataForm={
          endTime: "10:00",
          extId: 440,
          id: 9,
          name: "课间操",
          startTime: "09:40",
          termId: 9,
        }
      } else if (typeof id == "object") {
        //id为对象是新增
        this.dataForm.extId = id.extId;
        this.dataForm.termId = id.termId;
      }
    },
    //提交
    submit() {
      // this.btnLoding = true;
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          // if (this.dataForm.id) {
          //   //更改的时候
          //   this.change();
          // } else {
          //   //新添加的时候
          //   this.add();
          // }
        } else {
          this.btnLoding = false;
          return false;
        }
      });
    },
    //添加
    add() {

    },
    //修改
    change() {

    },
    //获取教室类型，校区名称
    TypeName() {
    },
    //返回
    cancel() {
      this.$emit("clickBack", true);
    },
  },
};
</script>
