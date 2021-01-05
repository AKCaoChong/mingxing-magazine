import {network} from "../../utils/network.js";
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.navHeight,
    items:["最新","热销"],
    hasmore: true,
    currentPage: 1,
    isIosX: app.globalData.isiOSX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var typeid = options.typeid;
    that.loadNewstMagas('1',typeid,1)
    // that.loadClassifyMagas(typeid,1);
    that.loadTypeRecommendMaga(typeid);
    that.setData({
      navtitle: options.typename,
      typeid: options.typeid,
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
    var that=this;
    var page = parseInt(that.data.currentPage);
    if (that.data.currentIndex == 0){
      that.loadNewstMagas('1', this.data.typeid, page+1)
    }else{
      this.loadHotestMagas('0', this.data.typeid, page+1)
    }
    // that.loadClassifyMagas(that.data.typeid,page+1);
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
  //加载最热的刊
  //getClassTypeArticleLists
  loadHotestMagas: function(hotType,type,page){
    var that = this;
    network.getClassTypeArticleLists({
      hotType: hotType.toString(),
      type: type.toString(),
      page: page.toString(),
      success: function (articleList) {
        console.log(articleList);
        let hasmore = true;
        if (articleList.length == 0) {
          hasmore = false
          that.setData({
            currentPage: page,
            hasmore: hasmore
          })
          return;
        }
        var oldList = that.data.wenzhangliebiao;
        var newList = [];
        if (!oldList || page === 1) {
          console.log("------");
          newList = articleList;
        } else {
          console.log("new----");
          console.log(articleList);
          newList = oldList.concat(articleList);
        }
        that.setData({
          hotestwenzhangliebiao: newList,
          currentPage: page,
          hasmore: hasmore
        })
      },
      failure: function (err) {
        that.setData({
          hasmore: false
        })
      }
    })
  },
  //加载最新的刊
  loadNewstMagas: function(newsType, type, page){
    var that = this;
    network.getClassTypeArticleLists({
      hotType: newsType.toString(),
      type: type.toString(),
      page: page.toString(),
      success: function (articleList) {
        console.log(articleList);
        let hasmore = true;
        if (articleList.length == 0) {
          hasmore = false
          that.setData({
            currentPage: page,
            hasmore: hasmore
          })
          return;
        }
        var oldList = that.data.wenzhangliebiao;
        var newList = [];
        if (!oldList || page === 1) {
          console.log("------");
          newList = articleList;
        } else {
          console.log("new----");
          console.log(articleList);
          newList = oldList.concat(articleList);
        }
        that.setData({
          newestwenzhangliebiao: newList,
          currentPage: page,
          hasmore: hasmore
        })
      },
      failure: function (err) {
        that.setData({
          hasmore: false
        })
      }
    })
  },

  /**
   * 加载不同分类下的电子刊
   */
  loadClassifyMagas: function(type,page){
    var that = this;

    network.getTypeArticleLists({
      type: type.toString(),
      page: page.toString(),
      success: function (articleList){
        console.log(articleList);
        let hasmore = true;
        if (articleList.length == 0){
          hasmore = false
          that.setData({
            currentPage: page,
            hasmore: hasmore
          })
          return;
        }
        var oldList = that.data.wenzhangliebiao;
        var newList = [];
        if(!oldList || page === 1){
          console.log("------");
          newList = articleList;
        }else{
          console.log("new----");
          console.log(articleList);
          newList = oldList.concat(articleList);
        }
        that.setData({
          wenzhangliebiao: newList,
          currentPage: page,
          hasmore: hasmore
        })
      },
      failure: function(err){
        that.setData({
          hasmore: false
        })
      }
    })
  },
  /**
   * 各刊首推的电子刊
   */
  loadTypeRecommendMaga: function(type){
    var that = this;
    network.getTypeRecommendArticle({
      type: type.toString(),
      success: function(res){
        console.log(res);
        that.setData({
          newstEmg: res.new,
          fans: res.people
        })
      },
      failure: function(err){

      }
    })
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
   * 去排行榜页
   */
  toRankList: function(event){
    wx.navigateTo({
      url: '/pages/buyRankList/buyRankList?id=' + event.currentTarget.dataset.nowid,
    })
  },
  /**
   * 到期刊的预览页
   */
  toEmagPreview: function (event) {
    wx.navigateTo({
      url: '/pages/emagPreview/emagPreview?nowid=' + event.currentTarget.dataset.kanid + '&thumlogo=' + event.currentTarget.dataset.thumlogo,
    })
  },
  /**
   * 切换最新最热导航
   */
  onPageChangedEvent: function(e){
    var currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex: currentIndex
    })
    console.log(currentIndex)
    if (currentIndex == 1 && !this.data.hotestwenzhangliebiao){
      this.loadHotestMagas('0',this.data.typeid,1)
    }else if (currentIndex == 0 && !this.data.newestwenzhangliebiao){
      this.loadNewstMagas('1', this.data.typeid, 1)
    }
  },
  typeclick: function(){
    console.log("type click");
  },
  goToMy: function(){
    console.log('我得')
    wx.navigateTo({
      url: '/pages/classifyMine/classifyMine',
    })
  }
  
})