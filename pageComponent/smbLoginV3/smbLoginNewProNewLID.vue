<template>
  <div class="smb-login-input-div smb-newPro-newId">
    <div class="create-pwd-container">
      <div 
        class="create-password-wrapper"  
        :class="{'label-move-up': createPwdLabelMoveup || userInfo.createPassword, 'active-input':createInputActive}"
      >
        <label for="loginCreatePassword" v-html="i18n.creatPasswordMsg" class="pwd-label" @click="createPwdInputFocus"></label>
        <input
          v-show="createPwdLabelMoveup || userInfo.createPassword"
          id="loginCreatePassword"
          name="j_createPassword"
          v-focus="true"
          ref="createPassword"
          type="password"
          v-model="userInfo.createPassword"
          @blur="createPasswordBlur()"
          @focus="createPasswordFocus()"
          :class="{'error-bg-color':statusInfo.step1aCreatePasswordHasError}"
        />
        <span
          class="hidePwd createPassword"
          v-if="createPasswordShow"
          @click="createPasswordHidePwd"
        >{{i18n.hidePwd}}</span>
        <span
          class="showPwd createPassword"
          v-if="!createPasswordShow"
          @click="createPasswordShowPwd"
        >{{i18n.showPwd}}</span>
      </div>
      <!-- popover1 -->
      <div
        class="popover passInt"
        v-if="createPopoverShow"
        :class="{'error-bg-color':statusInfo.step1aConfirmPasswordHasError || statusInfo.step1aCreatePasswordHasError }"
      >
        <div class="popover-content">
          <p v-html="i18n.pwdFormatTitle"></p>
          <ul class="passwordMessagerules">
            <li class :class="{ passPattern: passwordLengthMatch }">
              <img class="mdi mdi-check-circle-outline" src="../../assets/images/check-circle.svg">
              <img class="mdi mdi-record-circle-outline" src="../../assets/images/record-circle.svg">
              <span class="passwordMessageFont">{{i18n.passwordLength}}</span>
            </li>
            <li class :class="{ passPattern: includeFollowMatch }">
              <img class="mdi mdi-check-circle-outline" src="../../assets/images/check-circle.svg">
              <img class="mdi mdi-record-circle-outline" src="../../assets/images/record-circle.svg">
              <span class="passwordMessageFont">{{i18n.includeFollow}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    

    <div class="confirm-pwd-container">
      <div
        class="confirm-password-wrapper"  
        :class="{'label-move-up': confirmPwdLabelMoveup || userInfo.confirmPassword, 'active-input': confirmInputActive}"
      >
        <label for="loginConfirmPassword" v-html="i18n.confirmPasswordMsg" class="pwd-label" @click="confirmPwdInputFocus"></label>
        <input
          v-show="confirmPwdLabelMoveup || userInfo.confirmPassword"
          id="loginConfirmPassword"
          name="j_confirmPassword"
          ref="confirmPassword"
          type="password"
          v-model="userInfo.confirmPassword"
          class="smb-login-confirmPassword-input"
          @blur="confirmPasswordBlur()"
          @focus="confirmPasswordFocus()"
          :class="{'error-bg-color':statusInfo.step1aConfirmPasswordHasError}"
        />
        <span
          class="hidePwd confirmPassword"
          v-if="confirmPasswordShow"
          @click="confirmPasswordHidePwd"
        >{{i18n.hidePwd}}</span>
        <span
          class="showPwd confirmPassword"
          v-if="!confirmPasswordShow"
          @click="confirmPasswordShowPwd"
        >{{i18n.showPwd}}</span>
      </div>
      <!-- popover2 -->
      <div
        class="popover passInt"
        v-if="confirmPopoverShow"
        :class="{'error-bg-color':statusInfo.step1aConfirmPasswordHasError || statusInfo.step1aCreatePasswordHasError }"
      >
        <div class="popover-content">
          <p v-html="i18n.pwdFormatTitle"></p>
          <ul class="passwordMessagerules">
            <li class :class="{ passPattern: passwordLengthMatch }">
              <img class="mdi mdi-check-circle-outline" src="../../assets/images/check-circle.svg">
              <img class="mdi mdi-record-circle-outline" src="../../assets/images/record-circle.svg">
              <span class="passwordMessageFont">{{i18n.passwordLength}}</span>
            </li>
            <li class :class="{ passPattern: includeFollowMatch }">
              <img class="mdi mdi-check-circle-outline" src="../../assets/images/check-circle.svg">
              <img class="mdi mdi-record-circle-outline" src="../../assets/images/record-circle.svg">
              <span class="passwordMessageFont">{{i18n.includeFollow}}</span>
            </li>
            <li class :class="{ passPattern: samePasswordMatch }">
              <img class="mdi mdi-check-circle-outline" src="../../assets/images/check-circle.svg">
              <img class="mdi mdi-record-circle-outline" src="../../assets/images/record-circle.svg">
              <span class="passwordMessageFont">{{i18n.samePassword}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import "./smbLoginNewProNewLID.scss";
export default {
  name: "smbLoginNewProNewLID",
  data() {
    return {
      samePasswordMatch: false,
      createPasswordShow: false,
      confirmPasswordShow: false,
      createPwdLabelMoveup: true,
      confirmPwdLabelMoveup: false,
      passwordLengthMatch: false,
      includeFollowMatch: false,
      createPopoverShow: false,
      confirmPopoverShow: false,
      createInputActive: false,
      confirmInputActive: false,
      passWordPassed: false
    };
  },
  props: {
    userInfo: Object,
    statusInfo: Object,
    i18n: Object,
    inputCompanyRule: Object
  },
  created: function() {
    this.$emit('asyncComponentData', 'continueButDisabled', true);
  },
  directives: {
    focus: {
      //customize directive - focus
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    "userInfo.createPassword"(newVal, oldVal) {
      this.passwordValidation(0, false);
    },
    "userInfo.confirmPassword"(newVal, oldVal) {
      this.passwordValidation(1, false);
    },
    "passWordPassed"(newVal, oldVal) {
      console.log("aaa", newVal)
      this.$emit('asyncComponentData', 'continueButDisabled', !newVal);
    }
  },
  methods: {
    adobeErrorReportTrack: function(errorType, errorDetail, track) {
      if (window._satellite) {
        lmd = lmd || {};
        lmd.errorType = errorType;
        lmd.errorDetail = errorDetail;
        if (track) {
          _satellite.track(track);
        } else {
          _satellite.track("user-interaction-error");
        }
      } else {
        console.warn("_satellite function does not exist. event");
      }
    },
    createPasswordHidePwd() {
      this.$refs.createPassword.type = "password";
      this.createPasswordShow = false;
    },
    createPasswordShowPwd() {
      this.$refs.createPassword.type = "text";
      this.createPasswordShow = true;
    },
    confirmPasswordHidePwd() {
      this.$refs.confirmPassword.type = "password";
      this.confirmPasswordShow = false;
    },
    confirmPasswordShowPwd() {
      this.$refs.confirmPassword.type = "text";
      this.confirmPasswordShow = true;
    },
    createPasswordBlur() {
      this.createInputActive = false;
      this.createPopoverShow = false;
      this.createPwdLabelMoveup = false;
    },
    createPasswordFocus() {
      this.createInputActive = true;
      this.createPwdLabelMoveup = true;
      this.passwordValidation(0, true);
    },
    confirmPasswordBlur() {
      this.confirmInputActive = false;
      this.confirmPopoverShow = false;
      this.confirmPwdLabelMoveup = false;
    },
    confirmPasswordFocus() {
      this.confirmInputActive = true;
      this.confirmPwdLabelMoveup = true;
      this.passwordValidation(1, true);
    },
    createPwdInputFocus() {
      this.createPwdLabelMoveup = true;
    },
    confirmPwdInputFocus() {
      this.confirmPwdLabelMoveup = true;
    },
    passwordValidation(pwdType, focus) {
      var pass = true;
      var createPasswordPass = true;
      var confirmPasswordPass = true;
      var pwd = "";
      if (focus) {
        this.popoverShow(pwdType, true);
        
      } else {
         this.popoverShow(pwdType, false);
      }

      var minLength = 8;
      var maxLength = 20;
      var pattern1 = this.getRegex("^.*[0-9]");
      var pattern2 = this.getRegex("^.*[a-zA-Z]");
      var pattern3 = this.getRegex("^.*[$!#&]");
      if (
        !this.inputCompanyRule.ignoreCheck &&
        this.inputCompanyRule.passwordEnable
      ) {
        //if switch not open use local pattern
        minLength = this.inputCompanyRule.passwordMinLength;
        maxLength = this.inputCompanyRule.passwordMaxLength;
        pattern1 = this.getRegex(this.inputCompanyRule.passwordPattern1);
        pattern2 = this.getRegex(this.inputCompanyRule.passwordPattern2);
        pattern3 = this.getRegex(this.inputCompanyRule.passwordPattern3);
      }

      if (pwdType == 1) {
        pwd = this.userInfo.confirmPassword;
      } else {
        pwd = this.userInfo.createPassword;
      }
      if (pwd.length < minLength || pwd.length > maxLength) {
        this.popoverShow(pwdType, true);
        this.passwordLengthMatch = false;
        createPasswordPass = false;
        pass = false;
        if (pwdType == 2) {
          this.statusInfo.step1aCreatePasswordHasError = true;
        }
      } else {
        this.passwordLengthMatch = true;
      }
      var num = 0;
      if (pattern1 != undefined && pattern1.test(pwd)) {
        num++;
      }
      if (pattern2 != undefined && pattern2.test(pwd)) {
        num++;
      }
      if (pattern3 != undefined && pattern3.test(pwd)) {
        num++;
      }
      if (num >= 2) {
        this.includeFollowMatch = true;
      } else {
        this.popoverShow(pwdType, true);
        this.includeFollowMatch = false;
        createPasswordPass = false;
        pass = false;
        if (pwdType == 2) {
          this.statusInfo.step1aCreatePasswordHasError = true;
        }
      }

      if (this.userInfo.confirmPassword !== this.userInfo.createPassword) {
        if (document.activeElement == this.$refs.confirmPassword) {
          this.popoverShow(pwdType, true);
        }
        this.samePasswordMatch = false;
        confirmPasswordPass = false;
        if (pwdType == 2) {
          this.statusInfo.step1aConfirmPasswordHasError = true;
        }
        pass = false;
      } else {
        this.samePasswordMatch = true;
      }

      if (createPasswordPass && pwdType == 2) {
        this.passwordValidation(1, false);
      }

      if ((pwdType == 0 || pwdType == 2) && !createPasswordPass) {
        this.$refs.createPassword.focus();
      } else if (pwdType == 1 && !confirmPasswordPass) {
        this.$refs.confirmPassword.focus();
      }
      //check whether the continue disabled or not.
      if(createPasswordPass && this.samePasswordMatch) {
        this.passWordPassed = true;
      }else {
        this.passWordPassed = false;
      }
      return pass;
    },
    getRegex(str) {
      var regex;
      var regex2 = /\(\?[dixmsuU]+\)/;
      try {
        var resultArray = str.match(regex2);
        if (resultArray != null && resultArray.length > 0) {
          var strResult = resultArray[0];
          str = str.substr(strResult.length);
          var model = "";
          if (strResult.indexOf("i") > 1) {
            model += "i";
          }
          if (strResult.indexOf("m") > 1) {
            model += "m";
          }
          regex = new RegExp(str, model);
        } else {
          if (str.trim().length == 0) {
            regex = undefined;
          } else {
            regex = new RegExp(str);
          }
        }
      } catch (e) {
        console.error(e);
      }
      return regex;
    },
    popoverShow: function(pwdType, status) {
      if(pwdType == 1) {
          this.confirmPopoverShow = status;
        }else {
          this.createPopoverShow = status;
        }
    }
  }
};
</script>