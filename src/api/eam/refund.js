import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//退款审核
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/refund/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/refund/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 审核
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/refund/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}