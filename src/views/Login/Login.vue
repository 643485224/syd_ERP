<template>
  <div class="login">
    <div class="login-form" id="login-form">
      <div class="login-form-title">
        <img src="./image/LoginTitle.svg" />
      </div>
      <div class="login-form-body">
        <div
          class="wow animate__fadeInRight login-form-bodyLeft"
          data-wow-duration="0.5s"
        >
          <img v-if="!isForgotPassword" src="./image/LoginDL.svg" />
          <img v-else src="./image/LoginXG.svg" />
        </div>
        <div
          v-if="!isForgotPassword"
          class="wow animate__fadeInLeft login-form-bodyRight"
          data-wow-duration="0.5s"
          v-loading="isLogin"
          element-loading-text="加载中，请稍后"
          element-loading-spinner="el-icon-loading"
        >
          <div class="login-form-bodyRightTitle">后台管理系统</div>
          <div
            class="login-form-section"
            :style="
              select.account
                ? 'border-bottom: 0.0133333333rem solid #1990ff'
                : ''
            "
          >
            <div class="section-icon">
              <img src="./image/userAction.svg" v-if="select.account" />
              <img src="./image/user.svg" v-else />
            </div>
            <div class="section-input">
              <input
                type="text"
                @focus="select.account = true"
                v-model="form.account"
                @keydown.enter="onSubmit"
                @blur="select.account = false"
                placeholder="请输入账号"
              />
            </div>
          </div>
          <div
            class="login-form-section"
            :style="
              select.password
                ? 'border-bottom: 0.0133333333rem solid #1990ff'
                : ''
            "
          >
            <div class="section-icon">
              <img src="./image/password.svg" v-if="select.password" />
              <img src="./image/passwordAction.svg" v-else />
            </div>

            <div class="section-input">
              <input
                :type="select.eyes ? 'text' : 'password'"
                v-model="form.password"
                @keydown.enter="onSubmit"
                @focus="select.password = true"
                @blur="select.password = false"
                placeholder="请输入密码"
              />
            </div>
            <div class="section-right" @click="select.eyes = !select.eyes">
              <img src="./image/eyeAction.svg" v-if="select.eyes" />
              <img src="./image/eye.svg" v-else />
            </div>
          </div>

          <a
            v-if="!isForgotPassword"
            class="login-form-forgetPassword"
            @click="forgotPasswordClick"
            >忘记密码？</a
          >
          <div v-else class="login-form-forgetPassword"></div>
          <div class="login-form-button">
            <div class="login-form-submit" @click="onSubmit">
              <div class="submit-label">登录</div>
              <div class="submit-filter"></div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="wow animate__fadeInLeft login-form-bodyRight"
          data-wow-duration="0.5s"
          v-loading="editLoading"
          element-loading-text="加载中，请稍后"
          element-loading-spinner="el-icon-loading"
        >
          <div class="login-form-bodyRightTitleTwo">
            <span>修改密码</span>
            <img
              v-if="isNext == 'one'"
              src="./image/XGOne.svg"
              class="wowTwo animate__flipInY"
              data-wow-duration="0.5s"
              alt=""
            />
            <img
              v-else-if="isNext == 'two'"
              src="./image/XGTwo.svg"
              class="wowTwo animate__flipInY"
              data-wow-duration="0.5s"
              alt=""
            />
            <img
              v-else
              src="./image/XGThree.svg"
              alt=""
              class="wowTwo animate__flipInY"
              data-wow-duration="0.5s"
            />
          </div>
          <div v-if="isNext == 'one'" class="login-form-bodyRightItem">
            <div
              class="login-form-section"
              :style="
                select.userName
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
              "
            >
              <div class="section-icon">
                <img src="./image/userAction.svg" v-if="select.userName" />
                <img src="./image/user.svg" v-else />
              </div>
              <div class="section-input">
                <input
                  type="text"
                  @focus="select.userName = true"
                  v-model="form.userName"
                  @keydown.enter="nextClick"
                  @blur="select.userName = false"
                  placeholder="请输入姓名"
                />
              </div>
            </div>
            <div
              class="login-form-section"
              :style="
                select.car ? 'border-bottom: 0.0133333333rem solid #1990ff' : ''
              "
            >
              <div class="section-icon">
                <img src="./image/carAction.svg" v-if="select.car" />
                <img src="./image/car.svg" v-else />
              </div>

              <div class="section-input">
                <input
                  :type="select.careyes ? 'text' : 'password'"
                  v-model="form.car"
                  @keydown.enter="nextClick"
                  @focus="select.car = true"
                  @blur="select.car = false"
                  placeholder="请输入身份证号"
                />
              </div>
              <div
                class="section-right"
                @click="select.careyes = !select.careyes"
              >
                <img src="./image/eyeAction.svg" v-if="select.careyes" />
                <img src="./image/eye.svg" v-else />
              </div>
            </div>
          </div>
          <div
            v-else-if="isNext == 'two'"
            class="wowTwo animate__flipInY login-form-bodyRightItem"
            data-wow-duration="0.5s"
          >
            <div
              class="login-form-section"
              :style="
                select.passwordOne
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
              "
            >
              <div class="section-icon">
                <img
                  src="./image/passwordOneAction.svg"
                  v-if="select.passwordOne"
                />
                <img src="./image/passwordOne.svg" v-else />
              </div>

              <div class="section-input">
                <input
                  :type="select.passwordOneeyes ? 'text' : 'password'"
                  v-model="form.passwordOne"
                  @keydown.enter="nextClick"
                  @focus="select.passwordOne = true"
                  @blur="select.passwordOne = false"
                  placeholder="请输入新密码"
                />
              </div>
              <div
                class="section-right"
                @click="select.passwordOneeyes = !select.passwordOneeyes"
              >
                <img
                  src="./image/eyeAction.svg"
                  v-if="select.passwordOneeyes"
                />
                <img src="./image/eye.svg" v-else />
              </div>
            </div>
            <div
              class="login-form-section"
              :style="
                select.passwordTwo
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
              "
            >
              <div class="section-icon">
                <img
                  src="./image/passwordTwoAction.svg"
                  v-if="select.passwordTwo"
                />
                <img src="./image/passwordTwo.svg" v-else />
              </div>

              <div class="section-input">
                <input
                  :type="select.passwordTwoeyes ? 'text' : 'password'"
                  v-model="form.passwordTwo"
                  @keydown.enter="nextClick"
                  @focus="select.passwordTwo = true"
                  @blur="select.passwordTwo = false"
                  placeholder="请再次输入新密码"
                />
              </div>
              <div
                class="section-right"
                @click="select.passwordTwoeyes = !select.passwordTwoeyes"
              >
                <img
                  src="./image/eyeAction.svg"
                  v-if="select.passwordTwoeyes"
                />
                <img src="./image/eye.svg" v-else />
              </div>
            </div>
          </div>
          <div
            v-else
            class="wowTwo animate__flipInY login-form-bodyRightItem"
            data-wow-duration="0.5s"
            v-loading="editLoading"
            element-loading-text="加载中，请稍后"
            element-loading-spinner="el-icon-loading"
          >
            <img class="imgSuccess" src="./image/XGSuccess.svg" alt="" />
          </div>

          <div class="login-form-forgetPassword"></div>
          <div v-if="isNext == 'three'" class="login-form-button">
            <div class="login-form-button">
              <div class="login-form-submit" @click="clickLogin">
                <div class="submit-label">登录</div>
                <div class="submit-filter"></div>
              </div>
            </div>
          </div>
          <div v-else class="login-form-button">
            <div class="login-form-submitTwo" @click="nextClick">
              <div class="submit-label">下一步</div>
              <div class="submit-filter"></div>
            </div>
            <div
              class="login-form-submitTwo"
              style="background: #f05c27"
              @click="forgotPasswordClick"
            >
              <div class="submit-label">取消</div>
              <div
                class="submit-filter"
                style="background: rgba(240, 92, 39, 0.53)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 自适应
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var docEl = document.documentElement;
    var rem = docEl.clientWidth / 10;
    if (document.getElementById("login-form")) {
      if (
        rem > docEl.style.fontSize.split("px")[0] &&
        document.body.clientHeight -
          document.getElementById("login-form").offsetHeight <
          150
      ) {
        return;
      }
    }
    docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
  }

  setRemUnit();
  window.setRemUnit = setRemUnit;

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
import {
  UserLogin,
  UserVerify,
  UpdatePassword,
} from "../../api/erpApi/loginApi";
export default {
  data() {
    return {
      isLogin: false,
      editLoading: false, //修改密码加载中
      select: {
        account: false,
        password: false,
        eyes: false,
        userName: false,
        car: false,
        careyes: false,
        passwordOne: false,
        passwordOneeyes: false,
        passwordTwo: false,
        passwordTwoeyes: false,
      },
      form: {
        MWdata: "", //验证信息回传铭文
        account: "",
        password: "",
        userName: "",
        car: "",
        passwordOne: "",
        passwordTwo: "",
      },
      isForgotPassword: false, //忘记密码，默认为false
      isNext: "one",
    };
  },
  mounted() {
    // 初始化wowjs动画
    new this.$wow.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    }).init();
    this.setRemUnit();
  },
  methods: {
    // 用户身份验证-接口
    UserVerifyApi() {
      this.editLoading = true;
      let valueData = {
        body: {
          User: {
            Name: this.form.userName,
            IdCard: this.form.car,
          },
        },
      };
      UserVerify(valueData)
        .then((res) => {
          this.editLoading = false;
          if (res.Code == 1) {
            this.isNext = "two";
            this.form.MWdata = res.Data;
            this.$message.success(res.Msg);
            // 初始化wowjs动画
            new this.$wow.WOW({
              boxClass: "wowTwo",
              animateClass: "animated",
              offset: 0,
              mobile: true,
              live: true,
            }).init();
          } else {
            this.$message.error(res.Msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改密码-接口
    UpdatePasswordApi() {
      if (this.form.passwordOne != this.form.passwordTwo) {
        this.$message.info("两次密码输入不一致，请保持一致");
        return;
      }
      this.editLoading = true;
      let valueData = {
        body: {
          cipher: this.form.MWdata,
          User: {
            Password: this.form.passwordTwo,
          },
        },
      };
      return new Promise((resolve) => {
        UpdatePassword(valueData)
          .then((res) => {
            this.editLoading = false;
            if (res.Code == 1) {
              this.isNext = "three";
              this.$message.success("密码修改成功!请点击登录");
              // 初始化wowjs动画
              new this.$wow.WOW({
                boxClass: "wowTwo",
                animateClass: "animated",
                offset: 0,
                mobile: true,
                live: true,
              }).init();
            } else {
              this.$message.error(res.Msg);
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    setRemUnit() {
      var docEl = document.documentElement;
      var rem = docEl.clientWidth / 10;
      let fontSize = docEl.style.fontSize.split("px")[0];
      let abs =
        document.body.clientHeight -
        document.getElementById("login-form").offsetHeight;
      if (document.getElementById("login-form")) {
        if (rem > (fontSize ? fontSize : 0) && abs < 100) {
          docEl.style.fontSize = (abs < 0 ? 180 : rem) - Math.abs(abs) + "px";
          return;
        }
      }
      docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
    },
    // 登录按钮
    onSubmit() {
      if (this.isLogin) return this.$message.info("别着急,喝杯茶冷静下..");
      if (!this.form.account) {
        return this.$message.error("账号不能为空");
      } else if (!this.form.password) {
        return this.$message.error("密码不能为空");
      } else {
        this.isLogin = true;
        let valueData = {
          body: {
            User: {
              Account: this.form.account,
              Password: this.form.password,
            },
          },
        };
        UserLogin(valueData)
          .then((res) => {
            this.isLogin = false;
            if (res.Code > 0) {
              this.$router.push("/home");
              this.$store.commit("resetTagItem");
              this.$message.success(res.Msg);
            } else {
              this.$message.error(res.Msg);
            }
          })
          .catch((err) => {
            this.isLogin = false;
            console.error("报错信息：", err);
          });
      }
    },
    clickLogin() {
      this.$router.push("/home");
    },

    // 忘记密码按钮
    forgotPasswordClick() {
      // 初始化wowjs动画
      new this.$wow.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true,
      }).init();
      this.isForgotPassword = !this.isForgotPassword;
      this.isNext = "one";
      this.select.account = false;
      this.select.password = false;
      this.select.eyes = false;
      this.select.userName = false;
      this.select.car = false;
      this.select.careyes = false;
      this.select.passwordOne = false;
      this.select.passwordOneeyes = false;
      this.select.passwordTwo = false;
      this.select.passwordTwoeyes = false;
      this.form.account = "";
      this.form.password = "";
      this.form.userName = "";
      this.form.car = "";
      this.form.passwordOne = "";
      this.form.passwordTwo = "";
    },
    // 下一步按钮
    nextClick() {
      if (this.isNext == "one") {
        this.UserVerifyApi(); // 用户身份验证-接口
      } else if (this.isNext == "two") {
        this.UpdatePasswordApi(); // 修改密码-接口
      } else {
        this.isNext = "one";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$baseRem: 75;

/*@function double($n) {
  　　　　@return $n / $baseRem;　　}*/
// 1920*1080 状态下 rpxToRem(1) == 2.3266px
@function rpxToRem($args) {
  @return calc($args/$baseRem) * 1rem;
}

.login::-webkit-scrollbar {
  display: none;
}
.login {
  background: url("./image/LoginBg.png") no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: scroll;
  display: flex;
  //padding-top: rpxToRem(35.16);
  //padding-bottom: rpxToRem(35.16);
  align-items: center;
  justify-content: center;

  &-form {
    width: rpxToRem(536.5);
    height: rpxToRem(294);
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
    border-radius: rpxToRem(10.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &-title {
      margin-top: rpxToRem(24);
      img {
        width: rpxToRem(240);
        height: rpxToRem(25);
      }
    }
    &-body {
      margin-top: rpxToRem(17.2);
      width: rpxToRem(536.5);
      display: flex;
      justify-content: center;
    }
    &-bodyLeft {
      img {
        width: rpxToRem(202);
        height: rpxToRem(202);
      }
      margin-right: rpxToRem(86);
    }
    &-bodyRight {
      width: rpxToRem(141.84);
      height: rpxToRem(186.54);
    }
    &-bodyRightTitle {
      margin-top: rpxToRem(26.71);
      font-size: rpxToRem(10.32);
      width: rpxToRem(141.84);
      height: rpxToRem(39.54);
    }
    &-bodyRightTitleTwo {
      font-size: rpxToRem(10.32);
      width: rpxToRem(141.84);
      height: rpxToRem(66.19);
      img {
        margin: rpxToRem(17.19) 0 rpxToRem(17.19) 0;
        width: rpxToRem(141.84);
        height: rpxToRem(27.51);
      }
    }
    &-bodyRightItem {
      padding-top: rpxToRem(10);
      width: rpxToRem(141.84);
      height: rpxToRem(64.14);
      .imgSuccess {
        width: rpxToRem(141.84);
        padding-top: rpxToRem(6);
      }
    }
    &-section {
      display: flex;
      align-items: center;
      width: rpxToRem(133);
      margin-bottom: rpxToRem(6);
      border-bottom: rpxToRem(1) solid rgba(0, 0, 0, 0.06);
      padding: rpxToRem(6.68) 0;
      .section-icon {
        display: flex;
        img {
          color: red;
          width: rpxToRem(11.72);
          height: rpxToRem(11.72);
        }
      }
      .section-input {
        margin-left: rpxToRem(7.81);
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        input {
          height: 100%;
          width: 100%;
          border: none;
          font-size: rpxToRem(8);
          background-color: #fff !important;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-transition-delay: 99999s;
          -webkit-transition: color 99999s ease-out,
            background-color 99999s ease-out;
        }
      }
      .section-right {
        display: flex;
        img {
          width: rpxToRem(10.85);
          height: rpxToRem(10.85);
        }
      }
    }
    // 忘记密码样式
    &-forgetPassword {
      color: #1990ff;
      width: 69%;
      font-size: rpxToRem(7);
      height: rpxToRem(9.46);
      display: flex;
      justify-content: flex-start;
      margin-bottom: rpxToRem(5);
    }
    &-forgetPassword:hover {
      // font-weight: bold;
      text-decoration: underline;
    }
    &-button {
      width: rpxToRem(141.84);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-submit {
      margin-top: rpxToRem(16);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: rpxToRem(89.4008);
      height: rpxToRem(15.47);
      background: #1990ff;
      border-radius: rpxToRem(2);
      .submit-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rpxToRem(7);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        z-index: 2;
      }
      .submit-filter {
        position: absolute;
        top: rpxToRem(4.5);
        left: rpxToRem(3.25);
        width: rpxToRem(89.4008);
        height: rpxToRem(14);
        background: rgba(25, 144, 255, 0.53);
        border-radius: rpxToRem(1);
        filter: blur(rpxToRem(8));
      }
    }
    &-submit:hover {
      transform: scale(1.1);
    }
    // 修改密码样式
    &-submitTwo {
      margin-top: rpxToRem(16);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: rpxToRem(55.02);
      height: rpxToRem(12.034);
      background: #1990ff;
      border-radius: rpxToRem(2);
      margin-right: rpxToRem(8.6);
      .submit-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rpxToRem(7);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        z-index: 2;
      }
      .submit-filter {
        position: absolute;
        top: rpxToRem(4.5);
        left: rpxToRem(3.25);
        width: rpxToRem(55.02);
        height: rpxToRem(14);
        background: rgba(25, 144, 255, 0.53);
        border-radius: rpxToRem(1);
        filter: blur(rpxToRem(8));
      }
    }
    &-submitTwo:hover {
      transform: scale(1.1);
    }
    &-qrcode {
      margin-top: rpxToRem(30.09);
      display: flex;
      img {
        width: rpxToRem(54.69);
        height: rpxToRem(54.69);
      }
    }
    &-setter {
      position: absolute;
      right: 10px;
      top: 0;
    }
  }
}

input {
  background: none;
  outline: none;
  border: 0;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: none;
  background: #fff;
  outline: none;
}
</style>
