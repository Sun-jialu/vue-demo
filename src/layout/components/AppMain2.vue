<template>
  <div class="site-content-wrap" :style="siteContentViewHeight">
    <el-card :body-style="siteCardViewHeight">
      <iframe
        v-if="isIframe"
        :src="$route.meta.iframeUrl"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="yes"
      >
      </iframe>
      <keep-alive v-else>
        <router-view />
      </keep-alive>
    </el-card>
  </div>
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
      var height = this.documentClientHeight - 50;
      var isUrl = isURL(this.$route.meta.iframeUrl);
      return isUrl
        ? { height: height + "px", paddingTop: "13px" }
        : { minHeight: height + "px" };
    },
    siteCardViewHeight() {
      var height = this.documentClientHeight - 50 - 53 - 13;
      var isUrl = isURL(this.$route.meta.iframeUrl);
      if (isUrl) height += 40;
      return isUrl ? { height: height + "px" } : { minHeight: height + "px" };
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    isIframe() {
      return isURL(this.$route.meta.iframeUrl);
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

<style lang='scss' scoped>
@import "~@/styles/variables.scss";
//   width: calc(100% - #{$sideBarWidth});
.site-content-wrap {
  padding: 53px 13px 13px;
  box-sizing: border-box;
  background: rgb(245, 247, 250);
}
.el-card.is-always-shadow {
  border: none;
}
</style>