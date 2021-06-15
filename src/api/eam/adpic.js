import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const eamUrl = SITE['eamUrl']
//轮播图配置
// 分页查询数据列表
export function getPageListByParam(params) {
    return request({
        url: `${eamUrl}/eam/adpic/getPageListByParam`,
        method: 'post',
        data: requestParam(params)
    })
}
// 根据id查询数据
export function getDataById(params) {
    return request({
        url: `${eamUrl}/eam/adpic/getDataById`,
        method: 'post',
        data: requestParam(params)
    })
}
// 修改数据信息
export function updateData(params) {
    return request({
        url: `${eamUrl}/eam/adpic/updateData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 添加
export function addData(params) {
    return request({
        url: `${eamUrl}/eam/adpic/addData`,
        method: 'post',
        data: requestParam(params)
    })
}

// 上移下移
export function updateNumberData(params) {
    return request({
        url: `${eamUrl}/eam/adpic/updateNumberData`,
        method: 'post',
        data: requestParam(params)
    })
}
// 删除
// export function deleteData(params) {
//     return request({
//         url: `${eamUrl}/eam/adpic/deleteData`,
//         method: 'post',
//         data: requestParam(params)
//     })
// }