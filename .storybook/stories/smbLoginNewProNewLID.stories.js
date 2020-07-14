import {
  action
} from '@storybook/addon-actions';
import {
  linkTo
} from '@storybook/addon-links';

import smbLoginNewProNewLID from '../../pageComponent/smbLoginV3/smbLoginNewProNewLID';

export default {
  title: 'smbLoginNewProNewLID',
  component: smbLoginNewProNewLID,
};

export const smbLoginV3 = () => ({
  components: {
    smbLoginNewProNewLID
  },
  template: `<smb-login-newPro-newLID :userInfo="userInfo" :statusInfo="statusInfo" :i18n="i18n" :inputCompanyRule="inputCompanyRule" @asyncComponentData="asyncComponentData"></smb-login-newPro-newLID>`,
  data() {
    return {
      webRootLocation: '/au/en/ausmbpro',
      i18n: { "smbProTagLineLogo": "https://www.lenovo.com/_ui/desktop/common/css/images/smb/lenovo-pro-tagline-logo.svg", "loginAccountNotNull": "Username can not be null", "showPageInitMsg": "Enter your email address to sign in or to create an account.", "NewPRO_NewLIDMsg": "Welcome! Create a password for your new Lenovo ID.", "NewPRO_ExistingLIDMsg": "Welcome! We see you have a Lenovo ID already.  Enter your Lenovo ID password to continue registering.", "ReturningPROMsg": "Welcome back! Enter your password to sign in.", "emailMsg": "Email Address", "passwordMsg": "Password", "creatPasswordMsg": "Create Password", "confirmPasswordMsg": "Confirm Password", "continueMsg": "CONTINUTE", "callErrorMsg": "There was an issue with your request.  Please try again.", "signinMsg": "SIGN IN", "backMsg": "&lt; Back", "telephoneHelpMsg": "Call 1800 433 272 for help", "learnMoreMsg": "Learn more about LenovoPRO &gt;", "forgotpassword": "(Forgot password?)", "samePassword": "Password and password confirmation should be same", "includeFollow": "Include two of the following: letters, numbers, or symbols($!#&amp;)", "passwordLength": "8-20 characters", "hidePwd": "HIDE", "showPwd": "SHOW", "rememberMe": "Remember me" },
      telephoneHelp: '1800 433 272',
      isocode: 'AU'.toLowerCase(),
      language: 'en_AU'.split("_")[0],
      // 'showPageInit', 'NewPRO_NewLID', 'NewPRO_ExistingLID', 'ReturningPRO'
      statusInfo: {
        currentStep: 'showPageInit',
        tipMessage: '',
        isRunning: false,
        hasError: false,
        step1ErrorMessage: '',
        step1HasError: false,
        step1aCreatePasswordHasError: false,
        step1aConfirmPasswordHasError: false
      },
      userInfo: {
        username: '',
        isITDMInvite: false,
        loginPassword: "",
        createPassword: "",
        confirmPassword: "",
      },
      inputCompanyRule: {
        "ignoreCheck": false,
        "passwordEnable": false,
        "passwordMinLength": 0,
        "passwordMaxLength": 0,
        "passwordPattern1": "",
        "passwordPattern2": "",
        "passwordPattern3": ""
      },
      includeFollowMatch: false,
      loginPasswordShow: false,
      step1PopoverShow: false,
      continueBtnShow: true,
      continueButDisabled: false,
      rememberUsername: false,
      rememberMeToggle: true,
    };
  },
  methods: {
    action: action('clicked'),
    asyncComponentData: function(key, newVal) {
      this[key] = newVal;
    },
  },
});