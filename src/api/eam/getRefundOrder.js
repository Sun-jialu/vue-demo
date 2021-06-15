import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//退款查询
//分页查询数据列表
export function getRefundPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/order/getRefundPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}