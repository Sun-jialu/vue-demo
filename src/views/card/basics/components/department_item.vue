<template>
    <div class="department_item">
        <titleBar :title="flag?'新增部门信息':'修改部门信息'"></titleBar>
        <div>
            <el-form ref="ruleForm" :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="机构：">
                            <el-select  v-model="sizeForm.organization" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="上级部门：" prop="superior">
                               <el-select  v-model="sizeForm.superior" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label-width="120px" label="部门名称：" prop="name">
                               <el-input  v-model="sizeForm.name" placeholder="部门名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="部门简称：">
                            <el-input  v-model="sizeForm.short" placeholder="部门简称"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item label-width="120px" label="状态：">
                            <el-select  v-model="sizeForm.state" placeholder="请选择">
                                <el-option label="可用" value="0"></el-option>
                                <el-option label="禁用" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="form_footer" style="text-align:right;">
                            <el-button @click="addFn" type="primary">提交</el-button>
                            <el-button @click="getBack" type="primary">返回</el-button>
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
                   organization:"",//机构
                   superior:"",//上级部门
                   name:"",//部门名称
                   short:"",//部门简称
                   state:"",//状态
                },
                rules:{
                    superior:[
                        { required: true, message: "请填写", trigger: "change" }
                    ],
                    name:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            // 提交
            addFn(){
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
.department_item{
    width: 100%;
    height: 100%;
}
</style>