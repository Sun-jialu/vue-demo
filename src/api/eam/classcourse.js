import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//班级课程管理
//分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/classcourse/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//加入
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/classcourse/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
//移除
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/classcourse/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}