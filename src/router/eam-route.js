import layout from '@/layout'
const _import = require('./import-prod')
export const eamShowRoutes =[{
    path: 'eam33',
    component: layout,
    name: 'eam/eam33',
    meta: { title: 'eam', icon: 'admin' },
    children: [
        {
            path: 'eam22',
            component:layout, 
            name: 'eam22',
            meta: { title: '学校管理', icon: 'admin' },
            children:[{path: 'eam/school',component: _import('eam/school'),name: 'eam/school',meta: { title: '学校信息管理', icon: 'admin' }},
                    { path: 'eam/campus', component: _import('eam/campus'), name: 'eam/campus', meta: { title: '校区信息管理', icon: 'admin' } },
                    { path: 'eam/classroom', component: _import('eam/classroom'), name: 'eam/classroom', meta: { title: '教室资源管理', icon: 'admin' } },]

        },
        {
          path: '', component: layout, name: 'eam/student22', meta: { title: '人员管理', icon: 'admin' },
          children: [
              { path: 'eam/student', component: _import('eam/student'), name: 'eam/student', meta: { title: '学员信息管理', icon: 'admin' } },
              { path: 'eam/family', component: _import('eam/family'), name: 'eam/family', meta: { title: '家庭成员管理', icon: 'admin' } },
              { path: 'eam/teacher', component: _import('eam/teacher'), name: 'eam/teacher', meta: { title: '教师信息管理', icon: 'admin' } }
          ]
      },
        { path: 'eam33',
        component:layout, 
        name: 'eam33',
        meta: { title: '教务管理', icon: 'admin' },
        children: [{
            path: 'eam/class',
            component: _import('eam/class'),
            name: 'eam/class',
            meta: { title: '班级管理', icon: 'admin' }
          },{
            path: 'eam/course',
            component: _import('eam/course'), 
            name: 'eam/course',
            meta: { title: '课程管理', icon: 'admin' }
        },{
          path: 'eam/stucourseapply',
          component: _import('eam/stucourseapply'), 
          name: 'eam/stucourseapply',
          meta: { title: '课程收费登记管理', icon: 'admin' },
          children: [{path: 'eam/stucourseapply',component: _import('eam/stucourseapply'),name: 'eam/stucourseapply',meta: { title: '课程收费信息登记', icon: 'admin' }},
                    {path: 'eam/stucourseapplyquery',component: _import('eam/stucourseapplyquery'),name: 'eam/stucourseapplyquery',meta: { title: '课程收费信息查询', icon: 'admin' }}]
      },{
        path: 'eam/stucourseprogress',
        component: _import('eam/stucourseprogress'), 
        name: 'eam/stucourseprogress',
        meta: { title: '课程学习进度管理', icon: 'admin' },
        children: [{path: 'eam/stucourselearncord',component: _import('eam/stucourselearncord'),name: 'eam/stucourselearncord',meta: { title: '课程学习进度登记', icon: 'admin' }},
        {path: 'eam/stucourselearncordquery',component: _import('eam/stucourselearncordquery'),name: 'eam/stucourselearncordquery',meta: { title: '课程学习进度查询', icon: 'admin' }},
        {path: 'eam/stucourseprogress',component: _import('eam/stucourseprogress'),name: 'eam/stucourseprogress',meta: { title: '课程学习进度汇总查询', icon: 'admin' }}]
    },{
            path: 'eam/coursechapter',
            component: _import('eam/coursechapter'), 
            name: 'eam/coursechapter',
            meta: { title: '课程章节管理', icon: 'admin' }
        },{
            path: 'eam/coursestudy',
            component: _import('eam/coursestudy'), 
            name: 'eam/coursestudy',
            meta: { title: '课时管理', icon: 'admin' }
        },{
            path: 'eam/worktopic',
            component: _import('eam/worktopic'), 
            name: 'eam/worktopic',
            meta: { title: '作业管理', icon: 'admin' }
        },{
          path: 'eam/coursework',
          component: _import('eam/coursework'), 
          name: 'eam/coursework',
          meta: { title: '课时作业管理', icon: 'admin' }
      },{
            path: 'eam/stucoursecheck',
            component: _import('eam/stucoursecheck'), 
            name: 'eam/stucoursecheck',
            meta: { title: '作业批阅管理', icon: 'admin' },
            children: [{path: 'eam/stucoursecheck',component: _import('eam/stucoursecheck'),name: 'eam/stucoursecheck',meta: { title: '作业批阅', icon: 'admin' }},
                    {path: 'eam/stucoursecheck/stucoursecheckprogress',component: _import('eam/stucoursecheck/stucoursecheckprogress'),name: 'eam/stucoursecheck/stucoursecheckprogress',meta: { title: '作业批阅查询', icon: 'admin' }}]
        },{
            path: 'eam/stucoursescore',
            component: _import('eam/stucoursescore'), 
            name: 'eam/stucoursescore',
            meta: { title: '成绩管理', icon: 'admin' }
        },{
            path: 'eam/stucourseeval',
            component: _import('eam/stucourseeval'), 
            name: 'eam/stucourseeval',
            meta: { title: '评价管理', icon: 'admin' }
        }]
    },{
        path: 'eam44',
        component:layout, 
        name: 'eam44',
        meta: { title: '订单管理', icon: 'admin' },
        children: [{
            path: 'eam/searchorder',
            component: _import('eam/searchorder'),
            name: 'eam/searchorder',
            meta: { title: '订单查询', icon: 'admin' }
          },{
            path: 'eam/getCollectOrder',
            component: _import('eam/getCollectOrder'),
            name: 'eam/getCollectOrder',
            meta: { title: '课程销售汇总查询', icon: 'admin' }
          },{
            path: 'eam/refund',
            component: _import('eam/refund'),
            name: 'eam/refund',
            meta: { title: '退款审核', icon: 'admin' }
          },{
            path: 'eam/getRefundOrder',
            component: _import('eam/getRefundOrder'),
            name: 'eam/getRefundOrder',
            meta: { title: '退款查询', icon: 'admin' }
          }]
    },{
        path: 'eam55',
        component:layout, 
        name: 'eam55',
        meta: { title: '配置管理', icon: 'admin' },
        children: [{
          path: 'eam/homepage',
          component: _import('eam/homepage'),
          name: 'eam/homepage',
          meta: { title: '主页配置', icon: 'admin' }
        },{
            path: 'eam/adpic',
            component: _import('eam/adpic'),
            name: 'eam/adpic',
            meta: { title: '广告轮播图配置', icon: 'admin' }
          },{
            path: 'eam/schoolnotice',
            component: _import('eam/schoolnotice'),
            name: 'eam/schoolnotice',
            meta: { title: '机构咨讯配置', icon: 'admin' }
          },{
            path: 'eam/schoolconfig',
            component: _import('eam/schoolconfig'),
            name: 'eam/schoolconfig',
            meta: { title: '机构教务参数管理', icon: 'admin' }
          }]
    }]
}]

export const eamHideRoutes =[
  {path: 'eam/course/stucourse',component: _import('eam/course/stucourse'),name: 'eam/course/stucourse',meta: { title: '课程学员管理', icon: 'admin' }},
  {path: 'eam/class/classcourse',component: _import('eam/class/classcourse'),name: 'eam/class/classcourse',meta: { title: '班级课程管理', icon: 'admin' }},
  {path: 'eam/coursework/courseworkConfig',component: _import('eam/coursework/courseworkConfig'),name: 'eam/coursework/courseworkConfig',meta: { title: '课时作业配置', icon: 'admin' }}
]

