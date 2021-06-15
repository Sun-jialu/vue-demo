import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']


// 获取列表
export function list (params) {
  return request({
    url:`${baseUrl}/test`,
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取信息
export function info (id) {
  return request({
    url:`${baseUrl}/test/${id}`,
    method: 'get',
    params: requestParam({}, 'get')
  })
}

export function add (params) {
  return request({
    url:`${baseUrl}/test`,
    method: 'post',
    data: requestParam(params)
  })
}
