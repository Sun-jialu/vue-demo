import layout from '@/layout'
const _import = require('./import-prod')
export const Icm_system_ShowRoutes = [{
    path: 'Icm_system',
    component: layout,
    name: 'Icm_system',
    meta: { title: 'Icm_system', icon: 'admin' },
    children: [
        {
            path: 'card/grouping',
            component: _import('card/system/grouping/grouping'),
            name: 'card/grouping',
            meta: { title: '机构分组配置', icon: 'admin' }
        }, {
            path: 'card/organization',
            component: _import('card/system/organization/organization'),
            name: 'card/organization',
            meta: { title: '机构管理', icon: 'admin' }
        }, {
            path: 'card/Administrator',
            component: _import('card/system/Administrator/Administrator'),
            name: 'card/Administrator',
            meta: { title: '机构管理员维护', icon: 'admin' }
        }, {
            path: 'card/management',
            component: _import('card/system/management/management'),
            name: 'card/management',
            meta: { title: '角色管理', icon: 'admin' }
        }, {
            path: 'card/operator',
            component: _import('card/system/operator/operator'),
            name: 'card/operator',
            meta: { title: '操作员管理', icon: 'admin' }
        }, {
            path: 'card66_1',
            component: layout,
            name: 'card66_1',
            meta: { title: '公告管理', icon: 'admin' },
            children: [
                {
                    path: 'card/bulletinType',
                    component: _import('card/system/bulletin/bulletinType'),
                    name: 'card/bulletinType',
                    meta: { title: '公告类型管理', icon: 'admin' }
                }, {
                    path: 'card/group',
                    component: _import('card/system/bulletin/group'),
                    name: 'card/group',
                    meta: { title: '公告组管理', icon: 'admin' }
                }, {
                    path: 'card/noticeAdministrator',
                    component: _import('card/system/bulletin/noticeAdministrator'),
                    name: 'card/noticeAdministrator',
                    meta: { title: '公告管理', icon: 'admin' }
                },
            ]
        }, {
            path: 'card/loginPass1',
            component: _import('card/system/logpass/loginPassw'),
            name: 'card/loginPass1',
            meta: { title: '修改登录密码', icon: 'admin' }
        }, {
            path: 'card/logInof',
            component: _import('card/system/logInof/logInof'),
            name: 'card/logInof',
            meta: { title: '操作员日志查询', icon: 'admin' }
        },
    ]
}]
