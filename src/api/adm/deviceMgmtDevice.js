import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const admUrl = SITE['admUrl']

//设备管理
// 分页查询数据列表
export function getDeviceList(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/getDeviceList`,
        method: 'post',
        data: requestParam(params)
    })
}
// 新增
export function addDevice(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/addDevice`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateDevice(params) {
    return request({
        url: `${admUrl}/adm/deviceMgmt/updateDevice`,
        method: 'post',
        data: requestParam(params)
    })
}