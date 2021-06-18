import Mock from 'mockjs'

const data = {
    "msg": "success",
    "code": 0,
    "page": {
        "totalCount": 2,
        "pageSize": 10,
        "totalPage": 1,
        "currPage": 1,
        "list": [{
            "userId": 1,
            "username": "admin",
            "password": "9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d",
            "salt": "YzcmCZNvbXocrsz9dm8e",
            "email": "12312@qq.com",
            "mobile": "13612345678",
            "status": 1,
            "roleIdList": null,
            "createUserId": 1,
            "createTime": "2016-11-11 19:11:11"
        }, {
            "userId": 2,
            "username": "admin2",
            "password": "cf26332e127391bdd61c1305356ce1248960e7d5960dd3caca7fe29c2a8a2d5d",
            "salt": "Fua4TeEmAB5vFFTZ2n5g",
            "email": "2311@qq.com",
            "mobile": "15101223311",
            "status": 1,
            "roleIdList": null,
            "createUserId": 1,
            "createTime": "2020-03-31 21:57:32"
        }]
    }
}

const roleList = { "msg": "success", "code": 0, "rsCode": "AAAAAAA", "list": [{ "roleId": 2, "roleName": "admin", "remark": "管理员", "createUserId": 1, "menuIdList": null, "createTime": "2019-04-11 10:23:40" }, { "roleId": 3, "roleName": "sjl", "remark": "使用者", "createUserId": 1, "menuIdList": null, "createTime": "2020-03-31 21:56:23" }] }

const info = { "msg": "success", "code": 0, "rsCode": "AAAAAAA", "user": { "userId": 1, "username": "admin", "password": "9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d", "salt": "YzcmCZNvbXocrsz9dm8e", "email": "5233@qq.com", "mobile": "15011112231", "status": 1, "roleIdList": [2], "createUserId": 1, "createTime": "2016-11-11 19:11:11" } }

const roleInfo = { "msg": "success", "code": 0, "rsCode": "AAAAAAA", "role": { "roleId": 3, "roleName": "当前用户名称", "remark": "", "createUserId": 1, "menuIdList": [23, 24, 25, -666666, 1, 4], "createTime": "2020-03-31 21:56:23" } }
export default [
    {
        url: '/sys/user/list',
        type: 'get',
        response: config => {
            return data
        }
    },
    // 角色管理列表模拟返回
    {
        url: '/sys/user/roleList',
        type: 'get',
        response: config => {
            return roleList
        }
    },
    {
        url: '/sys/user/info',
        type: 'get',
        response: config => {
            return info
        }
    },
    {
        url: '/sys/user/roleInfo',
        type: 'get',
        response: config => {
            return roleInfo
        }
    },
]