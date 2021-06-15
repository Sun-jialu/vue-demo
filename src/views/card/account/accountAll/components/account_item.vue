<template>
    <div class="message">
        <el-form ref="form1" :model="sizeForm">
                <el-row style="border-bottom: 1px dashed #F2F2F2;">
                    <el-col class="title" style="height:42px;" :span="24">
                        <span >账户信息[1158255555]</span>
                    </el-col>
                </el-row>
                <el-row class="message_mian">
                        <el-col :span="8">
                        <el-form-item label="账户总额：" label-width="120px">
                                <el-input v-model="sizeForm.name" :disabled="true" placeholder="账户总额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单笔交易：" label-width="120px">
                                <el-input v-model="sizeForm.name" :disabled="true" placeholder="单笔交易"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单日限额：" label-width="120px">
                                <el-input v-model="sizeForm.name" :disabled="true" placeholder="单日限额"></el-input>
                            </el-form-item>
                        </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                    <el-form-item label="现金账户余额：" label-width="120px">
                            <el-input v-model="sizeForm.name" :disabled="true" placeholder="现金账户余额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交易次数：" label-width="120px">
                            <el-input v-model="sizeForm.name" :disabled="true" placeholder="交易次数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最后交易日期：" label-width="120px">
                            <el-input v-model="sizeForm.name" :disabled="true" placeholder="最后交易日期"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <el-form ref="form2" :model="sizeForm_1">
                <el-row style="border-bottom: 1px dashed #F2F2F2;">
                    <el-col class="title" style="height:42px;" :span="24">
                        <span >钱包账户信息</span>
                    </el-col>
                </el-row>
                <el-row class="message_mian">
                        <el-col :span="24">
                            <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="客户号"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="钱包类型"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="状态"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="date"
                                label="余额"
                                header-align="center"
                                align="right"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="开户信息"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="最后交易日期"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                            </el-table>
                        </el-col>
                </el-row>
        </el-form>
        <el-form ref="form3" :model="sizeForm_2">
                <el-row style="border-bottom: 1px dashed #F2F2F2;">
                    <el-col class="title" style="height:42px;" :span="24">
                        <span >账户信息[1158255555]</span>
                    </el-col>
                </el-row>
                <el-row class="message_mian">
                        <el-col :span="24">
                              <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="卡号"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="卡类别"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="状态"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="date"
                                label="主副卡"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="开户日期"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="最后交易日期"
                                header-align="center"
                                align="center"
                                >
                                </el-table-column>
                            </el-table>
                        </el-col>
                </el-row>
            </el-form> 
            
        </div>
</template>

<script>
    export default {
        data(){
            return {
                 sizeForm: {
                    name: ''
                },
                 tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }],
            }
        }
    }
</script>

<style lang="scss" scoped>
.message{
    width: 100%;
    margin-top: 10px;
    .title{
       display: flex;
       align-items: center;
       font-weight: bold;
       span{
           padding:0 0 0 10px;
       }
    }
    .message_mian{
        margin-top: 18px;
    }
    .el-form{
        border: 1px solid #F2F2F2;
        margin-top: 10px;
        &:nth-child(1){
            margin-top: 0
        }
    }
}
</style>