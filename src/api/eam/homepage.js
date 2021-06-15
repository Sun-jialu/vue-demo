import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//主页配置
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/homepage/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据Id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/homepage/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}

// 修改
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/homepage/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
