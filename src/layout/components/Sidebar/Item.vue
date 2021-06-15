
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
      const vnodes = []
      if (icon) {
      vnodes.push(<icon-svg ClassName='slidebar-icon' name={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
      return vnodes
  }
}
</script>
<style >
    .slidebar-icon{
        margin-right: 8px;
    }
   #app .hideSidebar >.sidebar-container  .submenu-title-noDropdown .el-tooltip .icon-svg{
       margin-left: 20px;
   }
   #app .hideSidebar >.sidebar-container .el-submenu__title .icon-svg{
       margin-left: 20px;
   }
</style>
