<template>
    <div class="inofRecord">
        <titleBar></titleBar>
        <div v-if="flag">
        <el-form ref="form" :model="sizeForm">
            <el-row>
                <el-col :span="8">
                   <el-form-item label="客户名称：" label-width="120px">
                        <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件类型：" label-width="120px">
                        <el-select v-model="sizeForm.certificateType" placeholder="证件类型">
                             <el-option label="全部" value></el-option>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件号码：" label-width="120px">
                        <el-input v-model="sizeForm.certificate" placeholder="证件号码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                <el-col :span="8">
                   <el-form-item label="身份证号：" label-width="120px">
                        <el-input v-model="sizeForm.identity" placeholder="身份证号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职务：" label-width="120px">
                        <el-select v-model="sizeForm.duty" placeholder="请选择">
                            <el-option label="全部" value></el-option>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门：" label-width="120px">
                        <el-select v-model="sizeForm.department" placeholder="请选择">
                            <el-option label="全部" value></el-option>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                   <el-form-item >
                        
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item >
                       
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item style="text-align:right;">
                        <el-button plain type="primary" @click="inquire">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
          <el-form ref="form1" :model="sizeForm">
            <el-row>
                <el-col :span="12">
                    <div >
                        <el-form-item>
                            <el-button plain type="primary" @click="del">删除</el-button>
                            <el-button plain type="primary" @click="allDel">全部删除</el-button>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="text-align:right">
                        <el-form-item>
                            <el-button plain type="primary" @click="print">打印预览</el-button>
                            <el-button plain type="primary" @click="expor">导出EXCEL</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="24">
                    <el-table
                    border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            prop="date"
                            label="档案号关联"
                            type="selection"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="客户名"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="性别">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="证件类型"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="证件号码"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="身份证号码">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="部门">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="职务">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="注册日期">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="预留电话">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="地址">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="客户有效期"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column width="100" align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="col_pagination">
                    <el-pagination
                        class="el_pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="4">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-form>
         </div>
        <Item v-else ref="reference" />
    </div>
</template>

<script>
    import Item from "./components/inofRecord_item.vue"
    export default {
      data(){
          return {
                flag:true,
                sizeForm: {
                    name: '',//客户名
                    certificateType: '',//证件类型
                    certificate: '',//证件号码
                    identity:"",//身份证号
                    duty: '',//职务
                    department: "",//部门
                },
                tableData: [{date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}],
                currentPage: 1,
                pageSize:5,
                multipleSelection:[],
        }
      },
      components:{Item},
       methods: {
        onSubmit() {
            console.log('submit!');
        },
        //表格事件
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },
        // 删除
        del(){},
        // 全部删除
        allDel(){},
        // 查询
        inquire(){
        console.log("inofRecord查询");
        },
        // 打印预览
        print() {
        console.log("inofRecord打印预览");
        },
        // 导出excel
        expor() {
        console.log("inofRecord导出excel");
        },
        // 查看
        handleEdit(index,row){
            this.flag=false
            this.$nextTick(()=>{
                this.$refs.reference.setTitle(row)
            })
            console.log(row)
        },
        // 每页条数
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
    }
</script>

<style lang="scss" scoped>
.inofRecord{
    width: 100%;
}
.el_pagination{
    margin: 0;
}
.col_pagination{
    border: 1px solid #F2F2F2;
    margin: 10px 0 0 0;
    height: 47px;
    display: flex;
    justify-content:flex-end;
    align-items: center;
}

</style>