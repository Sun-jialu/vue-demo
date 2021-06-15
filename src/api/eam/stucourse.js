import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

//课程学员管理分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/coursestudent/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
//课程学员管理加入退出
export function updateDate(params) {
    return request({
        url: `${eamUrl}/eam/coursestudent/updateDate`,
        method: 'post',
        data: requestParam(params)
    })
}
//课程学员管理设置上课周期
export function addStuCoursePeriod(params) {
    return request({
        url: `${eamUrl}/eam/coursestudent/addStuCoursePeriod`,
        method: 'post',
        data: requestParam(params)
    })
}
//学员加入课程时获取课程、学员的详细信息
export function getDataDetail(params) {
    return request({
        url: `${eamUrl}/eam/coursestudent/getDataDetail`,
        method: 'post',
        data: requestParam(params)
    })
}