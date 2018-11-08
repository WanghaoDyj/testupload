<template>
    <div>
        <div class="formList">
            <div class="formLeft">
                <div class="row">
                    <span>是否有丢帧:</span>
                    <label v-for="(isLostItem,index) in isLose" :key="index">
                        <input type="radio" name="isLose">{{isLostItem.value}}
                    </label>
                    <!-- <mt-radio
                    title="是否有丢帧"
                    v-model="value"
                    :options="options" >
                    </mt-radio> -->
                </div>
                <div class="row">
                    <span>噪音类别:</span>
                    <label v-for="(voiceItem,index) in checkVoice" :key="index">
                        <input type="checkbox">{{voiceItem.value}}
                    </label>
                </div>
            </div>
            <div class="formRight">
                <div class="row">
                    <div class="row">
                        <div class="videoContent">语音内容：</div>
                        <div class="autoContent">
                            <span>自动识别内容：</span>
                            <span>你爱北京吗？</span>
                        </div>
                    </div>
                    <div class="row">
                        <textarea name="" id="" cols="50" rows="5" placeholder="你爱北京吗？"></textarea>
                        <div class="button">文字规范化</div>
                        <p class="contentDip">输入内容不符合预设规则，请核对！</p>
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
            <div class="crossImg" v-if="crossImgShow==true" @click="infoboxShow">
                <img src="../assets/upcross.png" alt="">
            </div>
            <div class="hideBox" v-if="crossImgShow!=true">
                <div class="hideList">
                    <img src="../assets/downcross.png" alt="" class="downCross" @click="infoboxHide">
                    <div class="hideItem">Mobile Type:{{MobileType}}</div>
                    <div class="hideItem">age:{{age}}</div>
                    <div class="hideItem">city:{{city}}</div>
                    <div class="hideItem">gps:{{gps}}</div>
                    <div class="hideItem">idcard:{{idcard}}</div>
                    <div class="hideItem">local_accent:{{local_accent}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Radio } from "mint-ui";
import Data from "@/utils/dt-core-lib";
export default {
  data() {
    return {
        name:'',
        age:'',
        idcard:'',
        local_accent:'',
        native_place:'',
        city:'',
        sex:'',
        version:'',
        MobileType:'',
        imei:'',
        gps:'',
        crossImgShow:true,
        isLose:[
            {
                value:'是'
            },
            {
                value:'否'
            }
        ],
        checkVoice:[
            {
                value:'空旷音'
            },
            {
                value:'持续噪音过大'
            },
            {
                value:'底噪过大'
            },
            {
                value:'异常音'
            }
        ]
    }
  },
  created(){
      let userInfo = Data.getUserInfo();
      console.log(userInfo);
      this.name = userInfo.name;
      this.age = userInfo.age;
      this.MobileType = userInfo.MobileType;
      this.city = userInfo.city;
      this.gps = userInfo.gps;
      this.idcard = userInfo.idcard;
      this.local_accent = userInfo.local_accent;
  },
  methods:{
        infoboxShow(){
            this.crossImgShow = false;
        },
        infoboxHide(){
            this.crossImgShow = true;
        }
    }
};
</script>
<style scoped>
#waveform wave{
    overflow-x: scroll
}
textarea{
    width: 75%;
}
.clear {
  clear: both;
}
.formList {
  background: rgba(40, 54, 74, 1);
  color: #fff;
  padding-top: 20px;
  border-top: 1px solid grey;
  padding-bottom: 80px;
  position: relative;
}
.crossImg{
    position: fixed;
    right: 10%;
    bottom: 10px;
    cursor: pointer;
}
.crossImg img{
    width: 25px;
}
.formList .formLeft {
  width: 55%;
  float: left;
  box-sizing: border-box;
  padding-left: 20px;
}
.formList .formLeft .row {
  font-size: 0;
  box-sizing: border-box;
  padding: 5px 5px;
  text-align: left;
}
.formList .formLeft .row span,
label {
  display: inline-block;
  font-size: 16px;
}
.formList .formRight {
  width: 45%;
  float: right;
}
.formList .formRight .row {
  font-size: 0;
  box-sizing: border-box;
  padding: 5px 5px;
  text-align: left;
}
.formList .formRight .row .autoContent,
.videoContent,
textarea,
.button,
.contentDip {
  font-size: 16px;
}
.formList .formRight .row .autoContent,
.videoContent {
  display: inline-block;
  width: 50%;
}
.formList .formRight .row textarea,
.button {
  display: inline-block;
  vertical-align: middle;
}
.button {
  padding: 10px 5px;
  background: #0099ff;
  color: #fff;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.contentDip {
  color: red;
  margin: 5px 0;
}
.hideBox{
    position: fixed;
    bottom: 0;
    left: 0;
    width:91%;
    background-color: #777b81;
    z-index: 10;
}
.hideList{
    position: relative;
}
.hideList .hideItem{
    display: inline-block;
    width: 33%;
    box-sizing: border-box;
    padding: 10px 0;
    text-align: left;
    padding-left: 35px;
}
.downCross{
    position: absolute;
    top: 5px;
    width: 25px;
    right: 1.1%;
    cursor: pointer;
    z-index: 20
}
</style>


