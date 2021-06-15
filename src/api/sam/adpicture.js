import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const samUrl = SITE['samUrl']


// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${samUrl}/sam/adpicture/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${samUrl}/sam/adpicture/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${samUrl}/sam/adpicture/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 保存数据信息
export function addData(params) {
    return request({
        url: `${samUrl}/sam/adpicture/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 上移下移
export function updateNumberData(params) {
    return request({
        url: `${samUrl}/sam/adpicture/updateNumberData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 上传图片
export function fileUpload(params) {
    console.log('object :>> ', params);
    console.log('111 :>> ', 111);
    return request({
        url: `${samUrl}/sam/adpicture/fileUpload`,
        method: 'post',
        data: requestParam(params)
    })
}