<template>
    <div class="loginPass">
        <titleBar></titleBar>
        <div>
            <el-form ref="ruleForm" :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" label="旧密码：" prop="pass1">
                           <el-input v-model="sizeForm.pass1" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" label="新密码：" prop="pass2">
                            <el-input v-model="sizeForm.pass2" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" label="确认密码：" prop="pass3">
                            <el-input v-model="sizeForm.pass3" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="form_footer" style="text-align:right;">
                            <el-button @click="addFn" type="primary">提交</el-button>
                            <el-button  type="primary">返回</el-button>
                        </el-form-item>
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
                flag:false,
               sizeForm:{
                   pass1:"",//旧密码
                   pass2:"",//新密码
                   pass3:"",//确认密码
                   
                },
                rules:{
                    pass1:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    pass2:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    pass3:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            // 提交
            addFn(){
               
                        console.log('error submit!!');
                  
            },
            // 修改头负赋值数据
            setTitle(data){
                console.log('tag', data)
                if(data&&data.id){
                    this.flag=false
                }else{
                    this.flag=true
                }
            },
            // 返回
            getBack(){
                this.$parent.flag=true
                console.log('tag', '888888')
            }
        }
    }
</script>

<style lang="scss" scoped>
.loginPass{
    width: 100%;
    height: 100%;
}
</style>