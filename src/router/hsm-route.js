import layout from '@/layout'

const _import = require('./import-prod')
export const hsmShowRoutes = [
    {
        path: "hsm11",
        component: layout,
        name: 'hsm/hsm11',
        meta: { title: 'hsm', icon: 'admin' },
        children: [
            {
                path: 'hsm/class22',
                component: layout,
                name: 'hsm/class22',
                meta: { title: '班级相册管理', icon: 'admin' },
                children: [{
                    path: 'hsm/classAlbum',
                    component: _import('hsm/classAlbum'),
                    name: 'hsm/classAlbum',
                    meta: { title: '班级相册管理', icon: 'admin' },
                },
                {
                    path: 'hsm/classesAlbum',
                    component: _import('hsm/classesAlbum'),
                    name: 'hsm/classesAlbum',
                    meta: { title: '班级图片管理', icon: 'admin' },
                },
                ]
            },
            {
                path: 'hsm/classMember',
                component: _import('hsm/classMember'),
                name: 'hsm/classMember',
                meta: { title: '班级成员查询', icon: 'admin' },
            },
            {
                path: 'hsm/courseSchedule',
                component: _import('hsm/courseSchedule'),
                name: 'hsm/courseSchedule',
                meta: { title: '班级课程表查询', icon: 'admin' },
            },
            {
                path: 'hsm/score',
                component: _import('hsm/score'),
                name: 'hsm/score',
                meta: { title: '班级成绩查询', icon: 'admin' },
            },
            {
                path: 'hsm/classesFile',
                component: _import('hsm/classesFile'),
                name: 'hsm/classesFile',
                meta: { title: '班级文档管理', icon: 'admin' },
            },
            {
                path: 'hsm/22',
                component: layout,
                name: 'hsm/22',
                meta: { title: '班级作业管理', icon: 'admin' },
                children: [{
                    path: 'hsm/classesHomework',
                    component: _import('hsm/classesHomework'),
                    name: 'hsm/classesHomework',
                    meta: { title: '班级作业管理', icon: 'admin' },
                }, {
                    path: 'hsm/classesHomeworkReview',
                    component: _import('hsm/classesHomeworkReview'),
                    name: 'hsm/classesHomeworkReview',
                    meta: { title: '班级作业批阅', icon: 'admin' },
                }, {
                    path: 'hsm/classesHomequery',
                    component: _import('hsm/classesHomequery'),
                    name: 'hsm/classesHomequery',
                    meta: { title: '班级作业查询', icon: 'admin' },
                }]
            },
            {
                path: 'hsm/classNotice',
                component: _import('hsm/classNotice'),
                name: 'hsm/classNotice',
                meta: { title: '班级通知管理', icon: 'admin' },
            },
            {
                path: 'hsm/23',
                component: layout,
                name: 'hsm/23',
                meta: { title: '班级圈管理', icon: 'admin' },
                children: [{
                    path: 'hsm/sensitiveWords',
                    component: _import('hsm/sensitiveWords'),
                    name: 'hsm/sensitiveWords',
                    meta: { title: '敏感词管理', icon: 'admin' },
                }, {
                    path: 'hsm/classCircle',
                    component: _import('hsm/classCircle'),
                    name: 'hsm/classCircle',
                    meta: { title: '班级圈管理', icon: 'admin' },
                }]
            },
        ]
    }
]


export const hsmHideRoutes = [
]

