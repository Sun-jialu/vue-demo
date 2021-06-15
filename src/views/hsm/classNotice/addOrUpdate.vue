<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改班级通知':'新增班级通知'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 学校名称,班级名称,通知标题 -->
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
          <el-form-item label="班级名称" label-width="120px" prop="classId">
            <el-select v-model="addForm.classId" placeholder="请选择">
              <el-option
                :label="item.className"
                :value="item.id"
                v-for="(item,index) in classList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通知标题:" prop="title">
            <el-input v-model="addForm.title" maxlength="30" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 有效期,至 ,备注-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="有效期:" prop="startDate">
            <el-date-picker
              v-model="addForm.startDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="startDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="至:" prop="endDate">
            <el-date-picker
              v-model="addForm.endDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              :picker-options="endDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
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
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 通知内容 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="通知内容：" prop="content">
            <tinymce :maxHeight="400" v-model="addForm.content"></tinymce>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 提交,取消 -->
    <el-row>
      <div style="text-align:right;">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import tinymce from "@/components/Tinymce";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataById, addData, updateData } from "@/api/hsm/classNotice";
import { assignment } from "@/utils/publicMethod";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    tinymce
  },
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        startDate: "", //开始时间
        endDate: "", //结束时间
        extId: "", //学校名称
        title: "", //通知标题
        classId: "", //班级
        id: "",
        content: "", //通知内容
        remark: "" //备注信息
      },
      startDate: {
        disabledDate: time => {
          if (!this.addForm.endDate) {
            return false;
          }
          return time.getTime() > new Date(this.addForm.endDate).getTime();
        }
      },
      endDate: {
        disabledDate: time => {
          return time.getTime() < new Date(this.addForm.startDate).getTime();
        }
      },
      value1: [], //时间段开始时间至
      classList: [], //班级名称
      extIdNameArr: [], //学校名称
      rules: {
        //通知标题
        title: [
          { required: true, message: "通知标题不能为空", trigger: "change" },
          {
            min: 0,
            max: 30,
            message: "长度在30 个字符以内",
            trigger: "blur"
          }
        ],
        //时间段开始时间
        startDate: [
          { required: true, message: "开始时间不能为空", trigger: "change" }
        ],
        //结束时间选择
        endDate: [
          { required: true, message: "结束时间不能为空", trigger: "change" }
        ],
        //班级名称
        classId: [
          { required: true, message: "请选择班级名称", trigger: "change" }
        ],
        //备注
        remark: [
          { trigger: "change" },
          {
            min: 0,
            max: 200,
            message: "长度在200 个字符以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getClass();
    this.TypeName();
  },
  methods: {
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
      // console.log(id);
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
    // 获取学校名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CLASSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          // this.classList = data.METHOD_SAM_CLASSLIST;
        }
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.addForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.addForm.classId = data.classList[0].id;
        // this.selectClass(this.addForm.classId);
      }
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
