import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const VALID_STATUS = [401]

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000, // request timeout
  validateStatus(status) { // 配置合法状态码
    return status >= 200 && status < 300 || VALID_STATUS.includes(status)
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 401) {
      Message.info('登陆已过期！')
      store.dispatch('user/logout')
    }

    const res = response.data
    if (res.code !== undefined) {
      if (res.code) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络异常！请刷新页面或稍后尝试。',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
