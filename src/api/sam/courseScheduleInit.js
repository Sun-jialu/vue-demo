import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${sam}/sam/courseScheduleInit/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${sam}/sam/courseScheduleInit/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateOrAddData(params) {
    return request({
        url: `${sam}/sam/courseScheduleInit/updateOrAddData`,
        method: 'post',
        data: requestParam(params)
    })
}
// // 保存数据信息
// export function addData(params) {
//     return request({
//         url: `${sam}/sam/courseScheduleInit/addData`,
//         method: 'post',
//         data: requestParam(params)
//     })
// }