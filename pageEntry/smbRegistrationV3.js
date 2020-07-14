import Vue from 'vue'
// const webpackConf = require('../config.json');
// use dynamic import to load diffrent component when config in config.json file
// import(`./${webpackConf.webpackConfig.entryName}.vue`).then((module)=>{
//   const App = module.default;
// })

import smbRegistrationV3 from '../pageComponent/smbRegistrationV3/smbRegistrationV3.vue';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
/* eslint-disable no-new */
new Vue({
  el: '#smbRegistrationV3',
  components: { smbRegistrationV3 },
  template: '<smb-registration-v3/>'
})