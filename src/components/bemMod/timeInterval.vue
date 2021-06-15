<template>
  <div class="timeInterval">
    <div class="timeInterval1">
      <!-- 顶部form表单 -->
      <el-form :model="dataForm" class="demo-form-inline search-form--wrap" label-width="120px">
        <!-- 开始日期，结束日期,日期内-->
        <el-col :span="8">
          <el-form-item label="开始日期:" label-width="120px">
            <el-date-picker
              @change="selectTime"
              v-model="dataForm.starTime"
              :picker-options="starTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束日期:" label-width="120px">
            <el-date-picker
              @change="selectTime"
              v-model="dataForm.endTime"
              :picker-options="endTime "
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="30px">
            <div style="text-align:right;">
              <span
                style="white-space:nowrap;"
                v-for="(item,index) in textData"
                :key="index"
                type="text"
                :class="item.id==dataForm.textIndex?'textColor':'notColor'"
                @click="clickData(item)"
              >{{item.title}}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataForm: {
        starTime: "", //开始时间
        endTime: "", //结束时间
        textIndex: 1 //日期段选择
      },
      starTime: {
        disabledDate: time => {
          if (
            new Date(this.dataForm.starTime).getTime() + 86400 * 90 * 1000 <
              new Date(this.dataForm.endTime).getTime() ||
            new Date(this.dataForm.starTime).getTime() >
              new Date(this.dataForm.endTime).getTime() + 86400 * 90 * 1000
          ) {
            this.dataForm.endTime = this.dataForm.starTime;
          }
          return time.getTime() > new Date().getTime();
        }
      },
      endTime: {
        //+ 3600 * 24 * 1000
        disabledDate: time => {
          if (this.dataForm.starTime) {
            if (
              new Date(this.dataForm.starTime).getTime() + 86400 * 90 * 1000 <
              time.getTime()
            ) {
              return (
                time.getTime() < new Date(this.dataForm.starTime).getTime() ||
                time.getTime() >
                  new Date(this.dataForm.starTime).getTime() + 86400 * 90 * 1000
              );
            } else {
              return (
                time.getTime() < new Date(this.dataForm.starTime).getTime() ||
                time.getTime() > new Date().getTime()
              );
            }
          } else {
            return time.getTime() > new Date().getTime();
          }
        }
      },
      studentArr: [],
      //text文字点击
      textData: [
        { title: "当日", id: 1 },
        { title: "七日内", id: 2 },
        { title: "一月内", id: 3 },
        { title: "三月内", id: 4 }
      ],
      timestamp: "", //当前时间的时间戳
      //日期范围的控制
      pickerOptions: {
        shortcuts: [
          {
            text: "当天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, start]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [end, start]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [end, start]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [end, start]);
            }
          }
        ],
        disabledDate: time => {
          return time.getTime() >= new Date().getTime();
        }
      }
    };
  },
  activated() {
    this.all();
  },
  computed: {},
  mounted() {},
  methods: {
    all() {
      var timestamp = Date.parse(new Date());
      this.timestamp = timestamp;
      this.dataForm.textIndex = 1;
      this.setTime()
      this.clickData();
    },
    setTime(){
        this.dataForm.starTime=this.getLocalTime(this.timestamp)
        this.dataForm.endTime=this.getLocalTime(this.timestamp)
    },
    //时间戳转化时间yyyy-mm-dd
    getLocalTime(nS) {
      let data = new Date(parseInt(nS))
        .toLocaleString()
        .slice(0, 9)
        .replace(/\//g, "-");
      return data;
    },
    //点击文本按钮
    clickData(item) {
      if (item) {
        if (item.id == 1) {
          this.dataForm.starTime = this.getLocalTime(this.timestamp);
          this.dataForm.endTime = this.getLocalTime(this.timestamp);
        } else if (item.id == 2) {
          this.dataForm.starTime = this.getLocalTime(
            this.timestamp - 86400 * 7 * 1000
          );
          this.dataForm.endTime = this.getLocalTime(this.timestamp);
        } else if (item.id == 3) {
          this.dataForm.starTime = this.getLocalTime(
            this.timestamp - 86400 * 30 * 1000
          );
          this.dataForm.endTime = this.getLocalTime(this.timestamp);
        } else if (item.id == 4) {
          this.dataForm.starTime = this.getLocalTime(
            this.timestamp - 86400 * 90 * 1000
          );
          this.dataForm.endTime = this.getLocalTime(this.timestamp);
        }
        this.dataForm.textIndex = item.id;
      } else {
        this.dataForm.endTime = this.getLocalTime(this.timestamp);
        this.dataForm.starTime = this.getLocalTime(this.timestamp);
      }
      // console.log("this.dataForm :>> ", this.dataForm);
      this.$emit("timeBack", this.dataForm);
    },
    selectTime(data) {
      // console.log("this.dataForm :>> ", this.dataForm);
      this.$emit("timeBack", this.dataForm);
    }
  },

  created() {}
};
</script>

