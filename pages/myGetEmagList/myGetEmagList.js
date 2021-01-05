import { network } from "../../utils/network.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasmore: true,
    emags:[],
    needHidden: true,
    nodata: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.loadMyRotEmag(1);
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
    var that = this;
    that.loadMyRotEmag(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page;
    that.loadMyRotEmag(page+1);
    that.setData({
      needHidden: false
    })
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
   * 获取我抢到的杂志
   */
  loadMyRotEmag: function(page){
    var that = this;
    var token = wx.getStorageSync('token');
    network.getOwenEmagLists({
      type: "rot",
      page: page.toString(),
      token: token,
      success: function(res){
        console.log(res);
        var emags = res;
        var oldEmags = that.data.emags;
        var newEmags = [];
        if(!emags || emags.length == 0){
          that.setData({
            hasmore: false
          })
          if(page == 1){
            that.setData({
              nodata: true
            })
            wx.stopPullDownRefresh({
              complete: (res) => {},
            })
          }
          return;
        }
        if(page>1){
          newEmags = oldEmags.concat(emags);
        }else{
          newEmags = emags;
          wx.stopPullDownRefresh({
            complete: (res) => {},
          })
        }
        that.setData({
          emags: newEmags,
          page: page
        })
      },
      failure: function(res){
        that.setData({
          hasmore: false
        })
        if(page == 1){
          that.setData({
            nodata: true
          })
          wx.stopPullDownRefresh({
            complete: (res) => {},
          })
        }
        return;
      }

    })
  },
  /**
   * 去期刊预览页
   */
  toEmagPreview: function(event){
    wx.navigateTo({
      url: '/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo
    })
    console.log("to preview");
  }
})