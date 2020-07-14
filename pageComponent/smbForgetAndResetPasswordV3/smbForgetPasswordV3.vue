<template>
    <div v-if="!statusInfo.success">
        <div class="smb-forget-password-massage" v-html="i18n['smb.forget.v3.request.message']"></div>
        <form class="smb-forget-password-form" v-on:submit.prevent>
            <div class="smb-forget-password-input" :class="{'label-move-up':forgetInputLabelMoveup || userInfo.email}"
                 @click="forgetInputFocus"
            >
                <label for="forgetEmailId">{{i18n['smb.forget.v3.email.address']}}</label>
                <input
                        id="forgetEmailId"
                        v-model="userInfo.email"
                        type="text"
                        @blur="forgetEmailIdBlur"
                        @focus="forgetEmailIdFocus"
                />
            </div>
            <div class="smb-forget-password-emailUnfilled" v-if="statusInfo.step1HasError && !userInfo.email">
                {{i18n['b2c.smb.forgotPwd.emailInvalid']}}
            </div>
            <div class="smb-forget-password-errorMessage" v-if="statusInfo.step1HasError">
                {{statusInfo.step1ErrorMessage}}
            </div>
            <div class="smb-forget-password-button">
                <button class="smb-forget-password-submit" :class="{running: statusInfo.isRunning}" @click="onSubmit">
                    <span>{{i18n['account.password.forgotten.request.submit1']}}</span>
                    <span v-if="statusInfo.isRunning" class="smb-button-running smb-button-spin"></span>
                </button>
                <a class="smb-forget-password-cancel"
                   :href="webRootLocation">
                    <span>{{i18n['account.password.forgotten.request.cancel1']}}</span>
                </a>
            </div>
           <input type="hidden" name="CSRFToken" v-model="userInfo.csrfToken"/>
        </form>
    </div>
    <div v-else-if="statusInfo.success">
        <div class="smb-forget-password-massage">
            <div class="smb-forget-password-title">{{i18n['smb.forget.v3.request.submitted']}}</div>
            <div class="smb-forget-password-successMessage">{{statusInfo.successMessage}}</div>
            <div>{{i18n['smb.forget.v3.request.success.please']}}</div>
        </div>
    </div>
</template>

<script>
    import {axiosRequest} from '../../commonComponent/common';
    import "./smbForgetPasswordV3.scss";
    export default {
        name: "smbForgetPasswordV3",
        props: {
          smbForgetPasswordV3Data: Object,
        },
        data() {
            return {
                webRootLocation: this.smbForgetPasswordV3Data.webRootLocation,
                statusInfo: {
                    pageType: this.smbForgetPasswordV3Data.userInfo.currentStep,
                    success: false,
                    successMessage: "",
                    step1ErrorMessage:"",
                    step1HasError: false,
                    isRunning: false
                },
                userInfo: {
                    email: this.smbForgetPasswordV3Data.userInfo.email,
                    csrfToken: this.smbForgetPasswordV3Data.userInfo.csrfToken,
                },
                forgetInputLabelMoveup: false,
                i18n: this.smbForgetPasswordV3Data.i18n
            }
        },
        methods: {
            forgetEmailIdBlur: function() {
                this.forgetInputLabelMoveup = false;
            },
            forgetEmailIdFocus: function() { //input label move up layout
                this.forgetInputLabelMoveup = true;
            },

            forgetInputFocus: function() {
                this.forgetInputLabelMoveup = true;
            },
            onSubmit: function() {
                if (this.statusInfo.isRunning) {
                    return false;
                }
                var $this = this;
                $this.checkEmail();
            },
            checkEmail: function() {
                var $this = this;
                if (!$this.userInfo.email) { //frontend check unfilled email address, terminate submit
                    $this.statusInfo.step1HasError = true;
                    return;
                }
                $this.statusInfo.step1HasError = false;
                $this.statusInfo.isRunning = true;
                const postObj = {
                  postUrl: $this.webRootLocation + "/login/pwV3/forgotPwdPost",
                  params: {
                    email: $this.userInfo.email,
                    CSRFToken: $this.userInfo.csrfToken
                  }
                }
                axiosRequest.axiosPost(postObj)
                    .then(function (response) {
                        var result = response.data;
                        $this.statusInfo.isRunning = false;
                        if (result.success) { //success response, go to next step
                            $this.statusInfo.step1HasError = false;
                            $this.statusInfo.success = true;
                            $this.statusInfo.successMessage = result.message;
                        } else { //invalid email address, stay current step
                            var errorMessage = result.errorMessage;
                            $this.statusInfo.step1HasError = true;
                            $this.statusInfo.step1ErrorMessage = errorMessage;
                        }
                    })
                    .catch(function (error) { // handle request error
                        $this.statusInfo.isRunning = false;
                        $this.statusInfo.step1ErrorMessage = $this.i18n['smb.reset.v3.request.call.error'];
                        $this.statusInfo.step1HasError = true;
                    });
            },
        }
    }
</script>