<template>
   <div class="title-wrap">
    {{title || menuName}}
   </div>
</template>

<script>

  export default {
    name: 'TitleBar',
    data(){
        return{
            menuName:'',
            unwatch:''
        }
    },
    props: {
      title:'',
    },
    watch:{
        // '$route':{
        //     handler(newVal){
        //         console.log(2)
        //         var titme = this.title
        //         this.menuName = (newVal.meta && newVal.meta.title) || ''
        //     },
        //     immediate:true
        // }
    },
    activated(){
    },
    mounted(){
        this.menuName = this.$route.meta&&this.$route.meta.title || ''
    },
    deactivated (){
    },
    methods: {
     
    },
    
  }
</script>
<style lang="scss" scoped>
 @import "~@/styles/variables.scss";
    .title-wrap{
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        background: #fff;
        color: #666;
        padding-left: 16px;
        position: fixed;
        top: 50px;
        width: 100%;
        left:#{$sideBarWidth};
        transition: 0.3s;
        font-size: 14px;
        z-index: 10;
        border-bottom: solid 1px rgb(238, 238, 238);
        box-shadow: 0 1px 2px #f5f7fa;
    }
    .hideSidebar  .title-wrap{
        left: 54px;
        transition: 0.3s;
    }
    .mobile.hideSidebar  .title-wrap{
        left: 0;
        transition: 0.3s;
    }
</style>
