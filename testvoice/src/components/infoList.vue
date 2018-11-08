<template>
    <div>
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
                    <div class="rowItem">【1.11223，2.34567】</div>
                </div>
                <div class="row">
                    <div class="rowItem">总时长：</div>
                    <div class="rowItem">{{duration}}</div>
                </div>
                <div class="row">
                    <div class="rowItem">当前播放点：</div>
                    <div class="rowItem">1.12345s</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import { ModeType } from "../utils/enum.js";
import Data from "../utils/dt-core-lib.js";
import store from "@/store";
let mode = Data.getMode();
let timeInfo = Data.getTimeInfo();
export default {
  data() {
    return {
        effectiveVoice:0,
        frontNoise:0,
        afterNoise:0,
        duration:0
    };
  },
  created() {
    
  },
  mounted(){
      
  }
};
</script>

<style scoped>
.clear{
    clear: both;
}
.infoList{
    background:rgba(40, 54, 74, 1);
    color: #fff;
    padding: 10px 0;
}
.infoList .formLeft{
    float: left;
    width: 55%;
}
.infoList .formLeft .row{
    font-size: 0;
}
.infoList .formLeft .rowItem{
    display: inline-block;
    width: 20%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 2px 5px;
}
.infoList .formLeft .rowItem:first-child{
    text-align: left;
    padding-left: 20px;
}
.infoList .formRight{
    float: right;
    width: 45%;
}
.infoList .formRight .row{
    font-size: 0;
}
.infoList .formRight .rowItem{
    display: inline-block;
    width: 50%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 5px;
}
</style>

