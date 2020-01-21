import request from '@/utils/request'

export const getComment = function(id) {
  return request({
    url: `/comments/get_comments?article_id=${id}`,
    method: 'get'
  })
}
