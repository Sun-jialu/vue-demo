import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const bem = SITE['bemUrl']


// 分页查询数据列表
export function getParamList(params) {
    return request({
        url: `${bem}/bem/accmanage/getParamList`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${bem}/bem/accmanage/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateParamInfo(params) {
    return request({
        url: `${bem}/bem/accmanage/updateParamInfo`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${bem}/bem/accmanage/addData`,
        method: 'post',
        data: requestParam(params)
    })
}