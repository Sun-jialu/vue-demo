<template>
    <div class="applyInof_item">
            <titleBar :title="flag?'新增职务信息':'修改职务信息'" ></titleBar>
            <el-form :rules="rules" :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="申请批次号：" label-width="120px" >
                            <el-input v-model="sizeForm.apply" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名：" label-width="120px" prop="name" >
                            <el-input v-model="sizeForm.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" label-width="120px" >
                            <el-select v-model="sizeForm.sex" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="证件类型：" label-width="120px" >
                            <el-select v-model="sizeForm.certificateType" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件号码：" label-width="120px" prop="applyNum">
                            <el-input v-model="sizeForm.applyNum" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证号：" label-width="120px" >
                            <el-input v-model="sizeForm.identity" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门：" label-width="120px" >
                            <el-select v-model="sizeForm.department" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请金额：" label-width="120px" prop="money">
                            <el-input v-model="sizeForm.money" placeholder="请输入内容">
                                <div slot="suffix">元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请说明：" label-width="120px" prop="explain" >
                            <el-input v-model="sizeForm.explain" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                       <el-form-item label="备注：" label-width="120px" >
                            <el-input v-model="sizeForm.remark" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="offter">
                    <el-col :span="8">
                        <el-form-item ></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item ></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item style="text-align:right">
                            <el-button @click="addAccess" type="primary">提交</el-button>
                            <el-button @click="goBack" type="primary">返回</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>            
    </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      sizeForm: {
        apply: "", //申请批次号：
        sex: "", //性别
        name:"",//登录名
        certificateType:"",//证件类型
        applyNum:"",//证件号码
        identity:"",//身份证号
        department:"",//部门
        money:"",//申请金额
        explain:"",//申请说明
        remark:"",//备注
      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        applyNum: [{ required: true, message: "请输入内容", trigger: "blur" }],
        money: [{ required: true, message: "请输入内容", trigger: "blur" }],
        explain: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: "东南",
          children: [
            {
              value: 2,
              label: "上海",
              children: [
                { value: 3, label: "普陀" },
                { value: 4, label: "黄埔" },
                { value: 5, label: "徐汇" }
              ]
            },
            {
              value: 7,
              label: "江苏",
              children: [
                { value: 8, label: "南京" },
                { value: 9, label: "苏州" },
                { value: 10, label: "无锡" }
              ]
            },
            {
              value: 12,
              label: "浙江",
              children: [
                { value: 13, label: "杭州" },
                { value: 14, label: "宁波" },
                { value: 15, label: "嘉兴" }
              ]
            }
          ]
        },
        {
          value: 17,
          label: "西北",
          children: [
            {
              value: 18,
              label: "陕西",
              children: [
                { value: 19, label: "西安" },
                { value: 20, label: "延安" }
              ]
            },
            {
              value: 21,
              label: "新疆维吾尔族自治区",
              children: [
                { value: 22, label: "乌鲁木齐" },
                { value: 23, label: "克拉玛依" }
              ]
            }
          ]
        }
      ]
    };
  },

  methods:{
    //   提交
      addAccess(){
          console.log('tag', this.sizeForm.access)
      },
    //   设置
      setTitle(data){
                console.log('tag', data)
                this.flag=false
                // if(data&&data.id){
                //     
                // }else{
                //     this.flag=true
                // }
            },
    //   返回
      goBack(){
          this.$parent.flag=true
      }
  }
};
</script>

<style lang="scss" scoped>
.applyInof_item {
  width: 100%;
}
// .offter{
//     background: #F2F2F2;
    
// }
</style>