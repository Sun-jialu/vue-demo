import layout from '@/layout'
const _import = require('./import-prod')
export const eamShowRoutes = [{
  path: 'eam33',
  component: layout,
  name: 'eam/eam33',
  meta: { title: 'eam', icon: 'admin' },
  children: [
    {
      path: 'eam22',
      component: layout,
      name: 'eam22',
      meta: { title: '学校管理', icon: 'admin' },
      children: [
        { path: 'eam/school', component: _import('eam/school'), name: 'eam/school', meta: { title: '学校信息管理', icon: 'admin' } },
      ]
    },
    {
      path: '', component: layout, name: 'eam/student22', meta: { title: '人员管理', icon: 'admin' },
    },
  ]
}]

export const eamHideRoutes = [
  { path: 'eam/course/stucourse', component: _import('eam/course/stucourse'), name: 'eam/course/stucourse', meta: { title: '课程学员管理', icon: 'admin' } },
  { path: 'eam/class/classcourse', component: _import('eam/class/classcourse'), name: 'eam/class/classcourse', meta: { title: '班级课程管理', icon: 'admin' } },
  { path: 'eam/coursework/courseworkConfig', component: _import('eam/coursework/courseworkConfig'), name: 'eam/coursework/courseworkConfig', meta: { title: '课时作业配置', icon: 'admin' } }
]

