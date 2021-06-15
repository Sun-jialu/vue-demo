<template>
    <div class="stair">
        <titleBar></titleBar>
            <el-form :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="分散因子1：" label-width="120px" prop="cardpass1">
                            <el-input v-model="sizeForm.cardpass1" placeholder="请输入6位数字"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分散因子2：" label-width="120px" prop="cardpass2">
                            <el-input v-model="sizeForm.cardpass2" placeholder="请输入6位数字"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="秘钥类型：" label-width="120px" prop="radio">
                                <el-radio v-model="sizeForm.radio" label="1">CPU卡</el-radio>
                                <el-radio v-model="sizeForm.radio" label="2">M1卡</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="24">
                        <el-form-item class="formItem" style="text-align:right">
                            <el-button class="btn" type="primary">提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 sizeForm:{
                    cardpass1:"",//分子1
                    cardpass2:"",//分子2
                    radio:"1",//卡
                },
                rules:{
                    cardpass1:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    cardpass2:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    radio:[
                        { required: true, message: "请选择", trigger: "blur" }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
 
   .formItem{
       padding: 5px 40px 5px 0;
       background: #f2f2ff
   }
</style>