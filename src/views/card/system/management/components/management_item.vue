<template>
    <div class="management_item">
            <titleBar :title="flag?'新增':'修改'" ></titleBar>
            <el-form :rules="rules" :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="角色名称：" label-width="120px" prop="admin">
                            <el-input v-model="sizeForm.admin" placeholder="请输入内容"></el-input>
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
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="角色权限：" label-width="120px" >
                            <el-cascader
                                v-model="sizeForm.access"
                                :options="options"
                                :props="props"
                                clearable>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <!--  -->
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注：" label-width="120px">
                                    <el-input v-model="sizeForm.remark" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--  -->
                    </el-col>
                </el-row>
                <el-row>
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
        admin: "", //登录名
        flag: "", //状态
        remark: "", //备注
        access: "" //角色权限
      },
      rules: {
        admin: [{ required: true, message: "请输入内容", trigger: "blur" }],
        name: [{ required: true, message: "请输入内容", trigger: "blur" }]
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
.management_item {
  width: 100%;
}
</style>