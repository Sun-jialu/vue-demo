<template>
    <div class="noticeAdministrator_item">
            <titleBar :title="flag?'新增公告':'修改公告'" ></titleBar>
            <el-form :rules="rules" :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px" >
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="公告标题：" label-width="120px" prop="title">
                            <el-input v-model="sizeForm.title" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="公告类型：" label-width="120px" >
                            <el-input v-model="sizeForm.type" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开始日期：" label-width="120px" prop="startDate">
                            <el-date-picker
                            v-model="sizeForm.startDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束日期：" label-width="120px" >
                            <el-date-picker
                            v-model="sizeForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="公告组：" label-width="120px" >
                            <el-input v-model="sizeForm.group" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="备注：" label-width="120px" >
                            <el-input v-model="sizeForm.remark" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="公告内容：" label-width="120px" >
                            
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
        title: "", //公告标题：
        type:"",//公告类型：
        startDate: "", //开始时间
        endData: "", //结束时间
        group:"",//公告组
        remark:"",//备注

      },
      rules: {
        title: [{ required: true, message: "请输入内容", trigger: "blur" }],
        startDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
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
.noticeAdministrator_item {
  width: 100%;
}
// .offter{
//     background: #F2F2F2;
    
// }
</style>