import { ModeType } from "./enum";
export default {
  //获取模式
  getMode() {
    let mode = null;
    switch (Number(window.getData.mode)) {
      case 1:
        mode = ModeType.BIAOZHU;
        break;
      case 2:
        mode = ModeType.ZHIJIAN;
        break;
      case 3:
        mode = ModeType.FANXIU;
        break;
      case 4:
        mode = ModeType.CHAKAN;
        break;
      case 5:
        mode = ModeType.YANSHOU;
        break;
    }
    return mode;
  },
  getTimeInfo(){
    let startTime = Number(window.getData.formData.preMarkResult.hdTimeStart);
    let endTime = Number(window.getData.formData.preMarkResult.hdTimeEnd)
    let timeInfo = {
      start:startTime,
      end:endTime
    }
    return timeInfo;
  },
  getUserInfo(){
    let userInfo = window.getData.formData.preMarkResult.userinfo;
    return userInfo;
  }

};
