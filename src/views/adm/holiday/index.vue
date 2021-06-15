<template>
  <div class="calendar">
    <!-- 首部标题 -->
    <titleBar></titleBar>
    <div class="calendar1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="80px">
        <!-- 学校名称,学年学期,月份 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="学校名称:">
              <el-select v-model="dataForm.extId" placeholder="请选择学校名称">
                <el-option
                  :label="item.dictValue"
                  :value="item.dictCode"
                  v-for="(item,index) in extIdNameArr"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年度:">
              <el-input v-model="dataForm.termId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="月份:">
              <el-date-picker
                v-model="dataForm.month"
                type="month"
                placeholder="选择月份"
                format="yyyy-MM"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--查询按钮-->
        <el-row>
          <el-col :span="24">
            <div style="text-align:right;">
              <el-button plain type="primary" @click="queryAbout">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <br />
        <!-- 日历表格 -->
        <el-row>
          <el-col :span="24">
            <schoolCalendar @changeData="getById" :dataList="studentArr"></schoolCalendar>
          </el-col>
          <el-col :span="24"></el-col>
        </el-row>
        <!-- 分页 -->
        <!-- <el-row>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page.sync="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-row>-->
        <br />
      </el-form>
      <!-- dialog弹出框 -->
      <el-dialog :visible.sync="show" width="30%" :before-close="cancel">
        <el-form label-width="80px">
          <!-- 日期，星期 ，单选-->
          <el-row>
            <el-col :span="24">
              <el-form-item label="日期:">
                <el-date-picker
                  v-model="byIdArr.markDate"
                  type="data"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="星期:">
                <el-input v-model="byIdArr.week"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="80px">
                <el-radio v-model="byIdArr.type" label="1">默认</el-radio>
                <el-radio v-model="byIdArr.type" label="2">休假</el-radio>
                <el-radio v-model="byIdArr.type" label="3">学习</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getDataListByMonth,
  getDataById,
  updateData,
} from "@/api/sam/calendar";
import { getDataListByTypeArray } from "@/api/common/dicLists";
import schoolCalendar from "./calen";

export default {
  components: {
    schoolCalendar, //校历  日历
  },
  data() {
    return {
      dataForm: {
        extId: "", //学校名称
        termId: "", //学年学期
        month: "", //月份
      }, //分页查询请求报文
      studentArr: [], //表格数据
      weekS: [
        {
          title: "周",
          arr: [],
        },
        {
          title: "星期一",
          arr: [],
        },
        {
          title: "星期二",
          arr: [],
        },
        {
          title: "星期三",
          arr: [],
        },
        {
          title: "星期四",
          arr: [],
        },
        {
          title: "星期五",
          arr: [],
        },
        {
          title: "星期六",
          arr: [],
        },
        {
          title: "星期日",
          arr: [],
        },
      ], //星期
      byIdArr: {
        id: "",
        type: "", //类型
        week: "", //星期
        markDate: "", //日期
      }, //根据id获取当前日期信息
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      show: false, //控制编辑显示隐藏
      extIdNameArr: [], //学校名称
      termList: [], //学年学期
    };
  },
  activated() {
    this.queryAbout();
    this.TypeName();
    // this.getDay();
    this.show = false;
  },
  computed: {
    // keyVal(type){
    //   console.log(type)
    // }
  },
  methods: {
    //提交
    async submit() {
      let res = await updateData(this.byIdArr);
      if (res && res.rsCode == "AAAAAAA") {
        this.queryAbout();
        this.show = false;
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success",
        });
      }
    },
    //返回
    cancel() {
      this.show = false;
    },
    //根据id获取数据
    async getById(item1) {
      console.log(item1);
      let res = await getDataById({ id: item1.id });
      if (res && res.rsCode == "AAAAAAA") {
        console.log(res);
        this.show = true;
        this.byIdArr = res.data;
      }
    },
    // 111
    getDay() {
      var dayCount;
      let now = new Date(2020, 4);
      dayCount = now.getDate();
      // console.log(dayCount);
    },
    // 查询
    async queryAbout() {
      this.listLoading = true;
      let res = await getDataListByMonth(this.dataForm);
      this.listLoading = false;
      if (res && res.rsCode == "AAAAAAA") {
        let data = res.data[0];
        this.studentArr = data;
        // console.log(this.studentArr)
      }
    },
    //学校，学年学期
    TypeName() {
      getDataListByTypeArray({
        type: ["METHOD_SAM_SCHOOLLIST", "METHOD_SAM_TERMLIST"],
      }).then((res) => {
        if (res && res.rsCode == "AAAAAAA") {
          let data = res.data;
          this.extIdNameArr = data.METHOD_SAM_SCHOOLLIST;
          this.extIdNameArr.unshift({ dictCode: "", dictValue: "全部" });
          this.termList = data.METHOD_SAM_TERMLIST;
          this.termList.unshift({ termId: "", termName: "全部" });
        }
      });
    },
  },
};
</script>
<style lang="scss">
.is-selected {
  color: #1989fa;
}
.term .el-table th {
  background-color: #f5f7fa !important;
  text-align: center;
}
.term .el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.term .el-select {
  width: 100%;
}
.term .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.default {
  background: #fff;
}
.vacation {
  background: #1abc9c;
}
.lenrn {
  background: #199ed8;
}
</style>
