<template>
    <div class="organization_item">
        <titleBar :title="flag?'新增':'修改'"></titleBar>
        <div>
            <el-form :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="上级机构：">
                            <el-select  v-model="sizeForm.organization" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="机构编码：" prop="coding">
                               <el-input  v-model="sizeForm.coding" placeholder="机构编码"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label-width="120px" label="机构名称：" prop="name">
                               <el-input  v-model="sizeForm.name" placeholder="机构名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="省份：">
                            <el-select  v-model="sizeForm.province" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item label-width="120px" label="市/州：">
                            <el-select  v-model="sizeForm.city" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item label-width="120px" label="区/县：">
                            <el-select  v-model="sizeForm.county" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="联系人：">
                            <el-input  v-model="sizeForm.linkman" placeholder="联系人："></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="联系电话：" prop="aliases">
                            <el-input v-model="sizeForm.phone" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="地址：">
                            <el-input  v-model="sizeForm.site" placeholder="地址："></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="机构空间：">
                            <el-input  v-model="sizeForm.space" placeholder="机构空间："></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="状态：">
                            <el-select  v-model="sizeForm.state" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
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
                            <el-button type="primary">提交</el-button>
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
                   organization:"",//上级机构
                   coding:"",//机构编码
                   name:"",//机构名称
                   province:"",//省份
                   city:"",//市
                   county:"",//县
                   linkman:"",//联系人
                   phone:"",//联系电话
                   site:"",//地址
                   space:"",//机构空间
                   state:"",//状态
                },
                rules:{
                    coding:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    name:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
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
.organization_item{
    width: 100%;
    height: 100%;
}
</style>