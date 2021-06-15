<template>
    <div class="addRecord">
        <div v-if="flag">
            <titleBar></titleBar>
            <el-form :model="sizeForm" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item >
                            <el-button @click="addAccess" type="primary">新增</el-button>
                            <el-button  type="primary">批量新增</el-button>
                            <el-button  type="primary">提交</el-button>
                            <el-button  type="primary">下载模板</el-button>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            >
                            <el-table-column
                            prop="date"
                            label="档案号关联"
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
                            label="客户有效期">
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
                            :current-page="pageNum"
                            :page-sizes="[1, 2, 3, 4]"
                            :page-size="pageCount"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-form>            
        </div>
        <Item ref="reference" v-else />
    </div>
</template>

<script>
    import Item from './components/addRecord_item.vue'
    export default {
        data(){
            return {
                flag:true,
                sizeForm:{
                    organization:""
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
                total: 4,
                pageNum: 1,
                pageCount: 4
            }
        },
        components:{Item},
        methods:{
            // 新增
            addAccess(){
                this.flag=false
            },
            // 每页条数
            handleSizeChange(val) {
            console.log(`每页 ${val} 条`,"1");
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`,"2");
            },
        }
    }
</script>

<style lang="scss" scoped>
.addRecord{
    width: 100%;

}
</style>