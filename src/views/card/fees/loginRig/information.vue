<template>
    <div class="information">
        <div v-if="flag">
            <titleBar></titleBar>
            <el-form :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item >
                            <el-button @click="addAccess" type="primary">新增</el-button>
                            <el-upload
                            style="display:inline-block;margin:0 10px"
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">导入</el-button>
                            </el-upload>
                            <el-button  type="primary">提交</el-button>
                            <el-button  type="primary">下载模板</el-button>
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
                            label="姓名"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="客户号(证件号)"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="部门(班级)">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="联系电话"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="费用类型"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="费用名称">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="费用金额(元)">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="失效日期">
                            </el-table-column>
                             <el-table-column
                            prop="address"
                            align="center"
                            label="备注">
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
    import Item from './components/information_item.vue'
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
.information{
    width: 100%;

}
</style>