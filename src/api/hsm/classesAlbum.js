import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsm = SITE['hsmUrl']


// 分页查询数据列表
export function getListByParam(params) {
    return request({
        url: `${hsm}/hsm/classesAlbum/getListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 分页查询每个相册的图片数据列表
export function getPageListByParam(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 单个下载
export function downloadData(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/downloadData`,
        method: 'get',
        data: params
    })
}
// 多个下载
export function batchDownloadData(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/batchDownloadData`,
        method: 'post',
        data: params
    })
}
// 多个删除
export function batchDelData(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/batchDelData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 自定义上传
export function addData(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/addData`,
        method: 'post',
        data: params
    })
}
// 审核
export function checkData(params) {
    return request({
        url: `${hsm}/hsm/classesAlbumFile/checkData`,
        method: 'post',
        data: params
    })
}
