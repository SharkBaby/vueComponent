<template>
    <div v-if="!statusInfo.success">
        <div class="smb-reset-password-massage">{{i18n['smb.reset.v3.request.message']}}</div>
        <form class="smb-reset-password-form" v-on:submit.prevent>
            <div class="smb-reset-password-create"
                 :class="{'label-move-up':resetPasswordLabelMoveup || userInfo.password}"
                 @click="resetPasswordFocus">
                <label for="resetPasswordId">{{i18n['smb.reset.v3.request.password']}}</label>
                <input
                        id="resetPasswordId"
                        type="password"
                        ref="createPassword"
                        v-model="userInfo.password"
                        autofocus
                        @blur="resetPasswordIdBlur"
                        @focus="resetPasswordIdFocus"
                />
                <span
                        class="hidePwd createPassword"
                        v-if="createPasswordShow"
                        @mousedown="createPasswordHidePwd"
                >{{i18n['hidePwd']}}</span>
                <span
                        class="showPwd createPassword"
                        v-if="!createPasswordShow"
                        @mousedown="createPasswordShowPwd"
                >{{i18n['showPwd']}}</span>
                <div class="smb-reset-password-tips createPassword" v-if="passwordPopoverShow">
                    <p class="your-password-must-h">
                        {{i18n['smb.reset.v3.request.condition']}}
                    </p>
                    <div class="smb-reset-password-hint">
                        <p>
                            <span class="smb-reset-password-hint1" :class="{ passPattern: passwordLengthMatch}">{{i18n['smb.reset.v3.password.length']}}</span>
                        </p>
                        <p>
                            <span class="smb-reset-password-hint2" :class="{ passPattern: includeFollowMatch}">{{i18n['smb.reset.v3.include.follow']}}</span>
                        </p>
                        <p>
                            <span class="smb-reset-password-hint3" :class="{ passPattern: samePasswordMatch }">{{i18n['b2c.smb.resetPwd.pwdNotMatch']}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="smb-reset-password-confirm"
                 :class="{'label-move-up':resetConfirmPasswordLabelMoveup || userInfo.confirmPassword}"
                 @click="resetConfirmPasswordFocus">
                <label for="resetConfirmPasswordId">{{i18n['smb.reset.v3.request.confirm.password']}}</label>
                <input
                        id="resetConfirmPasswordId"
                        type="password"
                        ref="confirmPassword"
                        v-model="userInfo.confirmPassword"
                        @blur="resetConfirmPasswordIdBlur"
                        @focus="resetConfirmPasswordIdFocus"
                />
                <span
                        class="hidePwd confirmPassword"
                        v-if="confirmPasswordShow"
                        @mousedown="confirmPasswordHidePwd"
                >{{i18n['hidePwd']}}</span>
                <span
                        class="showPwd confirmPassword"
                        v-if="!confirmPasswordShow"
                        @mousedown="confirmPasswordShowPwd"
                >{{i18n['showPwd']}}</span>
                <div class="smb-reset-password-tips confirmPassword" v-if="confirmPasswordPopoverShow">
                    <p class="your-password-must-h">
                        {{i18n['smb.reset.v3.request.condition']}}
                    </p>
                    <div class="smb-reset-password-hint">
                        <p>
                            <span class="smb-reset-password-hint1" :class="{ passPattern: passwordLengthMatch}">{{i18n['smb.reset.v3.password.length']}}</span>
                        </p>
                        <p>
                            <span class="smb-reset-password-hint2" :class="{ passPattern: includeFollowMatch}">{{i18n['smb.reset.v3.include.follow']}}</span>
                        </p>
                        <p>
                            <span class="smb-reset-password-hint3" :class="{ passPattern: samePasswordMatch }">{{i18n['b2c.smb.resetPwd.pwdNotMatch']}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="smb-reset-password-errorMessage" v-if="statusInfo.step3HasError">
                {{statusInfo.step3ErrorMessage}}
            </div>
            <div class="smb-reset-password-button">
                <button class="smb-reset-password-reset" :class="{running: statusInfo.isRunning}" @click="onSubmit"
                        :disabled="userInfo.password == '' || !samePasswordMatch || !passwordLengthMatch || !includeFollowMatch">
                    <span>{{i18n['smb.reset.v3.request.reset']}}</span>
                    <span v-if="statusInfo.isRunning" class="smb-button-running smb-button-spin"></span>
                </button>
                <a class="smb-reset-password-cancel"
                   :href="webRootLocation">
                    <span>{{i18n['smb.reset.v3.request.cancel']}}</span>
                </a>
            </div>
            <input type="hidden" name="CSRFToken" v-model="userInfo.csrfToken"/>
        </form>
    </div>
    <div v-else-if="statusInfo.success">
        <img class="smb-forget-password-smile" alt="icon_smile" src="../../assets/images/icon_smile.svg">
        <div class="smb-reset-password-success-massage">{{i18n['smb.reset.v3.request.success.message']}}</div>
        <div class="smb-reset-password-button">
            <a class="smb-reset-password-signin"
               :href="webRootLocation">
                <span>{{i18n['smb.reset.v3.request.signin']}}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {axiosRequest} from '../../commonComponent/common';
    import "./smbResetPasswordV3.scss";
    export default {
        name: "smbResetPasswordV3",
        props: {
          smbResetPasswordV3Data: Object,
        },
        data() {
            return {
                webRootLocation: this.smbResetPasswordV3Data.webRootLocation,
                i18n: this.smbResetPasswordV3Data.i18n,
                statusInfo: {
                    success: false,
                    isRunning: false,
                    step3CreatePasswordHasError: false,
                    step3HasError: false,
                    step3ErrorMessage: ""
                },
                userInfo: {
                    email: this.smbResetPasswordV3Data.userInfo.email,
                    password: this.smbResetPasswordV3Data.userInfo.password,
                    confirmPassword: this.smbResetPasswordV3Data.userInfo.confirmPassword,
                    csrfToken: this.smbResetPasswordV3Data.userInfo.csrfToken,
                    vc: this.smbResetPasswordV3Data.userInfo.vc
                },
                resetPasswordLabelMoveup: false,
                resetConfirmPasswordLabelMoveup: false,
                createPasswordShow: false,
                confirmPasswordShow: false,
                passwordPopoverShow: false,
                confirmPasswordPopoverShow: false,
                inputCompanyRule: {
                    ignoreCheck: false,
                    passwordEnable: true,
                    passwordMinLength: 8,
                    passwordMaxLength: 20,
                    passwordPattern1: "[0-9]",
                    passwordPattern2: "[a-zA-Z]",
                    passwordPattern3: "[$!#&]"
                },
                passwordLengthMatch: false,
                includeFollowMatch: false,
                samePasswordMatch: true
            };
        },
        watch: {
            "userInfo.password"(newVal, oldVal) {
                this.passwordValidation(0, false);
            },
            "userInfo.confirmPassword"(newVal, oldVal) {
                this.passwordValidation(1, false);
            }
        },
        methods: {
            createPasswordHidePwd: function() {
                event.preventDefault();
                this.$refs.createPassword.type = "password";
                this.createPasswordShow = false;
            },
            createPasswordShowPwd: function() {
                event.preventDefault();
                this.$refs.createPassword.type = "text";
                this.createPasswordShow = true;
            },
            confirmPasswordHidePwd: function() {
                event.preventDefault();
                this.$refs.confirmPassword.type = "password";
                this.confirmPasswordShow = false;
            },
            confirmPasswordShowPwd: function() {
                event.preventDefault();
                this.$refs.confirmPassword.type = "text";
                this.confirmPasswordShow = true;
            },
            resetPasswordIdBlur: function() {
                this.resetPasswordLabelMoveup = false;
                this.passwordPopoverShow =false;
            },
            resetPasswordIdFocus: function() {
                this.resetPasswordLabelMoveup = true;
                this.passwordPopoverShow =true;
            },
            resetConfirmPasswordIdBlur: function() {
                this.resetConfirmPasswordLabelMoveup = false;
                this.confirmPasswordPopoverShow = false;
            },
            resetConfirmPasswordIdFocus: function() {
                this.resetConfirmPasswordLabelMoveup = true;
                this.confirmPasswordPopoverShow = true;
            },
            resetPasswordFocus: function() {
                this.resetPasswordLabelMoveup = true;
                this.passwordValidation(0, false);
            },
            resetConfirmPasswordFocus: function() {
                this.resetConfirmPasswordLabelMoveup = true;
                this.passwordValidation(1, false);
            },
            passwordValidation: function(pwdType, focus) {
                var pass = true;
                var createPasswordPass = true;
                var confirmPasswordPass = true;
                var pwd = "";
                if (focus) {
                    this.popoverShow = true;
                } else {
                    this.popoverShow = false;
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
                    this.confirmPasswordPopoverShow = true;
                    pwd = this.userInfo.confirmPassword;
                } else {
                    this.confirmPasswordPopoverShow = false;
                    pwd = this.userInfo.password;
                }
                if (pwd.length < minLength || pwd.length > maxLength) {
                    this.popoverShow = true;
                    this.passwordLengthMatch = false;
                    createPasswordPass = false;
                    pass = false;
                    if (pwdType == 2) {
                        this.statusInfo.step3CreatePasswordHasError = true;
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
                    this.popoverShow = true;
                    this.includeFollowMatch = false;
                    createPasswordPass = false;
                    pass = false;
                    if (pwdType == 2) {
                        this.statusInfo.step3CreatePasswordHasError = true;
                    }
                }

                if (this.userInfo.confirmPassword !== this.userInfo.password) {
                    if (document.activeElement == this.$refs.confirmPassword) {
                        this.popoverShow = true;
                        this.confirmPasswordPopoverShow = true;
                    }
                    this.samePasswordMatch = false;
                    confirmPasswordPass = false;
                    if (pwdType == 2) {
                        this.statusInfo.step3ConfirmPasswordHasError = true;
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
                return pass;
            },
            getRegex: function(str) {
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
            onSubmit: function() {
                if (this.statusInfo.isRunning) {
                    return false;
                }
                var $this = this;
                $this.clickReset();
            },
            clickReset: function() {
                var $this = this;
                $this.statusInfo.isRunning = true;
                const postObj = {
                    postUrl: $this.webRootLocation + "/login/pwV3/resetPwdPost",
                    params: {
                        newPassword: $this.userInfo.password,
                        checkNewPassword: $this.userInfo.confirmPassword,
                        CSRFToken: $this.userInfo.csrfToken,
                        email: $this.userInfo.email,
                        vc: $this.userInfo.vc
                    }
                }
                axiosRequest.axiosPost(postObj)
                    .then(function (response) {
                        var result = response.data;
                        $this.statusInfo.isRunning = false;
                        if (result.success) {
                            $this.statusInfo.step3HasError = false;
                            $this.statusInfo.success = true;
                        } else {
                            // var errorMessage = (typeof result.messageKey == "") ? result.errorMessage : result.messageKey;
                            // $this.i18n.hasOwnProperty("abc.efg.h");
                            var errorMessage = result.errorMessage;
                            $this.statusInfo.step3HasError = true;
                            $this.statusInfo.step3ErrorMessage = errorMessage;
                        }
                    })
                    .catch(function (error) {
                        $this.statusInfo.isRunning = false;
                        $this.statusInfo.step3ErrorMessage = $this.i18n['smb.reset.v3.request.call.error'];
                        $this.statusInfo.step3HasError = true;
                    });
            }
        }
    }
</script>