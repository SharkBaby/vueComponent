import Vue from 'vue'
// const webpackConf = require('../config.json');
// use dynamic import to load diffrent component when config in config.json file
// import(`./${webpackConf.webpackConfig.entryName}.vue`).then((module)=>{
//   const App = module.default;
// })

import smbLoginV3 from '../pageComponent/smbLoginV3/smbLoginV3.vue';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
/* eslint-disable no-new */
new Vue({
  el: '#smbLoginV3',
  components: { smbLoginV3 },
  template: '<smb-login-v3/>'
})