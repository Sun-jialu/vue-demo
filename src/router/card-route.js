import layout from '@/layout'
const _import = require('./import-prod')
export const cardShowRoutes = [{
    path: 'card11',
    component: layout,
    name: 'card/card11',
    meta: { title: 'card', icon: 'admin' },
    children: [
        {
            path: 'card22',
            component: layout,
            name: 'card22',
            meta: { title: '账户管理', icon: 'admin' },
            children: [
                {
                    path: 'card/account',
                    component: _import('card/account/accountAll/account'),
                    name: 'card/account',
                    meta: { title: '账户总览', icon: 'admin' }
                },{
                    path: 'card/CardBrowsing',
                    component: _import('card/account/CardBrowsing/CardBrowsing'),
                    name: 'card/CardBrowsing',
                    meta: { title: '卡片浏览', icon: 'admin' }
                },{
                    path: 'card/openAccount',
                    component: _import('card/account/openAccount/openAccount'),
                    name: 'card/openAccount',
                    meta: { title: '开户', icon: 'admin' }
                },
            ]
        },{
            path: 'card33',
            component: layout,
            name: 'card33',
            meta: { title: '子系统管理', icon: 'admin' },
            children: [
                {
                    path: 'card/Subsystem',
                    component: _import('card/Subsystem/subsystem/Subsystem'),
                    name: 'card/Subsystem',
                    meta: { title: '子系统管理', icon: 'admin' }
                },
            ]
        },{
            path: 'card44',
            component: layout,
            name: 'card44',
            meta: { title: '卡片管理', icon: 'admin' },
            children: [
                {
                    path: 'card/carddev',
                    component: _import('card/carddev/open/carddev'),
                    name: 'card/carddev',
                    meta: { title: '开片', icon: 'admin' }
                },
            ]
        },{
            path: 'card55',
            component: layout,
            name: 'card55',
            meta: { title: '秘钥管理', icon: 'admin' },
            children: [
                {
                    path: 'card/stair',
                    component: _import('card/privatekey/stair/stair'),
                    name: 'card/stair',
                    meta: { title: '一级秘钥', icon: 'admin' }
                },{
                    path: 'card/second',
                    component: _import('card/privatekey/second/second'),
                    name: 'card/second',
                    meta: { title: '二级秘钥', icon: 'admin' }
                },{
                    path: 'card/threeLevel',
                    component: _import('card/privatekey/threeLevel/threeLevel'),
                    name: 'card/threeLevel',
                    meta: { title: '三级秘钥', icon: 'admin' }
                },{
                    path: 'card/levelFour',
                    component: _import('card/privatekey/levelFour/levelFour'),
                    name: 'card/levelFour',
                    meta: { title: '三级秘钥PSAM卡', icon: 'admin' }
                },
            ]
        },{
            path: 'card77',
            component: layout,
            name: 'card77',
            meta: { title: '缴费管理', icon: 'admin' },
            children: [
                {
                    path: 'card77_1',
                    component: layout,
                    name: 'card77_1',
                    meta: { title: '线上支付管理', icon: 'admin' },
                    children: [
                        {
                            path: 'card/channel',
                            component: _import('card/fees/online/channel'),
                            name: 'card/channel',
                            meta: { title: '线上支付渠道管理', icon: 'admin' }
                        },{
                            path: 'card/running',
                            component: _import('card/fees/online/running'),
                            name: 'card/running',
                            meta: { title: '线上支付流水管理', icon: 'admin' }
                        },{
                            path: 'card/refund',
                            component: _import('card/fees/online/refund'),
                            name: 'card/refund',
                            meta: { title: '线上支付退款管理', icon: 'admin' }
                        }
                    ]
                },{
                    path: 'card77_2',
                    component: layout,
                    name: 'card77_2',
                    meta: { title: '收费配置管理', icon: 'admin' },
                    children: [
                        {
                            path: 'card/message',
                            component: _import('card/fees/register/message'),
                            name: 'card/message',
                            meta: { title: '收费渠道设置', icon: 'admin' }
                        },{
                            path: 'card/costType',
                            component: _import('card/fees/register/costType'),
                            name: 'card/costType',
                            meta: { title: '费用类型设置', icon: 'admin' }
                        }
                    ]
                },{
                    path: 'card77_3',
                    component: layout,
                    name: 'card77_3',
                    meta: { title: '费用登记管理', icon: 'admin' },
                    children: [
                        {
                            path: 'card/information',
                            component: _import('card/fees/loginRig/information'),
                            name: 'card/information',
                            meta: { title: '费用信息登记', icon: 'admin' }
                        }
                    ]
                },
            ]
        },{
            path: 'card88',
            component: layout,
            name: 'card88',
            meta: { title: '基础信息管理', icon: 'admin' },
            children: [
                {
                    path: 'card/department',
                    component: _import('card/basics/department'),
                    name: 'card/department',
                    meta: { title: '部门信息管理', icon: 'admin' }
                },{
                    path: 'card/duty',
                    component: _import('card/basics/duty'),
                    name: 'card/duty',
                    meta: { title: '职务信息管理', icon: 'admin' }
                },{
                    path: 'card88_1',
                    component: layout,
                    name: 'card88_1',
                    meta: { title: '档案信息管理', icon: 'admin' },
                    children: [
                        {
                            path: 'card/addRecord',
                            component: _import('card/basics/record/addRecord'),
                            name: 'card/addRecord',
                            meta: { title: '档案新增', icon: 'admin' }
                        },{
                            path: 'card/inofRecord',
                            component: _import('card/basics/record/inofRecord'),
                            name: 'card/inofRecord',
                            meta: { title: '档案查询', icon: 'admin' }
                        },
                    ]
                },{
                    path: 'card/delistbyparam',
                    component: _import('card/basics/delistbyparam/delistbyparam.vue'),
                    name: 'card/delistbyparam',
                    meta: { title: '基础代码管理', icon: 'admin' }
                },{
                    path: 'card/listbyparam',
                    component: _import('card/basics/listbyparam/listbyparam.vue'),
                    name: 'card/listbyparam',
                    meta: { title: '系统参数配置', icon: 'admin' }
                }
            ]
        },{
            path: 'card99',
            component: layout,
            name: 'card99',
            meta: { title: '报送管理', icon: 'admin' },
            children: [
                {
                    path: 'card99_1',
                    component: layout,
                    name: 'card99_1',
                    meta: { title: '补助申请管理', icon: 'admin' },
                    children: [
                        {
                            path: 'card/apply',
                            component: _import('card/submission/subsidyMent/apply'),
                            name: 'card/apply',
                            meta: { title: '补助申请', icon: 'admin' }
                        },{
                            path: 'card/applyInof',
                            component: _import('card/submission/subsidyMent/applyInof'),
                            name: 'card/applyInof',
                            meta: { title: '补助申请查询', icon: 'admin' }
                        }
                    ]
                },{
                    path: 'card99_2',
                    component: layout,
                    name: 'card99_2',
                    meta: { title: '补助申请核对', icon: 'admin' },
                    children: [
                        {
                            path: 'card/subsidyCheck',
                            component: _import('card/submission/subsidyCheck/subsidyCheck'),
                            name: 'card/subsidyCheck',
                            meta: { title: '补助申请核对', icon: 'admin' }
                        }
                    ]
                },
            ]
        },
    ]
}]
