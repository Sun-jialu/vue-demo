import layout from '@/layout'

const _import = require('./import-prod')
export const btmShowRoutes = [
    {
        path: "btm",
        component: layout,
        name: 'btm',
        meta: { title: 'btm', icon: 'admin' },
        children: [
            {
                path: 'btm',
                component: layout,
                name: 'btm/33',
                meta: { title: '银行转账管理', icon: 'admin' },
                children: [
                    { path: 'btm/singleTransferReview', component: _import('btm/singleTransferReview'), name: 'btm/singleTransferReview', meta: { title: '单笔转账审核', icon: 'admin' }, },
                    { path: 'btm/massTransfer', component: _import('btm/massTransfer'), name: 'btm/massTransfer', meta: { title: '批量转账', icon: 'admin' }, },
                    { path: 'btm/massTransferReview', component: _import('btm/massTransferReview'), name: 'btm/massTransferReview', meta: { title: '批量转账审核', icon: 'admin' }, },
                ]
            },
            {
                path: 'btm/PayeePersonList',
                component: _import('btm/PayeePersonList/PayeePersonList.vue'),
                name: 'btm/PayeePersonList',
                meta: { title: '收款方管理', icon: 'admin' },
            },
            {
                path: 'btm2',
                component: layout,
                name: 'btm2',
                meta: { title: '资金拨付管理', icon: 'admin' },
                children: [{
                    path: 'btm/PayRulesList',
                    component: _import('btm/PayRulesList/PayRulesList.vue'),
                    name: 'btm/PayRulesList',
                    meta: { title: '拨付规则配置', icon: 'admin' },
                }, 
                // {
                //     path: 'btm21',
                //     component: layout,
                //     name: 'btm21',
                //     meta: { title: '机构入账信息管理', icon: 'admin' },
                //     children: [{
                //         path: 'btm/regist',
                //         component: _import('btm/regist/regist.vue'),
                //         name: 'btm/regist',
                //         meta: { title: '入账信息登记', icon: 'admin' },
                //     }, {
                //         path: 'btm/inquire',
                //         component: _import('btm/inquire/inquire.vue'),
                //         name: 'btm/inquire',
                //         meta: { title: '入账信息查询', icon: 'admin' },
                //     }]
                // }, 
                {
                    path: 'btm/PayMoneyList',
                    component: _import('btm/PayMoneyList/PayMoneyList.vue'),
                    name: 'btm/PayMoneyList',
                    meta: { title: '拨付资金清算查询', icon: 'admin' },
                }, {
                    path: 'btm/PayMoneyDetail',
                    component: _import('btm/PayMoneyDetail/PayMoneyDetail.vue'),
                    name: 'btm/PayMoneyDetail',
                    meta: { title: '拨付资金清算明细查询', icon: 'admin' },
                }, {
                    path: 'btm/PayDetailList',
                    component: _import('btm/PayDetailList/PayDetailList.vue'),
                    name: 'btm/PayDetailList',
                    meta: { title: '资金拨付明细查询', icon: 'admin' },
                }]
            },
        ]
    }
]


export const btmHideRoutes = [
]

