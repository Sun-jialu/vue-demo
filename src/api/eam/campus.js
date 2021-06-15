import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

//校区信息管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/campus/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/campus/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/campus/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 添加校区
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/campus/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除校区
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/campus/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}