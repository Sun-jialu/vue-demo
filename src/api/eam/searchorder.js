import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//订单查询
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/order/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 获取订单详情
export function getOrderDetailById(params) {
    return request({
        url: `${eamUrl}/eam/order/getOrderDetailById`,
        method: 'post',
        data: requestParam(params)
    })
}