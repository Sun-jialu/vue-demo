import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const bem = SITE['bemUrl']


// 账户余额查询
export function getTransDetail(params) {
    return request({
        url: `${bem}/bem/accmanage/getTransDetail`,
        method: 'post',
        data: requestParam(params)
    })
}