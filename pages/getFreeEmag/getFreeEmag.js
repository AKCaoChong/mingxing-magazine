import { network } from "../../utils/network.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: [],
    naviHeight: app.globalData.navHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('======+++++++++=======')
    console.log(options);
    that.setData({
      avatarUrls: options.avatarUrls,
      bigImages: options.bigImages,
      nickNames: options.nickNames,
      emagtitles: options.emagtitles,
      remain: options.remain,
      id: options.id,
      buynum: options.buynum,
      nowid: options.nowid,
      sharecode: options.sharecode,
      type: options.type,
      token: options.token,
      bookcode: options.bookcode
    })
  },

  //邀请好友看
  inviteFriendLook: function (success, fail) {
    var that = this;
    const userInfoToken = that.data.token;
    var aid = that.data.id;
    var type = that.data.type;
    var sharecode = that.data.sharecode;
    network.emaginviteFriend({
      aid: aid,
      type: type,
      number: null,
      sharecode: sharecode,
      token: userInfoToken,
      success: function (res) {
        console.log(res);
        success(res.code);
        that.setData({
          bookcode: res.code
        })
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
  },
  /**
   * 返回首页
   */
  homeClick: function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  /**
   * 抢电子刊 nowid是id 文章id  id是aid 购买信息的id
   */
  getFreeEmagBtn: function(){
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    if (userInfoToken) {
      network.robEmagList({
        token: userInfoToken,
        aid: that.data.id,
        bookcode: that.data.bookcode,
        success: function (res) {
          app.globalData.robPeople = res.people;
          // app.globalData.robpeopleCreateTime = 
          wx.navigateTo({
            url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&emagtitles=' + that.data.emagtitles + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=恭喜你,领到了!' + '&btnTitle=1',
          })
        },
        failure: function (res) {
          app.globalData.robPeople = res.people;
          if (res.data.error_code == 60000) {//手慢没抢到
            console.log(res.data.error_code);
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=手太慢了，没领到。' + '&btnTitle=2'
            })
          } else if (res.data.error_code == 60001) {
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=' + '您已经领过啦!' + '&btnTitle=2'
            })
          } else if (res.data.error_code == 60002) {
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=' + '不能领取自己的电子刊哦!' + '&btnTitle=2'
            })
          } else if (res.data.error_code == 60005) {
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=' + '分享时间已过,不能领取了哦!' + '&btnTitle=2'
            })
          } else if (res.data.error_code == 40000) {
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=' + '这本刊已经被领取了哦!' + '&btnTitle=2'
            })
          }else if (res.data.error_code == 10001) {
            this.dialog.showDologin();
          } else {
            wx.navigateTo({
              url: '/pages/getFreeEmagRes/getFreeEmagRes?nickNames=' + that.data.nickNames + '&avatarUrls=' + that.data.avatarUrls + '&error_code=' + res.data.error_code + '&emagtitles=' + that.data.emagtitles + '&remain=' + that.data.remain + '&buynum=' + that.data.buynum + '&bigImages=' + that.data.bigImages + '&nowid=' + that.data.nowid + '&articalTitle=领失败了!' + '&btnTitle=2'
            })
          }
        }
      })
      
    } else {
      this.dialog.showDologin();
    }
  } 
})