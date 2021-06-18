import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']

export function list (params) {
    return request({
        url:`${baseUrl}/sys/user/list`,
        method: 'get',
        params: requestParam(params,'get')
    })
}
export function role (params) {
    return request({
        url:`${baseUrl}`/sys/user/role,
        method: 'get',
        params: requestParam(params,'get')
    })
}
//获取角色管理列表
export function roleList (params) {
    return request({
        url:`${baseUrl}/sys/user/roleList`,
        method: 'get',
        params: requestParam(params,'get')
    })
}

export function info (id) {
    return request({
        url:`${baseUrl}/sys/user/info/${id}`,
        method: 'get',
        params: requestParam({},'get')
    })
}
export function roleInfo (id) {
    return request({
        url:`${baseUrl}/sys/user/roleInfo/${id}`,
        method: 'get',
        params: requestParam({},'get')
    })
}