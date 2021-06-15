<template>
  <div class="campus">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="campus1" v-if="show">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline">
        <!-- 学校名称,证件类型,证件号码 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:" label-width="80px">
              <el-select v-model="dataForm.schoolId" placeholder="请选择学校名称">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in extIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="校区名称:" label-width="120px">
              <el-input v-model="dataForm.campusName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout(1)">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- button按钮区 -->
        <el-row style="margin:10px 0;">
          <el-col :span="24">
            <el-button plain type="primary" @click="newAdd()">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格组件 -->
      <el-table
        :data="studentArr"
        border
        v-loading="listLoading"
      >
        <el-table-column align="center" header-align="center" prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="campusName" label="校区名称"></el-table-column>
        <el-table-column align="center" header-align="center" prop="campusContact" label="负责人"></el-table-column>
        <el-table-column align="center" header-align="center" prop="campusPhone" label="联系电话"></el-table-column>
        <el-table-column align="center" header-align="center" prop="campusAddress" label="地址"></el-table-column>
        <el-table-column align="center" header-align="center" prop="postalCode" label="邮编"></el-table-column>
        <el-table-column align="center" header-align="center" prop="stateValue" label="状态"></el-table-column>
        <el-table-column label="操作" fixed="right" style="text-align:center;" width="100">
          <template slot-scope="scope">
            <el-button @click="newAdd(scope.row.campusId,scope.row.schoolId)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.campusId,scope.row.schoolId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page.sync="pageIndex"
        :page-sizes="[10,20,50,100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <!-- 新增弹出框 -->
    <addOrUpdate v-if="!show" @clickBack="changeShow" ref="addOrUpdate"></addOrUpdate>
  </div>
</template>
<script>
import addOrUpdate from "./addOrUpdate";
import { getPageListByParam, deleteData } from "@/api/eam/campus";
import { getDropDownList } from "@/api/eam/select";
export default {
  components: {
    addOrUpdate
  },
  data() {
    return {
      dataForm: {
        schoolId: "", //学校名称
        campusName: "" //校区名称
      },
      show: true,
      extIdNameArr: [], //学校名称
      studentArr: [],
      pageIndex: 1,
      pageSize: 10,
      listLoading: false,
      total: 0
    };
  },
  computed: {},
  activated() {},
  methods: {
    // 查询
    async queryAbout(val) {
       if(val===1){
         this.pageIndex = 1
      }
      this.listLoading = true;
      this.dataForm.pageNum = this.pageIndex;
      this.dataForm.pageSize = this.pageSize;
      let res = await getPageListByParam(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        this.total = res.data.totalCount;
        this.studentArr = res.data.list;
      }
    },
    // 新增和修改
    newAdd(id,schoolId) {
      this.show = false;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,schoolId);
      });
    },
    //下拉列表内容获取
    extIdName() {
      //获取学校名称
      getDropDownList({"code":"eam_schools"}).then(res => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data;
        }
      });
    },
    //回调改变show
    changeShow(num) {
      this.queryAbout();
      this.show = num;
    },
    //删除
    remove(id,schoolId) {
      this.$confirm("确定删除该行吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let arrid=[]
        arrid.push(id)
       deleteData({"campusIds":arrid,"schoolId":schoolId}).then(res => {
            console.log("res",res)
                if (res.rsCode=== 'AAAAAAA') {
                    this.queryAbout()
                }
            })
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryAbout();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.queryAbout();
    }
  },
  created() {
    this.queryAbout();
    this.extIdName();
    this.show = true;
  },

  mounted() {}
};
</script>
<style lang="scss">
.campus .el-table th {
  background-color: #f5f7fa !important;
  text-align: center;
}
.campus .el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.campus .el-select {
  width: 100%;
}
</style>