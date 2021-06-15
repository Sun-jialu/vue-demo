import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//评价管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/studenteval/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/studenteval/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}