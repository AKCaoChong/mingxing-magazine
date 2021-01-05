// components/dologin/dologin.js
Component({
  options: {
    mutipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //弹窗标题
    title: {
      type: String,
      value: '标题'
    },
    //弹窗内容
    content: {
      type: String,
      vlaue: '弹窗内容'
    },
    confirmText: {
      type: String,
      value: '确定'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐层弹窗
    hideDologin() {
      this.setData({
        isShow: false
      })
    },
    //展示弹窗
    showDologin() {
      this.setData({
        isShow: true
      })
    },
    //triggerEvent
    onConfirmEvent() {
      this.triggerEvent("onConfirmEvent");
    }
    // bindgetuserinfo(e) {
    //   this.triggerEvent("bindGetUserInfo", { event: e });
    // }
  }
})
