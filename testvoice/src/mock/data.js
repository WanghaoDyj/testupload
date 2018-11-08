if (process.env.NODE_ENV === "development") {
  window.getData = {
    'mode': 1, //1：标注；2：质检(可修改)； 3：返修  4：查看；5：验收 0：预留
    formData: {
      //表单业务数据定义，可进行扩展定义 ［标注平台的配置项］
      preMarkResult: {
        hdTimeEnd: 4.13,
        hdTimeStart: 1.26,
        Content: "Is Doste Marang Mana on any movie soundtracks?",
        userinfo: {
          name: "Sejal",
          age: "22",
          idcard: "681924506810", //不展示
          local_accent: "Hindi",
          native_place: "Mumbai",
          city: "Mumbai",
          sex: "Female",
          version: "2.7",
          MobileType: "Moto G (5S) Plus",
          imei: "351893081543079",
          gps: "72.83988,18.99951" //不展示
        }
      }
    },
    markResult: {} //质检场景和验收下需要由标注平台将同一模版标注中存下来的数据交给模版初始化，具体见下述使用过程描述
  };
}
