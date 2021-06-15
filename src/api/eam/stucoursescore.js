import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//成绩管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/score/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/score/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/score/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存新增数据信息
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/score/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除数据信息
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/score/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}