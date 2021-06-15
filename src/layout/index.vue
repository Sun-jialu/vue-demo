<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <div style="height: 50px" v-if="fixedHeader"></div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components/index";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  data() {
    return {
      loading: false,
      name: "",
    };
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeMixin],
  provide() {
    return {
      // 刷新
      refresh() {
        this.$store.commit("common/updateContentIsNeedRefresh", true);
        this.$nextTick(() => {
          this.$store.commit("common/updateContentIsNeedRefresh", false);
        });
      },
    };
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.common.documentClientHeight;
      },
      set(val) {
        this.$store.commit("common/updateDocumentClientHeight", val);
      },
    },
    menuList: {
      get() {
        return this.$store.state.common.menuList;
      },
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  created() {
    // this.initPath()
  },
  mounted() {
    this.resetDocumentClientHeight();
  },
  methods: {
    initPath() {
      var path = this.$route.path;
      var menuList = this.menuList;
      var routeList = this.$router.options.routes || [];
      if (name === "main" || path === "/") {
        if (this.name) {
          // this.$router.push({name:this.name})
        } else {
          this.dispathMenu(menuList, routeList);
          // this.$router.push({name:this.name})
        }
      }
    },
    dispathMenu(menuList, routeList = []) {
      for (var i = 0; i < menuList.length; i++) {
        var item = menuList[i];
        var routeItem = "";
        routeList.forEach((item) => {});
        if (
          item.component &&
          (!item.children || item.children.length == 0) &&
          !this.name
        ) {
          this.name = item.name;
          break;
        }
        if (item.children && item.children.length > 0) {
          this.dispathMenu(item.children);
        }
      }
    },
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement["clientHeight"];
      window.addEventListener(
        "resize",
        () => {
          this.documentClientHeight = document.documentElement["clientHeight"];
        },
        false
      );
      /* window.onresize = () => {
                 }*/
    },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 998;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
