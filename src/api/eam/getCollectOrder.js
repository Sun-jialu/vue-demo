import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//课程销售汇总
//分页查询数据列表
export function getCollectPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/order/getCollectPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}