import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/teachPlan/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/teachPlan/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/teachPlan/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/teachPlan/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据课程分类获取课程
export function getCourseListByType(params) {
    return request({
        url: `${samUrl}/sam/teachPlan/getCourseListByType`,
        method: 'post',
        data: requestParam(params)
    })
}