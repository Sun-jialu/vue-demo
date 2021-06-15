import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsmUrl = SITE['hsmUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${hsmUrl}/hsm/score/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${hsmUrl}/hsm/score/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${hsmUrl}/hsm/score/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${hsmUrl}/hsm/score/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 批量导入
export function importData(params) {
    return request({
        url: `${hsmUrl}/hsm/score/importData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 导出到excel
export function exportData(params) {
    return request({
        url: `${hsmUrl}/hsm/score/exportData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 下载模板
export function downloadExcel(params) {
    return request({
        url: `${hsmUrl}/hsm/score/downloadExcel`,
        method: 'post',
        data: requestParam(params)
    })
}