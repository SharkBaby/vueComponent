import axios from 'axios';
import qs from 'qs';

/**
 * @description: Unify all GET / POST / DELETE HTTP request - ！IMPORTANT
 * @author：Perry Xiang(xianghao2)
 */
const axiosRequest = {
  /**
   * @param {Object}: object which will contain the postUrl and params which http request used
   * @returns {Promise}: if success it will go to then, failed it will go to catch
   * @example {postUrl: '/us/en/smbpro/login/pwV3/forgotPwdPost', params: {email: 'testusepp@sharklasers.com', CSRFToken: '572c1ecb-3592-4c00-9b85-0cd2419c5092'}}
   */
  axiosPost: function (postObj) {
    return new Promise((resolve, reject) => {
      axios.post(postObj.postUrl, qs.stringify(postObj.params), {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Headers': 'token,Access-Control-Allow-Headers'
            // 'token': //Access-Control-Allow-Headers: Content-Type(后台需要在web.config里面添加允许的头部字段)
          }
        }).then(response => {
          resolve(response); //pass the response to the call place
        })
        .catch(error => {
          console.error('exception error :' + error);
          reject(error);
        });
    });
  },
  /**
   * @param {Object}: object which will contain the getUrl and params which http request used
   * @returns {Object} if success it will go to then, failed it will go to catch
   * @example {getUrl: '/us/en/smbpro/login/pwV3/forgotPwdPost', params: {email: 'testusepp@sharklasers.com', CSRFToken: '572c1ecb-3592-4c00-9b85-0cd2419c5092'}}
   */
  axiosGet: function (getObj) {
    return new Promise((resolve, reject) => {
      axios.get(getObj.getUrl, {
          params: getObj.params,
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Headers': 'token,Access-Control-Allow-Headers'
            // 'token': //Access-Control-Allow-Headers: Content-Type(后台需要在web.config里面添加允许的头部字段)
          }
        }).then(response => {
          resolve(response); //pass the response to the call place
        })
        .catch(error => {
          console.error('exception error ：' + error);
          reject(error);
        });
    });
  }
}

export {
  axiosRequest
}