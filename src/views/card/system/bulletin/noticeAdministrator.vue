<template>
    <div class="noticeAdministrator">
        <div v-if="flag">
            <titleBar></titleBar>
            <el-form :model="sizeForm" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构：" label-width="120px">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公告标题：" label-width="120px" >
                            <el-input v-model="sizeForm.title" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公告类型：" label-width="120px" >
                            <el-input v-model="sizeForm.type" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开始日期：" label-width="120px">
                            <el-date-picker
                            v-model="sizeForm.startDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束日期：" label-width="120px" >
                            <el-date-picker
                            v-model="sizeForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item   label="状态：" label-width="120px" >
                            <el-select v-model="sizeForm.flag" placeholder="请选择">
                                <el-option label="可用" value="0"></el-option>
                                <el-option label="禁用" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item >
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  >
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  style="text-align: right">
                            <el-button  type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item >
                            <el-button @click="addAccess" type="primary">新增</el-button>
                            <el-button  type="primary" @click="open">发布</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
                    <el-col :span="8"><el-form-item ></el-form-item></el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="24">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            align="center"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            align="center"
                            label="机构"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="公告类型"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="公告标题"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="发布人"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="最后更新时间"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="生效日期"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="失效日期"
                            >
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            align="center"
                            label="状态"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="操作"
                            width="120"
                            show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="col_pagination">
                        <el-pagination
                            class="el_pagination"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNum"
                            :page-sizes="[1, 2, 3, 4]"
                            :page-size="pageCount"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-form>            
        </div>
        <Item ref="reference" v-else />
    </div>
</template>

<script>
import Item from "./components/noticeAdministrator_item.vue";
export default {
  data() {
    return {
      flag: true,
      sizeForm: {
        organization: "", //机构分组名称
        title: "", //公告标题
        type: "", //公告类型
        startDate: "", //开始时间
        endData: "", //结束时间
        flag: "" //状态
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      multipleSelection: [],
      total: 4,
      pageNum: 1,
      pageCount: 4
    };
  },
  components: { Item },
  methods: {
    // 新增
    addAccess() {
      this.flag = false;
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`, "1");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`, "2");
    },
    //   编辑
    handleEdit(index, row) {
      this.flag = false;
      this.$nextTick(() => {
        this.$refs.reference.setTitle(row);
      });
      console.log(index, row);
    },
    // 表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 发布
    open() {
      this.$confirm("公告发布后不可修改，确认发布？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发布成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.noticeAdministrator {
  width: 100%;
}
</style>