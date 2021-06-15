import layout from '@/layout'

const _import = require('./import-prod')
export const icm_pcmShowRoutes = [
    {
        path: "icm_pcm", component: layout,
        name: 'icm_pcm',
        meta: { title: '缴费管理icm_pcm', icon: 'admin' },
        children: [
            {
                path: 'icm_pcm',
                component: layout,
                name: 'icm_pcm/a33',
                meta: { title: '费用登记管理', icon: 'admin' },
                children: [
                    { path: 'icm_pcm/feeRegisterReview', component: _import('icm_pcm/feeRegisterReview'), name: 'icm_pcm/feeRegisterReview', meta: { title: '费用登记审核', icon: 'admin' }, },
                    { path: 'icm_pcm/feeRegisterQuery', component: _import('icm_pcm/feeRegisterQuery'), name: 'icm_pcm/feeRegisterQuery', meta: { title: '费用登记查询', icon: 'admin' }, },
                  
                ]
            },
            {
                path: 'icm_pcm2',
                component: layout,
                name: 'icm_pcm/charnge',
                meta: { title: '收费管理', icon: 'admin' },
                children: [
                    { path: 'icm_pcm/chargeManage', component: _import('icm_pcm/chargeManage'), name: 'icm_pcm/chargeManage', meta: { title: '收费管理', icon: 'admin' }, },
                    { path: 'icm_pcm/chargeDetailQuery', component: _import('icm_pcm/chargeDetailQuery'), name: 'icm_pcm/chargeDetailQuery', meta: { title: '收费明细查询', icon: 'admin' }, },
                    
                ]
            },
        ]
    }
]


export const icm_pcmHideRoutes = [
]

