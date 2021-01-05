const app = getApp();
var wxcodeimg = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isIosX: app.globalData.isiOSX,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxcodeimg = app.globalData.resquestApiUrl + 'public/img/qrimg/wxindexma.jpg';
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
    const userInfoToken = wx.getStorageSync('token');
    const userInfoheadImg = wx.getStorageSync('headImg');
    const userInfonickName = wx.getStorageSync('nickName');
    app.globalData.userInfo = {
      nickName: userInfonickName,
      headImg: userInfoheadImg,
      tokens: userInfoToken
    }
    console.log(userInfoToken);
    if (userInfoToken) {
      this.dialog.hideDologin();
    } else {
      this.dialog.showDologin();
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 返回上一页面
   */
  toClassifyPage: function(){
    wx.navigateBack({
      
    })
  },
  //生成分享海报函数
  makeShareEmag: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/makePlaybill/makePlaybill?bigUrl=' + app.globalData.shareIndexImg + '&erWeiMaUrl=' + wxcodeimg
    })
    that.closeSharePreview();
  },
  //分享给好友
  onShareAppMessage: function (ops) {
    return {
      title: '瑞丽明星电子刊',
      path: 'pages/index/index',
      imageUrl: app.globalData.shareIndexImg
    }
  },
  /**
   * 我购买的电子刊页
   */
  myGoToUrl: function (e) {
    console.log(e);
    var userInfoToken = wx.getStorageSync('token')
    if (userInfoToken) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      this.dialog.showDologin();
    }
  },
  //点“分享”按钮下滑分享图层
  closeSharePreview: function () {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      aniShare: animation.export()
    })
  },
  //点“分享”按钮出现分享图层
  previewShareBtn: function () {
    if (this.data.userInfo) {
      this.dialog.hideDologin();
      var animation = wx.createAnimation({
        duration: 200
      })
      animation.translateY("0%").step();
      this.setData({
        aniShare: animation.export()
      })
    } else {
      this.dialog.showDologin();
    }

  },

  animationBack: function (e) {
    this.closeSharePreview();
  },


  /**
   * 未登录提示
   */
  showDologin: function () {
    console.log("show do login");
    this.dialog.showDologin();
  },
  hideDologin: function () {
    console.log("hide do login");
    this.dialog.hideDologin();
  },
  confirmEvent: function () {
    this.dialog.hideDologin();
  },
  bindGetUserInfo: function (e) {
    //微信点击授权后 这里可以做一些登录操作
    app.wxlogin(e.detail.event);
  }
})