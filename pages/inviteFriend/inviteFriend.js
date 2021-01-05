import { network } from "../../utils/network.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emagType:"男人风尚",
    emagTitle: "杨洋和他的朋友们",
    emagCanNum: "50",
    inputNum: "1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      type: options.type,
      typename: options.typename,
      titlename: options.titlename,
      overnum: options.overnum,
      nowid: options.nowid,
      id: options.id,
      buynum: options.buynum,
      bigImages: options.bigImages,
      nickName: app.globalData.userInfo.nickName,
      avatarUrls: app.globalData.userInfo.headImg,
      tokens: app.globalData.userInfo.tokens
    })
    that.loadEmagCountCanShare();
  },
  /**
   * 获取可以分享的数量 每次的赠送本数做限制
   */
  loadEmagCountCanShare: function(){
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    var aid = that.data.id;
    var type = that.data.type;
    network.emagCountCanInvite({
      aid: aid,
      type: type,
      token: userInfoToken,
      success: function (res) {
        console.log(res);
        that.setData({
          emagCanNum: res.count
        })
      },
      failure: function (err) {

      }
    })
  },
  //邀请好友看
  inviteFriendLook: function(success,fail){
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    var aid = that.data.id;
    var type = that.data.type;
    network.emaginviteFriend({
      aid: aid,
      type: type,
      number:that.data.inputNum,
      sharecode: null,
      token: userInfoToken,
      success: function (res) {
        console.log(res);
        success(res.code);
      },
      failure: function (err) {
        fail(err);
      }
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

  toFreeEmag: function (options){
    console.log(options)
    var that = this
    wx.navigateTo({
      url: '/pages/getFreeEmag/getFreeEmag?remain=' + options.currentTarget.dataset.overnum + '&buynum=' + options.currentTarget.dataset.buynum + '&emagtitles=' + options.currentTarget.dataset.titlename + '&nickNames=' + that.data.nickName + '&avatarUrls=' + that.data.avatarUrls + '&id=' + options.currentTarget.dataset.id + '&nowid=' + options.currentTarget.dataset.nowid + '&bigImages=' + options.currentTarget.dataset.bigimages,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options);
    var that = this;
    if(options.from === 'button'){
      if (parseInt(that.data.inputNum) > that.data.emagCanNum) {
        var title = '每次最多赠送' + that.data.emagCanNum + '本'
        wx.showToast({
          title: title,
          icon: "none"
        })
        return;
      }
      that.inviteFriendLook({
        success: function(res){
          //上报分享成功
          const userInfoToken = wx.getStorageSync('token');
          network.shareCodeSuccess({
            code: res,
            type: 'yes',
            token: userInfoToken,
            success: function (res) {
              console.log('上报分享成功')
            },
            failure: function (err) {

            }
          })
          return {
            title: that.data.nickName + '请你免费看' + '《' + options.target.dataset.emagtitles + '》',
            path: '/pages/getFreeEmag/getFreeEmag?remain=' + options.target.dataset.overnum + '&buynum=' + options.target.dataset.buynum + '&emagtitles=' + options.target.dataset.titlename + '&nickNames=' + that.data.nickName + '&avatarUrls=' + that.data.avatarUrls + '&id=' + options.target.dataset.id + '&nowid=' + options.target.dataset.nowid + '&bigImages=' + options.target.dataset.bigImages + '&bookcode=' + res,
            imageUrl: options.target.dataset.bigimages,
            success: function (res) {
              
            },
            fail: function (err) {
              
            }
          }
        },
        fail: function(err){
          wx.showToast({
            title: '分享失败',
            icon: 'none'
          })
        }
      })
    }else{
      return {
        title: "瑞丽明星电子刊",
        path: "pages/index/index",
        imageUrl: app.globalData.shareIndexImg,
        success: function (res) {

        },
        fail: function (res) {

        }
      }
    }

  },


  /**
   * 开始输入
   */
  beginInput: function(e){
    var that = this;
    var title = '每次最多赠送' + that.data.emagCanNum + '本'
    that.setData({
      inputNum: e.detail.value
    })
    if (parseInt(e.detail.value) > that.data.emagCanNum) {
      wx.showToast({
        title: title,
        icon: "none"
      })
    }
  },
  /**
   * 输入完成
   */
  endInput: function(e){
    var that = this;
    that.setData({
      inputNum: e.detail.value
    })
    var title = '每次最多赠送' + that.data.emagCanNum + '本'
    if (parseInt(e.detail.value) > that.data.emagCanNum) {
      wx.showToast({
        title: title,
        icon: "none"
      })
    }
  }
})