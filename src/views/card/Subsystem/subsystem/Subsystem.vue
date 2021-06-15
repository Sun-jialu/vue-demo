<template>
    <div class="Subsystem">
        <titleBar></titleBar>
        <!-- main -->
        <div v-if="flag">
                <div class="Subsystem_top">
                    <el-form :model="sizeForm" class="search-form--wrap">
                        <div class="Subbox">
                        <el-row>
                                <el-col :span="8" >
                                    <el-form-item label="机构：" label-width="120px">
                                        <el-select v-model="sizeForm.region" placeholder="选择社区">
                                            <el-option label="阿萨德" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="状态：" label-width="120px">
                                        <el-select v-model="sizeForm.region" placeholder="证件类型">
                                            <el-option label="全部" value></el-option>
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item style="text-align:right;">
                                        <el-button plain type="primary"  @click="inquire">查询</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row> 
                        </div>
                    </el-form>
            </div>
            <!-- 新增 -->
            <el-row :span="24">
                <el-button  class="btn" plain type="primary"  @click="addOrganization">新增</el-button>
            </el-row>
            <!-- 表格 -->
            <el-row >
                <el-col :span="24">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="机构"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="子系统编码"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="子系统名称"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="许可证信息"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="备注"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="状态"
                        align="center"
                        header-align="center">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        header-align="center"
                        width="100"
                        align="center">
                            <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" >修改</el-button>
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
        </div>
       <!-- 组件 -->
        <Item ref="addSun" v-else />
    </div>
</template>

<script>
import Item from './components/Subsystem_item'
    export default {
        data(){
            return {
                flag:true,
                sizeForm:{
                    name:"",
                    page:"",
                    region:""
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
            // 查询
            inquire(){
                console.log("查询")
            },
            // 新增
            addOrganization(){
                this.flag=false
                this.$nextTick(()=>{
                   this.$refs.addSun.addSun({},0)
                })
                console.log('tag', "新增")
            },
            // 修改
            handleClick(data){
                this.flag=false
                this.$nextTick(()=>{
                   this.$refs.addSun.addSun(data,1)
                })
                console.log(data, "修改")
            },
            // 每页条数
            handleSizeChange(val) {
            console.log(`每页 ${val} 条`,"1");
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`,"2");
            }
        }
    }
</script>

<style lang="scss" scoped>
.Subsystem{
    width: 100%;
}
.Subsystem_top{
    width: 100%;
    height: 55px;
    border: 1px solid #F2F2F2;
    padding: 10px 20px 10px 0;
    .el-form-item{
        margin: 0;
    }
    
}
.btn{
    margin: 20px 0 20px 0;
}
</style>