import layout from '@/layout'

const _import = require('./import-prod')
export const bemShowRoutes = [
    {
        path: "bem11",
        component: layout,
        name: 'bem/bem11',
        meta: { title: 'bem', icon: 'admin' },
        children: [
            {
                path: 'bem/BankAccList',
                component: _import('bem/BankAccList/BankAccList.vue'),
                name: 'bem/BankAccList',
                meta: { title: '账户绑定管理', icon: 'admin' },
            },
            {
                path: 'bem22',
                component: layout,
                name: 'bem22',
                meta: { title: '账户管理', icon: 'admin' },
                children: [{
                    path: 'bem/BankBalance',
                    component: _import('bem/BankBalance/BankBalance.vue'),
                    name: 'bem/BankBalance',
                    meta: { title: '账户余额查询', icon: 'admin' },
                }, {
                    path: 'bem/TransDetail',
                    component: _import('bem/TransDetail/TransDetail.vue'),
                    name: 'bem/TransDetail',
                    meta: { title: '账户明细查询', icon: 'admin' },
                }, {
                    path: 'bem/BatchBankBalance',
                    component: _import('bem/BatchBankBalance/BatchBankBalance.vue'),
                    name: 'bem/BatchBankBalance',
                    meta: { title: '账户批量余额查询', icon: 'admin' },
                }]
            },
            {
                path: 'bem23',
                component: layout,
                name: 'bem23',
                meta: { title: '子账户管理', icon: 'admin' },
                children: [{
                    path: 'bem/SubAccOpen',
                    component: _import('bem/SubAccOpen/SubAccOpen.vue'),
                    name: 'bem/SubAccOpen',
                    meta: { title: '子账户开户', icon: 'admin' },
                }, {
                    path: 'bem/EmptyAccList',
                    component: _import('bem/EmptyAccList/EmptyAccList.vue'),
                    name: 'bem/EmptyAccList',
                    meta: { title: '子账户信息查询', icon: 'admin' },
                }, {
                    path: 'bem/EmptyAccTransList',
                    component: _import('bem/EmptyAccTransList/EmptyAccTransList.vue'),
                    name: 'bem/EmptyAccTransList',
                    meta: { title: '子账户明细查询', icon: 'admin' },
                }, {
                    path: 'bem/EmptyAccLevelList',
                    component: _import('bem/EmptyAccLevelList/EmptyAccLevelList.vue'),
                    name: 'bem/EmptyAccLevelList',
                    meta: { title: '子账户层级关系管理', icon: 'admin' },
                }, {
                    path: 'bem/SubAccCancel',
                    component: _import('bem/SubAccCancel/SubAccCancel.vue'),
                    name: 'bem/SubAccCancel',
                    meta: { title: '子账户销户', icon: 'admin' },
                }, {
                    path: 'bem/SubOperList',
                    component: _import('bem/SubOperList/SubOperList.vue'),
                    name: 'bem/SubOperList',
                    meta: { title: '子账户操作查询', icon: 'admin' },
                }]
            },
            {
                path: 'bem24',
                component: layout,
                name: 'bem24',
                meta: { title: '内部账户管理', icon: 'admin' },
                children: [{
                    path: 'bem/InsideAccOpen',
                    component: _import('bem/InsideAccOpen/InsideAccOpen.vue'),
                    name: 'bem/InsideAccOpen',
                    meta: { title: '内部账户开户', icon: 'admin' },
                }, {
                    path: 'bem/InsideAccList',
                    component: _import('bem/InsideAccList/InsideAccList.vue'),
                    name: 'bem/InsideAccList',
                    meta: { title: '内部账户信息查询', icon: 'admin' },
                }, {
                    path: 'bem/InsideAccTransList',
                    component: _import('bem/InsideAccTransList/InsideAccTransList.vue'),
                    name: 'bem/InsideAccTransList',
                    meta: { title: '内部账户明细查询', icon: 'admin' },
                }, {
                    path: 'bem/updateInsideAcc',
                    component: _import('bem/updateInsideAcc/updateInsideAcc.vue'),
                    name: 'bem/updateInsideAcc',
                    meta: { title: '内部账户修改', icon: 'admin' },
                }, {
                    path: 'bem/InsideAccCancel',
                    component: _import('bem/InsideAccCancel/InsideAccCancel.vue'),
                    name: 'bem/InsideAccCancel',
                    meta: { title: '内部账户销户', icon: 'admin' },
                }, {
                    path: 'bem/InsideOperList',
                    component: _import('bem/InsideOperList/InsideOperList.vue'),
                    name: 'bem/InsideOperList',
                    meta: { title: '内部账户操作查询', icon: 'admin' },
                },]
            },
            {
                path: 'bem25',
                component: layout,
                name: 'bem25',
                meta: { title: '保证金账户管理', icon: 'admin' },
                children: [{
                    path: 'bem/BailAccList',
                    component: _import('bem/BailAccList/BailAccList.vue'),
                    name: 'bem/BailAccList',
                    meta: { title: '保证金账户设置', icon: 'admin' },
                },{
                    path: 'bem/BailAccTransList',
                    component: _import('bem/BailAccTransList/BailAccTransList.vue'),
                    name: 'bem/BailAccTransList',
                    meta: { title: '保证金账户明细查询', icon: 'admin' },
                }]
            },
            {
                path: 'bem/ParamList',
                component: _import('bem/ParamList/ParamList.vue'),
                name: 'bem/ParamList',
                meta: { title: '账户管理参数配置', icon: 'admin' },
            },
        ]
    }
]


export const bemHideRoutes = [
]

