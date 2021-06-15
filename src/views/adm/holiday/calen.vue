<template>
  <div>
    <table class="r-table">
      <thead>
        <tr>
          <th class="isleaf" v-for="item in week" :key="item">
            <div class="r-cell">{{item}}</div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in calendarWeekArr" :key="item.week">
          <!-- <th>{{item.week}}</th> -->
          <td class v-for="list in item.children" :key="list.fullTime">
            <div
              class="r-cell"
              v-if="list.fullTime >= startTime && list.fullTime <= endTime"
              :class="[list.type=='1'? 'default':'',list.type=='2'?'vacation':'',list.type=='3'?'lenrn':'']"
            >
              {{list.fullTime}}
              <!-- <template v-slot="scope"> -->
              <span v-if="list.type==1">默认</span>
              <span v-if="list.type==2">休假</span>
              <span v-if="list.type==3">学习</span>
              <!-- </template> -->
              <div class="changeCell">
                <el-button type="primary" class="button" @click="toChange(list)">编辑</el-button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["dataList"],
  data() {
    return {
      startTime: "", //学期开始
      endTime: "", //学期结束

      //   currentMounth: "2020-04", //查询选择月

      week: [
        // "周",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
      calendarArr: [], //后台数据type
      calendarDayMap: {}, // 每一天的map
      calendarWeekArr: [], // 周的数组
      //   dicLists: [
      //     {
      //       默认: 0
      //     },
      //     {
      //       休假: 1
      //     },
      //     {
      //       学习: 2
      //     }
      //   ]
    };
  },
  components: {},
  computed: {
    // keyVal() {
    //   this.dicLists.forEach((item, index) => {
    //     if (!map[item.dictCode]) {
    //       map[item.dictCode] = item.dictValue;
    //     }
    //   });
    //   return key => {
    //     return this.map[key] || key;
    //   };
    // }
  },
  mounted() {},
  created() {},
  activated() {
    // this.init();
  },
  methods: {
    init() {
      var startTime = this.startTime;
      var endTime = this.endTime;
      var calendarArr = this.calendarArr;
      var calendar = this.initTime(startTime, endTime);
      this.calendarDayMap = calendar.dayMap;
      this.calendarWeekArr = calendar.weekArr;
      console.log(this.calendarDayMap);
      console.log(this.calendarWeekArr);
      calendarArr.forEach((item) => {
        var markDate = item.markDate;
        if (this.calendarDayMap[markDate]) {
          this.$set(this.calendarDayMap[markDate], "type", item.type);
          this.$set(this.calendarDayMap[markDate], "id", item.id);
          // this.calendarDayMap[time]['type'] = item.type
        }
      });

      //   console.log(calendar);
    },
    initTime(startTime, endTime, autocomplete = true) {
      var dayMap = this.getTimes(startTime, endTime); //所有天数 也是后续直接操作的数据
      //   console.log(dayMap);
      var weekArr = []; //周的数组
      var initWeek = 1; //初始从第一周开始
      var weekMap = {}; //所有周的map  {1:{children:[]},2:{}}
      //**********************
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
            children: [item],
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
        weekArr,
      };
    },
    //获取开始 至 结束日期的map表
    getTimes(startTime, endTime) {
      var start_time = startTime < endTime ? startTime : endTime;
      var end_time = endTime > startTime ? endTime : startTime;
      var autocompleteStartDay = new Date(start_time).getDay(); //获取周几，如 2
      var autocompleteEndDay = new Date(end_time).getDay(); //获取周几，如 2
      var preLength =
        autocompleteStartDay - 1 >= 0 ? autocompleteStartDay - 1 : 6; // 向前补星期
      var preTime = this.getNextDate(start_time, -preLength); //考虑补全周 的开始时间
      var sufixTime = this.getNextDate(end_time, 7 - autocompleteEndDay); //考虑补全周 的结束时间

      var bd = new Date(preTime); //开始时间
      var be = new Date(sufixTime); //结束
      var bd_time = bd.getTime(), //获取开始补全周的时间戳
        be_time = be.getTime(), //获取结束补全周的时间戳
        time_diff = be_time - bd_time; //获取开始到结束之间的时间
      var d_map = {};
      var weekMap = {
        "0": "星期日",
        "1": "星期一",
        "2": "星期二",
        "3": "星期三",
        "4": "星期四",
        "5": "星期五",
        "6": "星期六",
      };
      var startWeekDay = bd.getDay(); //当前周1: 1
      var initWeek = Math.abs(startWeekDay - 1); //当前周几
      for (var i = 0; i <= time_diff; i += 86400000, initWeek++) {
        var week = parseInt(initWeek / 7) + 1; //当天属于第几周

        var ds = new Date(bd_time + i); //获取标准时间

        var year = ds.getFullYear(); //获取年

        var mounth = ds.getMonth() + 1; //获取月
        mounth = mounth < 10 ? "0" + mounth : mounth;

        var day = ds.getDate(); //  如 1号 2号 获取日期  号
        day = day < 10 ? "0" + day : day;

        var weekDay = ds.getDay(); //周 1  星期几
        var fullTime = `${year}-${mounth}-${day}`;
        var dayTime = `${mounth}-${day}`;
        var dayItem = {
          year: year,
          mounth: mounth,
          day: day,
          weekDay: weekDay, //（周） 1
          currentWeek: week, //当前第几周
          fullWeekDay: weekMap[weekDay], //星期一
          fullTime: fullTime,
          dayTime: dayTime, //10-01
        };
        d_map[fullTime] = dayItem; //结合成一天的数据
      }
      return d_map;
    },
    //获取指定日期的 前后 日期  day 正（2）则后，  负数（-2）则前2天
    getNextDate(date, day) {
      //  console.log(date,day)
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    //修改某天
    toChange(list) {
      this.$emit("changeData", list);
    },
  },
  watch: {
    dataList: function (newData, oldData) {
      this.startTime = newData.startTime;
      this.endTime = newData.endTime;
      this.calendarArr = newData.value;
      this.init();
    },
  },
};
</script>
<style scoped lang="scss">
.r-table {
  font-size: 12px;
  color: #000;
  // font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  width: 100%;
  border: 1px solid #dfe6ec;
  border-collapse: collapse;
}
.r-table th,
.r-table td {
  border-collapse: collapse;
  border: 1px solid #dfe6ec;
}
.r-table td {
  position: relative;
  .changeCell {
    position: absolute;
    display: none;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
    .button {
      padding: 5px 5px;
      // width: 50%;
      // height: 50%;
      font-size: 10px;
    }
  }
  :hover {
    .changeCell {
      display: block;
    }
  }
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

.r-table th div {
  padding: 8px 0;
}
.r-table th.isleaf {
  background-color: #f5f7fa;
}
.r-table td div {
  padding: 8px 0;
  position: relative;
}
.r-table thead {
  color: #909399;
  font-weight: 500;
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