<template>
    <div class="account">
        <titleBar></titleBar>
        <el-form ref="form" :model="sizeForm">
            <el-row>
                <el-col :span="8">
                   <el-form-item label="客户名称：" label-width="120px">
                        <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件类型：" label-width="120px">
                        <el-select v-model="sizeForm.region" placeholder="证件类型">
                             <el-option label="全部" value></el-option>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="证件号码：" label-width="120px">
                        <el-input v-model="sizeForm.name" placeholder="证件号码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                <el-col :span="8">
                   <el-form-item label="身份证号：" label-width="120px">
                        <el-input v-model="sizeForm.name" placeholder="身份证号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门：" label-width="120px">
                        <el-select v-model="sizeForm.region" placeholder="部门">
                            <el-option label="全部" value></el-option>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预留电话：" label-width="120px">
                        <el-input v-model="sizeForm.name" placeholder="预留电话"></el-input>
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
                <el-col :span="24">
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
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="日期"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址"
                        header-align="center"
                        align="center">
                        
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="日期"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="日期"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        header-align="center"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址"
                        header-align="center"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        header-align="center"
                        align="center"
                       >
                         <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" >查看</el-button>
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
                        :current-page="currentPage4"
                        :page-sizes="[1, 2, 3, 4]"
                        :page-size="1"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="4">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-form>
        <Item v-if="flag" />
    </div>
</template>

<script>
    import Item from "./components/account_item.vue"
    export default {
      data(){
          return {
                flag:false,
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 1
        }
      },
      components:{Item},
       methods: {
        onSubmit() {
            console.log('submit!');
        },
        // 查询
        inquire(){
        console.log("account查询");
        },
        // 打印预览
        print() {
        console.log("account打印预览");
        },
        // 导出excel
        expor() {
        console.log("account导出excel");
        },
        // 查看
        handleClick(data){
            this.flag=true
            console.log(data)
        },
        // 每页条数
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
    }
</script>

<style lang="scss" scoped>
.account{
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