import request from '@/utils/request'

export function A_login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
