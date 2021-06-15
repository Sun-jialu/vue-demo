<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="addForm.id ? '修改作业批阅':'新增作业批阅'  "></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <!-- 作业标题,发布人,发布时间 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="作业标题:" prop="title">
            <el-input v-model="addForm.title" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布人:">
            <el-select v-model="addForm.teacherName" disabled placeholder="请选择">
              <el-option
                :label="item.className"
                :value="item.classId"
                v-for="(item,index) in creatList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布时间:" prop="startDate">
            <el-date-picker
              disabled
              v-model="addForm.reviewTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 作业内容 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="作业内容：" prop="content">
            <tinymce :maxHeight="400" v-model="addForm.content" aria-disabled></tinymce>
          </el-form-item>
        </el-col>
      </el-row>
      <b>作业提交信息</b>
      <hr />
      <!-- 两行合一行 -->
      <el-row>
        <el-col :span="16">
          <!-- 学生姓名,发布时间 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="学生姓名:">
                <el-input v-model="addForm.studentName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间:" prop="startDate">
                <el-date-picker
                  disabled
                  v-model="addForm.commitTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 提交内容 -->
          <el-row>
            <el-col>
              <el-form-item label="提交内容:">
                <el-input
                  disabled
                  type="textarea"
                  v-model="addForm.commitContent"
                  rows="6"
                  placeholder="请输入字符在200字以内"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div class="divImg" ref="list" v-if="addForm.filePath">
              <img :src="addForm.filePath" class="avatar" />
            </div>
            <div v-else class="none">暂无图片</div>
          </el-form-item>
        </el-col>
      </el-row>
      <b>作业批阅</b>
      <hr />
      <!-- 批阅内容 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="批阅内容:" prop="reviewContent">
            <el-input :disabled="true" v-model="addForm.reviewContent" placeholder="请输入字符在200字以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交,取消 -->
      <el-row>
        <div style="text-align:right;">
          <!-- <el-button type="primary" @click="submit">提交</el-button> -->
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import tinymce from "@/components/Tinymce";
import {
  getDataById,
  addData,
  updateData
} from "@/api/hsm/classesHomeworkReview";
import { assignment } from "@/utils/publicMethod";
// import { getDataListByTypeArray } from "@/api/common/dicLists";
export default {
  components: {
    tinymce
  },
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        title: "", //作业标题
        id: "",
        content: "", //作业内容
        filePath: "", //图片
        reviewTime: "", //教师批阅时间
        studentName: "", //学生姓名
        commitTime: "", //提交时间
        commitContent: "", //提交内容
        reviewContent: "", //批阅内容
        teacherName: "" //批阅人
      },
      value1: [], //时间段开始时间至
      creatList: [], //发布人
      extIdNameArr: [], //学校名称
      rules: {
        //批阅内容
        reviewContent: [
          { required: true, message: "批阅内容不能为空", trigger: "change" },
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
    // this.TypeName();
  },
  methods: {
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      //id存在为编辑
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
    //获取学校名称，发布人
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CREATEUSERLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.creatList = data.METHOD_SAM_CREATEUSERLIST;
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
    },
  }
};
</script>
<style lang="scss">
hr {
  margin: 10px 0;
  background: #eee;
}
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