<template>
  <div class="calendar">
    <div class="calendar1">
      <!-- 顶部form表单 -->
      <el-form
        :model="dataForm"
        class="demo-form-inline search-form--wrap"
        label-width="120px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="年度:">
              <el-input v-model="dataForm.termId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="月份:">
              <el-date-picker
                @change="changeM"
                v-model="dataForm.month"
                type="month"
                placeholder="请选择"
                format="yyyy-MM"
                value-format="yyyy-MM"
                :clearable="false"
                :editable="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--查询按钮-->
        <el-row>
          <el-col :span="24">
            <div style="text-align: right">
              <el-button plain type="primary" @click="queryAbout(1)"
                >查询</el-button
              >
            </div>
          </el-col>
        </el-row>
        <br />
        <!-- 日历表格 -->
        <el-row>
          <el-col :span="24">
            <schoolCalendar
              @changeData="getById"
              :dataList="studentArr"
            ></schoolCalendar>
          </el-col>
          <el-col :span="24"></el-col>
        </el-row>
        <!-- 上个月下个月 -->
        <br />
        <el-row>
          <el-col :span="24" style="text-align: right">
            <el-button :disabled="mouthNum <= 1" @click="beforeMouth()"
              >上一月</el-button
            >
            <el-tag type="success">第{{ mouthNum }}月</el-tag>
            <el-button :disabled="mouthNum >= 12" @click="nextMouth()"
              >下一月</el-button
            >
          </el-col>
        </el-row>
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
                  disabled
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
                <el-input v-model="byIdArr.week" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="80px">
                <el-radio v-model="byIdArr.type" label="1">默认</el-radio>
                <el-radio v-model="byIdArr.type" label="2">休假</el-radio>
                <el-radio v-model="byIdArr.type" label="3">上班</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit" :loading="btnLoding"
            >提交</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import schoolCalendar from "./calen";
export default {
  data() {
    return {
      studentArr: [], //表格数据
      listLoading: false,
      pageIndex: 1,
      pageSize: 1000,
      total: 0,
      mouthNum: "", //月份的控制
      startTime: "", //开始时间
      endTime: "", //结束时间
      termStart: "", //学期的开始时间
      termEnd: "", //学期的结束时间
      show: false, //控制编辑显示隐藏
      btnLoding: false, //提交loding,
      dataForm: {
        termId: "", //年份
        month: "", //月份
      }, //分页查询请求报文
      byIdArr: {
        id: "",
        type: "", //类型
        week: "", //星期
        weekNum: "", //第几周
        markDate: "", //日期
      }, //根据id获取当前日期信息
    };
  },
  components: {
    schoolCalendar,
  },
  mounted() {
    this.show = false;
    this.setTime();
  },
  methods: {
    //上个月
    beforeMouth() {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      this.mouthNum--;
      let newMouth = this.mouthNum >= 10 ? this.mouthNum : "0" + this.mouthNum;
      let timeData = new Date(tYear, this.mouthNum, 0);
      let day = timeData.getDate();
      this.startTime = `${tYear}-${newMouth}-01`;
      this.endTime = `${tYear}-${newMouth}-${day}`;
      this.dataForm.month = `${tYear}-${newMouth}`;
      this.queryAbout();
    },
    //下个月
    nextMouth() {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      this.mouthNum++;
      let newMouth = this.mouthNum >= 10 ? this.mouthNum : "0" + this.mouthNum;
      let timeData = new Date(tYear, this.mouthNum, 0);
      let day = timeData.getDate();
      this.startTime = `${tYear}-${newMouth}-01`;
      this.endTime = `${tYear}-${newMouth}-${day}`;
      this.dataForm.month = `${tYear}-${newMouth}`;
      this.queryAbout();
    },
    //设置默认时间
    setTime() {
      this.mouthNum = "1";
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      this.termStart = `${tYear}-01-01`;
      this.termEnd = `${tYear}-12-31`;
      this.startTime = `${tYear}-01-01`;
      this.endTime = `${tYear}-01-31`;
      this.dataForm.month = `${tYear}-01`;
      this.dataForm.termId = tYear;
      this.queryAbout();
    },
    //提交
    submit() {
      this.show = false;
    },
    //返回
    cancel() {
      this.show = false;
    },
    //日历组件回调拿得到点击的日期数据
    getById(item1) {
      this.show = true;
      this.byIdArr.week = item1.fullWeekDay; //星期
      this.byIdArr.markDate = item1.fullTime; //要修改的日期
      this.byIdArr.weekNum = item1.currentWeek; //第几周
      this.byIdArr.type = item1.type+''; //类型
    },
    // 查询
    queryAbout() {
      let newObj = {
        startTime: this.startTime,//这个月的开始时间
        endTime: this.endTime,//这个月的开始时间
        termStart: this.termStart,//这个年/学年的开始时间
        termEnd: this.termEnd,//这个年/学年的结束时间
        list: [{
          defineId:9,
          defineDate:'2021-01-01',
          defineState:1
        },{
          defineId:10,
          defineDate:'2021-01-02',
          defineState:2
        },{
          defineId:11,
          defineDate:'2021-01-03',
          defineState:3
        },],
      };
      this.studentArr = newObj;
    },
    //点击月份
    changeM(item1) {
      let arr = item1.split("-");
      this.mouthNum = arr[1] * 1;
      let timeData = new Date(arr[0], arr[1] * 1, 0);
      let day = timeData.getDate();
      this.startTime = `${arr[0]}-${arr[1]}-01`;
      this.endTime = `${arr[0]}-${arr[1]}-${day}`;
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
