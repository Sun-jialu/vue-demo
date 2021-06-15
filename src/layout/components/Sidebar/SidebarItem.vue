<template>
  <div >
    <el-submenu v-if='hasShowingChild()' ref="subMenu" :index="item.name" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta&&item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children "
        :key="child.name"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
    <template  v-else>
      <app-link :to="item||{}">
        <el-menu-item :index="item.name"  :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="item.meta&&item.meta.icon" :title="item.meta&&item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
  },
  data() {
      return {}
  },
  methods: {
      hasShowingChild() {
          let childs =   this.item.children || []
        return childs.length>=1
    },
  }
}
</script>
