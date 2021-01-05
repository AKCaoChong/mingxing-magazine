import {network} from "../../utils/network.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 开始搜索
  */
  onSearchInputEvent: function(event){
    var that = this;
    var value = event.detail.value;
    var token = app.globalData.userInfo.tokens;
    if(!value || value === ""){
      that.setData({
        subjects: null
      });
      return;
    }
    network.searchArticle({
      word: value,
      token: token,
      success: function(res){
        that.setData({
          subjects:res
        });
        console.log(res);
      },
      failure: function(err){
        console.log(err);
        if (err == '10001') {
          that.dialog.showDologin();
        }
      }
    })
    // that.setData({
    //   subjects:[
    //     {
    //       buynum:18678,
    //       id:194,
    //       thum_logo: "http://minibook.rayli.com.cn/public/img/article/2020-02-19/thumb_0_5e4cc8399027b.jpg",
    //       title: "李宏毅 对视",
    //       type: "3",
    //       typename: "服饰美容"
    //     }
    //   ]
    // })
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
   * 点击搜索出的某个刊
   */
  onItemTapEvent: function(event){
    wx.navigateTo({
      url: '/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo
    })
  }

})