import { network } from "../../utils/network.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emags:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOwenEmag(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '瑞丽明星电子刊',
      path: 'pages/index/index',
      imageUrl: app.globalData.shareIndexImg
    }
  },

  getOwenEmag: function(page){
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    network.getOwenEmagLists({
      page: page.toString(),
      token: userInfoToken,
      type:"buy",
      success: function(res){
        console.log(res)
        that.setData({
          emags: res
        })
      },
      failure: function(err){
        if (err == '10001') {
          that.dialog.showDologin();
        }
      }
    })
  },
  confirmEvent: function () {
    this.dialog.hideDologin();
  },
  bindGetUserInfo: function (e) {
    //微信点击授权后 这里可以做一些登录操作
    this.wxlogin(e.detail.event);
  },
  wxlogin: function (e) {
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
            app.globalData.userInfo = {
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
  },
  /**
   * 点击阅读码
   */
  readCodeClick: function(e){
    wx.navigateTo({
      url: '/pages/readCodeList/readCodeList?nowid=' + e.detail.nowid + '&id=' + e.detail.id + '&buynum=' + e.detail.buynum + '&bigImages=' + e.detail.bigImages + '&overnum=' + e.detail.overnum + '&type=' + e.detail.emagtype + '&typename=' + e.detail.typename + '&titlename=' + e.detail.emagtitle,
    })
  },
  /**
   * 点击整行
   */
  emagRowClick: function(event){
    console.log(event);
    wx.navigateTo({
      url: '/pages/emagPreview/emagPreview?nowid=' + event.detail.nowid + '&thumlogo=' + event.detail.bigImages
    })
  },
  /**
   * 分享按钮点击
   */
  shareBtnClick: function(e){
    console.log(e);
    //'/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo,
    wx.navigateTo({
      url: '/pages/inviteFriend/inviteFriend?nowid=' + e.detail.nowid + '&id=' + e.detail.id + '&buynum=' + e.detail.buynum + '&bigImages=' + e.detail.bigImages + '&overnum=' + e.detail.overnum + '&type=' + e.detail.emagtype + '&typename=' + e.detail.typename + '&titlename=' + e.detail.emagtitle,
    })
  },
  /**
   * goto我领到的杂志
   */
  toMyGetEmag: function() {
    wx.navigateTo({
      url: '/pages/myGetEmagList/myGetEmagList',
    })
  }
})