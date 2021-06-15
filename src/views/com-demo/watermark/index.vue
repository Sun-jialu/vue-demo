<template>
  <div class="m-">
    <canvas height="400" id="myCanvas" width="400"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  activated() {},
  created() {
    this.q();
  },
  methods: {
    q() {
      var img = new Image();
      img.setAttribute("crossorigin", "crossorigin"); // 这句代码是为了解决跨域问题，如果你的图片是自己的，没有跨域问题可以去掉
      img.src =
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg";
      img.onload = () => {
        // 准备canvas环境
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        // 先把图片绘制到canvas上
        ctx.drawImage(img, 0, 0, 400, 400);
        // 绘制水印到canvas上
        for (let i = 0; i < 20; i++) {
          ctx.rotate((-45 * Math.PI) / 180); // 水印初始偏转角度
          ctx.font = "20px microsoft yahei";
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillText(
            "恒宝股份     恒宝股份      恒宝股份     恒宝股份     恒宝股份      恒宝股份",
            -300,
            i * 100
          );
          ctx.rotate((45 * Math.PI) / 180); // 把水印偏转角度调整为原来的，不然他会一直转
        }
      };
    },
  },
};
</script>
<style lang='scss' scoped>
.elSelect {
  width: 80px;
  height: 28px;
  background: #0F3798;
  color: #3dadff;
  font-size: 14px;
  border: 1px solid #3DADFF;
  padding-left: 10px;
  .elOption {
    width: 80px;
    height: 28px;
    background: #0f3798;
    color: #3dadff;
  }
}
</style>