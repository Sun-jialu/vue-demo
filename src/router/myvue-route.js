import layout from '@/layout'
const _import = require('./import-prod')
export const myvueShowRoutes =[{
    path: 'myvue33',
    component: layout,
    name: 'myvue/myvue',
    meta: { title: 'myvue', icon: 'myvuein' },
    children: [
        {
            path: 'myvue22',
            component:layout, 
            name: 'myvue22',
            meta: { title: '设备管理', icon: 'myvuein' },
            children:[{path: 'myvue/deviceMgmtGroup',component: _import('myvue/deviceMgmtGroup'),name: 'myvue/deviceMgmtGroup',meta: { title: '分组设置', icon: 'myvuein' }},
                    { path: 'myvue/deviceMgmtDevice', component: _import('myvue/deviceMgmtDevice'), name: 'myvue/deviceMgmtDevice', meta: { title: '设备管理', icon: 'myvuein' }}]

        },{
            path: 'myvue33',
            component:layout, 
            name: 'myvue33',
            meta: { title: '应用管理', icon: 'myvuein' },
            children:[{path: 'myvue/ruleMgmtWorkRule',component: _import('myvue/ruleMgmtWorkRule'),name: 'myvue/ruleMgmtWorkRule',meta: { title: '考勤规则设置', icon: 'myvuein' }},
                    { path: 'myvue/holiday', component: _import('myvue/holiday'), name: 'myvue/holiday', meta: { title: '节假日设置', icon: 'myvuein' }},
                    {
                        path: 'myvue/signMgmt',
                        component: _import('eam/signMgmt'), 
                        name: 'myvue/signMgmt',
                        meta: { title: '签到管理', icon: 'myvuein' },
                        children: [{path: 'myvue/signMgmt',component: _import('myvue/signMgmt'),name: 'myvue/signMgmt',meta: { title: '签到', icon: 'myvuein' }},
                                {path: 'myvue/signMgmtResult',component: _import('myvue/signMgmtResult'),name: 'myvue/signMgmtResult',meta: { title: '签到查询', icon: 'myvuein' }}]
                    },{
                        path: 'myvue/holidayMgmt',
                        component: _import('eam/holidayMgmt'), 
                        name: 'myvue/holidayMgmt',
                        meta: { title: '请假/出差管理', icon: 'myvuein' },
                        children: [{path: 'myvue/holidayMgmt',component: _import('myvue/holidayMgmt'),name: 'myvue/holidayMgmt',meta: { title: '请假/出差类型管理', icon: 'myvuein' }},
                                {path: 'myvue/leaveRequest',component: _import('myvue/leaveRequest'),name: 'myvue/leaveRequest',meta: { title: '请假/出差申请', icon: 'myvuein' }},
                                {path: 'myvue/leaveResult',component: _import('myvue/leaveResult'),name: 'myvue/leaveResult',meta: { title: '请假/出差申请查询', icon: 'myvuein' }}]
                    }]

        },{
            path: 'myvue44',
            component:layout, 
            name: 'myvue44',
            meta: { title: '统计报表', icon: 'myvuein' },
            children:[{path: 'myvue/workTimeDetails',component: _import('myvue/workTimeDetails'),name: 'myvue/workTimeDetails',meta: { title: '考勤明细查询', icon: 'myvuein' }},
                    { path: 'myvue/workTimeCollect', component: _import('myvue/workTimeCollect'), name: 'myvue/workTimeCollect', meta: { title: '考勤汇总查询', icon: 'myvuein' }}]

        }]
}]

export const myvueHideRoutes =[
//   {path: 'eam/course/stucourse',component: _import('eam/course/stucourse'),name: 'eam/course/stucourse',meta: { title: '课程学员管理', icon: 'myvuein' }},
//   {path: 'eam/class/classcourse',component: _import('eam/class/classcourse'),name: 'eam/class/classcourse',meta: { title: '班级课程管理', icon: 'myvuein' }}
]

