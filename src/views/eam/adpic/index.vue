<template>
  <div class="eamCoursestudy">
    <!-- 主页面 -->
    <div v-if="addOrUpdateIsShow">
      <titleBar></titleBar>
      <!-- 顶部form表单 -->
      <!-- <el-form :model="formData" class="search-form--wrap" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称：" prop="schoolId">
              <el-select v-model="formData.schoolId" clearable placeholder="请选择学校名称">
                <el-option
                 v-for="(item,index) in extIdNameArr"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- button按钮区 -->
        <!-- <el-row>
            <el-col :span="24">
                <el-form-item label-width="0">
                    <el-button plain type="primary" @click="addNew()">新增</el-button>
                </el-form-item>
            </el-col>
        </el-row> -->
      <!-- </el-form> -->

      <!-- 表格组件 -->
      <div id="print">
        <el-table :data="tableData" border stripe v-loading="loading">
          <el-table-column header-align="center" align="center" label="轮播图">
            <template slot-scope="scope">
              <img class="addListImg" :src="scope.row.adpicUrl" alt />
            </template>
          </el-table-column>

          <el-table-column prop="adpicName"  header-align="center" align="center" label="标题"></el-table-column>
          <el-table-column prop="remark" header-align="center" align="center" label="备注"></el-table-column>
          <el-table-column prop="adpicNumber" header-align="center" align="center" label="序号"></el-table-column>
          <el-table-column prop="updateTime" header-align="center" align="center" label="更新时间"></el-table-column>
          <el-table-column prop="stateValue" header-align="center" align="center" label="状态"></el-table-column>
          <el-table-column header-align="center" align="center" label="调整顺序" width="160">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-top" v-if="scope.row.adpicNumber==1" disabled></el-button>
              <el-button
                type="primary"
                icon="el-icon-top"
                v-if="scope.row.adpicNumber!=1"
                @click="move(scope.$index, scope.row,'up')"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-bottom"
                v-if="scope.row.adpicNumber==tableData.length"
                disabled
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-bottom"
                v-if="scope.row.adpicNumber!=tableData.length"
                @click="move(scope.$index, scope.row,'down')"
              ></el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="schoolName" header-align="center" align="center" label="学校名称"></el-table-column> -->
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addNew(scope.row.adpicId,scope.row.schoolId)">修改</el-button>
              <!-- <el-button type="text" size="small" @click="deleteColumn(scope.row.adpicId)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <!-- <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination> -->
    </div>
    <!-- 新增和修改 -->
    <!-- <div><tinymce :maxHeight="400"></tinymce></div> -->
    <addOrUpdate ref="addOrUpdate" v-if="!addOrUpdateIsShow"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getDropDownList } from "@/api/eam/select";
import { getPageListByParam,updateNumberData} from "@/api/eam/adpic";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      addOrUpdateIsShow: true,
      formData: {
        schoolId:''
      },
      extIdNameArr: [],
      tableData: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  activated() {
    this.addOrUpdateIsShow = true;
    this.extIdName()
  },
  computed: {},
  methods: {
    // 查询
    queryAbout(val) {
       if(val===1){
         this.pageIndex = 1
      }
       this.loading=true
      this.formData.pageSize=this.pageSize
      this.formData.pageNum=this.pageIndex
       getPageListByParam(this.formData).then(res => {
        if (res.rsCode=== 'AAAAAAA') {
            this.tableData=res.data.list
            this.total=res.data.totalCount
            this.loading=false
        }
      });
    },
    //新增和修改
    addNew(id,schoolid) {
      this.addOrUpdateIsShow = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.addOrUpdate(id,schoolid);
      });
    },
    //删除
    deleteColumn(id) {
      this.$confirm("确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$notify({
          message: "删除成功",
          type: "success"
        });
      });
    },
    //获取下拉框
    extIdName() {
      //获取学校名称
      getDropDownList({ code: "eam_schools" }).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
          this.formData.schoolId=this.extIdNameArr[0].value
          this.queryAbout()
        }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryAbout()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.queryAbout()
    },
    //上移下移
    move(index, row ,value) {
      let obj={
          "schoolId":this.tableData[index].schoolId,
          "adpicId":this.tableData[index].adpicId
      }
      if(value==="up"){
        obj.moveType=0
      }else{
        obj.moveType=1
      }
       updateNumberData(obj).then(res => {
           console.log("res",res)
        if (res.rsCode=== 'AAAAAAA') {
           this.queryAbout()
        }
      });
    }
  },

  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.eamCoursestudy .addListImg {
  height: 50px;
  width: 100px;
}
</style>