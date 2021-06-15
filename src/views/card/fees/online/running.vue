<template>
    <div class="running">
            <titleBar></titleBar>
            <el-form :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开始日期：" label-width="120px" >
                           <el-input v-model="sizeForm.startdate" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束日期：" label-width="120px">
                            <el-input v-model="sizeForm.finishdate" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="支付渠道：" label-width="120px">
                            <el-select v-model="sizeForm.channel" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单状态：" label-width="120px" >
                            <el-select v-model="sizeForm.flag" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  style="text-align: right">
                            <el-button  type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
                    <el-col :span="8">
                        <el-form-item style="text-align: right" >
                           <el-button @click="print" type="primary">打印预览</el-button>
                           <el-button @click="derive" type="primary">导出EXCEL</el-button>
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
                            label="订单号"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="流水号">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="客户号"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="交易金额(元)"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="支付渠道"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="订单状态"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="机构"
                            align="center"
                            >
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
</template>

<script>
    export default {
        data(){
            return {
                flag:true,
                sizeForm:{
                    organization:"",//机构
                    startdate:"",//开始日期
                    finishdate:"",//结束日期
                    channel:"",//渠道
                    flag:"",//状态
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
        components:{},
        methods:{
            // 打印
            print(){
                console.log('tag', '打印')
            },
            // 导出
            derive(){
                console.log('tag', '导出')
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
.running{
    width: 100%;
}
</style>