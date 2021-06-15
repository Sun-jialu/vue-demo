import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//报名信息查询
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/stucourseapplyquery/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/stucourseapplyquery/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/stucourseapplyquery/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 全部删除
export function deleteDataAll(params) {
    return request({
        url: `${eamUrl}/eam/stucourseapplyquery/deleteDataAll`,
        method: 'post',
        data: requestParam(params)
    })
}
// 获取详情
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/stucourseapplyquery/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
//根据课程名称联动获取课程信息
export function getCourseInfo(params) {
    return request({
        url: `${eamUrl}/eam/course/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}