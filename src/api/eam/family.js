import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']

//家庭成员管理
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/family/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/family/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/family/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/family/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除数据信息
export function deleteData(params) {
    return request({
        url: `${eamUrl}/eam/family/deleteData`,
        method: 'post',
        data: requestParam(params)
    })
}
//通过学员编号查询学生基本信息
export function getStudentByCode(params) {
    return request({
        url: `${eamUrl}/eam/student/getStudentByCode`,
        method: 'post',
        data: requestParam(params)
    })
}