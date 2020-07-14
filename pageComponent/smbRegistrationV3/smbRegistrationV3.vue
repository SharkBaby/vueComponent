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
        <step-4a-company-information></step-4a-company-information>
        <step-4b-your-profile></step-4b-your-profile>
      </div>
    </div>
  </div>
</template>
<script>
import "./smbRegistrationV3.scss";

import step4aCompanyInformation from "./step4aCompanyInformation";
import step4bYourProfile from "./step4bYourProfile";
import storeTaglineLogo from "../../commonComponent/storeTaglineLogo";

export default {
  name: "smbRegistrationV3",
  components: {
    step4aCompanyInformation,
    step4bYourProfile,
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
          rememberUsername: false
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
        // checkSmbEmail(this, this.localStorageUsername);
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