<template>
    <div class="stair">
        <titleBar></titleBar>
            <el-form :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-select v-model="sizeForm.certype" placeholder="请选择">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                     <el-col :span="8"></el-col>
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
                    certype:"",//分子1
                   
                },
                rules:{
                    certype:[
                        { required: true, message: "请填写", trigger: "blur" }
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