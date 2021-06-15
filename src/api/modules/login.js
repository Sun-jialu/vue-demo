import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']

// 获取列表
export function getCaptcha (params) {
    return request({
        url:`${baseUrl}/login/getCaptcha`,
        method: 'get',
        params: requestParam(params, 'get')
    })
}

export function login (params) {
    return request({
        url:`${baseUrl}/login/login`,
        method: 'post',
        data: requestParam(params)
    })
}
export function logOut (params) {
    return request({
        url:`${baseUrl}/login/logOut`,
        method: 'get',
        params: requestParam(params)
    })
}
