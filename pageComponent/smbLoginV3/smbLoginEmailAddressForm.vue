<template>
    <form class="smbLoginForm" v-on:submit.prevent>
        <div class="smb-login-input-div">
            <div :class="{'loginEmailContainer':true,'error-bg-color':statusInfo.step1HasError, 'label-move-up':loginInputLabelMoveup || userInfo.username}"
                @click="loginInputFocus">
                <label v-html="i18n.emailMsg" for="loginEmailId"></label>
                <input
                v-show="loginInputLabelMoveup || userInfo.username"
                id="loginEmailId"
                name="j_username"
                v-focus="loginInputLabelMoveup"
                v-model="userInfo.username"
                type="text"
                value=”“
                @blur="loginEmailIdBlur"
                />
            </div>
            <div
                class="popover-down error-bg-color errorMessage"
                v-show="statusInfo.step1HasError && step1PopoverShow"
            >
                <div class="popover-content">
                    <label>{{statusInfo.step1ErrorMessage}}</label>
                </div>
            </div>
        </div>
        <div v-if="rememberMeToggle"  class="remember-me-container clearfix">
            <input type="checkbox" v-model="isRememberMe" id="login-remember-me">
            <label for="login-remember-me">
                <img v-if="isRememberMe" src="../../assets/images/reMe-checked.svg" />
                <img v-else src="../../assets/images/reMe-uncheck.svg" />
                <span v-html="i18n.rememberMe"></span>
            </label>
        </div>
        <input type="hidden" name="CSRFToken" v-model="userInfo.csrfToken" />
    </form>
</template>
<script>
import "./smbLoginEmailAddressForm.scss";

export default {
    name: "smbLoginEmailAddressForm",
    data() {
        return {
            loginInputLabelMoveup: true,
            isRememberMe: false,
            rememberMeToggle: this.rememberMeToggle
        }
    },
    created: function() {
        //init isRememberMe status & fill in email address
        this.initRememberStatus();

        this.$emit('asyncComponentData', 'rememberUsername', this.isRememberMe);
    },
    props: {
        statusInfo: Object,
        i18n: Object,
        userInfo: Object,
        step1PopoverShow: Boolean,
        rememberMeToggle: Boolean,
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },
    watch: {
        'isRememberMe'() {
            this.$emit('asyncComponentData', 'rememberUsername', this.isRememberMe);
        }
    },
    methods: {
        loginEmailIdBlur() {
            this.loginInputLabelMoveup = false;
        },
        loginInputFocus() {
            this.loginInputLabelMoveup = true;
        },
        initRememberStatus() {
            if(localStorage.getItem("smb_remember_username")) {
                this.isRememberMe = true;
                var username = localStorage.getItem("smb_remember_username");
                this.userInfo.username = username;
            }
        }
  }
}
</script>