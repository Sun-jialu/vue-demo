import layout from '@/layout'
const _import = require('./import-prod')
export const admShowRoutes =[{
    path: 'adm33',
    component: layout,
    name: 'adm/adm',
    meta: { title: 'adm', icon: 'admin' },
    children: [
        {
            path: 'adm22',
            component:layout, 
            name: 'adm22',
            meta: { title: '设备管理', icon: 'admin' },
            children:[{path: 'adm/deviceMgmtGroup',component: _import('adm/deviceMgmtGroup'),name: 'adm/deviceMgmtGroup',meta: { title: '分组设置', icon: 'admin' }},
                    { path: 'adm/deviceMgmtDevice', component: _import('adm/deviceMgmtDevice'), name: 'adm/deviceMgmtDevice', meta: { title: '设备管理', icon: 'admin' }}]

        },{
            path: 'adm33',
            component:layout, 
            name: 'adm33',
            meta: { title: '应用管理', icon: 'admin' },
            children:[{path: 'adm/ruleMgmtWorkRule',component: _import('adm/ruleMgmtWorkRule'),name: 'adm/ruleMgmtWorkRule',meta: { title: '考勤规则设置', icon: 'admin' }},
                    { path: 'adm/holiday', component: _import('adm/holiday'), name: 'adm/holiday', meta: { title: '节假日设置', icon: 'admin' }},
                    {
                        path: 'adm/signMgmt',
                        component: _import('eam/signMgmt'), 
                        name: 'adm/signMgmt',
                        meta: { title: '签到管理', icon: 'admin' },
                        children: [{path: 'adm/signMgmt',component: _import('adm/signMgmt'),name: 'adm/signMgmt',meta: { title: '签到', icon: 'admin' }},
                                {path: 'adm/signMgmtResult',component: _import('adm/signMgmtResult'),name: 'adm/signMgmtResult',meta: { title: '签到查询', icon: 'admin' }}]
                    },{
                        path: 'adm/holidayMgmt',
                        component: _import('eam/holidayMgmt'), 
                        name: 'adm/holidayMgmt',
                        meta: { title: '请假/出差管理', icon: 'admin' },
                        children: [{path: 'adm/holidayMgmt',component: _import('adm/holidayMgmt'),name: 'adm/holidayMgmt',meta: { title: '请假/出差类型管理', icon: 'admin' }},
                                {path: 'adm/leaveRequest',component: _import('adm/leaveRequest'),name: 'adm/leaveRequest',meta: { title: '请假/出差申请', icon: 'admin' }},
                                {path: 'adm/leaveResult',component: _import('adm/leaveResult'),name: 'adm/leaveResult',meta: { title: '请假/出差申请查询', icon: 'admin' }}]
                    }]

        },{
            path: 'adm44',
            component:layout, 
            name: 'adm44',
            meta: { title: '统计报表', icon: 'admin' },
            children:[{path: 'adm/workTimeDetails',component: _import('adm/workTimeDetails'),name: 'adm/workTimeDetails',meta: { title: '考勤明细查询', icon: 'admin' }},
                    { path: 'adm/workTimeCollect', component: _import('adm/workTimeCollect'), name: 'adm/workTimeCollect', meta: { title: '考勤汇总查询', icon: 'admin' }}]

        }]
}]

export const admHideRoutes =[
//   {path: 'eam/course/stucourse',component: _import('eam/course/stucourse'),name: 'eam/course/stucourse',meta: { title: '课程学员管理', icon: 'admin' }},
//   {path: 'eam/class/classcourse',component: _import('eam/class/classcourse'),name: 'eam/class/classcourse',meta: { title: '班级课程管理', icon: 'admin' }}
]

