import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

// 获取getDropDownList select内容
export function getDropDownList(params) {
    return request({
        url: `${eamUrl}/eam/common/getDropDownList`,
        method: 'post',
        data: requestParam(params)
    })
}
// 获取getDropDownList select内容
export function getConstantDownList(params) {
    return request({
        url: `${eamUrl}/eam/common/getConstantDownList`,
        method: 'post',
        data: requestParam(params)
    })
}