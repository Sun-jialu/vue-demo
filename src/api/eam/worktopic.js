import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

//作业管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/worktopic/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/worktopic/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/worktopic/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/worktopic/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除数据信息
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/worktopic/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}