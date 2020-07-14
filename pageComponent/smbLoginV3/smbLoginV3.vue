<template>
  <div class="smbRedesignLoginContainer">
    <div class="loginRedesignWrapper">
       <storeTaglineLogo></storeTaglineLogo>
      <div class="smb-login-popup">
        <div
          class="smbLoginMessage"
          :class="{errorMessage: statusInfo.hasError}"
          v-html="statusInfo.tipMessage"
        ></div>
        <smb-login-email-address-form v-if="statusInfo.currentStep === 'showPageInit'" :statusInfo="statusInfo" :i18n="i18n" :userInfo="userInfo" :step1PopoverShow="step1PopoverShow" @asyncComponentData="asyncComponentData"></smb-login-email-address-form>
        <smb-login-newPro-newLID v-if="statusInfo.currentStep === 'NewPRO_NewLID'" :userInfo="userInfo" :statusInfo="statusInfo" :i18n="i18n" :inputCompanyRule="inputCompanyRule" @asyncComponentData="asyncComponentData"></smb-login-newPro-newLID>
        <div
          class="smb-login-button-div"
          :class="{'StepOne': statusInfo.currentStep=='showPageInit' || statusInfo.currentStep=='NewPRO_NewLID'}"
          @click="onSubmit"
        >
          <div
            class="smb-button"
            v-bind:class="{running: statusInfo.isRunning, disabled: continueButDisabled}"
            v-if="continueBtnShow"
          >
            <span class="smb-button-title">{{i18n.continueMsg}}</span>
            <div v-if="statusInfo.isRunning" class="smb-button-running smb-button-spin"></div>
          </div>
        </div>
        <div class="smb-login-footer">
          <a
            v-if="statusInfo.currentStep === 'showPageInit'"
            class="telephoneHelp"
            v-bind:href="'tel:' + telephoneHelp"
            v-html="i18n.telephoneHelpMsg"
          >{{i18n.telephoneHelpMsg}}</a>
          <a
            v-if="statusInfo.currentStep === 'showPageInit'"
            class="learnMore"
            :href="'/' + isocode + '/' + language + '/business/benefits'"
            v-html="i18n.learnMoreMsg"
          >{{i18n.learnMoreMsg}}</a>
          <div v-if="statusInfo.currentStep !== 'showPageInit'" class="backButtonContainer">
            <a 
              class="backButton" 
              v-html="i18n.backMsg" 
              @click="onBack()">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./smbLoginV3.scss";
import smbLoginEmailAddressForm from "./smbLoginEmailAddressForm";
import smbLoginNewProNewLID from "./smbLoginNewProNewLID";
import {checkSmbEmail} from "./smbLoginAndRegistrationValidate";
import storeTaglineLogo from "../../commonComponent/storeTaglineLogo";

export default {
  name: "smbLoginAndRegistrationV3",
  components: {
    smbLoginEmailAddressForm,
    smbLoginNewProNewLID,
	  storeTaglineLogo
  },
  data() {
    return {
          webRootLocation: window.vuePageDataInfo.webRootLocation,
          i18n: window.vuePageDataInfo.i18n,
          telephoneHelp: window.vuePageDataInfo.telephoneHelp,
          isocode: window.vuePageDataInfo.isocode,
          language: window.vuePageDataInfo.language,
          // 'showPageInit', 'NewPRO_NewLID', 'NewPRO_ExistingLID', 'ReturningPRO'
          statusInfo: {
            currentStep: window.vuePageDataInfo.userInfo.currentStep,
            tipMessage: '',
            isRunning: false,
            hasError: false,
            step1ErrorMessage: '',
            step1HasError: false,
            step1aCreatePasswordHasError: false,
            step1aConfirmPasswordHasError:false
          },
          userInfo: {
            username: window.vuePageDataInfo.userInfo.emailAddress,
            isITDMInvite: window.vuePageDataInfo.userInfo.isITDMInvite,
            loginPassword: "",
            createPassword: "",
            confirmPassword: "",
            csrfToken: ACC.config.CSRFToken
          },
          inputCompanyRule: window.vuePageDataInfo.inputCompanyRule,
          includeFollowMatch: false,
          loginPasswordShow: false,
          step1PopoverShow: false,
          continueBtnShow: true,
          continueButDisabled: false,
          rememberUsername: false,
          rememberMeToggle: window.vuePageDataInfo.rememberMeToggle,
    }
  },
  created: function() {
    //init page message
    this.initPageMessage();
    this.initContinueStatus();
  },
  directives: {
    
  },
  watch: {
    
  },
  methods: {
    initPageMessage: function() {
        this.statusInfo.tipMessage = this.i18n.showPageInitMsg;
    },
    initContinueStatus: function() {
      switch(this.statusInfo.currentStep) {
        case "showPageInit":
          this.continueButDisabled = false;
          break;
        case "NewPRO_NewLID":
          this.continueButDisabled = true;
          break;
      }
    },
    onSubmit: function () {
      if(this.statusInfo.isRunning){
        return false;
      }else{
        var $this=this;
        switch(this.statusInfo.currentStep){
          case "showPageInit":
            if($this.userInfo.username){
                $this.checkEmail();
            }else{
              $this.statusInfo.isRunning = false;
              $this.statusInfo.tipMessage = $this.i18n.loginAccountNotNull;
              $this.statusInfo.hasError = true;
              $this.step1PopoverShow = false;
              return false;
            }
            break;
          case "NewPRO_NewLID":
            this.statusInfo.tipMessage = this.i18n.NewPRO_NewLIDMsgV3 + " " + $this.userInfo.username;
            var isIPHONE = navigator.userAgent.toUpperCase().indexOf("IPHONE")!= -1;
            var isIPAD = navigator.userAgent.toUpperCase().indexOf("IPAD")!= -1;
            if(isIPHONE||isIPAD){
              $("body").bind('touchend', function(e) {
                if(e.target.localName != 'input' && e.target.localName!='label' ) {
                    $("input").blur();
                }
              });
            }
            //to do 
            // this.clickContinueWithoutLid();
            break;
          case "NewPRO_ExistingLID":
          case "ReturningPRO":
            this.clickContinue();
            break;
        }
      }
    },
    checkEmail: function() {
        checkSmbEmail(this, this.localStorageUsername);
    },
    clickContinueWithoutLid: function() {
      this.statusInfo.isRunning = true;
      if (this.passwordValidation(2, false)) {
        var path =
          this.webRootLocation +
          "/newSmbRegistration/newSmbRegisterWithoutLidV2";
        $(".smbLoginForm").attr("method", "POST");
        $(".smbLoginForm")
          .attr("action", path)
          .submit();
      } else {
        //no pass
        this.statusInfo.isRunning = false;
      }
    },
    onBack: function() {
      // init status
      this.statusInfo.currentStep = "showPageInit";
      this.statusInfo.hasError = false;
      this.userInfo.loginPassword = "";
      this.userInfo.createPassword = "";
      this.userInfo.confirmPassword = "";
      // init content message
      this.initPageMessage();
      this.initContinueStatus();
    },
    asyncComponentData: function(key, newVal) {
      this[key] = newVal;
    },
    localStorageUsername: function() {
      if(this.rememberUsername) {
        localStorage.setItem("smb_remember_username", this.userInfo.username);
      }else {
        localStorage.removeItem("smb_remember_username");
      }
    }
  }
};
</script>