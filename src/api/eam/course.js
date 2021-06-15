import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

// 课程信息管理分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/course/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 课程信息管理根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/course/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 课程信息管理修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/course/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 课程信息管理保存新增数据信息
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/course/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 课程信息管理删除数据信息
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/course/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}

// 课程信息管理导出excel
// export function exportData(params) {
//     return request({
//         url: `${eamUrl}/eam/class/exportData`,
//         method: 'post',
//         data: requestParam(params)
//     })
// }

//课程信息管理发布下架课程
export function updateState(params) {
    return request({
        url: `${eamUrl}/eam/course/updateState`,
        method: 'post',
        data: requestParam(params)
    })
}

