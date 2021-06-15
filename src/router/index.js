/**
 * 全站路由配置
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import { isURL } from '@/utils/validate'
import { clearLoginInfo, treeDataTranslate } from '@/utils'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });
import API from '@/api'
Vue.use(Router)
const _import = require('./import-prod')
import layout from '@/layout'

import { eamShowRoutes, eamHideRoutes } from './eam-route'
import { samShowRoutes, samHideRoutes } from './sam-route'
import { hsmShowRoutes, hsmHideRoutes } from './hsm-route'
import { admShowRoutes, admHideRoutes } from './adm-route'
import { bemShowRoutes, bemHideRoutes } from "./bem-route"
import { cardShowRoutes } from './card-route';
import { Icm_system_ShowRoutes } from './ICM_system_route';
import { btmShowRoutes, btmHideRoutes } from "./btm-route"
import { enguShowRoutes, enguHideRoutes } from "./engu-route"
import { icm_pcmShowRoutes, icm_pcmHideRoutes } from "./icm_pcm-route"
import { myvueShowRoutes, myvueHideRoutes } from "./myvue-route"

// import { bem1ShowRoutes, bem1HideRoutes } from "./bem1-route"

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('login'), name: 'login', meta: { title: '登录' } }
]
// 自定义路由 需菜单显示的
const home = [
  { path: 'home', component: _import('home'), name: 'home', meta: { title: '首页1', icon: 'admin' }, },
]
const tabShowStaticRoutes = [
  // ...eamShowRoutes,
  // ...samShowRoutes,
  // ...hsmShowRoutes,
  // ...admShowRoutes,
  // ...cardShowRoutes,
  // ...Icm_system_ShowRoutes,

  // ...bemShowRoutes,
  // ...btmShowRoutes,
  // ...icm_pcmShowRoutes,
  // ...enguShowRoutes,

  // ...bem1ShowRoutes

]
// 自定义路由 不需菜单显示的
const tabHideStaticRoutes = [
  ...eamHideRoutes,
  ...samHideRoutes,
  ...hsmHideRoutes,
  ...admHideRoutes,

  ...bemHideRoutes,
  ...btmHideRoutes,
  ...icm_pcmHideRoutes,
  ...enguHideRoutes,
  // ...bem1HideRoutes

]

// 主入口路由(需嵌套上左右整体布局)
const initRouter = () => {
  return {
    path: '/',
    component: layout,
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口', isTab: false },
    children: [...home],
    beforeEnter(to, from, next) {
      let token = Vue.cookie.get('token')
      if (!token || !/\S/.test(token)) {
        clearLoginInfo()
        next({ name: 'login' })
      } else {
        next()
      }
    }
  }
}
const mainRoutes = initRouter()

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: [...globalRoutes, mainRoutes]
})
const router = createRouter()

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  NProgress.start()
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
    NProgress.done()
  } else {
    API.sys.nav().then(data => {
      if (data && data.rsCode === 'AAAAAAA') {
        // console.log('data :>> ', data);
        const staitcRouteList = fnResetStaticRoutes(tabShowStaticRoutes)
        //格式化动态路由  后台拿到
        const dynamicRouteList = fnResetDynamicRoutes(data.menuList)
        // console.log('dynamicRouteList :>> ', dynamicRouteList);
        //总路由列表  需要addroutes
        const routeList = [...staitcRouteList, ...dynamicRouteList, ...tabHideStaticRoutes]
        var dynamicRouteListClone = JSON.parse(JSON.stringify(dynamicRouteList))
        //加工成菜单
        const menuTree = treeDataTranslate(dynamicRouteListClone, 'menuId', 'parentId')
        //菜单
        const menuList = [...home, ...tabShowStaticRoutes, ...menuTree]
        // router.options.routes = menuList
        console.log('menuList :>> ', menuList);
        //注入路由
        fnAddRoutes(routeList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next({ name: 'login' })
      }

      NProgress.done()
    })

  }
})
//获取新的动态路由一维数组
function fnResetDynamicRoutes(menuList = []) {
  const routes = []
  menuList.forEach(item => {
    var route = {
      path: item.url || item.menuId + '',
      component: null,
      name: item.url || item.menuId + '',
      menuId: item.menuId,
      parentId: item.parentId,
      meta: {
        menuId: item.menuId,
        title: item.name,
        isDynamic: true,
        isTab: true,
        iframeUrl: '',
        icon: item.icon
      }
    }
    // url以http[s]://开头, 通过iframe展示
    if (isURL(item.url)) {
      route['path'] = `i-${item.menuId}`
      route['name'] = `i-${item.menuId}`
      route['meta']['iframeUrl'] = item.url
      route['meta']['type'] = 'iframe'
    } else {
      try {
        if (item.url) {
          route['component'] = _import(`${item.url}`) || null
        }
      } catch (e) { }
    }
    routes.push(route)
  })
  return routes
}

//注入路由
function fnAddRoutes(routes) {
  const main = initRouter()
  main.children = routes
  main.name = 'dynamic-main'
  router.addRoutes([
    main,
    { path: '*', redirect: { name: '404' } }
  ])
  sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
}
// 清空路由
export function resetRoute() {
  router.options.isAddDynamicMenuRoutes = false
  router.matcher = createRouter().matcher
}

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}
function fnResetStaticRoutes(routes) {
  const routeList = []
  function dispathRoute(list) {
    list.forEach(item => {
      if (item.component && (!item.children || item.children.length == 0)) {
        routeList.push(item)
      } else if (item.children && item.children.length > 0) {
        dispathRoute(item.children)
      }
    })
  }
  dispathRoute(routes)
  return routeList
}
export default router
