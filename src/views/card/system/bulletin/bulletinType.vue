<template>
    <div class="bulletinType">
        <div v-if="flag">
            <titleBar></titleBar>
            <el-form :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公告类型：" label-width="120px" >
                            <el-input v-model="sizeForm.type" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  style="text-align: right">
                            <el-button  type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item >
                            <el-button @click="addAccess" type="primary">新增</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
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
                            label="机构"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="公告类型">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="备注"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="状态"
                            align="center"
                            >
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
    import Item from './components/bulletinType_item.vue'
    export default {
        data(){
            return {
                flag:true,
                sizeForm:{
                    organization:"",//机构分组名称
                    type:"",//公告类型
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
            //   编辑
            handleEdit(index, row) {
                this.flag=false
                this.$nextTick(()=>{
                    this.$refs.reference.setTitle(row)
                })
                console.log(index, row);
            },
        }
    }
</script>

<style lang="scss" scoped>
.bulletinType{
    width: 100%;
}
</style>