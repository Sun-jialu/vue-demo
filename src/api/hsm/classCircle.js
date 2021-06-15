import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsm = SITE['hsmUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${hsm}/hsm/classCircle/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${hsm}/hsm/classCircle/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 单个删除数据信息
export function delData(params) {
    return request({
        url: `${hsm}/hsm/classCircle/delData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 批量删除数据信息
export function batchDelData(params) {
    return request({
        url: `${hsm}/hsm/classCircle/batchDelData`,
        method: 'post',
        data: requestParam(params)
    })
}3
// 批量删除图片数据信息
export function batchDelFile(params) {
    return request({
        url: `${hsm}/hsm/classCircle/batchDelFile`,
        method: 'post',
        data: requestParam(params)
    })
}


// 分页查询班级圈评论数据信息
export function getPageListByParamC(params) {
    return request({
        url: `${hsm}/hsm/classCircleComment/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 单个删除评论数据信息
export function delDataC(params) {
    return request({
        url: `${hsm}/hsm/classCircleComment/delData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 批量删除评论数据信息
export function batchDelDataC(params) {
    return request({
        url: `${hsm}/hsm/classCircleComment/batchDelData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 全部删除评论数据信息
export function delAllData(params) {
    return request({
        url: `${hsm}/hsm/classCircleComment/delAllData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 全部删除评论数据信息
export function updateData(params) {
    return request({
        url: `${hsm}/hsm/classCircle/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}