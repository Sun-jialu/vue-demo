import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//机构教务参数管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/config/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据schoolConfigId查询数据
export function getConfigValList(params) {
    return request({
        url: `${eamUrl}/eam/config/getConfigValList`,
        method: 'post',
        data: requestParam(params)
    })
}

// 修改
export function updateConfigVal(params) {
    return request({
        url: `${eamUrl}/eam/config/updateConfigVal`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除
export function deleteConfigVal(params) {
    return request({
        url: `${eamUrl}/eam/config/deleteConfigVal`,
        method: 'post',
        data: requestParam(params)
    })
}

// 新增
export function addConfigVal(params) {
    return request({
        url: `${eamUrl}/eam/config/addConfigVal`,
        method: 'post',
        data: requestParam(params)
    })
}