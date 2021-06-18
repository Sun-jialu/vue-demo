<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // publicPath: process.env.BASE_URL
    };
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
}
#nprogress .bar {
  background: #17b3a3 !important;
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100% !important;
}

.el-table th {
  background-color: #f5f7fa !important;
}
.search-form--wrap {
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
.el-textarea .el-input__count {
  line-height: 20px;
  height: 20px;
}
.el-table .cell {
  width: 95%;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
