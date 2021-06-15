import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const bem = SITE['bemUrl']


// 账户绑定查询
export function getPageListByParam(params) {
    return request({
        url: `${bem}/bem/accmanage/getBankAccList`,
        method: 'post',
        data: requestParam(params)
    })
}
// 账户绑定添加
export function addBankAcc(params) {
    return request({
        url: `${bem}/bem/accmanage/addBankAcc`,
        method: 'post',
        data: requestParam(params)
    })
}
// 账户绑定修改
export function updateBankAcc(params) {
    return request({
        url: `${bem}/bem/accmanage/updateBankAcc`,
        method: 'post',
        data: requestParam(params)
    })
}