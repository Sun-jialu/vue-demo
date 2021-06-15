<template>
  <div
    class="amap-page-container"
    style="height: 400px; margin-bottom: 200px; background: #ccc"
  >
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      :plugin="plugin"
      :events="events"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker"
        :key="'marker' + index"
      ></el-amap-marker>
    </el-amap>
    <div class="toolbar" v-if="loaded">
      position: [{{ lng }}, {{ lat }}] address: {{ address }}
    </div>
    <div v-else>正在定位</div>
  </div>
</template>

<script>
import location from "./location.js";
// import AMap from 'AMap'
export default {
  data: function () {
    let self = this;
    return {
      markers: [
        [121.59996, 31.197646],
        [121.40018, 31.197622],
        [121.69991, 31.207649],
      ],
      searchOption: {
        city: "杭州",
        citylimit: false,
      },
      zoom: 12,
      loaded: false,
      center: null, // [121.59996, 31.197646],
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.address = result.formattedAddress;
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
      address: "",
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            console.log(`result`, result);
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        },
      },
      lng: 0,
      lat: 0,
      location: "",
    };
  },
  mounted() {
    // console.log(`555`, AMap);
    // this.center = [121.59996, 31.197646];
    // this.getLocation();
  },
  created() {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
  },
  methods: {
    // events: {
    //   init: (o) => {
    //     this.$nextTick(() => {
    //       // 获取当前城市的城市名
    //       let geocoder = new AMap.Geocoder({
    //         radius: 1000,
    //         extensions: "all",
    //       });
    //       geocoder.getAddress(
    //         [o.Ce.center.lng, o.Ce.center.lat],
    //         (status, result) => {
    //           if (status === "complete" && result.info === "OK") {
    //             if (result && result.regeocode) {
    //               this.city = result.regeocode.addressComponent.city;
    //             }
    //           }
    //         }
    //       );
    //     });
    //   },
    // },
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data);
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            //逆向地理编码
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    },
    addMarker: function () {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach((poi) => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let mapcenter = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length,
        };
        this.center = [mapcenter.lng, mapcenter.lat];
      }
    },
  },
  watch: {
    address: {
      handler: function (val, oldVal) {
        this.address = val;
        this.$emit("sendAddress", this.address);
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}

.amap-page-container {
  position: relative;
}
</style>