<template>
  <component v-bind="linkProps()">
    <slot></slot>
  </component>
  <!--<div @click='click()'>
    <slot></slot>
  </div>-->
</template>

<script>
import { isURL } from '@/utils/validate'

export default {
  props: {
    to: {
      type: Object,
      required: true,
      default:()=>{
        return {}
      }
    },
  },
  methods: {
    click(){
      var type = this.to.meta.type||''
      var name = this.to.name||''
      if(type == 'iframe'){
        this.$router.push({name:name}) //window.location
      }else{
        this.$router.push({mame:27})
      }
    },
    linkProps() {
      var url = this.to.meta&&this.to.meta.iframeUrl
      var useIframe = false
        if (isURL(url) && useIframe) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: {
            name:this.to.name
        }
      }
    }
  }
}
</script>
