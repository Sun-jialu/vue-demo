import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']


// 获取普通时间段
export function getPageListByParam1(params) {
    return request({
        url: `${sam}/sam/timeTable/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//导出到excel
export function exportData(params) {
    return request({
        url: `${sam}/sam/timeTable/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}
//获取公共时间段
export function timeTableConfig1(params) {
    // console.log('params :>> ', params);
    return request({
        url: `${sam}/sam/timeTableConfig/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//新增公共时间段
export function addData(params) {
    return request({
        url: `${sam}/sam/timeTableConfig/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
//修改公共时间段
export function updateData(params) {
    return request({
        url: `${sam}/sam/timeTableConfig/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id获取数据
export function getDataById(params) {
    return request({
        url: `${sam}/sam/timeTableConfig/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}