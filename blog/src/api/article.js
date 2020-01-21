import request from '@/utils/request'

export const getList = function(params) {
  return request({
    url: '/articles/list',
    method: 'get',
    params
  })
}

export const getSingle = function(id) {
  return request({
    url: `/articles/single?_id=${id}`,
    method: 'get'
  })
}

export const getPrev = function(date) {
  return request({
    url: `/articles/prev?date=${date}`,
    method: 'get'
  })
}

export const getNext = function(date) {
  return request({
    url: `/articles/next?date=${date}`,
    method: 'get'
  })
}
