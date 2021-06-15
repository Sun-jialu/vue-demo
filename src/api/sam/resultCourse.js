import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${sam}/sam/resultCourse/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 导出到excel
export function exportData(params) {
    return request({
        url: `${sam}/sam/resultCourse/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}