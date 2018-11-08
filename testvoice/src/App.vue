<template>
  <div id="app">
    <div id="waveformBox">
      <div id="waveform"></div>
    </div>
    <div class="wavebox">
      <div class="buttonList">
        <div class="buttonItem"  @click="playPause">
          <img src="./assets/playPause.png" alt="">
          <span class="playPause">播放/暂停</span>
        </div>
        <div class="buttonItem">
          <span class="waveYupu">波形/语谱</span>
        </div>
        <div class="buttonItem clearSelect" @click='clearReg'>
          <img src="./assets/clearSelect.png" alt="">
          <span class="clear">清除选中</span>
        </div>
      </div>
    </div>
    <div class="infoList">
            <div class="formLeft">
                <div class="row">
                    <div class="rowItem"></div>
                    <div class="rowItem">时长(s)</div>
                    <div class="rowItem">最小振幅</div>
                    <div class="rowItem">最大振幅</div>
                    <div class="rowItem">平均振幅</div>
                </div>
                <div class="row">
                    <div class="rowItem">前静音</div>
                    <div class="rowItem">{{frontNoise}}</div>
                    <div class="rowItem">30</div>
                    <div class="rowItem">50</div>
                    <div class="rowItem">40</div>
                </div>
                <div class="row">
                    <div class="rowItem">后静音</div>
                    <div class="rowItem">{{afterNoise}}</div>
                    <div class="rowItem">50</div>
                    <div class="rowItem">70</div>
                    <div class="rowItem">60</div>
                </div>
                <div class="row">
                    <div class="rowItem">有效声音段</div>
                    <div class="rowItem">{{effectiveVoice}}</div>
                    <div class="rowItem">500</div>
                    <div class="rowItem">700</div>
                    <div class="rowItem">600</div>
                </div>
                <div class="row">
                    <div class="rowItem">信噪比</div>
                    <div class="rowItem"></div>
                    <div class="rowItem"></div>
                    <div class="rowItem"></div>
                    <div class="rowItem">100</div>
                </div>
                
            </div>
            <div class="formRight">
                <div class="row">
                    <div class="rowItem">文件参数：</div>
                    <div class="rowItem">1600Hz · 16位 · 单声道</div>
                </div>
                <div class="row">
                    <div class="rowItem">有效区域：</div>
                    <div class="rowItem">【{{startTime}}，{{endTime}}】</div>
                </div>
                <div class="row">
                    <div class="rowItem">总时长：</div>
                    <div class="rowItem">{{duration}}s</div>
                </div>
                <div class="row">
                    <div class="rowItem">当前播放点：</div>
                    <div class="rowItem">{{currentTime}}s</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    <FormList></FormList>
  </div>
</template>

<script>
import FormList from "./components/formList.vue";
import Data from "@/utils/dt-core-lib";
import { mapActions } from "vuex";
import store from "@/store";
let timeInfo = Data.getTimeInfo();
export default {
  name: "app",
  data() {
    return {
      message: "helloworld",
      // videoSrc:  "http://cm-vod.homecdn.com/b0ef06c5caad4d37886b253d2bc4e8e5.acc",
      videoSrc: "http://crowdweb.blob.core.chinacloudapi.cn/101626/1.wav",
      wavesurfer: null,
      effectiveVoice: 0,
      frontNoise: 0,
      afterNoise: 0,
      duration: 0,
      regions: [],
      currentTime: 0,
      startTime:0,
      endTime:0
    };
  },
  components: {
    FormList
  },
  created(){
  },
  mounted() {
    
    this.wavesurfer = Object.create(WaveSurfer);
    this.wavesurfer.init({
      container: document.querySelector("#waveform"),
      waveColor: "purple",
      progressColor: "#000",
      height: 128,
      cursorColor: "#aaa",
      normalize: true,
      minPxPerSec: 50,
      skipLength: 1,
      scrollParent: true,
      hideScrollbar: true
    });
    this.wavesurfer.load(this.videoSrc);
    let that = this;
    this.wavesurfer.on("ready", () => {
      that.startTime = timeInfo.start;
      that.endTime = timeInfo.end;
      that.duration = this.wavesurfer.getDuration();
      that.afterNoise = that.duration - timeInfo.end;
      let regionObj = {
        start: timeInfo.start,
        end: timeInfo.end,
        data: null
      };
      that.regions.push(regionObj);
      if(regionObj.end>0){
        let region = that.wavesurfer.addRegion({
							start: regionObj.start,
							end: regionObj.end,
							color: 'rgba(0, 0, 255, 0.1)',
							drag: false,
							resize: false
            });
        that.regions.push(regionObj);
      }
    });
    let loop = false;
    let startTime = 0;
    let endTime = this.duration;

    //实现拖拽选中区域
    if (this.wavesurfer.enableDragSelection) {
      this.wavesurfer.enableDragSelection({
        color: "rgba(0, 0, 255, 0.1)",
        drag: false,
        resize: false,
        start: 0,
        end: 100
      });
    }
    let thisvue = this;
    this.wavesurfer.on("region-click", function(region, e) {
      e.stopPropagation();
      //标记开始循环播放
      loop = true;
      thisvue.wavesurfer.play(region.start);
    });
    //离开选择区域，重新播放
    this.wavesurfer.on("region-out", function(region, e) {
      //如果需要重新播放
      if (loop) {
        //先暂停一下，避免卡死吧。
        thisvue.wavesurfer.pause();
        //从指定位置进行播放
        thisvue.wavesurfer.play(region.start);
      }
    });
    this.wavesurfer.on("region-removed", this.saveRegions);
    this.wavesurfer.on("audioprocess", function() {
      thisvue.currentTime = thisvue.wavesurfer.getCurrentTime().toFixed(5);
    });

    this.frontNoise = timeInfo.start;
    this.effectiveVoice = timeInfo.end - timeInfo.start;
    // console.log(this);
    // console.log(Data.getMode());
    console.log(Data.getTimeInfo());
    // console.log(Data.getUserInfo());
  },
  created() {
    // console.log(this);
    // console.log(this.wavesurfer);
  },
  methods: {
    ...mapActions("storeList", ["changeNum"]),
    ...mapActions("duration", ["changeTime"]),
    myClick() {
      this.changeNum(666);
      // store.dispatch('storeList/changeNum','aaaa');
      this.message = "Nihao";
      console.log(this.message);
      console.log(store.state.storeList);
    },
    playPause() {
      this.wavesurfer.playPause();
    },
    saveRegions() {
      let thisVue = this;
      this.regions = Object.keys(this.wavesurfer.regions.list).map(function(
        id
      ) {
        let region = thisVue.wavesurfer.regions.list[id];
        return {
          start: region.start,
          end: region.end,
          data: region.data
        };
      });
    },
    clearReg() {
      this.wavesurfer.clearRegions();
    }
  }
};
</script>

<style>
html {
  height: 100%;
  background: rgba(40, 54, 74, 1);
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(40, 54, 74, 1);
  padding-top: 20px;
}
.buttonList {
  font-size: 0;
  text-align: center;
}
.buttonList .buttonItem {
  display: inline-block;
  width: 20%;
  font-size: 16px;
  text-align: center;
}
.buttonList .buttonItem img {
  width: 50px;
  display: block;
  margin: 0 auto;
}
.buttonList .buttonItem.clearSelect img {
  width: 30px;
}
#waveformBox {
  width: 95%;
  background: #fff;
  margin: 0 auto;
}
.wavebox {
  width: 95%;
  background: #fff;
  margin: 0 auto;
  padding-top: 10px;
}
.clear {
  clear: both;
}
.infoList {
  background: rgba(40, 54, 74, 1);
  color: #fff;
  padding: 10px 0;
}
.infoList .formLeft {
  float: left;
  width: 55%;
}
.infoList .formLeft .row {
  font-size: 0;
}
.infoList .formLeft .rowItem {
  display: inline-block;
  width: 20%;
  font-size: 16px;
  box-sizing: border-box;
  padding: 2px 5px;
}
.infoList .formLeft .rowItem:first-child {
  text-align: left;
  padding-left: 20px;
}
.infoList .formRight {
  float: right;
  width: 45%;
}
.infoList .formRight .row {
  font-size: 0;
}
.infoList .formRight .rowItem {
  display: inline-block;
  width: 50%;
  font-size: 16px;
  box-sizing: border-box;
  padding: 5px;
}
</style>
