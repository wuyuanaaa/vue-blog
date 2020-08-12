import request from '@/utils/request'

export function githubLogin(params) {
  return request({
    url: '/user/github',
    method: 'get',
    params
  })
}

export function getUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
