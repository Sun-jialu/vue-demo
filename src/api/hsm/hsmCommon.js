import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const hsm = SITE['hsmUrl']


// 分页查询数据列表
export function getBasicsInfo(params) {
    return request({
        url: `${hsm}/hsm/basicsInfo/getBasicsInfo`,
        method: 'post',
        data: requestParam(params)
    })
}

// 自定义上传
export function addFile(params) {
    return request({
        url: `${hsm}/hsm/base/addFile`,
        method: 'post',
        data: params
    })
}