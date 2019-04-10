import axios from 'axios'
import Router from '../router'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  /* 检测某种状态进行重定向
  if (response.status === 302) {
    Router.push({
      name: 'home'
    })
  } */
  return response
}, error => {
  return Promise.resolve(error.response)
});

const checkStatus = response => {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
};

/*
* status 状态值
* 0 正常 不做处理
* 1 普通异常 不做处理
* 2 需登陆但未登陆 返回登陆页面
*
* */

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res && res.status === -404) {
    // console.log(res.msg)
  }
  if (res && res.status === '2') {
    Router.push({path: '/login'});
    return res;
  }
  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: '/api',
      url: url,
      data: data,
      timeout: 10000,
      /*headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }*/
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: '/api',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  cors(url) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/' + url,
      timeout: 10000
    })
  }
}
