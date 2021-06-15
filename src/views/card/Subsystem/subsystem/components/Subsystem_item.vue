<template>
    <div class="subsystem_item">
        <titleBar :title="!flag?'新增子系统':'修改子系统'"></titleBar>
        <div class="subsystem_main">
            <el-form :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-select v-model="ruleForm.value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="子系统编码：" label-width="120px" prop="coding">
                            <el-input v-model="ruleForm.coding" placeholder="请输入子系统编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="子系统名称：" label-width="120px" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入子系统名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="许可证：" label-width="120px">
                            <el-input v-model="ruleForm.licence" placeholder="请输入许可证"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注：" label-width="120px">
                            <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态：" label-width="120px">
                            <el-select v-model="ruleForm.value1" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col class="button" :span="24">
                    <el-button type="primary">提交</el-button>
                    <el-button @click="upper" type="primary">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                flag:0,
                ruleForm:{
                    name:"",
                    value:"",
                    value1:"",
                    coding:"",
                    licence:"",
                    remark:""
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                rules:{
                    name:[
                        { required: true, message: "请填写正确的子系统名称", trigger: "blur" }
                    ],
                    coding:[
                        { required: true, message: "请填写正确的子系统编码", trigger: "blur" }
                    ],
                }
            }
        },
        methods:{
            // 修改头
            addSun(data,id){
                this.flag=id?id:0
                console.log('tag', id)  
            },
            // 返回
            upper(){
                this.$parent.flag=true
                console.log('tag', '反会')
            }
        }
    }
</script>

<style lang="scss" scoped>
.subsystem_item{
    width: 100%;
    height: 100%;

}
.subsystem_main{
    width: 100%;
    height: 100px;
    padding: 5px 0 5px 0;
    border: 1px solid #f2f2ff;
}
.button{
    text-align:right;
    margin-top: 10px;
}
</style>