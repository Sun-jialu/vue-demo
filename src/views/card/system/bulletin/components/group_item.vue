<template>
    <div class="group_item">
            <titleBar :title="flag?'新增公告组':'修改公告组'" ></titleBar>
            <el-form :rules="rules" :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px" >
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公告组名称：" label-width="120px" prop="name">
                            <el-input v-model="sizeForm.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注：" label-width="120px" >
                            <el-input v-model="sizeForm.remark" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="状态：" label-width="120px" >
                            <el-select v-model="sizeForm.flag" clearable placeholder="请选择">
                                <el-option label="可用" value="1"></el-option>
                                <el-option label="禁用" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item >
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="成员：" label-width="120px" prop="multipleSelection">
                            <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                label="机构"
                                width="120">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="登录名"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="姓名"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="联系电话"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="角色"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="有效期"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
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
        name: "", //公告组名称：
        remark:"",//备注
        flag:"",//状态
        multipleSelection: []

      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        multipleSelection: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      props: { multiple: true },
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
      },
    //   选择表格
    handleSelectionChange(val) {
        this.sizeForm.multipleSelection = val;
        console.log('tag', this.sizeForm.multipleSelection)
      }
  }
};
</script>

<style lang="scss" scoped>
.group_item {
  width: 100%;
}
// .offter{
//     background: #F2F2F2;
    
// }
</style>