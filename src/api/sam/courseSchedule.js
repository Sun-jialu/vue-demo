import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 获取table数据
export function queryPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/courseSchedule/queryPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/courseSchedule/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/courseSchedule/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/courseSchedule/addData`,
        method: 'post',
        data: requestParam(params)
    })
}