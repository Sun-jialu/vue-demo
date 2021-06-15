<template>
  <!--  -->
  <div class="steps">
    <div class="stepsDiv1">
      <el-steps :active="active" align-center>
        <template id="stepdiv">
          <el-step
            id="stepId"
            v-for="(item, index) in stepArr"
            :key="index"
            :title="item.title"
          >
            <div id="abIcon">
              <i
                class="el-icon-right el-step__line-inner"
                style="transition-delay: 0ms; border-width: 0px; width: 0%"
              ></i>
            </div>
          </el-step>
        </template>
      </el-steps>
      <!-- <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->
    </div>
    <div class="stepsDiv2">
      <div class="steps" v-for="(item, index) in stepArr" :key="index">
        <div :class="[active >= index ? 'stepColor' : '', 'step']">
          <div :class="[active >= index ? 'stepColor1' : '', 'span']">
            {{ index + 1 }}
          </div>
          <span>{{ item.title }}</span>
        </div>
        <div
          v-if="item.show"
          :class="[active >= index ? 'stepColor' : '', 'stepIcon']"
        >
          <i class="el-icon-right"></i>
          <!-- <div class="dian">..</div> -->
        </div>
      </div>
    </div>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      stepArr: [
        {
          title: "步骤一",
          id: 1,
          show: true,
        },
        {
          title: "步骤二",
          id: 2,
          show: true,
        },
        {
          title: "步骤三",
          id: 3,
          show: true,
        },
        {
          title: "步骤四",
          id: 4,
          show: true,
        },
        {
          title: "步骤五",
          id: 5,
          show: false,
        },
      ],
    };
  },
  methods: {
    next() {
      if (++this.active > this.stepArr.length-1) this.active = 0;
    },
  },
};
</script>
<style scoped  lang="scss">
.steps {
  width: 100%;
  height: 100%;
  .stepsDiv {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 300px;
    border: 1px solid #ccc;
  }
  .stepsDiv2 {
    display: flex;
    margin-left: 50%;
    transform: translateX(-50%);
    border: 1px solid #eee;
    height: 100px;
    .steps {
      display: flex;
      margin-right: 15px;
      flex-direction: row;
      .step {
        width: 100px;
        height: 100px;
        text-align: center;
        display: flex;
        flex-direction: column;
        .span {
          background: #d8d8d8;
          width: 30px;
          height: 30px;
          line-height: 30px;
          margin-left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          color: #fff;
        }
        span {
          font-size: 14px;
          margin-top: 12px;
        }
      }
      .stepIcon {
        flex: 1;
        height: 30px;
        line-height: 30px;
        
        font-size: 20px;
        color: #d8d8d8;
        position: relative;
        .dian{
            position: absolute;
            left: -6px;
            top: -6px;
        }
      }
    }
  }
}
.stepColor {
  color: #1a2dff !important;
}
.stepColor1 {
  background: #2544ec !important;
  color: #fff;
}
</style>