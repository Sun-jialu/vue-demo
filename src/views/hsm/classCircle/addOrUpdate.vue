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
      <!-- 两行合一行 -->
      <el-row>
        <el-col :span="16">
          <!-- 发布人,发布时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="发布人:">
                <el-input v-model="addForm.createUserName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布时间:" prop="startDate">
                <el-date-picker
                  disabled
                  v-model="addForm.createTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 班级动态摘要 -->
          <el-row>
            <el-col>
              <el-form-item label="班级动态摘要:">
                <el-input :disabled="true" type="textarea" v-model="addForm.summary" rows="6"></el-input>
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
      <!-- 评论人,评论类型,评论内容-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="评论人:" prop="commentUserName">
            <el-input maxlength="15" show-word-limit v-model="addForm.commentUserName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评论类型:">
            <el-select v-model="addForm.commentType" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="点赞" value="0"></el-option>
              <el-option label="评论" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评论内容:">
            <el-input maxlength="50" show-word-limit v-model="addForm.commentContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 开始日期,结束日期,查询-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始日期:" prop="startDate">
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
          <el-form-item label="结束日期:" prop="endDate">
            <el-date-picker
              v-model="addForm.endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="endDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div style="text-align:right;">
            <el-button plain type="primary" @click="queryAbout">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- button按钮区 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="0px">
            <el-button plain type="primary" @click="removeList()">删除</el-button>
            <el-button plain type="primary" @click="removeAll()">全部删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-row>
        <el-table
          :data="studentArr"
          :header-cell-style="tableHeaderColor"
          border
          v-loading="listLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="createUserName" header-align="center" align="center" label="评论人"></el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="评论时间"></el-table-column>
          <el-table-column
            prop="commentTypeValue"
            header-align="center"
            align="center"
            label="评论类型"
          ></el-table-column>
          <el-table-column prop="commentContent" header-align="center" align="center" label="评论内容"></el-table-column>
          <el-table-column prop="className" header-align="center" align="center" label="班级名称"></el-table-column>
          <el-table-column prop="extName" header-align="center" align="center" label="学校名称"></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="100"
            style="text-align:center;"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page.sync="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </el-row>
      <br />
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
  getPageListByParamC,
  delDataC,
  batchDelDataC,
  delAllData,
  addData,
  updateData
} from "@/api/hsm/classCircle";
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
        summary: "", //动态摘要
        createTime: "", //发布时间
        createUserName: "", //发布人
        startDate: "", //开始时间
        endDate: "", //结束时间
        commentContent: "", //评论内容
        commentType: "", //评论类型
        id: "",
        notice: "", //通知内容
        filePath: "", //图片
        commentUserName: "" //评论人
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
      studentArr: [],
      filePath: "",
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      value1: [], //时间段开始时间至
      jcArr: [], //教材版本
      multipleSelection: [], //table多选
      extIdNameArr: [], //学校名称
      rules: {
        //评论内容
        commentContent: [
          { required: true, message: "评论内容不能为空", trigger: "blur" },
          {
            min: 0,
            max: 50,
            message: "长度在50 个字符以内",
            trigger: "blur"
          }
        ],
        //时间段开始时间
        startDate: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        //结束时间选择
        endDate: [
          { required: false, message: "结束时间不能为空", trigger: "blur" }
        ],
        //评论人
        commentUserName: [
          { message: "评论人不能为空", trigger: "blur" },
          {
            min: 0,
            max: 15,
            message: "长度在15 个字符以内",
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
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #ccc;text-align: center;";
      }
    },
    //table多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.queryAbout();
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
    //获取教材版本,学校名称
    TypeName() {
      getDataListByTypeArray({
        type: ["TEXTBOOK", "METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.jcArr = data.TEXTBOOK;
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
    // 查询
    async queryAbout() {
      this.listLoading = true;
      let res = await getPageListByParamC({
        classCircleId: this.addForm.id,
        commentType: this.addForm.commentType,
        commentContent: this.addForm.commentContent,
        startDate: this.addForm.startDate,
        endDate: this.addForm.endDate,
        commentUserName: this.addForm.commentUserName,
        pageNum: this.pageIndex,
        pageSize: this.pageSize
      }); //this.addForm
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
    //删除单个table
    remove(id) {
      console.log("id :>> ", id);
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDataC({ id: id }).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            this.$notify({
              title: "成功",
              message: "单个删除成功",
              type: "success"
            });
            this.queryAbout();
          }
        });
      });
    },
    //删除部分table
    removeList() {
      this.$confirm("确定删除吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        });
        if (ids.length == 0) {
          this.$notify({
            title: "警告",
            message: "请选择批量删除的评论",
            type: "warning"
          });
        } else {
          batchDelDataC({ ids: ids }).then(res => {
            if (res && res.rsCode == "AAAAAAA") {
              this.$notify({
                title: "成功",
                message: "批量删除成功",
                type: "success"
              });
              this.queryAbout();
            }
          });
        }
      });
    },
    //删除所有table
    async removeAll() {
      let res = await delAllData({ classCircleId: this.addForm.id });
      if (res && res.rsCode == "AAAAAAA") {
        this.$notify({
          title: "成功",
          message: "全部删除成功",
          type: "success"
        });
        this.queryAbout();
      }
    },
    //返回
    cancel() {
      this.$emit("clickBack", true);
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryAbout();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.queryAbout();
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
