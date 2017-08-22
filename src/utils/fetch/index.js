import 'babel-polyfill';
import 'es6-promise';
import 'isomorphic-fetch';
import processResponse from './process-response';

/**
 * 配置回调函数
 */
let CallbacksSetting = {
  onRequestStart: () => { },
  onResponse: res => res,
  onResponseError: res => res
}
export function configCallbacks(type, callback: any) {
  CallbacksSetting[type] = callback
}

/**
 *  配置处理器
 */
const ProcesserSetting = {
  processResponse: (res) => res
}
export function configProcesser(type, callback) {
  ProcesserSetting[type] = callback
}

/**
 * 默认请求头
 */
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

/**
 * 封装异步请求
 */
function send(url, method, data) {
  CallbacksSetting.onRequestStart()

  method = (method || 'get').toUpperCase()

  let fetchParams = {
    method,
    headers: Object.assign({}, defaultHeaders),
    credentials: 'same-origin',
  }

  if (data) {
    let query = '';
    _.map(Object.keys(data), function (value) {
      query += (value + '=' + data[value] + '&');
    });
    query = query.substring(0, query.length - 1);
    url = url + '?' + query;
  }

  return new Promise((resolve, reject) => {
    fetch(url, fetchParams)
      .then(processResponse)
      .then(res => {
        CallbacksSetting.onResponse(res)
        res = ProcesserSetting.processResponse(res)
        return resolve(res)
      })
      .catch(res => {
        CallbacksSetting.onResponseError(res)
        return reject(res)
      })
  })
}

export default {
  get(url, data) {
    return send(url, 'get', data)
  },
  
  post(url, data) {
    return send(url, 'post', data)
  },
  
  del(url) {
    return send(url, 'delete')
  },
  
  put(url, data) {
    return send(url, 'put', data)
  },
  
  patch(url, data) {
    return send(url, 'put', data)
  }
}
