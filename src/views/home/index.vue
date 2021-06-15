<template>
  <div>
    <el-divider class='mar-top' content-position="left">基础</el-divider>

      <el-checkbox :checked="true">@vue/cli  4.2.3</el-checkbox>
      <el-checkbox :checked="true">vue 2.6.11</el-checkbox>
      <el-checkbox :checked="true">vue-router</el-checkbox>
      <el-checkbox :checked="true">vuex</el-checkbox>
      <el-checkbox :checked="true">axios</el-checkbox>
      <el-checkbox :checked="true">element UI2.13.0</el-checkbox>
      <el-checkbox :checked="true">vue-cookie</el-checkbox>
      <el-checkbox :checked="true">mockjs</el-checkbox>


    <el-divider class='mar-top' content-position="left">组件</el-divider>
      <el-checkbox :checked="true">export excel</el-checkbox>
      <el-checkbox :checked="false">imprt excel</el-checkbox>
      <el-checkbox :checked="true">svg</el-checkbox>
      <el-checkbox :checked="true">screenfull</el-checkbox>
      <el-checkbox :checked="false">UEditer</el-checkbox>
      <el-checkbox :checked="false">echarts</el-checkbox>



    <el-divider class='mar-top' content-position="left">支持</el-divider>
    <el-checkbox :checked="true">皮肤</el-checkbox>
    <el-checkbox :checked="true">iframe / window.open</el-checkbox>
    <el-checkbox :checked="true">菜单 / 按钮权限</el-checkbox>

  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {

  },
  mounted(){

  },
   data(){
    return {

    }
   },
    methods: {


    }
}
</script>

<style lang="scss" scoped>
  .mar-top{
    margin-top: 50px;
  }
  .mar-top:first-child{
    margin-top: 0;
  }
</style>
