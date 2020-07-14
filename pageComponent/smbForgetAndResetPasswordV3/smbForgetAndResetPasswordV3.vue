<template>
  <div class="smb-forget-and-reset-password">
    <div class="smb-forget-and-reset-password-wrapper">
      <storeTaglineLogo></storeTaglineLogo>
      <smbForgetPasswordV3 v-if="smbForgetAndResetPasswordV3.userInfo.currentStep == 'forgot_pwd'" :smbForgetPasswordV3Data="smbForgetAndResetPasswordV3"></smbForgetPasswordV3>
      <smbResetPasswordV3 v-if="smbForgetAndResetPasswordV3.userInfo.currentStep == 'reset_pwd'" :smbResetPasswordV3Data="smbForgetAndResetPasswordV3"></smbResetPasswordV3>
    </div>
  </div>
</template>
<script>
  import "./smbForgetAndResetPasswordV3.scss";
  import smbForgetPasswordV3 from "./smbForgetPasswordV3";
  import smbResetPasswordV3 from "./smbResetPasswordV3"
  import storeTaglineLogo from "../../commonComponent/storeTaglineLogo";

  export default {
    name: "smbForgetAndResetPasswordV3",
    components: {
      smbForgetPasswordV3,
      smbResetPasswordV3,
      storeTaglineLogo
    },
    data() {
      return {
        smbForgetAndResetPasswordV3: window.vuePageDataInfo
      };
    }
  };
</script>