<template>
  <div>
    <!-- 头部标题 -->
    <titleBar :title="!addForm.id ? '新增关联账户' : '修改关联账户'"></titleBar>
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      class="demo-form-inline"
      label-width="120px"
    >
      <!-- 机构,账号,账户名称 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构:">
            <el-select v-model="addForm.orgId" disabled placeholder="请选择">
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in orgIdNameArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账号:" label-width="120px" prop="account">
            <el-input v-model="addForm.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户名称:" prop="accountName">
            <el-input maxlength="20" show-word-limit v-model="addForm.accountName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 本他行,所属银行，默认收款账户 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="本他行:" prop="isBank">
            <!-- <el-input v-model="addForm.isBank"></el-input> -->
            <el-radio v-model="addForm.isBank" label="1">同行</el-radio>
            <el-radio v-model="addForm.isBank" label="2">他行</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属银行:" prop="bankId">
            <el-select
              v-model="addForm.bankId"
              :disabled="addForm.isBank==1?true:false"
              placeholder="请选择"
            >
              <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in classroomType"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认收款账户:" prop="isPayeeAcc">
            <!-- <el-input v-model="addForm.isPayeeAcc"></el-input> -->
            <el-radio v-model="addForm.isPayeeAcc" label="1">是</el-radio>
            <el-radio v-model="addForm.isPayeeAcc" label="2">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <!--备注 状态 -->
      <el-row>
        <el-col :span="16">
          <el-form-item label="备注:" prop="remark">
            <el-input
              maxlength="200"
              show-word-limit
              placeholder="请输入字符在200字以内"
              type="textarea"
              rows="1"
              v-model="addForm.remark"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:" prop="state">
            <el-select v-model="addForm.state" placeholder="请选择">
              <el-option label="可用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="addForm.isBank==2">
        <!-- 省别,地区-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="省别/地区:" prop="proviceId">
              <el-select v-model="addForm.proviceId" @change="selectProvince1">
                <el-option
                  v-for="(item,index) in provinceArr"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label prop="cityId">
              <el-select v-model="addForm.cityId" @change="selectCity1">
                <el-option
                  v-for="(item,index) in cityArr"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 开户网点,联行号-->
        <el-row>
          <el-col :span="16">
            <el-form-item label="开户网点:" prop="outletsId">
              <el-select v-model="addForm.outletsId" placeholder="请选择">
                <!-- <el-option
                :label="item.dictValue"
                :value="item.dictCode"
                v-for="(item,index) in orgIdNameArr"
                :key="index"
                ></el-option>-->
                <el-option label="开户网点" value="123"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联行号:" prop="bankNo">
              <el-input :disabled="true" v-model="addForm.bankNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
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
import { assignment } from "@/utils/publicMethod";
import { getDataById, addData, updateData } from "@/api/sam/classroom";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import { getAreaList } from "@/api/sam/orgext";
export default {
  data() {
    return {
      dialogFormVisible: false,
      addForm: {
        orgId: "", //机构
        account: "", //账号
        accountName: "", //账户名称
        proviceId: "", //省
        cityId: "", //市
        outletsId: "", //开户网点
        bankNo: "", //联银号
        remark: "", //备注信息
        bankId: "", //所属银行
        state: "", //状态
        isBank: "", //本他行
        isPayeeAcc: "", //默认收款账户
        id: 0
      },
      classroomType: [], //所属银行
      orgIdNameArr: [], //机构
      studentArr: [],
      provinceArr: [], //省
      cityArr: [], //市
      rules: {
        //账号
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        //所属银行
        bankId: [
          { required: true, message: "所属银行不能为空", trigger: "blur" }
        ],
        //账户名称
        accountName: [
          { required: true, message: "账户名称不能为空", trigger: "blur" }
        ],
        //省
        proviceId: [
          { required: true, message: "省份不能为空", trigger: "blur" }
        ],
        // 开户网点
        outletsId: [
          { required: true, message: "开户网点不能为空", trigger: "blur" },
          {
            min: 0,
            max: 200,
            message: "长度在200 个字符以内",
            trigger: "blur"
          }
        ],
        // isBank: [
        //   { required: true, message: "请填写正确的本他行", trigger: "blur" },
        //   {
        //     min: 0,
        //     max: 50,
        //     message: "长度在50 个字符以内",
        //     trigger: "blur"
        //   }
        // ],
        // isPayeeAcc: [
        //   { required: true, message: "请填写正确的楼层", trigger: "blur" },
        //   {
        //     min: 0,
        //     max: 10,
        //     message: "长度在10个字符以内",
        //     trigger: "blur"
        //   }
        // ],
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
    this.TypeName();
  },
  mounted() {},
  methods: {
    //获取省
    async getList() {
      // console.log('object :>> ', this.addForm.proviceId);
      let res = await getAreaList({
        parentId: 0
      });
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.provinceArr = data;
        let cs;
        if (this.addForm.proviceId != "") {
          cs = this.addForm.proviceId;
        } else {
          cs = data[0].id;
        }
        this.addForm.proviceId = cs;
        this.selectProvince(cs);
      }
    },
    //省里面选择市
    async selectProvince(item) {
      let res = await getAreaList({
        parentId: item
      });
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.cityArr = data;
        let cs;
        if (this.addForm.cityId) {
          cs = this.addForm.cityId;
          this.addForm.cityId = this.addForm.cityId;
        } else {
          cs = data[0].id;
          this.addForm.cityId = data[0].id;
        }
      }
    },
    //点击省
    async selectProvince1(item) {
      let res = await getAreaList({
        parentId: item
      });
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data;
        this.cityArr = data;
        this.addForm.cityId = data[0].id;
        this.selectCity1(data[0].id);
      }
    },
    //点击市
    async selectCity1(item) {
      this.addForm.cityId = item;
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
    //获取所属银行,机构
    TypeName() {
      getDataListByTypeArray({
        type: ["JSLX", "METHOD_SAM_SCHOOLLIST"]
      }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.classroomType = data.JSLX;
          this.orgIdNameArr = data.METHOD_SAM_SCHOOLLIST;
        }
      });
    },
    //添加
    async add() {
      console.log("this.addForm :>> ", this.addForm);
      //   let res = await addData(this.addForm);
      //   let data = res.data;
      //   // console.log(res);
      //   if (res && res.rsCode == "AAAAAAA") {
      //     this.$notify({
      //       title: "成功",
      //       message: "新增成功",
      //       type: "success"
      //     });
      //     this.$emit("clickBack", true);
      //   }
    },
    //修改
    async change() {
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
    //根据id获取数据
    async init(id) {
      this.addForm.id = id || "";
      this.$refs["addForm"].resetFields();
      //id存在为编辑
      if (this.addForm.id) {
        let res = await getDataById({ id: this.addForm.id });
        // console.log(res);
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          data.state = data.state + "";
          assignment(this.addForm, data);
          this.addForm.proviceId = 410000;
          this.addForm.cityId = 410500;
        }
      } else {
        //id不存在为新增
        assignment(this.addForm, {});
        this.addForm.state = "0";
        this.addForm.isBank = "1";
        this.addForm.isPayeeAcc = "1";
      }
      this.getList();
    }
  }
};
</script>