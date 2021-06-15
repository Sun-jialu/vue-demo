import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/student/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/student/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/student/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/student/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 下载模板
export function downloadExcel(params) {
    return request({
        url: `${samUrl}/sam/student/downloadExcel`,
        method: 'post',
        data: requestParam(params)
    })
}
// 获取select内容
export function getSelect(params) {
    return request({
        url: `${samUrl}/sam/student/getSelect`,
        method: 'post',
        data: requestParam(params)
    })
}