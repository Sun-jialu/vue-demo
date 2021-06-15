<template>
    <div class="addRecord_item">
        <titleBar></titleBar>
        <div>
            <el-form :rules="rules" :model="sizeForm">
                
                <div class="main-top">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="客户名称：" label-width="120px" prop="name">
                                    <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="预留电话：" label-width="120px" prop="telephone">
                                    <el-input v-model="sizeForm.telephone" placeholder="预留电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="性别：" label-width="120px">
                                    <el-select v-model="sizeForm.gender" placeholder="性别">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                             <el-col :span="12">
                                <el-form-item label="证件类型：" label-width="120px">
                                    <el-select v-model="sizeForm.certype" placeholder="证件类型">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件号码：" label-width="120px" prop="cerNum">
                                    <el-input v-model="sizeForm.cerNum" placeholder="证件号码"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="身份证号：" label-width="120px">
                                    <el-input v-model="sizeForm.identity" placeholder="身份证号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="部门：" label-width="120px">
                                    <el-select v-model="sizeForm.department" placeholder="部门">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职务：" label-width="120px">
                                    <el-select v-model="sizeForm.position" placeholder="职务">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="注册日期：" label-width="120px" prop="date">
                                    <el-date-picker
                                    v-model="sizeForm.date"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                    <!-- <el-input v-model="sizeForm.date" placeholder="注册日期"></el-input> -->
                                </el-form-item>
                            </el-col>
                             <el-col :span="12">
                                <el-form-item label="客户有效期：" label-width="120px" prop="accountDate">
                                    <el-date-picker
                                    v-model="sizeForm.accountDate"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                    <!-- <el-input v-model="sizeForm.accountDate" placeholder="账户有效期"></el-input> -->
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                    <el-form-item label="图片：" label-width="120px">
                                    <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <span slot="tip" class="el-upload__tip">* 照片格式：jpg、png，推荐尺寸：480*640，大小不超过 100K *</span>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <img class="img" src="" alt="照片">
                    </div>
                </div>
               
                <el-row>
                    <el-col :span="24">
                        <el-form-item  style="text-align:right;background: #f2f2f2;">
                            <el-button type="primary">提交</el-button>
                            <el-button @click="getBack" type="primary">返回</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      sizeForm: {
        name: "", //客户名称：
        date: "", //注册日期：
        accountDate: "", //账户有效期
        gender: "", //性别
        certype: "", //证件类型
        telephone: "", //预留电话
        cerNum: "", //证件号码
        department: "", //部门
        identity: "", //身份证号
        position: "", //职务
        address: "", //地址
        squareUrl:
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg" //头像地址
      },
      rules: {
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        telephone: [{ required: true, message: "请填写", trigger: "blur" }],
        cerNum: [{ required: true, message: "请填写", trigger: "blur" }],
        date: [
          {  required: true, message: "请填写", trigger: "change" }
        ],
        accountDate: [
          {  required: true, message: "请填写", trigger: "change" }
        ]
      },
      fileList: [{name: "food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{name: "food2.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}],
    };
  },
  components: {
    //123
  },
  methods: {
    // 检索
    addCard() {
      this.flag = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件
    handlePreview(file) {
      console.log(file, "++++");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //点击删除时
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    setTitle(data) {
      console.log("tag", data);
      if (data && data.id) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    // 返回
    getBack() {
      this.$parent.flag = true;
      console.log("tag", "888888");
    }
  }
};
</script>

<style lang="scss" scoped>
.addRecord_item {
  width: 100%;
  height: 100%;
  .borderSize {
    border-bottom: 1px dashed #f2f2f2;
  }
  .formItem {
    span {
      margin: 0 20px 0 0;
    }
    font-weight: bold;
  }
  .formdev {
    margin: 0;
  }
}
.main-top > div {
  margin-top: 13px;
}
.main-top {
  width: 100%;
  display: flex;
  div {
    &:nth-child(1) {
      flex: 7;
    }
    &:nth-child(2) {
      flex: 3;
      position: relative;
      // display: flex;
      // align-items: center;
      // justify-content: center;
    }
  }
}
.btn {
  margin: 5px 0 5px 0;
  margin-right: 10px;
}
.img {
  width: 131px;
  height: 182px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.el-upload__tip {
  color: #f00;
  margin-left: 20px;
}
</style>