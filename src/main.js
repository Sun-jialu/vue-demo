import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/  使用 <icon-svg name="canyin">
import '@/assets/icon-fonts/iconfont.js'      //iconfonts中下载的图标 使用 <icon-svg name="canyin">
import '@/assets/icon-fonts/iconfont.css'     //iconfonts的字体图标   使用 <i class="iconfont icon-xxx"></i>

import '@/styles/index.scss' // global css
import { isAuth } from "./utils";
import API from '@/api/index'

import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import moment from 'moment'
Vue.use(VueCookie)
Vue.prototype.$moment = moment            // const data  = this.$moment(时间戳).format('YYYY-MM-DD HH:mm:ss')

import TitleBar from '@/components/TitleBar'
console.log(TitleBar)
Vue.component(TitleBar.name, TitleBar)
//仅开发使用mock
// if (process.env.NODE_ENV !== 'production') {
//   const { mockXHR } = require('./mock')
//   mockXHR()
// }
// 开发和生产都会有mock
const { mockXHR } = require('./mock')
mockXHR()

Vue.prototype.isAuth = isAuth
Vue.prototype.$API = API
Vue.config.productionTip = false

import Vue2OrgTree from 'vue2-org-tree';
Vue.use(Vue2OrgTree)

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
// require('videojs-contrib-hls/dist/videojs-contrib-hls');
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
const hls = require('videojs-contrib-hls')
Vue.use(hls)
Vue.use(VideoPlayer)

// 高德离线地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德key
  key: '8bc0b91b57085ac33f50b608a61a1cea', // 官网申请
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer'],
  v: '1.4.4', // 高德SDK 版本
  uiVersion: '1.0' // ui版本号，也是需要写
})

import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
