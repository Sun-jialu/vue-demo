<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="menuActiveName"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item  v-for="route in menuList" :key="route.name" :item="route"  />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {isURL} from '@/utils/validate'
export default {
  components: { SidebarItem, Logo },
  data(){
    return{
      dynamicMenuRoutes: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
        return this.$router.options.routes&&this.$router.options.routes[0].children || []
    },
    activeMenu() {
      const route = this.$route
      const { meta, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },

      menuList: {
          get () { return this.$store.state.common.menuList },
          set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
          get () { return this.$store.state.common.menuActiveName },
          set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
          get () { return this.$store.state.common.mainTabs },
          set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
          get () { return this.$store.state.common.mainTabsActiveName },
          set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
  },
    watch: {
        $route: 'routeHandle'
    },
    created () {
        this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
        this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods:{
        // 路由操作
        routeHandle (route) {
            // tab选中, 不存在先添加
          if(route.meta.isTab === false){
            return
          }
           var tab = this.mainTabs.filter(item => item.name === route.name)[0]
           if (!tab ) {
               tab = {
                   menuId: route.meta.menuId || route.name,
                   name: route.name,
                   title: route.meta.title,
                   type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                   iframeUrl: route.meta.iframeUrl || '',
                   params: route.params,
                   query: route.query
               }
               this.mainTabs = this.mainTabs.concat(tab)
           }
          this.menuActiveName = tab.name + ''
          this.mainTabsActiveName = tab.name
        }
    }
}
</script>
