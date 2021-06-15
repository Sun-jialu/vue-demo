import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//报名信息登记
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/stucourselearncord/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}