import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']

// 获取随机数
export function getCaptcha (params) {
    return request({
        url:`${baseUrl}/login/getCaptcha`,
        method: 'get',
        params: requestParam(params, 'get')
    })
}
//登录
export function login (params) {
    return request({
        url:`${baseUrl}/login/login`,
        method: 'post',
        data: requestParam(params)
    })
}
//退出登录
export function logOut (params) {
    return request({
        url:`${baseUrl}/login/logOut`,
        method: 'get',
        params: requestParam(params)
    })
}
