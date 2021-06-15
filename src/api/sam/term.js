import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/term/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/term/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/term/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/term/insertData`,
        method: 'post',
        data: requestParam(params)
    })
}