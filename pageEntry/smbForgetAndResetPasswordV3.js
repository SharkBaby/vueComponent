import Vue from 'vue'
// const webpackConf = require('../config.json');
// use dynamic import to load diffrent component when config in config.json file
// import(`./${webpackConf.webpackConfig.entryName}.vue`).then((module)=>{
//   const App = module.default;
// })
import smbForgetAndResetPasswordV3 from '../pageComponent/smbForgetAndResetPasswordV3/smbForgetAndResetPasswordV3';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
/* eslint-disable no-new */
new Vue({
  el: '#smbForgetAndResetPasswordV3',
  components: { smbForgetAndResetPasswordV3 },
  template: '<smb-forget-and-reset-password-v3/>'
})