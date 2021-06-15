<template>
  <div>
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="page-header">
          <h3>基于Vue的组织架构树组件</h3>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <form class="form-horizontal row">
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <!-- <input type="checkbox" v-model="horizontal" /> Horizontal -->
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="collapsable" /> Collapsable
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="expandAll"
                      @change="expandChange"
                    />
                    Expand All
                  </label>
                </div>
              </div>
              <p><br /></p>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label col-md-5">labelClassName:</label>
                  <div class="col-md-7">
                    <select class="form-control" v-model="labelClassName">
                      <option value="bg-white">bg-white</option>
                      <option value="bg-orange">bg-orange</option>
                      <option value="bg-gold">bg-gold</option>
                      <option value="bg-gray">bg-gray</option>
                      <option value="bg-lightpink">bg-lightpink</option>
                      <option value="bg-chocolate">bg-chocolate</option>
                      <option value="bg-tomato">bg-tomato</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <p><br /></p>
        <div class="text-center">
          <vue2-org-tree
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
            :render-content="renderContent"
            @on-expand="onExpand"
            @on-node-click="onNodeClick"
          >
          </vue2-org-tree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        id: 0,
        label: "XXX科技有限公司",
        name: "张三",
        position: "董事长",
        img:
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
        expand: "true",
        children: [
          {
            id: 2,
            label: "产品研发部",
            name: "李QQ",
            position: "经理",
            img:
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
            expand: "true",
            children: [
              {
                id: 5,
                label: "研发-前端",
                name: "刘aa",
                position: "前端负责人",
                img:
                  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                expand: "true",
                children: [
                  {
                    id: 5.1,
                    label: "高级前端",
                    img:
                      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                    expand: "true",
                    children: [
                      {
                        id: 5.11,
                        label: "研发部门",
                        img:
                          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                        expand: "true",
                        children: [
                          {
                            id: 5.111,
                            label: "前端工程师",
                            name: "李XX",
                            position: "技术员",
                            img:
                              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                            expand: "true",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 6,
                label: "研发-后端",
                img:
                  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                expand: "true",
              },
              {
                id: 9,
                label: "UI设计",
                img:
                  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                expand: "true",
              },
              {
                id: 10,
                label: "产品经理",
                img:
                  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4007973853,1345044449&fm=15&gp=0.jpg",
                expand: "true",
              },
            ],
          },
          {
            id: 3,
            label: "销售部",
            img:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=629230260,2582796696&fm=26&gp=0.jpg",
            expand: "true",
            children: [
              {
                id: 7,
                label: "销售一部",
                img:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=629230260,2582796696&fm=26&gp=0.jpg",
                expand: "true",
              },
              {
                id: 8,
                label: "销售二部",
                img:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=629230260,2582796696&fm=26&gp=0.jpg",
                expand: "true",
              },
            ],
          },
          {
            id: 4,
            label: "财务部",
            img:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=629230260,2582796696&fm=26&gp=0.jpg",
            expand: "true",
          },
          {
            id: 9,
            label: "HR人事",
            img:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=629230260,2582796696&fm=26&gp=0.jpg",
            expand: "true",
          },
        ],
      },
      horizontal: false, //方向
      collapsable: true, //是否可折叠
      expandAll: false,//展开或收起全部
      labelClassName: "bg-white",//颜色
    };
  },
  mounted() {
    this.initOrg();
  },
  methods: {
    //展示样式
    renderContent(h, data) {
      //   return data.label;
      return (
        <div
          style="width:100%;height:100%;display:block;border-radius:3px;"
          //   class={
          //     data.relations === "1-1"
          //       ? "bg-tomato"
          //       : data.relations === "1-2"
          //       ? "bg-gold"
          //       : data.relations === "1-3"
          //       ? "bg-gray"
          //       : data.relations === "1-4"
          //       ? "bg-lightpink"
          //       : data.relations === "1-5"
          //       ? "bg-blue"
          //       : "bg-green"
          //   }
        >
          <div style="font-size:1.6vh;background:blue;width:100%;height:50%;line-height:30px;color:#fff">
            {data.label}
          </div>
          <div style="height:6vh;border-radius:50%;padding:0;line-height:30px;">
            <img
              style="width:15px;height:15px;border-radius:50%;"
              src={
                data.img
                  ? data.img
                  : data.sex === 1
                  ? this.manUrl
                  : data.sex === 2
                  ? this.womanUrl
                  : this.shemaleUrl
              }
            />
            {data.name}/{data.position}
          </div>
        </div>
      );
    },
    //默认展开层数//默认获取的数据无expand才可以
    initOrg() {
      this.$set(this.data, "expand", true);
      if (this.data.children) {
        this.data.children.forEach((item, index) => {
          this.$set(item, "expand", true);
        });
      }
    },
    onExpand(data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击展开收起
    onNodeClick(e, data) {
      console.log("data", data);
      return (data.expand = !data.expand);
    },
    collapse(list) {
      var _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>
<style type="text/css" lang='scss'>
@import "./org-tree.scss";
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>