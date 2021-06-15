import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const bem = SITE['bemUrl']


// 账户余额查询
export function getBankBalance(params) {
    return request({
        url: `${bem}/bem/accmanage/getBankBalance`,
        method: 'post',
        data: requestParam(params)
    })
}