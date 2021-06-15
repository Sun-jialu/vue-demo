import layout from '@/layout'

const _import = require('./import-prod')
export const samShowRoutes = [
    {
        path: "sam11", component: layout,
        name: 'sam/sam11',
        meta: { title: 'sam', icon: 'admin' },
        children: [
            {
                path: '33',
                component: layout,
                name: 'sam/33',
                meta: { title: '学校管理', icon: 'admin' },
                children: [
                    { path: 'sam/orgext', component: _import('sam/orgext'), name: 'sam/orgext', meta: { title: '学校信息管理', icon: 'admin' }, },
                    { path: 'sam/campus', component: _import('sam/campus'), name: 'sam/campus', meta: { title: '校区信息管理', icon: 'admin' } },
                    { path: 'sam/classroom', component: _import('sam/classroom'), name: 'sam/classroom', meta: { title: '教室资源管理', icon: 'admin' } },]
            }, {
                path: '', component: layout, name: 'sam/student22', meta: { title: '人员管理', icon: 'admin' },
                children: [
                    { path: 'sam/student', component: _import('sam/student'), name: 'sam/student', meta: { title: '学生信息管理', icon: 'admin' } },
                    { path: 'sam/family', component: _import('sam/family'), name: 'sam/family', meta: { title: '家庭成员管理', icon: 'admin' } },
                    { path: 'sam/teacher', component: _import('sam/teacher'), name: 'sam/teacher', meta: { title: '教师信息管理', icon: 'admin' } }
                ]
            }, {
                path: '44',
                component: layout,
                name: 'sam/44',
                meta: { title: '教务管理', icon: 'admin' },
                children: [
                    { path: 'sam/term', component: _import('sam/term'), name: 'sam/term', meta: { title: '学年学期管理', icon: 'admin' }, },
                    { path: 'sam/course', component: _import('sam/course'), name: 'sam/course', meta: { title: '课程信息管理', icon: 'admin' }, },
                    { path: 'sam/textbook', component: _import('sam/textbook'), name: 'sam/textbook', meta: { title: '教材信息管理', icon: 'admin' }, },
                    { path: 'sam/teachplan', component: _import('sam/teachplan'), name: 'sam/teachplan', meta: { title: '开课管理', icon: 'admin' }, },
                    {
                        path: 'sam33', component: layout, name: 'sam33', meta: { title: '排课管理', icon: 'admin' },
                        children: [
                            {
                                path: 'sam44', component: layout, name: 'sam44', meta: { title: '排课规则管理', icon: 'admin' },
                                children: [
                                    { path: 'sam/calendar', component: _import('sam/calendar'), name: 'sam/calendar', meta: { title: '校历配置', icon: 'admin' }, },
                                    { path: 'sam/courseScheduleInit', component: _import('sam/courseScheduleInit'), name: 'sam/courseScheduleInit', meta: { title: '班级课程初始化', icon: 'admin' }, },
                                    { path: 'sam/rulesPlan', component: _import('sam/rulesPlan'), name: 'sam/rulesPlan', meta: { title: '禁排规则配置', icon: 'admin' }, },
                                    { path: 'sam/rulesCourse', component: _import('sam/rulesCourse'), name: 'sam/rulesCourse', meta: { title: '排课优先级配置', icon: 'admin' }, },
                                    { path: 'sam/teacherRules', component: _import('sam/teacherRules'), name: 'sam/teacherRules', meta: { title: '教师规则配置', icon: 'admin' }, }
                                ]
                            },
                            { path: 'sam/courseScheduleAuto', component: _import('sam/courseScheduleAuto'), name: 'sam/courseScheduleAuto', meta: { title: '自动排课', icon: 'admin' }, },
                            { path: 'sam/courseSchedule', component: _import('sam/courseSchedule'), name: 'sam/courseSchedule', meta: { title: '手动排课管理', icon: 'admin' }, },
                        ]
                    },
                    { path: 'sam/timeTable', component: _import('sam/timeTable'), name: 'sam/timeTable', meta: { title: '课程表管理', icon: 'admin' }, },

                ]
            }, {
                path: '55',
                component: layout,
                name: 'sam/55',
                meta: { title: '学籍管理', icon: 'admin' },
                children: [
                    { path: 'sam/classes', component: _import('sam/classes'), name: 'sam/classes', meta: { title: '班级管理', icon: 'admin' }, },
                    { path: 'sam/score', component: _import('sam/score'), name: 'sam/score', meta: { title: '成绩管理', icon: 'admin' }, },
                ]
            }, {
                path: '55',
                component: layout,
                name: 'sam/66',
                meta: { title: '配置管理', icon: 'admin' },
                children: [
                    { path: 'sam/homepage', component: _import('sam/homepage'), name: 'sam/homepage', meta: { title: '主页配置', icon: 'admin' }, },
                    { path: 'sam/adpicture', component: _import('sam/adpicture'), name: 'sam/adpicture', meta: { title: '广告轮播图配置', icon: 'admin' }, },
                    { path: 'sam/information', component: _import('sam/information'), name: 'sam/information', meta: { title: '校园资讯配置', icon: 'admin' }, },
                    { path: 'sam/parameter', component: _import('sam/parameter'), name: 'sam/parameter', meta: { title: '学校教务参数管理', icon: 'admin' }, },
                ]
            }
        ]
    }
]


export const samHideRoutes = [
]

