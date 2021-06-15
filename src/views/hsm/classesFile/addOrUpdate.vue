<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改班级文档':'新增班级文档'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <!-- 学校名称,班级名称 -->
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
      </el-row>
      <!-- 文件，浏览-->
      <el-row>
        <el-col :span="16">
          <el-form-item label="文件:" prop="fileName">
            <el-input v-model="addForm.fileName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button v-if="addForm.fileName" size="small" type="primary">浏览...</el-button>
            <el-upload
              v-else
              class="upload-demo"
              action="*"
              :http-request="uploadFile"
              :on-change="handleChange"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">浏览...</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
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
import { getDataById, addData, updateData } from "@/api/hsm/classesFile";
import { assignment } from "@/utils/publicMethod";
import { addFile, getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  props: ["data"],
  components: {
    tinymce
  },
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        extId: "", //学校名称
        classId: "", //班级
        id: "",
        fileName: "", //文件名称
        fileId: "" //文件id
      },
      value1: [], //时间段开始时间至
      classList: [], //班级名称
      extIdNameArr: [], //学校名称
      fileList: [],
      rules: {
        // 文件
        fileName: [
          { required: true, message: "文件不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.all();
  },
  methods: {
    all() {
      this.getClass();
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
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.extId = this.data.extId;
        // this.addForm.classId = this.data.classId;
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
    //获取学校名称,班级名称
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
        console.log('data :>> ', data);
        this.addForm.extId = data.orgextInfo.id;
        this.classList = data.classList;
        this.addForm.classId = data.classList[0].id;
        // this.addForm.termId=data.termInfo.id
        // this.selectClass(this.addForm.classId);
      }
    },
    //添加
    async add() {
      console.log("this.addForm :>> ", this.addForm);
      let res = await addData(this.addForm);
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.$notify({
          title: "成功",
          message: "新增",
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
    async uploadFile(file) {
      this.addForm.fileName = file.file.name;
      const form = new FormData();
      // 文件对象
      form.append("file", file.file);
      form.append("extId", this.addForm.extId); //学校id
      let res = await addFile(form);
      if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success"
        });
        this.addForm.fileId = res.data.fileId;
      }
    },
    handleChange(file, fileList) {
      // console.log("file :>> ", file.raw);
      // console.log("file :>> ", file.name);
      // console.log("fileList :>> ", fileList);
      // this.fileList = fileList.slice(0,1);
    }
  }
};
</script>
