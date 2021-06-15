<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.albumId ? '修改班级相册管理':'新增班级相册管理'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 学校名称,年级,班级名称 -->
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
          <el-form-item label="年级:" label-width="120px">
            <el-select v-model="addForm.gradeName" disabled placeholder="请选择">
              <el-option
                :label="item"
                :value="index"
                v-for="(item,index) in gradeIdArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班级名称:">
            <el-select v-model="addForm.classId" @change='selectClass' placeholder="请选择">
              <el-option
                :label="item.className"
                :value="item.id"
                v-for="(item,index) in classArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 相册名称,备注,状态 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="相册名称:" prop="albumName">
            <el-input v-model="addForm.albumName" maxlength="20" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注:" prop="remarkMsg">
            <el-input maxlength="200" show-word-limit type="textarea" v-model="addForm.remarkMsg" rows="1"></el-input>
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
import { getDataById, addData, updateData } from "@/api/hsm/classAlbum";
import { assignment } from "@/utils/publicMethod";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import axios from "axios";
const SITE = require("SITE");
const sam = SITE["samUrl"];
export default {
  props: ["data"],
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        extId: "", //学校名称
        gradeName: "", //年级
        classId: "", //班级
        state: "", //状态
        albumId: "", //开始获取的id
        albumName: "", //相册名称
        remarkMsg: "" //备注信息
      },
      jcArr: [], //教材版本
      extIdNameArr: [], //学校名称
      gradeIdArr: [], //年级
      classArr: [], //班级名称
      rules: {
        // 相册名称
        albumName: [
          { required: true, message: "相册名称不能为空", trigger: "change" },
          {
            min: 0,
            max: 20,
            message: "长度在20 个字符以内",
            trigger: "blur"
          }
        ],
        //备注
        remarkMsg: [
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
    this.all();
  },
  mounted() {},
  methods: {
    async all() {
      await this.getClass();
      this.TypeName();
      this.gradeIdName();
    },
    //根据id获取数据
    async init(albumId) {
      this.addForm.albumId = albumId || "";
      //id存在为编辑
      if (this.addForm.albumId) {
        let res = await getDataById({ albumId: this.addForm.albumId });
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          data.state = data.state + "";
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.state = "0";
        this.addForm.extId = this.data.extId;
        this.addForm.classId = this.data.classId;
        this.addForm.gradeName = this.data.gradeId;
      }
    },
    //提交正则校验
    async submit(formName) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (this.addForm.albumId) {
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
    //获取,学校名称 班级名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CLASSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          // this.classArr = data.METHOD_SAM_CLASSLIST;
        }
      });
    },
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.addForm.extId = data.orgextInfo.id;
        this.classArr = data.classList;
        this.addForm.classId = data.classList[0].id;
        // this.addForm.termId=data.termInfo.id
        // this.selectClass(this.addForm.classId);
      }
    },
    //选择班级
    selectClass(item) {
      this.classArr.forEach((item1, index1) => {
        if (item1.id == item) {
          this.addForm.gradeName = item1.gradeName;
        }
      });
    },
    // 获取年级
    gradeIdName() {
      let grade = "";
      axios
        .post(`${sam}/sam/parameter/getPageListByParam`, this.addForm)
        .then(res => {
          let data = res.data.data.list;
          data.forEach((item, index) => {
            if (item.parameterName == "GRADE") {
              grade = item.parameterValue;
            }
          });
          let newGrade = grade.split("|");
          this.gradeIdArr = newGrade;
        });
    },
    //添加
    async add() {
      let res = await addData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        console.log(res.data.msg);
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
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
        console.log(res.data.msg);
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
