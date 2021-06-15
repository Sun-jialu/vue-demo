import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']

export function nav (params) {
    return request({
        url:`${baseUrl}/sys/menu/nav/`,
        method: 'get',
        params: requestParam(params, 'get')
    })
}

export function menuList (params) {
    return request({
        url:`${baseUrl}/sys/menu/menuList`,
        method: 'get',
        params: requestParam(params, 'get')
    })
}

