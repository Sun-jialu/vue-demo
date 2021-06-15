import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//机构咨询配置
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/notice/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/notice/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/notice/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存新增数据信息
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/notice/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除数据信息
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/notice/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 发布
export function publishData(params) {
    return request({
        url: `${eamUrl}/eam/notice/publishData`,
        method: 'post',
        data: requestParam(params)
    })
}