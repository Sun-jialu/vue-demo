import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//作业批阅查询
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/stucoursecheckquery/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}