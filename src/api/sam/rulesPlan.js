import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/rulesPlan/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/rulesPlan/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/rulesPlan/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/rulesPlan/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 导出到excel
export function exportData(params) {
    return request({
        url: `${samUrl}/sam/rulesPlan/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}