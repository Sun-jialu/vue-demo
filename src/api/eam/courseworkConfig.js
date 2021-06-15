import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//课时作业配置
// 分页查询数据列表
export function getLessonTopicPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/courselessonwork/getLessonTopicPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 加入
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/courselessonwork/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 移除
export function removeData(params) {
    return request({
        url: `${eamUrl}/eam/courselessonwork/removeData`,
        method: 'post',
        data: requestParam(params)
    })
}