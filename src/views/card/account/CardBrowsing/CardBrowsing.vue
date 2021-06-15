<template>
    <div class="carddev">
        <titleBar></titleBar>
        <div id="ocxdiv"></div>
        <div id="content" style="position:absolute;height: 0px;overflow: hidden;"> </div>
        <div>
            <el-form :rules="rules" :model="sizeForm">
                <el-row class="borderSize">
                    <el-col :span="24">
                        <el-form-item class="formItem" >
                            <span>客户信息</span>
                            <el-button @click="offcard()" type="primary" plain>读卡</el-button>
                            <el-button @click="addCard" type="primary" plain>检索</el-button>
                            <el-button type="primary" plain>修改</el-button>
                            <el-button type="primary" plain>重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="main-top">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="客户名称：" label-width="120px" prop="name">
                                    <el-input v-model="sizeForm.name" placeholder="客户名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="注册日期：" label-width="120px">
                                    <el-input :disabled="true" v-model="sizeForm.date" placeholder="注册日期"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="账户有效期：" label-width="120px" prop="accountDate">
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
                                <el-form-item label="预留电话：" label-width="120px" prop="telephone">
                                    <el-input v-model="sizeForm.telephone" placeholder="预留电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="证件号码：" label-width="120px" prop="cerNum">
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
                                <el-form-item label="身份证号：" label-width="120px" >
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
                            <el-col :span="12">
                                <el-form-item label="地址：" label-width="120px">
                                    <el-input v-model="sizeForm.address" placeholder="地址"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="客户号：" label-width="120px">
                                    <el-input :disabled="true" v-model="sizeForm.clientNum" placeholder="客户号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="图片：" label-width="120px">
                                    <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <span slot="tip" class="el-upload__tip">* 照片格式：jpg、png，推荐尺寸：480*640，大小不超过 100K *</span>
                                    </el-upload>
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
                        <el-form-item label-width="120px" label="卡号：">
                            <el-input :disabled="true" v-model="sizeForm.cardNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="卡状态：">
                            <el-select :disabled="true" v-model="sizeForm.cardState" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label-width="120px" label="卡类别：">
                            <el-select :disabled="true" v-model="sizeForm.cardtype" placeholder="请选择">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡成本：">
                            <el-input :disabled="true" v-model="sizeForm.CardCost" placeholder="卡成本" >
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡押金：">
                            <el-input :disabled="true" v-model="sizeForm.CardDeposit" placeholder="卡押金">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡有效期：" prop="period">
                            <el-input v-model="sizeForm.period" placeholder="卡有效期"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="开户日期：">
                            <el-input :disabled="true" v-model="sizeForm.openDate" placeholder="开户日期："></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡别名：" prop="aliases">
                            <el-input v-model="sizeForm.aliases" placeholder="卡别名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label-width="120px" label="卡片UID：">
                            <el-input :disabled="true" v-model="sizeForm.cardUid" placeholder="卡片UID："></el-input>
                        </el-form-item>
                    </el-col>
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
                        <el-form-item label-width="120px" label="账户总额：">
                            <el-input :disabled="true" v-model="sizeForm.management" placeholder="账户总额">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="单笔限额：">
                            <el-input v-model="sizeForm.SingleLimit" placeholder="单笔限额">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="单日限额：">
                            <el-input v-model="sizeForm.DailyLimit" placeholder="单日限额">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="现金账户余额：">
                            <el-input :disabled="true" v-model="sizeForm.cash" placeholder="现金账户余额：">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="交易次数：">
                            <el-input :disabled="true" v-model="sizeForm.trades" placeholder="交易次数：">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="最后交易日期：">
                            <el-input :disabled="true" v-model="sizeForm.offData" placeholder="最后交易日期">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row class="borderSize">
                    <el-col >
                        <el-form-item class="formItem formdev">
                            <span>操作</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="现金账户充值：">
                            <el-input v-model="sizeForm.recharge" placeholder="现金账户充值：">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label-width="120px" label="应收金额：">
                            <el-input :disabled="true" v-model="sizeForm.amount" placeholder="应收金额">
                                <div slot='suffix'>元</div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px">
                            <el-checkbox v-model="checked">是否打印借条</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="formdev" style="text-align:right;background: #f2f2f2;">
                            <el-button class="btn" type="primary">开卡</el-button>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
        </div>
        <el-dialog title="卡片查询" :visible.sync="flag">
           <Item ref="Item"/> 
        </el-dialog>
        
    </div>
</template>

<script>
import Item from "./components/CardBrowsing_item.vue";
import "@/utils/key/CardEP.js";
export default {
  data() {
    return {
      flag: false,
      checked1: false,
      checked: false,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      sizeForm: {
        name: "", //客户名称：
        clientNum: "", //客户号
        date: "", //注册日期：
        accountDate: "", //账户有效期
        gender: "", //性别
        certype: "", //证件类型
        telephone: "", //预留电话
        cerNum: "", //证件号码
        department: "", //部门
        identity: "", //身份证号
        position: "", //职务
        address: "", //地址
        squareUrl:
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg", //头像地址
        cardNum: "", //卡号
        cardtype: "", //卡类别
        period: "", //有效期
        aliases: "", //卡别名
        CardCost: "", //卡成本
        CardDeposit: "", //卡押金
        SingleLimit: "", //单笔限额
        DailyLimit: "", //单日限额
        recharge: "", //现金充值
        amount: "", //应收金额
        cardState: "", //卡状态
        openDate: "", //开户日期
        cardUid: "", //卡片UID
        management: "", //账户总额
        cash: "", //账户现金余额
        trades: "", //交易次数
        offData: "" //最后交易日期
      },
      rules: {
        name: [{ required: true, message: "请填写客户名称", trigger: "blur" }],
        accountDate: [
          { required: true, message: "请填写有效日期", trigger: "blur" }
        ],
        period: [{ required: true, message: "请填写有效期", trigger: "blur" }],
        aliases: [{ required: true, message: "请填写卡别名", trigger: "blur" }],
        telephone: [
          { required: true, message: "请填写预留电话", trigger: "blur" }
        ],
        cerNum: [{ required: true, message: "请填写证件号", trigger: "blur" }]
      }
    };
  },
  components: { Item },
  mounted() {
    let object = document.getElementById("ocxdiv");
    let ocxVersion = "#version=1,0,0,1";
    object.innerHTML =
      '<OBJECT CLASSID="CLSID:C4F4F7DF-B085-4D22-8BFA-68283233B682" CODEBASE="ocx/HbCard.CAB' +
      ocxVersion +
      '" ID="psam" name="psam" width="0" height="0" align="baseline">';
    console.log(object);
  },
  methods: {
    // 读卡
    offcard() {
       
      let data = {};
      data.GetUIDMode = "01";
      data.AppName = "BAE3B1A6B9C9B7DDB9ABCBBE";
      console.log("111111", window.cardservice);
      let object = window.cardservice.CMD_GETCARDUIDBYAID(data);
      console.log("object.data.UID", data, object);
      let offAppInfo = this.readOffAppCardInfo(); //读脱机应用卡
      console.log("offAppInfo", offAppInfo);
    },
    // 检索
    addCard() {
      this.flag = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件
    handlePreview(file) {
      console.log(file, "++++");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //点击删除时
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    readOffAppCardInfo() {
      let cardInfo = null;
      let data = {};
      data.AppName = "BAE3B1A6B9C9B7DDB9ABCBBE";
      // data.AppName = this.scope.userSession.APPID;// 脱机应用AID
      let object;
      object = window.cardservice.CMD_GETALLCARDINFO(data); // 卡户浏览

      if (object.success && object.data.CardID) {
        cardInfo = object.data;
      }
      return cardInfo;
    }
    // $("#add").click(function () {
    //     var data = {};
    //     data.GetUIDMode = "01";
    //     data.AppName = "BAE3B1A6B9C9B7DDB9ABCBBE";
    //     object = window.cardservice.CMD_GETCARDUIDBYAID(data);
    //     console.log('object.data.UID', object.data.UID)
    //     offAppInfo = readOffAppCardInfo();//读脱机应用卡
    //     console.log('offAppInfo', offAppInfo)
    // })
  }
};
</script>

<style lang="scss" scoped>
.carddev {
  width: 100%;
  height: 100%;
  .borderSize {
    border-bottom: 1px dashed #f2f2f2;
  }
  .formItem {
    span {
      margin: 0 20px 0 0;
    }
    font-weight: bold;
  }
  .formdev {
    margin: 0;
  }
}
.main-top > div {
  margin-top: 13px;
}
.main-top {
  width: 100%;
  display: flex;
  div {
    &:nth-child(1) {
      flex: 7;
    }
    &:nth-child(2) {
      flex: 3;
      position: relative;
      // display: flex;
      // align-items: center;
      // justify-content: center;
    }
  }
}
.btn {
  margin: 5px 0 5px 0;
  margin-right: 10px;
}
.img {
  width: 131px;
  height: 182px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.el-upload__tip {
  color: #f00;
  margin-left: 20px;
}
</style>