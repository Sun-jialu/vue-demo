import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//学校信息管理
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/school/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/school/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
export function search (params) {
    return request({
        url:"https://apis.map.qq.com/ws/place/v1/search",
        method: 'get',
        params: requestParam(params, 'get')
    })
}
