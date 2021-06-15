import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const dictUrl = SITE['dictUrl']


// 动态下拉框查询
export function getDataListByTypeArray(params) {
    return request({
        url: `${dictUrl}/base/dict/getDataListByTypeArray`,
        method: 'post',
        data: requestParam(params)
    })
}
// 常量下拉框查询
export function getConstantDownList(params) {
    return request({
        url: `${dictUrl}/base/dict/getConstantDownList`,
        method: 'post',
        data: requestParam(params)
    })
}