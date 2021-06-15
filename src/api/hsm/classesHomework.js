import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsm = SITE['hsmUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${hsm}/hsm/classesHomework/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${hsm}/hsm/classesHomework/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${hsm}/hsm/classesHomework/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${hsm}/hsm/classesHomework/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 发布及删除通知
export function releaseOrDelData(params) {
    return request({
        url: `${hsm}/hsm/classesHomework/releaseOrDelData`,
        method: 'post',
        data: requestParam(params)
    })
}