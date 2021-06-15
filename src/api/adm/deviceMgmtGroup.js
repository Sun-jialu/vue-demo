import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const admUrl = SITE['admUrl']

//分组设置
// 分页查询数据列表
export function getGroupList(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/getGroupList`,
        method: 'post',
        data: requestParam(params)
    })
}
// 新增分组设置
export function addGroup(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/addGroup`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateGroup(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/updateGroup`,
        method: 'post',
        data: requestParam(params)
    })
}