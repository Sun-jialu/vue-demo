import request from '../request'
import requestParam from '../requestParam'

const SITE = require('SITE')
const sam = SITE['samUrl']


//开始生成排课明细
export function addData(params) {
    return request({
        url: `${sam}/sam/courseScheduleAuto/addData`,
        method: 'post',
        data: requestParam(params)
    })
}
