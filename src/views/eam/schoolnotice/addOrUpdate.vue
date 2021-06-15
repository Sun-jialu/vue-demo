<template>
  <div class="eamCoursechapterAdd">
    <titleBar :title="!id ? '新增机构资讯配置' : '修改机构资讯配置'"></titleBar>
    <el-form
      :model="addOrUpdateForm"
      :rules="rules"
      ref="addOrUpdateForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构：" prop="schoolId">
            <el-select v-model="addOrUpdateForm.schoolId" placeholder="请选择机构" :disabled="disabled">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in extIdNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="资讯标题：" prop="noticeTitle">
            <el-input v-model="addOrUpdateForm.noticeTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="URL：" prop="noticeUrl">
            <el-input v-model="addOrUpdateForm.noticeUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资讯内容：" prop="notice">
            <tinymce :maxHeight="400" v-model="addOrUpdateForm.notice"></tinymce>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnBox">
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from "@/components/Tinymce";
import { getDropDownList } from "@/api/eam/select";
import { addData, getDataById, updateData } from "@/api/eam/schoolnotice";
export default {
  components: {
    tinymce
  },
  computed: {},
  mounted() {},
  data() {
    return {
      id: 0,
      addOrUpdateForm: {
        schoolId: null,
        noticeTitle: "",
        noticeUrl: "",
        notice: ""
      },
      extIdNameArr: [],
      disabled:false,
      rules: {
        noticeTitle: [
          { required: true, message: "资讯标题不能为空", trigger: "blur" }
        ]
      }
    };
  },
  activated() {
    //  this.reset()
  },
  methods: {
    // 新增和修改
    addOrUpdate(id,schoolId) {
      this.id = id || 0;
      this.$nextTick(() => {
        this.$refs["addOrUpdateForm"].resetFields();
        this.extIdName();
      });
      if (this.id) {
        this.disabled=true
       this.addOrUpdateForm.schoolId=schoolId
           getDataById({"noticeId":this.id,"schoolId":this.addOrUpdateForm.schoolId}).then(res => {
            console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
               this.addOrUpdateForm=res.data
            }
          })
      }
    },
    submitForm() {
      this.$refs["addOrUpdateForm"].validate(valid => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    },
    back() {
      this.$parent.addOrUpdateIsShow = true;
    },
    update() {
       if(this.id){
          this.addOrUpdateForm.noticeId=this.id
          updateData(this.addOrUpdateForm).then(res => {
          //  console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
                this.$parent.queryAbout()
                setTimeout(() => {
                   this.$parent.addOrUpdateIsShow=true
                }, 500);
               
            }
        })
        }else{
          addData(this.addOrUpdateForm).then(res => {
           console.log("res",res)
            if (res.rsCode=== 'AAAAAAA') {
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
                this.$parent.queryAbout()
                setTimeout(() => {
                   this.$parent.addOrUpdateIsShow=true
                }, 500);
               
            }
          })
         }
    },
    //获取下拉框
    extIdName() {
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
          this.addOrUpdateForm.schoolId=data[0].value
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.eamCoursechapterAdd .btnBox {
  margin: 0 auto 20px;
  float: right;
}
</style>