<template>
    <div class="operator">
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
                        <el-form-item label="登录名：" label-width="120px" >
                            <el-select v-model="sizeForm.logName" clearable placeholder="请选择">
                                <el-option label="全部" value></el-option>
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                   <el-col :span="8">
                        <el-form-item label="操作类型：" label-width="120px" >
                            <el-select v-model="sizeForm.operationType" clearable placeholder="请选择">
                                <el-option label="全部" value></el-option>
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                 <el-col :span="8">
                        <el-form-item label="开始日期：" label-width="120px">
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
                    <el-col :span="8">
                        <el-form-item style="text-align:right">
                            <el-button  type="primary">查询</el-button>
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
                            label="机构"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="登录名"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="姓名">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="操作类型"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="操作时间"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="描述">
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
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pageCount"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-form>            
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                flag:true,
                sizeForm:{
                    organization:"",//机构
                    logName:"",//登录名
                    operationType:"",//振作状态
                    startDate:"",//开始时间
                    endDate:"",//结束时间
                },
                tableData: [],
                total: 4,
                pageNum: 1,
                pageCount: 4
            }
        },
        components:{
            // 123
        },
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
.operator{
    width: 100%;

}
</style>