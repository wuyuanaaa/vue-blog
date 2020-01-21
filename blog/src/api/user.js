import request from '@/utils/request'

export const getInfo = function(params) {
  return request({
    url: '/users/github',
    method: 'get',
    params
  })
}
