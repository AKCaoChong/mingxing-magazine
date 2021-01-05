var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webViewUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.webUrl)
    var nickname = encodeURIComponent(app.globalData.userInfo.nickName)
    // var webUrl = 'http://adsite3.rayli.com.cn/2020/38imctest/index.html?nickname=' + nickname + '&headimg=' + app.globalData.userInfo.headImg;
    // this.setData({
    //   webViewUrl: webUrl
    // })
     
    this.setData({
      webViewUrl: options.webUrl + "?h5HeadImage=" + options.h5HeadImage + "&h5WzId=" + options.h5WzId + "&nickname=" + nickname + "&headimg=" + app.globalData.userInfo.headImg
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    wx.pauseVoice()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.pauseVoice()
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
  }
})