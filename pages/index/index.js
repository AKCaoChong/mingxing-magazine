import {network} from "../../utils/network.js";
//获取应用实例
const app = getApp();
var lastScrollTop = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTagItem:"0",
    visibility:"hidden",
    opacity:"0",
    naviHeight: app.globalData.navHeight,
    naviSearchTop: app.globalData.menuButtonY,
    naviSearchWidth: app.globalData.windowW - 40 - app.globalData.menuButtonW,
    naviSearchHeight: app.globalData.menuButtonH,
    //当前选中的index
    swiperIndex: "0",
    tags:[
      {
        type: '0',
        typename: ' 全部 '
      }
    ],
    wenzhangliebiao:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    // var systemInfo = wx.getSystemInfoSync();
    var windowHeight = app.globalData.windowH;
    var windowWidth = app.globalData.windowW;
    var isIosX = app.globalData.isiOSX;
    var previousMargin = isIosX?50:50;
    var netxtMagin = isIosX?50:50;
    var height = isIosX?210:150;
    var customW = isIosX?100:100;
    console.log('======');
    console.log(height);
    var swiperH = windowHeight - height;
    var imgH = swiperH/1.1;
    var imgW = (windowWidth - customW)/1.1;
    that.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth,
      swiperH: swiperH,
      imgH: imgH,
      imgW: imgW,
      netxtMagin: netxtMagin,
      previousMargin: previousMargin
    });
    
    that.getHomeRecommendBanner();
    that.getArticles(1);
  },
  /**
   * 首页推荐轮播
   */
  getHomeRecommendBanner: function(){
    var that = this;
    // var token = app.globalData.userInfo.tokens;
    network.getHomeRecommendBanner({
      // token: token,
      success: function(recommends){
        console.log(recommends)
        if (!recommends) {
          wx.showToast({
            title: '暂无推荐数据',
          })
          return;
        }
        that.setData({
          recommends: recommends
        })
        app.globalData.shareIndexImg = that.data.recommends[0].logo;
      },
      failure: function(err){
        
      }
    })
  },
  /**
   * 列表
   */
  getArticles: function(page){
    var that = this;
    network.getArticleList({
      page: page.toString(),
      success: function (articleList) {
        if (!articleList.data){
          wx.showToast({
            title: '没有数据',
            icon: 'none',
            duration:2000
          })
          return;
        }
        wx.showToast({
          title: '加载完成',
          icon: 'success',
          mark: true,
          duration: 2000
        })
        var oldList = that.data.wenzhangliebiao;
        var newList = [];
        if(!oldList || page === 1){
          console.log("------");
          newList = articleList;
          var items = that.data.tags.concat(articleList.navigation);
          var tops = articleList.data;
          that.setData({
            wenzhangliebiao: tops,
            currentPage: page,
            tags: items
          });
        }else{
          console.log("new----");
          console.log(articleList);
          var tops = oldList.concat(articleList.data);
          that.setData({
            wenzhangliebiao: tops,
            currentPage: page
          });
        }
        wx.hideLoading();
      },
      failure: function (err){
        wx.hideLoading();
      }
    });
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
    if (userInfoToken){
      this.dialog.hideDologin();
    }else{
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
    var that=this;
    wx.showLoading({
      title: '加载中',
      mark: true
    })
    var page = parseInt(that.data.currentPage);
    that.getArticles(page+1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '瑞丽明星电子刊',
      path: '/pages/index/index',
      imageUrl: that.data.recommends[0].logo
    }
  },

  /**
   * 轮播图轮播
   */
  swiperChange: function (event) {
    this.setData({
      swiperIndex: event.detail.current,
    })
  },
  /**
   * 点击搜索
   */
  onSearchClick: function(event) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 导航栏搜索
   */
  searchClick:function(event) {
    console.log(event);
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   *点击去排行榜页 
   */
  toRankListClick: function(event){
    wx.navigateTo({
      url: '/pages/buyRankList/buyRankList?id=' + event.currentTarget.dataset.nowid,
    })
  },  
  /**
   * 页面滑动
   */
  onPageScroll(event) {
    var that = this;
    var searchY = that.data.swiperH + 170;
    let scrollTop = parseInt(event.scrollTop);
    if (scrollTop - lastScrollTop > 0) { //向上滑
      if (scrollTop > searchY) {
        that.setData({
          visibility: "visible",
          opacity: "1"
        })
      }
    } else if (scrollTop - lastScrollTop < 0) {//向下滑
      if (scrollTop < searchY) {
        that.setData({
          visibility: "hidden",
          opacity: "0"
        })
      }
    }
    lastScrollTop = scrollTop;
  },
  /**
   * 点击期刊类型进入对应的期刊类型页
   */
  itemTagClick: function(event){
    var that = this;
    let currentItemIndex = event.currentTarget.dataset.index;
    console.log(currentItemIndex)
    if (currentItemIndex == 0){
      return
    }
    that.setData({
      currentTagItem:currentItemIndex
    })
    //typeid 和 typename 
    wx.navigateTo({
      url: '/pages/classifyEmags/classifyEmags?typeid=' + event.currentTarget.dataset.typeid + '&typename=' + event.currentTarget.dataset.typename,
    })
  },
  /**
   * 到期刊的预览页
   */
  toEmagPreview: function (event) {
    console.log(event)
    const userInfoToken = wx.getStorageSync('token');
    const userInfoheadImg = wx.getStorageSync('headImg');
    const userInfonickName = wx.getStorageSync('nickName');
    if (userInfoToken) {
      this.dialog.hideDologin();
      app.globalData.userInfo = {
        nickName: userInfonickName,
        headImg: userInfoheadImg,
        tokens: userInfoToken
      }
      
      console.log('/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo)

      wx.navigateTo({
        url: '/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo
      })
    } else {
      this.dialog.showDologin();
      return;
    }
  },
  /**
   * 点击期刊进入详情页
   */
  onQiKanClick: function(event){
    const userInfoToken = wx.getStorageSync('token');
    const userInfoheadImg = wx.getStorageSync('headImg');
    const userInfonickName = wx.getStorageSync('nickName');
    if (userInfoToken) {
      this.dialog.hideDologin();
      app.globalData.userInfo = {
        nickName: userInfonickName,
        headImg: userInfoheadImg,
        tokens: userInfoToken
      }
      wx.navigateTo({
        url: '/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo
      })
    } else {
      this.dialog.showDologin();
      return;
    }
  },
  /**
   * 点击期刊类型进入类型详情页
   */
  onTypeClick: function(event){
    console.log(event);
    wx.navigateTo({
      url: '/pages/classifyEmags/classifyEmags?typeid='+event.currentTarget.dataset.typeid + '&typename=' + event.currentTarget.dataset.typename,
    })
  },
  /**
   * 未登录提示
   */
  showDologin: function(){
    console.log("show do login");
    this.dialog.showDologin();
  },
  hideDologin: function(){
    console.log("hide do login");
    this.dialog.hideDologin();
  },
  confirmEvent: function(){
    this.dialog.hideDologin();
  },
  bindGetUserInfo: function(e){
    //微信点击授权后 这里可以做一些登录操作
    this.wxlogin(e.detail.event);
  },
  wxlogin:function(e){
    if(e.detail.errMsg == 'getUserInfo:fail auth deny'){
      wx.showModal({
        title: '提示',
        content: '您已拒绝授权,请点击确定后换手机号码登录或重新允许授权',
        success: function(res){}
      })
      return false;
    }
    wx.login({
      success: function(res){
        console.log(res);
        var code = encodeURI(res.code);
        console.log(code);
        var encrypted=encodeURI(e.detail.encryptedData);
        var iv = encodeURI(e.detail.iv);
        // console.log('iv=%s,code=%s,encrypted=%s',iv,code,encrypted)
        network.getUserInfo({
          code: code,
          iv:iv,
          encryptedData: encrypted,
          success: function(res){
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
          failure: function(err){

          }
        })
      }
    })
  }
})

