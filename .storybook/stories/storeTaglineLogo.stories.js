import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import storeTaglineLogo from '../../commonComponent/storeTaglineLogo';

export default {
  title: 'storeTaglineLogo',
  component: storeTaglineLogo,
};

export const smbLoginV3 = () => ({
  components: { storeTaglineLogo },
  template: '<storeTaglineLogo @click="action">Hello Button</storeTaglineLogo>',
  data(){
    return {
      i18n: {
        smbProTagLineLogo: 'https://www.lenovo.com/_ui/desktop/common/css/images/smb/lenovo-pro-tagline-logo.svg',
      }
    }
  },
  methods: { action: action('clicked') },
});

export const smbRegistrationV3 = () => ({
  components: { storeTaglineLogo },
  render(h) {
    return <store-tagline-logo onClick={this.action}></store-tagline-logo>;
  },
  data(){
    return {
      i18n: {
        smbProTagLineLogo: 'https://www.lenovo.com/_ui/desktop/common/css/images/smb/lenovo-pro-tagline-logo.svg',
      }
    }
  },
  methods: { action: linkTo('clicked') },
});

export const smbForgetAndResetPasswordV3 = () => ({
  components: { storeTaglineLogo },
  template: '<store-tagline-logo @click="action">😀 😎 👍 💯</store-tagline-logo>',
  data(){
    return {
      i18n: {
        smbProTagLineLogo: 'https://www.lenovo.com/_ui/desktop/common/css/images/smb/lenovo-pro-tagline-logo.svg',
      }
    }
  },
  methods: { action: action('clicked') },
});
