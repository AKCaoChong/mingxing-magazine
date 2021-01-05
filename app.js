import { network } from "/utils/network.js";

App({
  onLaunch: function () {
    var that = this;
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log("menu button");
    console.log(menuButtonObject);
    wx.getSystemInfo({
      success: function(res) {
        console.log("system info");
        console.log(res);
        if (res.model.indexOf("iPhone X") > -1) {
          that.globalData.isiOSX = true;
          console.log('isiosX')
        } else {
          that.globalData.isiOSX = false;
        }
        that.globalData.menuButtonW = menuButtonObject.width;
        that.globalData.menuButtonY = menuButtonObject.top;
        that.globalData.menuButtonH = menuButtonObject.height;
        that.globalData.statusbarH = res.statusBarHeight;
        that.globalData.windowW = res.windowWidth;
        that.globalData.navTop = menuButtonObject.top;
        that.globalData.navHeight = res.statusBarHeight + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2 + 4;
        that.globalData.windowH = res.windowHeight - that.globalData.navHeight;
        that.globalData.tabbarH = res.screenHeight-res.windowHeight;
        if (res.platform == "ios") {
          that.globalData.isAndroid = false;
        } else {
          that.globalData.isAndroid = true;
        }
      },
    })
  },
  globalData: {
    resquestApiUrl: 'https://minibook.rayli.com.cn/',
    userInfo: {},
    isiOSX:false,
    isAndroid:false,
    shareIndexImg: ''
  },
  wxlogin: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权,请点击确定后换手机号码登录或重新允许授权',
        success: function (res) { }
      })
      return false;
    }
    wx.login({
      success: function (res) {
        console.log(res);
        var code = encodeURI(res.code);
        console.log(code);
        var encrypted = encodeURI(e.detail.encryptedData);
        var iv = encodeURI(e.detail.iv);
        network.getUserInfo({
          code: code,
          iv: iv,
          encryptedData: encrypted,
          success: function (res) {
            console.log(res);
            wx.setStorageSync('token', res.token);
            wx.setStorageSync('headImg', res.headImg);
            wx.setStorageSync('nickName', res.nickName);

            let userInfotoken = wx.getStorageSync('token');
            let userInfoheadImg = wx.getStorageSync('headImg');
            let userInfonickName = wx.getStorageSync('nickName');
            that.globalData.userInfo = {
              nickName: userInfonickName,
              headImg: userInfoheadImg,
              tokens: userInfotoken
            }
          },
          failure: function (err) {

          }
        })
      }
    })

  }
})