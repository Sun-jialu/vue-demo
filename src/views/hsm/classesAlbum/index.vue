<template>
  <div class="classesAlbum">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="classesAlbum1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 学校名称,年级,班级名称 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
              <el-select v-model="dataForm.extId" disabled placeholder="请选择">
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
              <el-select v-model="dataForm.gradeName" disabled placeholder="请选择">
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
              <el-select v-model="dataForm.classId" @change="selectClass" placeholder="请选择">
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
        <!-- 查询 -->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 删除，下载，审核,全选 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="0px">
              <el-button plain type="primary" @click="dele">删除</el-button>
              <el-button plain type="primary" @click="download">下载</el-button>
              <el-button plain type="primary" @click="pass">审核通过</el-button>
              <el-button plain type="primary" @click="notPass">审核不通过</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                label
              ></el-checkbox>全选
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 左边选择按钮，右边图片 -->
        <el-row>
          <!-- 按钮 -->
          <el-col :span="4">
            <el-form-item label-width="0px" class="elForm">
              <div v-if="studentArr.length==0">暂无按钮</div>
              <el-button
                v-else
                v-for="(item,index) in studentArr"
                :key="index"
                :type="item.albumId==ind?'primary':''"
                @click="onButton(item.albumId)"
              >{{item.albumName}}({{item.fileNum}})</el-button>
            </el-form-item>
          </el-col>
          <!-- 图片 -->
          <el-col :span="20">
            <el-form-item label-width="20px">
              <div class="dllDiv">
                <!-- 上传图片 -->
                <dl class="dll">
                  <dt>
                    <el-upload
                      class="avatar-uploader"
                      action="*"
                      :http-request="upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </dt>
                  <dd></dd>
                </dl>
                <dl v-for="(item,index) in picArr" :key="index" class="dll">
                  <dt>
                    <div class="divImg" ref="list">
                      <img
                        class="img"
                        :src="item.filePath"
                        :alt="item.fileName"
                        :title="item.fileName"
                      />
                    </div>
                  </dt>
                  <dd>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox :label="item.albumFileId" :key="index"></el-checkbox>
                    </el-checkbox-group>
                    <el-button plain type="primary" @click="downLoad(item)">下载</el-button>
                    <el-button plain type="primary" @click="binBig(item,index)">大图</el-button>
                    <div
                      :class="[item.state=='0'? 'unreviewed':'',item.state=='1'?'pass':'',item.state=='2'?'notPass':'']"
                    >{{item.stateValue}}</div>
                  </dd>
                </dl>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="dialogVisible" width="70%" @click="dialogVisible = false">
      <div class="picDiv">
        <img :src="picBig" alt ref="imgRef" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        circle
        class="next"
        @click="changePicIndex('next')"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        circle
        class="prev"
        @click="changePicIndex('prev')"
      ></el-button>
    </el-dialog>
  </div>
</template>
<script>
import {
  getListByParam,
  getPageListByParam,
  downloadData,
  batchDownloadData,
  batchDelData,
  addData,
  checkData
  // delData
} from "@/api/hsm/classesAlbum";
import { getBasicsInfo } from "@/api/hsm/hsmCommon";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import axios from "axios";
const SITE = require("SITE");
const sam = SITE["samUrl"];
export default {
  components: {},
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        gradeName: "", //年级
        classId: "", //班级
        pageNum: 10,
        pageSize: 20
      },
      studentArr: [], //左侧按钮
      picArr: [], //右侧图片
      checkAll: false, //全选按钮
      listLoading: false,
      isIndeterminate: true,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      imageUrl: "",
      checkedCities: [], //多选框选中的图片
      ind: "", //button默认显示
      gradeIdArr: [], //年级
      classArr: [], //班级名称
      extIdNameArr: [], //学校名称
      dialogVisible: false, //dialog控制
      picBig: "", //图片展示+
      picIndex: "" //下标图片
    };
  },
  computed: {},
  activated() {
    this.all();
  },
  methods: {
    async all() {
      await this.getClass();
      this.queryAbout();
      this.TypeName();
      // this.gradeIdName();
      this.show = true;
    },
    setImg() {
      console.log("this.$refs.imgRef :>> ", this.$refs.imgRef);
    },
    //多个删除
    async dele() {
      if (this.checkedCities.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择多条删除内容",
          type: "warning"
        });
      } else {
        let res = await batchDelData({ albumFileIds: this.checkedCities });
        if (res && res.rsCode == "AAAAAAA") {
          this.$notify({
            title: "成功",
            message: "多个删除成功",
            type: "success"
          });
          this.all();
        }
      }
    },
    //多个下载
    async download() {
      if (this.checkedCities.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择多条下载内容",
          type: "warning"
        });
      } else {
        let url =
          "http://192.168.115.123:8066/hsm/classesAlbumFile/batchDownloadFile";
        window.location.href =
          url + "?" + this.isNull1({ albumFileIds: this.checkedCities });
      }
    },
    //多个下载
    isNull1(obj) {
      return Object.keys(obj)
        .map(function(key) {
          if (!obj[key]) {
            delete obj[key];
          } else if (typeof obj[key] === "number") {
            return key + "=" + obj[key];
          } else {
            return key + "=" + obj[key] + "";
          }
        })
        .join("&");
    },
    //审核通过
    async pass() {
      if (this.checkedCities.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择审核内容",
          type: "warning"
        });
      } else {
        let res = await checkData({
          albumFileIds: this.checkedCities,
          state: 1
        });
        if (res && res.rsCode == "AAAAAAA") {
          this.$notify({
            title: "成功",
            message: "审核通过成功",
            type: "success"
          });
          this.all();
        }
      }
    },
    //审核未通过
    async notPass() {
      if (this.checkedCities.length == 0) {
        this.$notify({
          title: "警告",
          message: "请选择审核未通过内容",
          type: "warning"
        });
      } else {
        let res = await checkData({
          albumFileIds: this.checkedCities,
          state: 2
        });
        if (res && res.rsCode == "AAAAAAA") {
          this.$notify({
            title: "成功",
            message: "审核未通过成功",
            type: "success"
          });
          this.all();
        }
      }
    },
    //获取学校名称 班级名称
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_CLASSLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          // this.classArr = data.METHOD_SAM_CLASSLIST;
          // this.classArr.unshift({ classId: "", className: "全部" });
        }
      });
    },
    // 获取年级
    gradeIdName() {
      let grade = "";
      axios
        .post(`${sam}/sam/parameter/getPageListByParam`, this.dataForm)
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
    //获取班级
    async getClass() {
      let res = await getBasicsInfo();
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.dataForm.extId = data.orgextInfo.id;
        this.classArr = data.classList;
        this.dataForm.classId = data.classList[0].id;
        this.selectClass(this.dataForm.classId);
      }
    },
    //选择班级
    selectClass(item) {
      this.classArr.forEach((item1, index1) => {
        if (item1.id == item) {
          this.dataForm.gradeName = item1.gradeName;
        }
      });
    },
    // 查询左侧按钮
    async queryAbout() {
      this.listLoading = true;
      let res = await getListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.ind = data.list[0].albumId;
        this.studentArr = data.list;
      }
      this.onButton(this.ind);
    },
    //点击左边button按钮查询图片
    async onButton(albumId) {
      this.checkAll = false;
      this.checkedCities = [];
      this.ind = albumId;
      let res = await getPageListByParam({
        albumId: this.ind,
        pageNum: this.pageIndex,
        pageSize: this.pageSize
      });
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        let checkList = [];
        data.list.forEach((item, index) => {
          checkList.push(item.albumFileId);
        });
        this.total = checkList.length;
        this.list = checkList;
        this.picArr = data.list;
      }
      // console.log("this.picArr :>> ", this.picArr);
    },
    //全选按钮事件
    handleCheckAllChange(val) {
      //val是全选按钮的状态true/false
      this.checkedCities = val ? this.list : [];
      this.isIndeterminate = false;
    },
    //多选框事件
    handleCheckedCitiesChange(value) {
      // console.log("value :>> ", value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.list.length;
    },
    //单个下载
    async downLoad(item) {
      let url = "http://192.168.115.123:8066/hsm/classesAlbumFile/downloadFile";
      window.location.href =
        url + "?" + this.isNull({ albumFileId: item.albumFileId });
    },
    //单个下载
    isNull(obj) {
      return Object.keys(obj)
        .map(function(key) {
          if (!obj[key]) {
            delete obj[key];
          } else if (typeof obj[key] === "number") {
            return key + "=" + obj[key];
          } else {
            return key + "='" + obj[key] + "'";
          }
        })
        .join("&");
    },
    //变大图
    binBig(item, index) {
      this.picIndex = index;
      this.picBig = this.picArr[this.picIndex].filePath;
      // console.log("this.picArr :>> ", this.picArr[index].filePath);
      // console.log('item :>> ', item,index);
      this.dialogVisible = true;
      this.setImg();
    },
    //上一张、下一张切换
    changePicIndex(value) {
      if (value == "prev") {
        let newIndex;
        if (this.picIndex == 0) {
          newIndex = this.picArr.length - 1;
        } else {
          newIndex = --this.picIndex;
        }
        this.picIndex = newIndex;
      } else if (value == "next") {
        let newIndex;
        if (this.picIndex == this.picArr.length - 1) {
          newIndex = 0;
        } else {
          newIndex = ++this.picIndex;
        }
        this.picIndex = newIndex;
      }
      this.picBig = this.picArr[this.picIndex].filePath;
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryAbout();
    },
    //自定义上传图片
    async upload(file) {
      console.log("1 :>> ", file);
      const form = new FormData();
      // 文件对象
      form.append("file", file.file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      form.append("albumId", this.ind); //button按钮id
      form.append("extId", this.dataForm.extId); //学校id
      let res = await addData(form);
      if (res && res.rsCode == "AAAAAAA") {
        console.log("res :>> ", res);
        this.queryAbout();
      }
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.queryAbout();
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      // console.log("111 :>> ", 111);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log("this.imageUrl :>> ", this.imageUrl);
    },
    //上传图片
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-button + .el-button {
  margin-left: 1px;
}

.dllDiv .dll .divImg {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: #eee;
  position: relative;
  .img {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.classesAlbum .classesAlbum1 {
  .dllDiv {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .dll {
      flex: 1;
      flex-grow: 0;
      flex-shrink: 0;
      width: 200px;
      height: 160px;
      margin: 10px 5px;
      dd {
        width: 200px;
        height: 30px;
        margin-top: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
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
  width: 200px;
  height: 100%;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 100%;
  display: block;
}
.el-checkbox__label {
  display: none;
}
.el-dialog {
  margin-top: 20px !important;
  position: relative;
  // max-height: 100%;
  .el-dialog__body {
    text-align: center;
    .picDiv {
      width: 100%;
      height: 500px;
      overflow: hidden;
      // border: 1px solid red;
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
  }
  .prev,
  .next {
    position: absolute;
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  .prev {
    left: 0;
    top: 50%;
  }
  .next {
    right: 0;
    top: 50%;
  }
}
.elForm {
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    height: auto;
  }
}

.width {
  position: absolute !important;
  width: 100% !important;
  min-height: 100% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  -ms-transform: translateY(-50%) !important;
  -moz-transform: translateY(-50%) !important;
  -webkit-transform: translateY(-50%) !important;
  -o-transform: translateY(-50%) !important;
  display: block;
}
.height {
  position: absolute !important;
  height: 100% !important;
  min-width: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  -ms-transform: translateX(-50%) !important;
  -moz-transform: translateX(-50%) !important;
  -webkit-transform: translateX(-50%) !important;
  -o-transform: translateX(-50%) !important;
  display: block;
}

.unreviewed {
  background: yellow;
  font-size: 10px;
}
.pass {
  background: green;
  font-size: 10px;
}
.notPass {
  background: red;
  font-size: 10px;
}
</style> 