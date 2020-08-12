import request from '@/utils/request'

export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function getSingle(id) {
  return request({
    url: `/article/single?_id=${id}`,
    method: 'get'
  })
}

export function getPrev(date) {
  return request({
    url: `/article/prev?date=${date}`,
    method: 'get'
  })
}

export function getNext(date) {
  return request({
    url: `/article/next?date=${date}`,
    method: 'get'
  })
}

export function getArticleListByType(type, params) {
  return request({
    url: `/article/${type}`,
    method: 'get',
    params
  })
}
