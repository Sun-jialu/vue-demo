import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${sam}/sam/courseSchedule/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//导出到excel
export function exportData(params) {
    return request({
        url: `${sam}/sam/courseSchedule/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}
//获取头部时间、日期
export function getDay(params) {
    return request({
        url: `${sam}/sam/courseSchedule/getDay`,
        method: 'post',
        data: requestParam(params)
    })
}
//获取公共时间段
export function courseScheduleConfig(params) {
    return request({
        url: `${sam}/sam/courseScheduleConfig/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//新增公共时间段
export function addData(params) {
    return request({
        url: `${sam}/courseScheduleConfig/class/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
//修改公共时间段
export function updateData(params) {
    return request({
        url: `${sam}/courseScheduleConfig/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id获取数据
export function getDataById(params) {
    return request({
        url: `${sam}/courseScheduleConfig/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}