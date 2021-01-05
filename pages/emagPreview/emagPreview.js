import { network } from "../../utils/network.js";
//获取应用实例
const app = getApp();
var webUrl = '';
var h5HeadImage = '';
var h5WzId = '';
var dialog = {};
var choseBenshu = '';
var requestPayJson = {};
var erWeiMaUrl = '';
var readOrBuyBoolen = true;
var buyInputNums;
var typenameId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleTitle:'',
    lastIndex:0,
    selPrice:6,
    pricePrivew:{
      previews: [
        
      ]
    },
    naviHeight: app.globalData.navHeight,
    tabbarHeight: app.globalData.tabbarH,
    isAndroid: app.globalData.isAndroid,
    isBuy: false,
    swiperItems:{
      sliders:[]
    },
    ani:{},
    num:'1',
    customPrice:6,
    minusStatus:'disable',
    iosani:{},
    gmsm_ani:{},
    aniShare:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('======')
    var that = this;
    var arrPara;
    app.globalData.ewmReturnUrl = 'noUrl';
    app.globalData.ewmReturnwzId = '';
    console.log(app.globalData.userInfo.tokens)
    console.log('===++++++=====+++++1')
    console.log(app.globalData.ewmReturnwzId)
    
    if (options.scene) {
      console.log('===++++++=====+++++2')
      console.log(app.globalData.ewmReturnwzId)
      var scene = decodeURIComponent(options.scene);
      arrPara = scene.split("=");
      app.globalData.ewmReturnUrl = arrPara[1];
      app.globalData.ewmReturnwzId = arrPara[0];
    }

    var res = wx.getSystemInfoSync();
    var bottomH = 100;
    var iosXH = bottomH+34;
    console.log(options)
    console.log('===++++++=====+++++3')
    console.log(app.globalData.ewmReturnwzId)
    that.setData({
      windowHeight: res.windowHeight,
      bottomGroupHeight: app.globalData.isiOSX ? iosXH : bottomH,
      isiOSX: app.globalData.isiOSX,
      navH: app.globalData.navHeight
    })
    if (app.globalData.ewmReturnUrl != 'noUrl') {
      that.setData({
        ariticleId: app.globalData.ewmReturnwzId,
      })
    } else {
      that.setData({
        ariticleId: options.nowid ? options.nowid : '',
      })
    }
    console.log((res.windowHeight - app.globalData.navHeight - that.data.bottomGroupHeight));
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
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
      that.getArticleDetail();
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
    var that = this;
    return {
      title: that.data.title,
      imageUrl: that.data.swiperItems.sliders[0].imgurl
    }
  },
  /**
  * 左上角返回主页
  */
  backNavClick: function() {
    // wx.navigateBack({
      
    // })
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  /**
   * Swiper滑动事件
   */
  swiperChange: function() {
    
  },
  /**
   * 安卓购买
   */
  previewPayBtn:function() {
    var that = this;
    var shelf = that.data.shelf;
    if(shelf=='0'){
      wx.showToast({
        title: '此刊为免费刊不需购买',
        icon: 'none'
      })
      return;
    }
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("0%").step();
    this.setData({
      ani: animation.export()
    })
  },
  /**
   * 输入阅读码阅读
   */
  buyCodeClick: function() {

    // wx.navigateTo({
    //   url: '/pages/emagDetail/emagDetail?webUrl='+webUrl+'&h5HeadImage='+h5HeadImage+'&h5WzId='+h5WzId,
    // })
    // return;

    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("0%").step();
    this.setData({
      iosani: animation.export()
    })
  },
  /**
   * 关闭阅读码弹框
   */
  closeIosPaybtn: function () {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      iosani: animation.export()
    })
  },
  /**
   * 输入阅读码阅读
   */
  yuedumaconfirm: function(e) {
    var that = this;
    console.log(e);
    var readCode = e.detail.value.yuedumaNumber;
    var token = wx.getStorageSync("token");
    if (readCode != ''){
      network.activationCode({
        id: that.data.ariticleId,
        code: readCode,
        type: typenameId,
        token: token,
        success: function (res) {
          wx.showToast({
            title: '已激活',
            icon: "success"
          })
          that.setData({
            isBuy: true
          })
          that.closeIosPaybtn()
        },
        failure: function (err) {
          wx.showToast({
            title: err,
            icon: "none"
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入阅读码',
        icon: "none"
      })
    }
    

  },
  /**
   * 买过了 直接阅读
   */
  readClick: function(){
    // var webUrl = 'http://minibooktest.rayligirl.com/betty/20200325yr/11';
    wx.navigateTo({
      url: '/pages/emagDetail/emagDetail?webUrl='+webUrl+'&h5HeadImage='+h5HeadImage+'&h5WzId='+h5WzId,
    })
  },
  /**
   * 点击排行榜
   */
  paihangClick: function(e){
    wx.navigateTo({
      url: '/pages/buyRankList/buyRankList?id='+e.currentTarget.dataset.nowid,
    })
  },
  /**
   * 点击分享
   */
  shareClick: function(){
    var animation = wx.createAnimation({
      duration:200
    })
    animation.translateY("0%").step();
    this.setData({
      aniShare: animation.export()
    })
  },
  /**
   * 关闭分享
   */
  closeSharePreview: function () {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      aniShare: animation.export()
    })
  },
  /**
   * 生成分享海报
   */
  makeShareEmag: function(){
    var that=this;
    wx.navigateTo({
      url: '/pages/makePlaybill/makePlaybill?bigUrl=' + that.data.swiperItems.sliders[0].imgurl + '&erWeiMaUrl=' + erWeiMaUrl,
    })
    that.closeSharePreview();
  },
  /**
   * 转发给好友
   */
  shareFriendClick: function(){

  },
  /**template buyview */
  /**
   * 购买说明
   */
  gmsmClick: function() {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("0%").step();
    this.setData({
      gmsm_ani: animation.export()
    })
  },
  /**
   * 关闭购买说明
   */
  closePreview_gmsm: function() {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      gmsm_ani: animation.export()
    })
  },
  /**close buyview */
  closePreview: function() {
    var animation = wx.createAnimation({
      duration: 200
    })
    animation.translateY("100%").step();
    this.setData({
      ani: animation.export()
    })
  },
  /**
   * 选择档位
   */
  choseMoney: function(e) {
    console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.index;
    var pricePrivew = that.data.pricePrivew;
    var price = pricePrivew.previews[index].price;
    var num = pricePrivew.previews[index].num;
    var typeid = pricePrivew.previews[index].id;
    that.setData({
      num: num,
      pricePrivew: pricePrivew,
      selPrice: price,
      lastIndex: index,
      customPrice: price,
      typeId: typeid
    })
  },

  /**
   * 点击购买
   */
  androidBuy: function(e) {
    var that = this;
    wx.showToast({
      title: '正在申请支付',
      icon: 'loading',
      duration: 60000,
      mask: 'true'
    })
    var index = that.data.lastIndex;
    var pricePrivew = that.data.pricePrivew;
    var price = pricePrivew.previews[index].price;
    var num = pricePrivew.previews[index].num;
    var typeid = pricePrivew.previews[index].id;
    var customNum = that.data.num;
    var paramNum= null;
    var paramid = null;
    if(customNum != num){
      paramNum = customNum
    }else{
      paramid = typeid;
    }
    if(paramNum >3000){
      wx.showToast({
        title: '每次最多购买3000本哦!',
        icon:'none'
      })
      return
    }
    network.getWxPayParams({
      token: app.globalData.userInfo.tokens,
      id: that.data.ariticleId,
      typeid: paramid,
      number: paramNum,
      success: function(res){
        console.log(res);
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: function(res){
            wx.hideToast();
            that.closePreview()
            wx.showToast({
              title: '购买成功',
              icon: 'success'
            })
            that.setData({
              isBuy:true
            })
          },
          fail: function(res){
            wx.hideToast();
            wx.showToast({
              title: '失败,请重新支付',
              icon: 'none',
              duration: 2000,
              mask: true

            })
          },
          complete: function(res){

          }
        })
      },
      failure: function(err){
        console.log(err)
      }
    })
  },
  /**
   * 点击减号
   */
  bindMinus: function() {
    var that = this;
    var num = that.data.num;
    if(num>1){
      num--;
    }
    var minusStatus = num>1 ? 'normal':'disable';
    var price = 6;
    if (num > 10) {
      price = num * 6;
    } else {
      price = num * 6;
    }
    that.setData({
      num: num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },
  /**
   * 输入框事件
   */
  bindManual: function(e) {
    console.log(e);
    var that = this;
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    var price = 6;
    if (num>10){
      price=num*6;
    }else{
      price=num*6;
    }
    that.setData({
      num:num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },
  /**
   * 点击加号
   */
  bindPlus: function() {
    var that = this;
    var num = that.data.num;
    num++;
    var minusStatus = num > 1? 'normal' : 'disable';
    var price = 6;
    if (num > 10) {
      price = num * 6 ;
    } else {
      price = num * 6;
    }
    that.setData({
      num: num,
      minusStatus: minusStatus,
      customPrice: price.toFixed(2),
      selPrice: price.toFixed(2)
    })
  },
  
  /**
   * 加载文章详情
   */
  getArticleDetail: function() {
    console.log(' load article detail')
    var that = this;
    var ariticleId = that.data.ariticleId;
    var token = app.globalData.userInfo.tokens;
    console.log('network load detail')
    network.getArticleDetails({
      articleId: ariticleId,
      token: token,
      success: function(res){
        console.log(res);
        var sliders=res.items;
        h5WzId = res.id;
        webUrl = res.wapurl;
        erWeiMaUrl = res.wxcodeimg;
        typenameId = res.type;
        var shelf = Number(res.shelf);
        var owned = Number(res.owned);
        var isBuy = that.data.isBuy;
        if (shelf== 0 || owned == 1){ //shelf 0 不收费 1 收费
          isBuy = true;
        }else{
          isBuy = false;
        }
        // isBuy = true;
        var prices = res.price;
        wx.setNavigationBarTitle({
          title: res.title,
        })
        that.setData({
          articleTitle:res.title,
          swiperItems: {
            sliders: sliders
          },
          isBuy: isBuy,
          shelf: shelf,
          pricePrivew:{
            previews: prices
          }
        });
      },
      failure: function(err){
        if(err == '10001'){
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
    var that = this;
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
            that.getArticleDetail();
          },
          failure: function (err) {

          }
        })
      }
    })
  }
})