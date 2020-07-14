import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import smbResetPasswordV3 from '../../pageComponent/smbForgetAndResetPasswordV3/smbResetPasswordV3';

export default {
  title: 'smbResetPasswordV3',
  component: smbResetPasswordV3,
};

export const smbForgetAndResetPasswordV3 = () => ({
  components: { smbResetPasswordV3 },
  template: `<smb-reset-password-v3 :smbResetPasswordV3Data="smbForgetAndResetPasswordV3"></smb-reset-password-v3>`,
  data() {
    return {
      smbForgetAndResetPasswordV3: {
        webRootLocation: "/us/en/smbpro",
        isocode: 'US'.toLowerCase(),
        language: 'en_US'.split("_")[0],
        i18n: { "smbProTagLineLogo": "https://www.lenovo.com/_ui/desktop/common/css/images/smb/lenovo-pro-tagline-logo.svg", "smb.forget.v3.request.message": "If you have forgotten your password, please enter the e-mail address you used to register.&lt;br/&gt;&lt;br/&gt;An email will be sent to this address containing instructions on how to reset your password.&lt;br/&gt;&lt;br/&gt;If you have forgotten the e-mail account you registered with or you don&#039;t have an account, then you must create a new account.", "smb.forget.v3.email.address": "Email Address", "account.password.forgotten.request.submit1": "SUBMIT", "account.password.forgotten.request.cancel1": "CANCEL", "smb.forget.v3.request.submitted": "Request Submitted", "smb.forget.v3.request.success.please": "Please check your email", "smb.reset.v3.request.message": "Please enter a new password for your account.", "smb.reset.v3.request.password": "Password", "smb.reset.v3.request.confirm.password": "Confirm Password", "smb.reset.v3.request.call.error": "There was an issue with your request. Please try again.", "smb.reset.v3.request.condition": "Password must have at least", "smb.reset.v3.password.length": "8-20 characters", "smb.reset.v3.include.follow": "Include two of the following: letters, numbers, and symbols($!#&amp;)", "smb.reset.v3.request.reset": "Reset", "smb.reset.v3.request.cancel": "Cancel", "smb.reset.v3.request.success.message": "Thank you! Your password has been successfully updated.", "smb.reset.v3.request.signin": "Sign In", "hidePwd": "HIDE", "showPwd": "SHOW", "b2c.smb.forgotPwd.emailFormatValidation": "This email did not pass the email address validation.", "b2c.smb.forgotPwd.emailDomainValidation": "This email did not pass the email domain check.", "b2c.smb.forgotPwd.LidCheck": "This email does not have a Lenovo ID", "b2c.smb.forgotPwd.emailInvalid": "Please enter a valid email", "b2c.smb.resetPwd.pwdNotMatch": "Two passwords don&#039;t match", "b2c.smb.resetPwd.pwdEmpty": "The password is empty", "b2c.smb.resetPwd.pwdInvalid": "The password either does not have the correct length or complexity", "b2c.smb.resetPwd.userNotInDB": "This user is not found in the Database" },
        userInfo: {
          email: '',
          password: '',
          confirmPassword: '',
          currentStep: 'reset_pwd',
          csrfToken: 'db41fba9-fb79-49dd-a68d-ae10a0d23b15'
        }
      }
    };
  },
  methods: { action: action('clicked') },
});