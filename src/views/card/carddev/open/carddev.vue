<template>
    <div class="carddev">
        <titleBar></titleBar>
        <div>
            <el-form :rules="rules" :model="sizeForm">
                <el-row class="borderSize">
                    <el-col :span="24">
                        <el-form-item class="formItem" >
                            <span>客户信息</span>
                            <el-button @click="addCard" type="primary" plain>检索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="main-top">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="客户名称：" label-width="120px">
                                    <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册日期：" label-width="120px">
                                    <el-input v-model="sizeForm.date" placeholder="注册日期"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="账户有效期：" label-width="120px">
                                    <el-input v-model="sizeForm.accountDate" placeholder="账户有效期"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别：" label-width="120px">
                                    <el-select v-model="sizeForm.gender" placeholder="性别">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件类型：" label-width="120px">
                                    <el-select v-model="sizeForm.certype" placeholder="证件类型">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="预留电话：" label-width="120px">
                                    <el-input v-model="sizeForm.telephone" placeholder="预留电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件号码：" label-width="120px">
                                    <el-input v-model="sizeForm.cerNum" placeholder="证件号码"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="部门：" label-width="120px">
                                    <el-select v-model="sizeForm.department" placeholder="部门">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号：" label-width="120px">
                                    <el-input v-model="sizeForm.identity" placeholder="身份证号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职务：" label-width="120px">
                                    <el-select v-model="sizeForm.position" placeholder="职务">
                                        <el-option label="男" value="shanghai"></el-option>
                                        <el-option label="女" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="地址：" label-width="120px">
                                    <el-input v-model="sizeForm.address" placeholder="地址"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <img class="img" src="" alt="照片">
                    </div>
                </div>
                <el-row class="borderSize">
                    <el-col >
                        <el-form-item class="formItem formdev">
                            <span>卡片信息</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="卡号：" prop="cardNum">
                            <el-input v-model="sizeForm.cardNum" placeholder="请填写卡号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                    <el-col :span="8"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="卡类别：">
                            <el-select v-model="sizeForm.cardtype" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡有效期：" prop="period">
                            <el-input v-model="sizeForm.period" placeholder="卡有效期"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡别名：" prop="aliases">
                            <el-input v-model="sizeForm.aliases" placeholder="卡别名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡成本：">
                            <el-input v-model="sizeForm.CardCost" placeholder="卡成本" suffix-icon="yuan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡押金：">
                            <el-input v-model="sizeForm.CardDeposit" placeholder="卡押金"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"></el-col>
                </el-row>
                <el-row class="borderSize">
                    <el-col >
                        <el-form-item class="formItem formdev">
                            <span>账户信息</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="单笔限额：">
                            <el-input v-model="sizeForm.SingleLimit" placeholder="单笔限额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="单日限额：">
                            <el-input v-model="sizeForm.DailyLimit" placeholder="单日限额"></el-input>
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
                        <el-form-item class="formdev" style="text-align:right;background: #f2f2f2;">
                            <el-button class="btn" type="primary">开卡</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-dialog title="收货地址" :visible.sync="flag">
           <Item ref="Item"/> 
        </el-dialog>
        
    </div>
</template>

<script>
    import Item from './components/carddev_item.vue'
    export default {
        data(){
            return {
                flag:false,
                sizeForm:{
                    name:"",//客户名称：
                    date:"",//注册日期：
                    accountDate:"",//账户有效期
                    gender:"",//性别
                    certype:"",//证件类型
                    telephone:"",//预留电话
                    cerNum:"",//证件号码
                    department:"",//部门
                    identity:"",//身份证号
                    position:"",//职务
                    address:"",//地址
                    squareUrl:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg",//头像地址
                    cardNum:"",//卡号
                    cardtype:"",//卡类别
                    period:"",//有效期
                    aliases:"",//卡别名
                    CardCost:"",//卡成本
                    CardDeposit:"",//卡押金
                    SingleLimit:"",//单笔限额
                    DailyLimit:"",//单日限额

                },
                rules:{
                    cardNum:[
                        { required: true, message: "请填写卡号", trigger: "blur" }
                    ],
                    period:[
                        { required: true, message: "请填写卡号", trigger: "blur" }
                    ],
                    aliases:[
                        { required: true, message: "请填写卡号", trigger: "blur" }
                    ]
                }
            }
        },
        components:{Item},
        methods:{
            // 检索
            addCard(){ 
                this.flag=true 
                
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.carddev{
    width: 100%;
    height: 100%;
    .borderSize{
        border-bottom: 1px dashed #f2f2f2
    }
    .formItem{
        span{
            margin: 0 20px 0 0;
        }
        font-weight: bold;
    }
    .formdev{
        margin: 0;
    }
}
.main-top>div{
    margin-top: 13px;
}
.main-top{
    width: 100%;
    display: flex;
    div{
        &:nth-child(1){
            flex: 7;
        }
        &:nth-child(2){
            flex: 3;
            position: relative;
            // display: flex;
            // align-items: center;
            // justify-content: center;
        }
    }
}
.btn{
    margin: 5px 0 5px 0;
    margin-right: 10px;
}
.img{
    width: 131px;
    height: 182px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
</style>