<template>
  <div class="account">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="account1">
      <!-- 顶部form表单 -->
      <el-form
        :rules="rules"
        :model="dataForm"
        class="demo-form-inline search-form--wrap"
        label-width="120px"
      >
        <!-- 账户，账号后四位 -->
        <el-col :span="13">
          <el-form-item label="账户:">
            <el-select clearable v-model="dataForm.accountName" @change="selectName" placeholder="请选择">
              <el-option
                :label="item.title"
                :value="item.id"
                v-for="(item,index) in newAccountArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="20px" prop="account">
            <el-input maxlength="4" show-word-limit v-model="dataForm.account" placeholder="账号后四位"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    //根据账号后四位过滤select账号内容
    var validateAccount = (rule, value, callback) => {
      if (value.length != 4) {
        this.dataForm.accountName = "";
        this.newAccountArr = this.accountArr;
        callback();
      } else {
        let arr = [];
        this.accountArr.forEach((item, index) => {
          if (
            item.title.slice(item.title.length - 4, item.title.length) == value
          ) {
            arr.push(item);
          }
        });
        this.newAccountArr = arr;
        callback();
      }
    };
    return {
      dataForm: {
        accountName: "", //账户
        account: "" //账号
      },
      accountArr: [
        { title: "1234567891100", id: 1 },
        { title: "1111111111100", id: 2 },
        { title: "0000000001110", id: 3 }
      ],
      newAccountArr: [], //v-modle绑定的账户下拉框
      rules: {
        //账户后四位
        account: [
          { required: false, validator: validateAccount, trigger: "change" }
        ]
      }
    };
  },
  activated() {},
  computed: {},
  mounted() {
    this.newAccountArr = this.accountArr;
  },
  methods: {
    selectName(item) {
      this.accountArr.forEach((item1,index1)=>{
        if(item1.id==item){
          this.dataForm.account=item1.title.slice(item1.title.length - 4, item1.title.length)
        }        
      })
      this.$emit("getValue", this.dataForm);
    }
  },
  created() {}
};
</script>

