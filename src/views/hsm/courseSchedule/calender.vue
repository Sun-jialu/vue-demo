<template>
  <div>
    <div></div>
    <table class="r-table" v-loading="loading">
      <thead>
        <tr>
          <th class="isleaf">
            <div class="r-cell">
              <div class="divSpan">节次 \</div>
              <div class="divSpan">星期</div>
            </div>
          </th>
          <th class="isleaf" v-for="item in currentWeekArr" :key="item.fullWeekDay">
            <div class="r-cell">
              <div class="divSpan">{{item.fullWeekDay}}</div>
              <div class="divSpan">{{item.fullTime}}</div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="sectionArr.length==0">
          <td colspan="8" style="text-align: center; height:50px;line-height:50px">暂无数据</td>
        </tr>
        <tr v-for="(item , index) in sectionArr" :key="index">
          <!-- 公共时间段 -->
          <td colspan="8" v-if="item.type=='common'" class="common">
            <div>
              {{item.name}}:{{item.startTime}}-{{item.endTime}}
            </div>
          </td>
          <!-- 普通时间段 -->
          <template v-else>
            <th>
              <div class="divSpan">第{{item.section}}节</div>
              <div class="divSpan">{{item.time}}</div>
            </th>
            <td v-for="list in item.children" :key="list.fullSection" class="common">
              <div class="r-cell" v-if="list.fullTime >= startTime && list.fullTime <= endTime">
                <!-- <span class="divSpan">{{list.fullSection}}</span> -->
                <span class="divSpan">{{list.courseName}}</span>
                <span class="divSpan">{{list.teacherName}}</span>
                <span class="divSpan">{{list.className}}</span>
                <span class="divSpan">{{list.classroom}}</span>
                <!-- <span v-if="name=='courseSchedule'">
                  <span class="divSpan">{{list.classroom}}</span>
                  <span class="divSpan">{{list.className}}</span>
                </span>-->
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div style="text-align:right;margin-top:10px;">
      <el-button :disabled="currentWeek<=1" @click="beforeWeek()">上一周</el-button>
      <el-tag type="success">第{{currentWeek}}周</el-tag>
      <el-button :disabled="currentWeek >= maxWeek" @click="nextWeek()">下一周</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 普通时间、公共时间、周次、表格数据、页面名称,多选
  props: ["data", "commonData", "weekLen", "tableData", "name", "checkS"],
  data() {
    return {
      loading: true,
      tableList: [], //具体表格内的数据
      startTime: "", //学期开始
      endTime: "", //学期结束

      calendarDayMap: {}, // 每一天的map
      calendarWeekArr: [], // 周的数组
      //一天多少节
      section: [], //普通时间段
      commonSection: [], //公共时间段

      checkList: [], //timeTable页面转过来的多选按钮
      //默认第一周
      currentWeek: 1,
      //第一周的 日期数组
      //currentWeekArr: [
      //                  {
      //                   fullTime:'2020-02-20',
      //                   week:1,
      //                  }
      //                ]
      currentWeekArr: [], //截取一个周的数据
      //节次的所有map
      // 2020-02-12-1:{
      //     currentWeek:1
      //     day:10
      //     dayTime:"02-10"
      //     endTime:"09:20"
      //     fullTime:"2020-02-10"
      //     fullWeekDay:"星期一"
      //     index:1
      //     mounth:"02"
      //     section:1
      //     startTime:"08:40"
      //     type:"custom"
      //     weekDay:1
      //     year:2020
      // }
      sectionMap: {}, //代表第几节的对象
      //节次所有的数组
      sectionArr: [] //最后处理要渲染的数组
    };
  },
  components: {},
  computed: {
    maxWeek() {
      return this.calendarWeekArr.length || 0;
    },
    //监听多个传递过来的动态数据
    dataRange() {
      let { data, commonData, weekLen, tableData, checkS } = this;
      return {
        data,
        commonData,
        weekLen,
        tableData,
        checkS
      };
    }
  },
  mounted() {},
  created() {
    // console.log("this.checkS :>> ", this.checkS);
  },
  activated() {},
  methods: {
    init() {
      // console.log("this.commonSection :>> ", this.commonSection);
      // console.log("this.section :>> ", this.section);
      var startTime = this.startTime;
      var endTime = this.endTime;
      var calendar = this.initTime(startTime, endTime);
      this.calendarDayMap = calendar.dayMap;
      this.calendarWeekArr = calendar.weekArr;
      this.initDayTable();
    },
    initDayTable() {
      // 截取 获取一周的 数组 （table的header）  （默认第一周）
      // console.log("this.currentWeek12 :>> ", this.currentWeek);
      this.currentWeekArr = this.getWeekDate(
        this.calendarWeekArr,
        this.currentWeek
      );
      //获取所有的map(所有可用的数据map)
      this.sectionMap = this.getAllSectionMap();
      //获取所有的table数组
      this.sectionArr = this.resetSectionMap2Arr();
      //课程表管理的表格内容
      if (this.name == "timeTable") {
        this.tableList &&
          this.tableList.forEach((item, index) => {
            // console.log("item :>> ", item);
            let sctionTable = `${item.courseDate}-${item.orderNum}`;
            if (this.sectionMap[sctionTable]) {
              // console.log('this.checkList :>> ', this.checkList);
              //《--根据传递过来的多选按钮数组来判断添加值
              //显示班级
              // if (this.checkList.includes("显示班级")) {
              //   // console.log('className :>> ');
              //   this.$set(
              //     this.sectionMap[sctionTable],
              //     "className",
              //     item.className
              //   );
              // } else {
              //   this.$set(this.sectionMap[sctionTable], "className", "");
              // }
              //显示教室
              if (this.checkList.includes("显示教室")) {
                // console.log("classroom :>> ");
                this.$set(
                  this.sectionMap[sctionTable],
                  "classroom",
                  item.classroom
                );
              } else {
                this.$set(this.sectionMap[sctionTable], "classroom", "");
              }
              //显示教师
              if (this.checkList.includes("显示教师")) {
                // console.log("teacher :>> ");
                this.$set(
                  this.sectionMap[sctionTable],
                  "teacherName",
                  item.teacherName
                );
              } else {
                this.$set(this.sectionMap[sctionTable], "teacherName", "");
              }
              //--》
              this.$set(
                this.sectionMap[sctionTable],
                "courseName",
                item.courseName
              );
            }
            // console.log(
            //   "this.sectionMap[sctionTable] :>> ",
            //   this.sectionMap[sctionTable]
            // );
          });
      } else if (this.name == "courseSchedule") {
        //手动排课管理的表格内容
        // console.log('this.tableList :>> ', this.tableList);
        this.tableList &&
          this.tableList.forEach((item, index) => {
            // console.log("item :>> ", item);
            let sctionTable = `${item.courseDate}-${item.orderNum}`;
            if (this.sectionMap[sctionTable]) {
              this.$set(this.sectionMap[sctionTable], "id", item.id);
              this.$set(
                this.sectionMap[sctionTable],
                "teacherName",
                item.teacherName
              );
              this.$set(
                this.sectionMap[sctionTable],
                "courseName",
                item.courseName
              );
              this.$set(
                this.sectionMap[sctionTable],
                "classroom",
                item.classroom
              );
              this.$set(
                this.sectionMap[sctionTable],
                "className",
                item.className
              );
            }
          });
      }
      this.fnConcatArr();
      this.loading = false;
    },
    //获取table的日期 一周的标题
    getWeekDate(weekArr = [], week = 1) {
      var allWeekArr = JSON.parse(JSON.stringify(weekArr));
      var weekArr = allWeekArr[week - 1] || {};
      var currentWeekArr = weekArr.children || [];
      return currentWeekArr;
    },
    //获取一周的所有 日期与节的 map
    getAllSectionMap() {
      //遍历节 如 一天六节
      var sectionMapCache = {};
      this.section &&
        this.section.forEach((sectionItem, sectionIndex) => {
          //遍历一周的天数
          this.currentWeekArr.forEach(dayItem => {
            var section = sectionIndex + 1;
            var key = dayItem.fullTime + "-" + section; //2020-02-10-1
            sectionMapCache[key] = {
              ...dayItem,
              ...sectionItem,
              section: section,
              fullSection: key
            };
          });
        });
      return sectionMapCache;
    },
    //通过sectionMap（所有节的map）重组为数组格式 获取四节课一周的数据
    resetSectionMap2Arr() {
      //节数组
      var sectionArr = [];
      //节map
      var allSectionMap = {};

      //给每一节课加上该节的名字
      for (var key in this.sectionMap) {
        var sectionItem = this.sectionMap[key]; //每一天 每一节
        var section = sectionItem["section"]; // 当前节数
        if (allSectionMap[section]) {
          allSectionMap[section].children.push(sectionItem);
        } else {
          // {
          //   fullSection: "2020-02-10-1",
          //   fullTime: "2020-02-10",
          //     children：[
          // {}
          // ]
          // }
          allSectionMap[section] = {
            //第一条sectionItem 仅方便展示 table最左侧的 第几节
            ...sectionItem,
            children: [sectionItem]
          };
          sectionArr.push(allSectionMap[section]);
        }
      }
      return sectionArr;
    },
    //上一周
    beforeWeek() {
      this.currentWeek--;
      this.initDayTable();
      this.$emit("callBackWeek", this.currentWeek);
    },
    //下一周
    nextWeek() {
      this.currentWeek++;
      // console.log("this.currentWeek :>> ", this.currentWeek);
      this.initDayTable();
      this.$emit("callBackWeek", this.currentWeek);
    },

    // 以下为后去map及周数组---------------------

    initTime(startTime, endTime, autocomplete = true) {
      var dayMap = this.getTimes(startTime, endTime); //所有天数 也是后续直接操作的数据
      var weekArr = []; //周的数组
      var initWeek = 1; //初始从第一周开始
      var weekMap = {}; //所有周的map  {1:{children:[]},2:{}}
      for (var key in dayMap) {
        var item = dayMap[key]; //当前的一天
        var itemWeek = item.currentWeek; //当前天的 所属第几周
        //周map中有此 周，当前item直接push
        if (weekMap[itemWeek]) {
          weekMap[itemWeek]["children"].push(item);
        } else {
          //若周map中没有此 周，则新加一个 key为此周的map
          weekMap[itemWeek] = {
            week: itemWeek,
            children: [item]
          };
          weekArr.push(weekMap[itemWeek]);
        }
      }
      //拿到标准格式
      // weekArr= [
      //      {
      //         week:1,
      //         children:[
      //             {
      //                 currentWeek:1,
      //                 day:12,
      //                 dayTime:"02-12",
      //                 fullTime:"2020-02-12",
      //                 fullWeekDay:"星期三",
      //                 mounth:"02",
      //                 weekDay:3,
      //                 year:2020,
      //             }
      //         ]
      //      }
      //  ]
      return {
        dayMap,
        weekArr
      };
    },
    //获取开始 至 结束日期的map表
    getTimes(startTime, endTime) {
      var start_time = startTime < endTime ? startTime : endTime;
      var end_time = endTime > startTime ? endTime : startTime;
      //   timestamp
      var autocompleteStartDay = new Date(start_time).getDay(); //获取周几，如 2
      var autocompleteEndDay = new Date(end_time).getDay(); //获取周几，如 2
      var preLength =
        autocompleteStartDay - 1 >= 0 ? autocompleteStartDay - 1 : 6; // 向前补星期
      var preTime = this.getNextDate(start_time, -preLength); //考虑补全周 的开始时间
      var sufixTime = this.getNextDate(end_time, 7 - autocompleteEndDay); //考虑补全周 的结束时间

      var bd = new Date(preTime); //开始时间
      var be = new Date(sufixTime); //结束
      var bd_time = bd.getTime(),
        be_time = be.getTime(),
        time_diff = be_time - bd_time;
      var d_map = {};
      var weekMap = {
        "0": "星期日",
        "1": "星期一",
        "2": "星期二",
        "3": "星期三",
        "4": "星期四",
        "5": "星期五",
        "6": "星期六"
      };
      var startWeekDay = bd.getDay(); //当前周1: 1
      var initWeek = Math.abs(startWeekDay - 1); //当前周几
      for (var i = 0; i <= time_diff; i += 86400000, initWeek++) {
        var week = parseInt(initWeek / 7) + 1;
        var ds = new Date(bd_time + i);

        var year = ds.getFullYear();

        var mounth = ds.getMonth() + 1;
        mounth = mounth < 10 ? "0" + mounth : mounth;

        var day = ds.getDate(); //  如 1号 2号
        day = day < 10 ? "0" + day : day;

        var weekDay = ds.getDay(); //周 1

        var fullTime = `${year}-${mounth}-${day}`;
        var dayTime = `${mounth}-${day}`;
        var dayItem = {
          // 'year':year,
          // 'mounth':mounth,
          // 'day':day,
          weekDay: weekDay, //（周） 1
          currentWeek: week, //当前第几周
          fullWeekDay: weekMap[weekDay], //星期一
          fullTime: fullTime
          // "dayTime":dayTime ,  //10-01
        };
        d_map[fullTime] = dayItem;
      }
      return d_map;
    },
    //获取指定日期的 前后 日期  day 正（2）则后，  负数（-2）则前2天
    getNextDate(date, day) {
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },

    //合并公共时间段和普通时间段
    // 遍历公共时间段
    fnConcatArr() {
      //   console.log("this.sectionArr :>> ", this.sectionArr);
      var deepCloneData = JSON.parse(JSON.stringify(this.sectionArr));
      let len = deepCloneData.length; //保存普通时间段的长度，在插入公共时间时保持长度的增加
      this.commonSection &&
        this.commonSection.forEach(commonItem => {
          commonItem.type = "common";
          this.fnInsertItem(commonItem, deepCloneData, len);
        });
      this.sectionArr = deepCloneData;
    },
    // 遍历课表时间段
    fnInsertItem(commonItem, deepCloneData, len) {
      // console.log("commonItem :>> ", commonItem);
      let newDeepLen = deepCloneData.length; //记录每插入一次公共时间段的长度
      // console.log('deepLen,newDeepLen :>> ', len,newDeepLen,deepCloneData);
      var length = this.sectionArr.length || 0;
      for (var i = 0; i < length; i++) {
        var hasInsert = false;
        var item = this.sectionArr[i];
        //获取课表时间段的 开始时间
        var itemStartTime = (item.time && item.time.split("-")[0]) || "";
        // var itemStartTime = item.startTime;
        //获取公共时间段的结束时间
        var commonHourTime = commonItem.endTime;
        // 公共时间段的 结束时间 > 课表时间的 开始时间 则在之前插入
        if (commonHourTime <= itemStartTime) {
          //i+newDeepLen-len  在原下标的基础上加上每一次增加的长度和普通时间段的长度差
          deepCloneData.splice(i + newDeepLen - len, 0, commonItem);
          hasInsert = true;
          return;
        }
      }
      if (!hasInsert) {
        deepCloneData.push(commonItem);
      }
    },
    //点击普通时间段
    ontable(item) {
      if (item.fullTime >= this.startTime && item.fullTime <= this.endTime) {
        this.$emit("toChange", item.id); //
      }
      //   console.log("item :>> ", item);
    },
    //点击公共时间段
    common(item) {
      // console.log('item :>> ', item);
      this.$emit("monChange", item.id); //item.id
    }
  },
  watch: {
    dataRange: function(newData, oldData) {
      if (newData.checkS.length != 0) {
        this.checkList = newData.checkS;
      }
      // console.log("this.checkList :>> ", this.checkList);
      this.tableList = newData.tableData.list;
      // console.log('this.tableList :>> ', this.tableList);
      this.currentWeek = newData.weekLen;
      let data = newData.data;
      this.startTime = data.startTime;
      this.endTime = data.endTime;
      this.section = data.section;
      if (newData.commonData.list) {
        let commonData = newData.commonData.list;
        this.commonSection = commonData;
      }
      this.init();
    }
  }
};
</script>

<style scoped lang="scss">
.r-table {
  font-size: 12px;
  color: #606266;
  width: 100%;
  border: 1px solid #dfe6ec;
  border-collapse: collapse;
}
.r-table th,
.r-table td {
  padding: 0 5px;
  border-collapse: collapse;
  border: 1px solid #dfe6ec;
}
.r-table .r-cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
}
.r-table th {
  padding: 8px 0;
}

.r-table th.isleaf {
  background-color: #f5f7fa;
}
.r-table td {
  height: 37px;
  text-align: center;
  position: relative;
}
.r-table thead {
  color: #909399;
  font-weight: 500;
}
.divSpan {
  display: inline-block;
  white-space: nowrap;
}
.r-table td div {
  line-height: 37px;
  height: 100%;
  display: block;
  position: relative;
}
</style>


