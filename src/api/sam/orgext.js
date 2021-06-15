import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']

// 根据id查询数据
export function getMySchoolInfo(params) {
    return request({
        url: `${sam}/sam/orgext/getMySchoolInfo`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${sam}/sam/orgext/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 三级联动
export function getAreaList(params) {
    return request({
        url: `${sam}/sam/orgext/getAreaList`,
        method: 'post',
        data: requestParam(params)
    })
}