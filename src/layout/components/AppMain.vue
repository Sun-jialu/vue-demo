<template>
  <main
    class="site-content site-content--tabs"
    :class="{ 'header--fixed': fixedHeader }"
  >
    <el-dropdown class="site-tabs__tools" :show-timeout="0">
      <i class="el-icon-arrow-down el-icon--right"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="tabsCloseCurrentHandle"
          >关闭当前标签页</el-dropdown-item
        >
        <el-dropdown-item @click.native="tabsCloseOtherHandle"
          >关闭其它标签页</el-dropdown-item
        >
        <el-dropdown-item @click.native="tabsCloseAllHandle"
          >关闭全部标签页</el-dropdown-item
        >
        <el-dropdown-item @click.native="refresh()"
          >刷新当前标签页</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 主入口标签页 s -->
    <el-tabs
      v-model="mainTabsActiveName"
      :closable="mainTabs.length > 1"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle"
    >
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <el-card :body-style="siteContentViewHeight">
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="yes"
          >
          </iframe>
          <keep-alive v-else>
            <router-view v-if="item.name === mainTabsActiveName" />
          </keep-alive>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- 主入口标签页  -->
  </main>
</template>

<script>
import { isURL } from "@/utils/validate";
export default {
  inject: ["refresh"],
  data() {
    return {};
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.common.documentClientHeight;
      },
    },
    menuActiveName: {
      get() {
        return this.$store.state.common.menuActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMenuActiveName", val);
      },
    },
    mainTabs: {
      get() {
        return this.$store.state.common.mainTabs;
      },
      set(val) {
        this.$store.commit("common/updateMainTabs", val);
      },
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.common.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMainTabsActiveName", val);
      },
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight - 50 - 40 - 30 + 1;
      if (this.$route.meta.isTab) {
        return isURL(this.$route.meta.iframeUrl)
          ? { height: height + "px" }
          : { minHeight: height + "px" };
      }
      return { minHeight: height + "px" };
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle(tab) {
      tab = this.mainTabs.filter((item) => item.name === tab.name);
      if (tab.length >= 1) {
        this.$router.push({
          name: tab[0].name,
          query: tab[0].query,
          params: tab[0].params,
        });
      }
    },
    // tabs, 删除tab
    removeTabHandle(tabName) {
      this.mainTabs = this.mainTabs.filter((item) => item.name !== tabName);
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          var tab = this.mainTabs[this.mainTabs.length - 1];
          this.$router.push(
            { name: tab.name, query: tab.query, params: tab.params },
            () => {
              this.mainTabsActiveName = this.$route.name;
            }
          );
        }
      } else {
        this.menuActiveName = "";
        this.$router.push({ name: "home" });
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle() {
      this.removeTabHandle(this.mainTabsActiveName);
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle() {
      this.mainTabs = this.mainTabs.filter(
        (item) => item.name === this.mainTabsActiveName
      );
    },
    // tabs, 关闭全部
    tabsCloseAllHandle() {
      let nameFirst = this.mainTabs[0] || {};
      this.mainTabs = [nameFirst];
      this.menuActiveName = nameFirst.name;
      if (this.$route.name !== nameFirst.name) {
        this.$router.push(nameFirst);
      }
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle() {
      var tab = this.$route;
      this.removeTabHandle(tab.name);
      this.$nextTick(() => {
        this.$router.push({
          name: tab.name,
          query: tab.query,
          params: tab.params,
        });
      });
    },
  },
};
</script>

<style lang='scss' >
@import "~@/styles/variables.scss";

.site-content {
  position: relative;
  width: 100%;

  & > .el-tabs > .el-tabs__content {
    padding: 0 15px 15px;
    & > .el-tab-pane > .el-card {
      border: none;
    }
  }
  & > .site-tabs__tools {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 11;
    height: 40px;
    padding: 0 12px;
    font-size: 16px;
    line-height: 40px;
    background-color: #f1f4f5;
    cursor: pointer;
  }
  &.header--fixed > .site-tabs__tools {
    position: fixed;
    top: 50px;
    right: 0;
  }
  & > .el-tabs > .el-tabs__header > .el-tabs__nav-wrap {
    box-sizing: border-box;
    z-index: 930;
    padding: 0 62px 0 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    background: #fff;
    height: 40px;
  }
  & > .el-tabs > .el-tabs__header > .is-scrollable {
    box-sizing: border-box;
    z-index: 930;
    padding: 0 67px 0 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    background: #fff;
    height: 40px;
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      width: 20px;
      line-height: 40px;
      text-align: center;
    }
    .el-tabs__nav-next {
      right: 45px;
    }
  }
  & > .el-tabs > .el-tabs__header > .el-tabs__nav-wrap:after {
    background: none;
  }
  & > .el-tabs > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll {
    position: relative;
  }
}

.header--fixed > .el-tabs > .el-tabs__header {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: calc(100% - #{$sideBarWidth});
}
.openSidebar .header--fixed > .el-tabs > .el-tabs__header {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: calc(100% - #{$sideBarWidth});
  transition: 0.5s;
}
.hideSidebar .header--fixed > .el-tabs > .el-tabs__header {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: calc(100% - 54px);
  transition: 0.5s;
}
.mobile .header--fixed > .el-tabs > .el-tabs__header {
  position: fixed;
  z-index: 9;
  top: 50px;
  width: 100%;
  transition: 0.5s;
}

.header--fixed > .el-tabs {
  padding-top: 54px;
}
.site-content > .el-tabs {
  background: #f1f4f5;
}
.site-content > .el-tabs > .el-tabs__header {
  z-index: 9;
}
</style>