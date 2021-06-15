import layout from '@/layout'

const _import = require('./import-prod')

export const enguShowRoutes = [
    {
        path: "engu",
        component: layout,
        name: 'engu',
        meta: { title: 'engu', icon: 'admin' },
        children: [
            {
                path: 'engu',
                component: layout,
                name: 'engu/engu1',
                meta: { title: '设备管理', icon: 'admin' },
                children: [
                    {
                        path: 'engu/deviceMgmtGroup',
                        component: _import('engu/device/deviceMgmtGroup/deviceMgmtGroup.vue'),
                        name: 'engu/engu11',
                        meta: { title: '分组设置', icon: 'admin' },
                    }, {
                        path: 'engu/deviceMgmtAdmin',
                        component: _import('engu/device/deviceMgmtAdmin/deviceMgmtAdmin.vue'),
                        name: 'engu/engu12',
                        meta: { title: '门禁设备管理', icon: 'admin' },
                    }, {
                        path: 'engu/ruleMgmt',
                        component: _import('engu/device/ruleMgmt/ruleMgmt.vue'),
                        name: 'engu/ruleMgmt13',
                        meta: { title: '版本管理', icon: 'admin' },
                    },
                ]
            },{
                path: 'engu',
                component: layout,
                name: 'engu/engu2',
                meta: { title: '应用管理', icon: 'admin' },
                children: [
                    {
                        path: 'engu/authMgmtRKE',
                        component: _import('engu/apply/authMgmtRKE/authMgmtRKE.vue'),
                        name: 'engu/engu21',
                        meta: { title: '门禁权限管理', icon: 'admin' },
                    }, {
                        path: 'engu/authMgmtPerson',
                        component: _import('engu/apply/authMgmtPerson/authMgmtPerson.vue'),
                        name: 'engu/engu22',
                        meta: { title: '人员权限管理', icon: 'admin' },
                    }
                ]
            },{
                path: 'engu',
                component: layout,
                name: 'engu/engu3',
                meta: { title: '统计报表', icon: 'admin' },
                children: [
                    {
                        path: 'engu/authMgmtOpen',
                        component: _import('engu/report/authMgmtOpen/authMgmtOpen.vue'),
                        name: 'engu/engu31',
                        meta: { title: '开门日志查询', icon: 'admin' },
                    }, {
                        path: 'engu/authMgmtIden',
                        component: _import('engu/report/authMgmtIden/authMgmtIden.vue'),
                        name: 'engu/engu32',
                        meta: { title: '识别记录查询', icon: 'admin' },
                    }, {
                        path: 'engu/authMgmtStat',
                        component: _import('engu/report/authMgmtStat/authMgmtStat.vue'),
                        name: 'engu/qqqq33',
                        meta: { title: '识别记录统计', icon: 'admin' },
                    },
                ]
            },
        ]
    }
]


export const enguHideRoutes = [
]

