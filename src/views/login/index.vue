<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">666平台</h2>
          <p class="brand-info__intro"></p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="userName">
              <el-input
                v-model="dataForm.userName"
                placeholder="帐号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="dataForm.password"
                type="password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <!-- <img :src="captchaPath" @click="getCaptcha()" alt="" /> -->
                  <el-input v-model="captchaPath" disabled> </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- <el-form-item prop="captcha">
              <div>
                <span>下载安装：</span>
                <span class="spanTwo" @click="clickDown"
                  >安全密码控件 UKEY证书控件</span
                >
              </div>
            </el-form-item> -->
            <el-form-item>
              <el-button
                class="login-btn-submit"
                type="primary"
                @click="dataFormSubmit()"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUUID } from "@/utils";
import { sendMsgDateHand } from "@/utils/index";
export default {
  data() {
    return {
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: "",
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      captchaPath: "",
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.getInfo();
        }
      });
    },
    //下载插件
    clickDown() {
      console.log("11 :>> ", 11);
    },
    async getInfo() {
      if (this.dataForm.captcha != this.captchaPath) {
        this.$notify({
          title: "请输入正确的验证码",
          type: "warning",
        });
        this.getCaptcha();
      } else {
        var params = {
          username: this.dataForm.userName,
          password: this.dataForm.password,
          uuid: this.dataForm.uuid,
          captcha: this.dataForm.captcha,
        };
        const data = await this.$API.login.login(params);
        if (data && data.rsCode === "AAAAAAA" && data.code == 200) {
          this.$cookie.set("token", data.token, data.expire || 0);
          var { userMessage } = this.$store.state.user;
          userMessage.username = data.rsData.username;
          userMessage.userTypeName = data.rsData.userTypeName;
          userMessage.userType = data.rsData.userType;
          let token = data.token;
          this.$store.commit("user/updateUserInfo", userMessage);
          this.$store.commit("user/updateToken", token || "");
          sendMsgDateHand(); //记录一次登录的信息
          this.redirectPath(); //重定向
        } else {
          this.getCaptcha();
          this.$notify({
            title: data.message,
            type: "warning",
          });
        }
      }
    },
    //重定向页面
    redirectPath() {
      //若需要判断用户是否需要某项功能可使用判断
      this.$router.replace({
        name: "home",
      });
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      var parmas = {
        UUID: this.dataForm.uuid,
      };
      this.$API.login.getCaptcha(parmas).then((data) => {
        if (data && data.code == 0) {
          this.captchaPath = data.data;
          // console.log(data);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login.png);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 130px 60px 20px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }
  .login-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
.spanTwo {
  color: red;
  cursor: pointer;
}
</style>
