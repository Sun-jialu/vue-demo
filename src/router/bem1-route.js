import layout from '@/layout'

const _import = require('./import-prod')
export const bem1ShowRoutes = [
    {
        path: "bem11",
        component: layout,
        name: 'bem1/bem11',
        meta: { title: 'bem1', icon: 'admin' },
        children: [
            // {
            //     path: 'bem1/BankAccList',
            //     component: _import('bem1/BankAccList/BankAccList.vue'),
            //     name: 'bem1/BankAccList',
            //     meta: { title: '账户绑定管理', icon: 'admin' },
            // },
            {
                path: 'bem22',
                component: layout,
                name: 'bem22',
                meta: { title: '转账管理', icon: 'admin' },
                children: [{
                    path: 'bem1/SingleTransfer',
                    component: _import('bem1/SingleTransfer/SingleTransfer.vue'),
                    name: 'bem1/SingleTransfer',
                    meta: { title: '单笔转账-同行', icon: 'admin' },
                }, {
                    path: 'bem1/BatchAudit',
                    component: _import('bem1/BatchAudit/BatchAudit.vue'),
                    name: 'bem1/BatchAudit',
                    meta: { title: '单笔转账审核', icon: 'admin' },
                }, {
                    path: 'bem1/BatchTransfer',
                    component: _import('bem1/BatchTransfer/BatchTransfer.vue'),
                    name: 'bem1/BatchTransfer',
                    meta: { title: '批量转账', icon: 'admin' },
                }, {
                    path: 'bem1/BatchTransferAudit',
                    component: _import('bem1/BatchTransferAudit/BatchTransferAudit.vue'),
                    name: 'bem1/BatchTransferAudit',
                    meta: { title: '批量转账审核', icon: 'admin' },
                }, {
                    path: 'bem1/TransferList',
                    component: _import('bem1/TransferList/TransferList.vue'),
                    name: 'bem1/TransferList',
                    meta: { title: '转账查询', icon: 'admin' },
                }, {
                    path: 'bem1/TransferBatchCancel',
                    component: _import('bem1/TransferBatchCancel/TransferBatchCancel.vue'),
                    name: 'bem1/TransferBatchCancel',
                    meta: { title: '批量撤销', icon: 'admin' },
                }]
            },
            {
                path: 'bem23',
                component: layout,
                name: 'bem23',
                meta: { title: '子账户转账管理', icon: 'admin' },
                children: [{
                    path: 'bem1/SubTransfer',
                    component: _import('bem1/SubTransfer/SubTransfer.vue'),
                    name: 'bem1/SubTransfer',
                    meta: { title: '子账户转账-同行', icon: 'admin' },
                }, {
                    path: 'bem1/SubBatchTransferAudit',
                    component: _import('bem1/SubBatchTransferAudit/SubBatchTransferAudit.vue'),
                    name: 'bem1/SubBatchTransferAudit',
                    meta: { title: '子账户转账审核', icon: 'admin' },
                }, {
                    path: 'bem1/SubTransferList',
                    component: _import('bem1/SubTransferList/SubTransferList.vue'),
                    name: 'bem1/SubTransferList',
                    meta: { title: '子账户转账查询', icon: 'admin' },
                }, {
                    path: 'bem1/SubTransferBatchCancel',
                    component: _import('bem1/SubTransferBatchCancel/SubTransferBatchCancel.vue'),
                    name: 'bem1/SubTransferBatchCancel',
                    meta: { title: '子账户转账撤销', icon: 'admin' },
                }]
            },
            {
                path: 'bem1/PayeePersonList',
                component: _import('bem1/PayeePersonList/PayeePersonList.vue'),
                name: 'bem1/PayeePersonList',
                meta: { title: '收款方管理', icon: 'admin' },
            },
            {
                path: 'bem24',
                component: layout,
                name: 'bem24',
                meta: { title: '资金拨付管理', icon: 'admin' },
                children: [{
                    path: 'bem1/PayRulesList',
                    component: _import('bem1/PayRulesList/PayRulesList.vue'),
                    name: 'bem1/PayRulesList',
                    meta: { title: '拨付规则配置', icon: 'admin' },
                }, {
                    path: 'bem241',
                    component: layout,
                    name: 'bem241',
                    meta: { title: '机构入账信息管理', icon: 'admin' },
                    children: [{
                        path: 'bem1/regist',
                        component: _import('bem1/regist/regist.vue'),
                        name: 'bem1/regist',
                        meta: { title: '入账信息登记', icon: 'admin' },
                    },{
                        path: 'bem1/inquire',
                        component: _import('bem1/inquire/inquire.vue'),
                        name: 'bem1/inquire',
                        meta: { title: '入账信息查询', icon: 'admin' },
                    }]
                }, {
                    path: 'bem1/PayMoneyList',
                    component: _import('bem1/PayMoneyList/PayMoneyList.vue'),
                    name: 'bem1/PayMoneyList',
                    meta: { title: '拨付资金查询', icon: 'admin' },
                }, {
                    path: 'bem1/PayDetailList',
                    component: _import('bem1/PayDetailList/PayDetailList.vue'),
                    name: 'bem1/PayDetailList',
                    meta: { title: '拨付资金明细查询', icon: 'admin' },
                }]
            },
        ]
    }
]


export const bem1HideRoutes = [
]

