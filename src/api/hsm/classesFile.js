import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsm = SITE['hsmUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${hsm}/hsm/classesFile/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${hsm}/hsm/classesFile/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${hsm}/hsm/classesFile/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${hsm}/hsm/classesFile/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 下载班级文档
export function exportData(params) {
    return request({
        url: `${hsm}/hsm/classesFile/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除班级文档
export function delData(params) {
    return request({
        url: `${hsm}/hsm/classesFile/delData`,
        method: 'post',
        data: requestParam(params)
    })
}