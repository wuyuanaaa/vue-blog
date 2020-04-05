import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/articles/list',
    method: 'get',
    params
  })
}

export function getSingle(id) {
  return request({
    url: `/articles/single?_id=${id}`,
    method: 'get'
  })
}

export function getPrev(date) {
  return request({
    url: `/articles/prev?date=${date}`,
    method: 'get'
  })
}

export function getNext(date) {
  return request({
    url: `/articles/next?date=${date}`,
    method: 'get'
  })
}

export function getListByType(type, params) {
  return request({
    url: `/articles/${type}`,
    method: 'get',
    params
  })
}
