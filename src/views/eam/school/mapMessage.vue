<template>
<div id="vm">
    <!--地图 -->
    <div id="map-box" v-show="mdMapShow">
        <div class="page-store-map">
            <!-- 1 搜索地点 -->
            <div class="search-place-box" style="margin-bottom:10px;">
                <el-row>
                    <el-col :span="8">
                        <el-input type="text" v-model="currentAddress"></el-input>
                   </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="searchAddress()" style="margin-left:5px;">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 3 地图显示 -->
        <div id="mapContainer" style="height: 300px; background-color: #ccc;"></div>
            
        </div>
    </div>
</div>
</template>
<script>
export default {
  computed: {

  },
  mounted(){

  },
   data(){
    return {
        city: '北京市',
        mdMapShow: true,
        markers: [],
        currentAddress: '', //搜索的地点
        currentLat: '',
        currentLong: '',
        positionList: [],
        activeId: '',
        searchKey: ''
        }
   },
   props:{
        quesData:{
          type:Object,
          default:()=>{
              return {
                positionX:'',
                 positionY:'', 
                 schoolAddress:''
              }
          }
      },
     },
   mounted() {
    this.getMyLocation()
    this.mapInit(); // 地图初始化
    this.searchAddress(this.searchKey);
    
},
methods: {
   getMyLocation() {
        var geolocation = new qq.maps.Geolocation("Y52BZ-EBIRP-77SDN-VAVII-WJ5Y2-35B45", "key");
        geolocation.getIpLocation(this.showPosition, this.showErr);
        //geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
    },
    showPosition(position) {
        console.log("position",position);
        // this.latitude = position.lat;
        // this.longitude = position.lng;
        this.city = position.city;
    },
    showErr() {
       // console.log("定位失败");
        this.getMyLocation();//定位失败再请求定位，测试使用
    },
    // 搜索地址
    searchAddress(searchKey) {
        // 设置搜索的范围、关键字等属性、页码、每页数量
        let keyword;
        if (searchKey) {
            this.currentAddress = searchKey;
        }
        keyword = this.currentAddress;
        if (keyword.trim() == '') {
            return;
        }

        let city = this.city;
        this.clearOverlays(this.markers);
        // 根据输入的城市设置搜索范围
        this.searchService.setLocation(city);
        // 根据输入的关键字在搜索范围内检索
        this.searchService.search(keyword);
    },
    mapInit() {
        let _this = this;
        // 初始地址
        // console.log(_this.quesData.positionX,_this.quesData.positionY)
        var center = new qq.maps.LatLng(_this.quesData.positionX,_this.quesData.positionY);
        _this.map = new qq.maps.Map(document.getElementById('mapContainer'), {
            center: center,
            zoom: 15,
            mapTypeControlOptions: {  //设置控件的地图类型为普通街道地图
                mapTypeIds: qq.maps.MapTypeId.ROADMAP
            }
        });
        var marker = new qq.maps.Marker({
            map: _this.map
        });
        marker.setPosition(center)
        //初始添加到提示窗
        // var info = new qq.maps.InfoWindow({
        //     map: _this.map
        // });
        // qq.maps.event.addListener(initMarker,"click",function(poi){
        //     console.log(poi)
        //     info.open();
        //     info.setContent('<div style="">' + '地址名称：' + _this.addressName + '<br/>地址：' + _this.address + '</div>');
        //     info.setPosition(center); 
        // });
        // 设置Poi检索服务，用于本地检索、周边检索
        _this.searchService = new qq.maps.SearchService({
            // 检索成功的回调函数
            complete: function (results) {
                // 设置回调函数参数
                var pois = results.detail.pois;
                var latlngBounds = new qq.maps.LatLngBounds();

                //添加到提示窗
                var infoWin = new qq.maps.InfoWindow({
                    map: _this.map
                });
                for (var i = 0, l = pois.length; i < l; i++) {
                    var poi = pois[i];
                    // 经纬度至少要4位小数
                    if (poi.latLng.lng.toString().split(".")[1].length < 4) {
                        //console.log(poi.latLng.lng.toString().split(".")[1].length);
                        poi.latLng.lng = poi.latLng.lng.toFixed(4);
                    }
                    if (poi.latLng.lat.toString().split(".")[1].length < 4) {
                        poi.latLng.lat = poi.latLng.lat.toFixed(4);
                    }

                    // 扩展边界范围，用来包含搜索到的Poi点
                    latlngBounds.extend(poi.latLng);

                    _this.currentLat = poi.latLng.lat;
                    _this.currentLong = poi.latLng.lng;

                    (function(i) {
                        marker = new qq.maps.Marker({
                            map: _this.map
                        });
                        marker.setPosition(pois[i].latLng);
                        new qq.maps.event.addListener(marker, 'click', function () {
                            // console.log(pois[i])
                            infoWin.open();
                            infoWin.setContent('<div style="">' + '地址名称：' + pois[i].name + '<br/>地址：' + pois[i].address + '</div>');
                            infoWin.setPosition(pois[i].latLng);
                            _this.quesData.positionX=pois[i].latLng.lat
                            _this.quesData.positionY=pois[i].latLng.lng
                            _this.quesData.schoolAddress= pois[i].address
                            console.log('坐标：(' + pois[i].latLng.lat + "," + pois[i].latLng.lng + ')')
                        });
                        _this.markers.push(marker);
                        _this.activeId = pois[i].id
                    })(i);
                    
                }
                // 调整地图视野
                _this.map.fitBounds(latlngBounds);
            },
            // 若服务请求失败，则运行以下函数
            error: function () {
                console.log('搜索不到结果');
            }
        });
        // 调用地址解析类
        _this.geocoder = new qq.maps.Geocoder({
            complete: function (result) {
                _this.clearOverlays(_this.markers);
                // 调整地图包含该点
                var latlngBounds = new qq.maps.LatLngBounds();
                latlngBounds.extend(result.detail.location);
                _this.map.fitBounds(latlngBounds);

                    marker = new qq.maps.Marker({
                    map: _this.map
                });
                marker.setPosition(result.detail.location);
                _this.markers.push(marker);
            }
        });
    },
    clearOverlays(overlays) { // 除地图上的marker
        var overlay;
        while ((overlay = overlays.pop())) {
            overlay.setMap(null);
        }
    },
    changeActiveId(id, latLng) {
        var _this = this;
        this.activeId = id;

        this.clearOverlays(this.markers);

        this.currentLat = latLng.lat;
        this.currentLong = latLng.lng;

        // 调整地图包含该点
        var latlngBounds = new qq.maps.LatLngBounds();
        latlngBounds.extend(latLng);
        this.map.fitBounds(latlngBounds);

        var marker = new qq.maps.Marker({
            map: _this.map
        });
        marker.setPosition(latLng);

        this.markers.push(marker);
    }

}
}
</script>
<style lang="scss">

</style>