<template>
    <div class="grouping_item">
            <titleBar :title="flag?'新增支付渠道':'修改支付渠道'" ></titleBar>
            <el-form :rules="rules" :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px" prop="organization">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="渠道名称：" label-width="120px" prop="name">
                            <el-input v-model="sizeForm.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户收款账号：" label-width="120px" prop="account">
                            <el-input v-model="sizeForm.account" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商户PID：" label-width="120px" prop="PID">
                            <el-input v-model="sizeForm.PID" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="应用ID：" label-width="120px" prop="useId">
                            <el-input v-model="sizeForm.useId" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态：" label-width="120px" >
                            <el-select v-model="sizeForm.flag" clearable placeholder="请选择">
                                <el-option label="可用" value="1"></el-option>
                                <el-option label="禁用" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="24">
                        <el-form-item label="商户秘钥：" label-width="120px" prop="tenantKey">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="sizeForm.tenantKey">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="24">
                        <el-form-item label="平台支付公钥：" label-width="120px" >
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="sizeForm.alipayKey">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="24">
                        <el-form-item label="交易查询公钥：" label-width="120px" >
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="sizeForm.inquire">
                            </el-input>
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
        organization: "", //机构
        account: "", //收款账户
        name:"",//渠道名称
        PID:"",//商户PID
        useId:"",//应用ID
        flag:"",//状态
        tenantKey:"",//商户秘钥
        alipayKey:"",//平台支付公钥
        inquire:"",//交易查询公钥

      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        account: [{ required: true, message: "请输入内容", trigger: "blur" }],
        PID: [{ required: true, message: "请输入内容", trigger: "blur" }],
        useId: [{ required: true, message: "请输入内容", trigger: "blur" }],
        tenantKey: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
.grouping_item {
  width: 100%;
}
// .offter{
//     background: #F2F2F2;
    
// }
</style>