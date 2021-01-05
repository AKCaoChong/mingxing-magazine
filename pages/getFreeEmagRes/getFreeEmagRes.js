const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.navHeight,
    people: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      resultTitle: options.articalTitle,
      btnTitle: options.btnTitle=="2"?"去首页":"开始阅读",
      avatarUrls: options.avatarUrls,
      nickNames: options.nickNames,
      emagtitles: options.emagtitles,
      buynum: options.buynum,
      remain: options.remain,
      bigImages: options.bigImages,
      people: app.globalData.robPeople,
      id: options.id,
      nowid: options.nowid,
      btnTitleCode: options.btnTitle
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
  /**用户点击开始阅读 */
  resultBtnClick: function () {
    var that = this;
    var resCode = that.data.btnTitleCode;
    if(resCode == "2"){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }else{
      wx.navigateTo({
        url: '/pages/emagPreview/emagPreview?nowid=' + that.data.nowid + '&thumlogo=' + that.data.bigImages
      })
    }
  },
  /**
   * 返回首页
   */
  homeClick: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})