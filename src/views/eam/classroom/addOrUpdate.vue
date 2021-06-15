<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!id ? '新增教室资源' : '修改教室资源'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-width="120px"
    >
      <!-- 学校名称,校区名称,教学楼名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学校名称:" prop="schoolId">
            <el-select v-model="addForm.schoolId" clearable placeholder="学校名称" :disabled="true">
              <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in schoolIdArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="校区名称:" prop="campusId">
            <el-select v-model="addForm.campusId" clearable placeholder="校区名称">
               <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in campusIdArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教学楼名称:" prop="classroomBuildName">
            <el-input v-model="addForm.classroomBuildName" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 教室名称,教室类型，所在楼层 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="教室名称:" prop="classroomName">
            <el-input v-model="addForm.classroomName" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教室类型:" prop="classroomType">
            <el-select v-model="addForm.classroomType" clearable placeholder="教室类型">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item,index) in classroomTypeArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在楼层:" prop="floor">
            <el-input v-model.number="addForm.floor" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 面积,座位数 ,备注-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="面积:" prop="acreage">
            <el-input v-model="addForm.acreage" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="座位数:" prop="seatNumber">
            <el-input v-model.number="addForm.seatNumber" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" v-model="addForm.remark" rows="1" maxlength="200" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 状态， -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addForm.state" clearable placeholder="请选择状态">
               <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateArr"
                  :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交,取消 -->
      <el-row>
        <div style="text-align:right;">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import rules from "@/utils/verify";
import { assignment } from "@/utils/publicMethod";
import { getDataById, addData, updateData } from "@/api/eam/classroom";
import { getDropDownList, getConstantDownList } from "@/api/eam/select";

export default {
  data() {
    return {
      dialogFormVisible: false,
      id: 0,
      addForm: {
        schoolId:1,
        classroomBuildName: "",
        classroomName: "",
        floor: "",
        acreage: "",
        seatNumber: "",
        campusId: "",
        remark: "",
        classroomType: "",
        state: 0
      },
      schoolIdArr: [], 
      classroomTypeArr:[],//教室类型
      stateArr:[],
      campusIdArr:[],
      rules: {
        classroomBuildName: [
          { required: true, message: "请填写正确的教学楼名称", trigger: "blur" }
        ],
        classroomName: [
          { required: true, message: "请填写正确的教室名称", trigger: "blur" }
        ],
        floor: [
          { required: false, type: 'number', message: '只能输入纯数字', trigger: "blur" }
        ],
        acreage: [
          { required: true,validator: rules.FormValidate.Form().validatorNumAndPoint, trigger: "blur" }
        ],
        campusId:[
          { required: true, message: "请选择校区名称", trigger: "change" }
        ],
        seatNumber: [{ required: false, type: 'number', message: '只能输入纯数字', trigger: "blur" }],
        state:[
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        classroomType:[
          { required: true, message: "请选择教室类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    
  },
  methods: {
    //提交正则校验
    async submit(formName) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (this.id) {
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
    //添加
    async add() {
      let res = await addData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
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
      this.addForm.classroomId=this.id
      let res = await updateData(this.addForm);
      let data = res.data;
      // console.log(res);
      if (res && res.rsCode == "AAAAAAA") {
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
    //获取下拉框
     extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.schoolIdArr = data;
        }
      });
         //获取校区列表
      getDropDownList({"code":"eam_campus","id1":this.addForm.schoolId}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.campusIdArr = data;
        }
      });
       //获取教室类型
        getDropDownList({"code":"eam_classrom_type","id1":this.addForm.schoolId}).then(res => {
          if (res && res.rsCode == "AAAAAAA") {
            let data = res.data;
            this.classroomTypeArr = data;
          }
        });
      //状态下拉
      getConstantDownList({"code":"enabled"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.stateArr = data;
        }
      });
    },
    //根据id获取数据
    async init(id,campusId,schoolId) {
      this.id = id || "";
      this.$nextTick(() => {
          this.$refs["addForm"].resetFields();
          this.extIdName()
        })
      //id存在为编辑
      if (this.id) {
        this.addForm.schoolId=schoolId
        this.addForm.campusId=campusId
        let res = await getDataById({ "classroomId": this.id,"schoolId":this.addForm.schoolId,"campusId":this.addForm.campusId});
        // console.log(res);
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          assignment(this.addForm, data);
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
      }
    }
  }
};
</script>