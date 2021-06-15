<template>
  <div class="m-">
    <!-- 存放ukey的div -->
    <div id="divTxt"></div>
  </div>
</template>
<script>
import "@/utils/jquery.min.js";
export default {
  props: ["value"],
  data() {
    return {
      CryptoAgent: "", //ukey
      cnCode:"",//ukey编号
    };
  },
  activated() {
    console.log('uKey.vue页面 :>> ', 123);
    this.getKey();
  },
  methods: {
    //获取ukeys
    getKey() {
      this.OnLoad();
      //检测Ukey
      var isUkeyOk = this.SelectCertificateOnClick();
      if (!isUkeyOk) {
        return false;
      }
      //生成签名
      let srcdata = this.value + "";
      var signdata = this.generSignature(srcdata);
      this.$emit('getUkey',{signdata:signdata,cnCode:this.cnCode})
    },
    // 页面上存储的ukey
    OnLoad() {
      try {
        var eDiv = document.getElementById("divTxt");
        if (
          navigator.appName.indexOf("Internet") >= 0 ||
          navigator.appVersion.indexOf("Trident") >= 0
        ) {
          if (window.navigator.cpuClass == "x86") {
            //执行
            eDiv.innerHTML =
              '<object id="this.CryptoAgent" style="display:none;" codebase="CryptoKit.CEBBank.x86.cab" classid="clsid:9BA792DB-36D3-4DFE-8E62-756EC0B6B67E" ></object>';
          } else {
            eDiv.innerHTML =
              '<object id="this.CryptoAgent" style="display:none;" codebase="CryptoKit.CEBBank.x64.cab" classid="clsid:0220B50B-B612-48DF-A585-85730F2A4B15" ></object>';
          }
        } else {
          eDiv.innerHTML =
            '<embed id="this.CryptoAgent" type="application/npCryptoKit.CEBBank.x86" style="height: 0px; width: 0px; display:none;">';
        }
      } catch (e) {
        alert(e);
        return;
      }
      this.CryptoAgent = document.getElementById("this.CryptoAgent");
    },
    //数据验签方法
    generSignature(source) {
      try {
        //poin-config.js中获取该参数，如果为true进行签名（测试版已忽略该步）

        //拼接Ukey 编号+验签原文
        var cnCode = this.CryptoAgent.GetSignCertInfo("SubjectCN");
        this.cnCode=cnCode
        source = cnCode + "," + source;
        var signType = "Detach"; //pck7不带原文签名
        var bSignType = false;
        var selectedAlg = "SHA-1"; //"SHA-256";
        if (!source) {
          return null;
        }
        var signature = this.CryptoAgent.SignMsgPKCS7(
          source,
          selectedAlg,
          bSignType
        ); //pck7不带原文签名

        if (!signature) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc();
          alert(errorDesc);
        }
      } catch (e) {
        var errorDesc = this.CryptoAgent.GetLastErrorDesc();
        alert(errorDesc);
      }
      return signature;
    },
    //触发选中Ukey证书方法
    SelectCertificateOnClick() {
      try {
        var subjectDNFilter = "";
        var issuerDNFilter = "";
        var serialNumFilter = "";
        var sm2CSPNameList = "";
        var bSelectCertResult = "";
        sm2CSPNameList =
          "CFCA FOR UKEY CSP v1.1.0||JinKe Token illustrate CSP v1.1.0";

        bSelectCertResult = this.CryptoAgent.SelectCertificate(
          subjectDNFilter,
          issuerDNFilter,
          serialNumFilter,
          sm2CSPNameList
        );
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!bSelectCertResult) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc();
          alert("未检测到证书，请确认UKEY已插入且UKEY控件已正确安装!");
          return false;
        }
      } catch (e) {
        alert("未检测到证书，请确认UKEY已插入且UKEY控件已正确安装!");
        return false;
      }
      return true;
    }
  }
};
</script>