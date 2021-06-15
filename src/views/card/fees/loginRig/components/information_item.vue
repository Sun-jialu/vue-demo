<template>
    <div class="information_item">
        <titleBar :title="flag?'新增':'修改'"></titleBar>
        <div>
            <el-form :rules="rules" :model="sizeForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="姓名：" prop="name">
                             <el-input  v-model="sizeForm.name" placeholder="机构编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="客户号：" prop="client">
                               <el-input  v-model="sizeForm.client" placeholder="客户号"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label-width="120px" label="部门：" prop="department">
                               <el-select  v-model="sizeForm.department" placeholder="请选择">
                                    <el-option label="男" value="shanghai"></el-option>
                                    <el-option label="女" value="beijing"></el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="联系电话：" prop="phone">
                              <el-input  v-model="sizeForm.phone" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item label-width="120px" label="费用类型：" prop="type">
                            <el-select  v-model="sizeForm.type" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                         <el-form-item label-width="120px" label="费用名称：" prop="nameRig">
                            <el-input  v-model="sizeForm.nameRig" placeholder="费用名称："></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="费用金额：" prop="money">
                            <el-input  v-model="sizeForm.money" placeholder="费用金额：">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="失效日期：" prop="expiryDate">
                              <el-date-picker
                                v-model="sizeForm.expiryDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="备注：">
                            <el-input  v-model="sizeForm.remark" placeholder="备注"></el-input>
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
                   name:"",//姓名
                   client:"",//客户号
                   department:"",//部门
                   phone:"",//手机号
                    type:"",//费用类型
                    nameRig:"",//费用名称
                    money:"",//费用金额
                    expiryDate:"",//失效日期
                    remark:"",//备注
                },
                rules:{
                    client:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    name:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    department:[
                        { required: true, message: "请填写", trigger: "change" }
                    ],
                     phone:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    type:[
                        { required: true, message: "请填写", trigger: "change" }
                    ],
                     nameRig:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                    money:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
                     expiryDate:[
                        {required: true, message: "请填写", trigger: "change" }
                    ],
                    remark:[
                        { required: true, message: "请填写", trigger: "blur" }
                    ],
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
.information_item{
    width: 100%;
    height: 100%;
}
</style>