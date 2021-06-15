<template>
    <div class="carddev_item">
        <el-form class="carddev_item_form" :model="sizeForm">
            <div class="carddev_item_top">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="客户名称：" label-width="120px">
                            <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件类型：" label-width="120px">
                            <el-select v-model="sizeForm.certype" placeholder="请选择">
                                <el-option label="全部" value></el-option>
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件号码：" label-width="120px">
                            <el-input v-model="sizeForm.identity" placeholder="证件号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门：" label-width="120px">
                            <el-select v-model="sizeForm.section" placeholder="请选择">
                                <el-option label="全部" value></el-option>
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户号：" label-width="120px">
                            <el-input v-model="sizeForm.client" placeholder="客户号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item style="text-align: right;">
                            <el-button plain type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-table
                        ref="singleTable"
                        border
                        :data="tableData"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        style="width: 100%">
                        <el-table-column
                        width="50"
                        align="center">
                        <template slot-scope="scope">
                            <el-radio v-model="radio"  :label="scope.row.id">
                                <div></div>
                            </el-radio>
                        </template>
                        </el-table-column>
                        <el-table-column
                        property="date"
                        label="客户名称"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="客户号"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        property="address"
                        align="center"
                        label="证件类型">
                        </el-table-column>
                         <el-table-column
                        property="date"
                        label="证件号码"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="档案关联号"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        property="address"
                        align="center"
                        label="部门">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="CurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,20,30,40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
            <div class="carddev_item_footer">
                <el-row>
                    <el-col :span="24">
                        <el-form-item style="text-align:right;">
                            <el-button @click="okCard" type="primary">确定</el-button>
                            <el-button @click="offCard" type="primary">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="单笔限额：" label-width="120px">
                            <el-input v-model="sizeForm.single" placeholder="">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单日限额：" label-width="120px">
                            <el-input v-model="sizeForm.days" placeholder="">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                </el-row>
                <el-row class="borderSize">
                    <el-col >
                        <el-form-item class="formItem formdev">
                            <span>操作</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="form_footer" style="text-align:right;">
                            <el-button type="primary">开卡</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                sizeForm:{
                    name:"",//客户名称
                    certype:"",//证件类型
                    identity:"",//身份证号 
                    section:"",//部门
                    client:"",//客户号
                    single:0,//单笔限额
                    days:0,//单日限额
                },
                tableData: [{
                    id:1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    },{
                    id:2,
                    date: '2016-05-02',
                    name: '王大虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }],
                radio:1,   
                currentRow: null,//表格选中的数据
                currentPage: 1,//当前页
                pageSize: 4,//每页显示几条
                total:10,//总条数
                
            }
        },
        methods: {
            //表格
            // 取消表格 setCurrent(tableData[1])
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            // 选中表格数据
            handleCurrentChange(val) {
                console.log('sss', val)
                this.radio=val.id
                this.currentRow = val;
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            CurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //确定
            okCard(){
                console.log('tag', '确定')
            },
            //取消
            offCard(){
                this.$parent.$parent.flag=false
            }
        }        
    }
</script>

<style lang="scss" scoped>
.carddev_item{
    // width: 100%;
    // height: 100%;
    // background:rgba($color: #000000, $alpha: .6);
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 99;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .carddev_item_form{
        background: #f2f2f2;
    }
}
.carddev_item_top{
    border: 1px solid #f2f2f2;
    padding: 5px;
    .el-row{
        &:nth-child(1){
            margin-top: 15px;
        }
    }
}
.el-table{
    margin-top: 15px;
}

.carddev_item_footer{
    margin-top: 15px;
    background: #f2f2f2;
    padding: 5px 10px 0 0 ;
    .borderSize{
        border-bottom: 1px dashed #f2f2f2
    }
    .formItem{
        span{
            margin: 0 20px 0 20px;
        }
        font-weight: bold;
    }
    .formdev{
        margin: 0;
    }
    .form_footer{
        margin-bottom: 10px;
    }
}
</style>