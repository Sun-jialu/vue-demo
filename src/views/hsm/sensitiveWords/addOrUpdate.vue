<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改敏感词':'新增敏感词'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 学校名称,班级名称,处理类型 -->
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
          <el-form-item label="班级名称" label-width="120px">
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
          <el-form-item label="处理类型:">
            <el-select v-model="addForm.dealType" placeholder="请选择">
              <el-option label="替换" value="0"></el-option>
              <el-option label="屏蔽" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--敏感词,替换内容,状态-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="敏感词:" prop="sensitiveWords">
            <el-input maxlength="10" show-word-limit v-model="addForm.sensitiveWords"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="替换内容:" prop="replaceContent">
            <el-input maxlength="10" show-word-limit v-model="addForm.replaceContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select v-model="addForm.state" placeholder="请选择">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
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
import { getDataById, addData, updateData } from "@/api/hsm/sensitiveWords";
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
        extId: "", //学校名称
        sensitiveWords: "", //敏感词
        state: "", //状态
        id: "",
        replaceContent: "", //替换内容
        dealType: "", //处理类型
        classId: "" //班级名称
      },
      value1: [], //时间段开始时间至
      classList: [], //班级名称
      extIdNameArr: [], //学校名称
      rules: {
        //敏感词
        sensitiveWords: [
          { required: true, message: "请填写敏感词", trigger: "blur" },
          {
            min: 0,
            max: 20,
            message: "长度在20 个字符以内",
            trigger: "blur"
          }
        ],
        //替换内容
        replaceContent: [
          { message: "请填写替换内容", trigger: "blur" },
          {
            min: 0,
            max: 20,
            message: "长度在20 个字符以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass();
      this.TypeName();
    },
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
      // console.log(id);
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          data.state = data.state + "";
          data.dealType = data.dealType + "";
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.state = "0";
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
    },
    //浏览
    browse() {
      console.log("浏览");
    }
  }
};
</script>
