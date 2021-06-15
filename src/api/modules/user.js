import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const baseUrl = SITE['baseUrl']


export function updatePwd (params) {
    return request({
        url:`${baseUrl}/sys/user/updatePwd`,
        method: 'post',
        data: requestParam(params)
    })
}