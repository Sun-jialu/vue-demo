<template>
    <div class="department">
        <titleBar></titleBar>
        <div v-if="flag">
                <el-form :model="sizeForm">
                   <el-row>
                    <el-col :span="8">
                        <el-form-item label="机构名称：" label-width="120px">
                            <el-input v-model="sizeForm.organization" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构分组：" label-width="120px" >
                            <el-select v-model="sizeForm.role" clearable placeholder="请选择">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  style="text-align: right">
                            <el-button  type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button @click="addOrganization" plain type="primary">新增</el-button>
                            <el-button plain type="primary">导入</el-button>
                            <el-button plain type="primary">下载模板</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table
                            :data="tableData"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="id"
                            border
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                            <!-- <el-table-column
                            prop=""
                            align="center"
                            label=""
                            width="40"
                            ></el-table-column> -->
                            <el-table-column
                            prop="date"
                            align="center"
                            label="部门编码"
                             width="200"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="部门名称"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="上级部门">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="部门简称"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            align="center"
                            label="状态">
                            </el-table-column>
                            <el-table-column align="center" label="操作">
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
        <Item ref="item" v-else />
    </div>
</template>

<script>
import Item from './components/department_item'
export default {
  data() {
    return {
        flag:true,
        total: 4,
        pageNum: 1,
        pageCount: 4,
        sizeForm:{
            organization:"",//机构名称
            role:"",//机构分组
        },
        tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                  {
              id: 38,
              date: "2016-05-01",
              name: "王",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 39,
              date: "2016-05-01",
              name: "虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  components:{Item},
  mounted(){},
  methods:{
    //   添加
    addOrganization(){
        this.flag=false
        this.$nextTick(()=>{
            this.$refs.item.setTitle()
        })
    },
    //   编辑
       handleEdit(index, row) {
           this.flag=false
           this.$nextTick(()=>{
            this.$refs.item.setTitle(row)
        })
        console.log(index, row);
      },
    // 每页条数
            handleSizeChange(val) {
            console.log(`每页 ${val} 条`,"1");
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`,"2");
            }
  }
};
</script>

<style lang="scss" scoped>
</style>