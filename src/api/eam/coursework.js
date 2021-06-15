import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//课时作业管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/courselessonwork/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}