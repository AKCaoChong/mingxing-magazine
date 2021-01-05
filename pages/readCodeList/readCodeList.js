import { network } from "../../utils/network.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:["已激活","未激活"],
    activeCodes:[],
    isCopy: 'false',
    hasmore: true,
    currentPage: 1
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var res = wx.getSystemInfoSync();
    console.log(options)
    that.setData({
      windowHeight: res.windowHeight,
      isiOSX: app.globalData.isiOSX,
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
    that.loadCodeList(1);
  },

  //加载阅读码列表
  loadCodeList: function (page) {
    var that = this
    const userInfoToken = wx.getStorageSync('token');
    network.loadCodeList({
      token: userInfoToken,
      bookid: that.data.nowid,
      type: that.data.type,
      page: page.toString(),
      success: function (res, isCopy) {
        console.log('======iscopy=====')
        console.log(isCopy)
        let hasmore = true;
        if (!res || res.length == 0) {
          hasmore = false;
          that.setData({
            hasmore: hasmore,
            isCopy: false
          })
          wx.showToast({
            title: '没有数据',
            icon: 'none'
          })
         return
        }
        var oldList = that.data.activeCodes;
        var newList = [];
        if(!oldList || page === 1){
          console.log("------");
          console.log(res)
          newList = res;
        }else{
          console.log("new----");
          console.log(res);
          newList = oldList.concat(res);
        }
        that.setData({
          isCopy: isCopy,
          activeCodes: newList,
          currentPage: page,
          hasmore: hasmore
        })
      },
      failure: function (err) {
        if (err == '10001') {
          that.dialog.showDologin();
        }
        that.setData({
          hasmore: false,
          isCopy: false
        })
      }
    })
  },
  //邀请好友看
  inviteFriendLook: function (success, fail) {
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    var aid = that.data.id;
    var type = that.data.type;
    network.emaginviteFriend({
      aid: aid,
      type: type,
      number: null,
      sharecode: that.data.sharecode,
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
    this.doshare = this.selectComponent("#shareConfirm");
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
    var that=this;
    var page = parseInt(that.data.currentPage);
    that.loadCodeList(page+1);
  },
  /**
   * 点击了阅读码的分享
   */
  bindCodeShareBtnClick: function(event){
    console.log(event)
    var that = this;
    var codeStr = event.currentTarget.dataset.codestr;
    that.setData({
      sharecode: codeStr
    })
    that.showDologin();
    that.inviteFriendLook(
      function (res) {
        //上报分享成功
        const userInfoToken = wx.getStorageSync('token');
        network.shareCodeSuccess({
          code: res,
          type: 'yes',
          token: userInfoToken,
          success: function (result) {
            console.log('上报分享成功')
          },
          failure: function (err) {

          }
        })
      },
      function (err) {
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    )
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options);
    var that = this;
    if (options.from === 'button') {
      var codeStr = options.target.dataset.codestr;
      that.setData({
        sharecode: codeStr
      })
      // that.inviteFriendLook(
      //   function (res) {
      //     //上报分享成功
      //     const userInfoToken = wx.getStorageSync('token');
      //     network.shareCodeSuccess({
      //       code: res,
      //       type: 'yes',
      //       token: userInfoToken,
      //       success: function (result) {
      //         console.log('上报分享成功')
      //       },
      //       failure: function (err) {

      //       }
      //     })
      //   },
      //   function (err) {
      //     wx.showToast({
      //       title: '分享失败',
      //       icon: 'none'
      //     })
      //   }
      // )
      // wx.navigateTo({
      //   url: '/pages/getFreeEmag/getFreeEmag?remain=' + that.data.overnum + '&buynum=' + that.data.buynum + '&emagtitles=' + that.data.titlename + '&nickNames=' + that.data.nickName + '&avatarUrls=' + that.data.avatarUrls + '&id=' + that.data.id + '&nowid=' + that.data.nowid + '&bigImages=' + that.data.bigImages + '&sharecode=' + codeStr + '&type=' + that.data.type + '&token=' + that.data.tokens + '&bookcode=' + that.data.bookcode,
      // })
      return {
        title: that.data.nickName + '请你免费看' + '《' + that.data.titlename + '》',
        path: '/pages/getFreeEmag/getFreeEmag?remain=' + that.data.overnum + '&buynum=' + that.data.buynum + '&emagtitles=' + that.data.titlename + '&nickNames=' + that.data.nickName + '&avatarUrls=' + that.data.avatarUrls + '&id=' + that.data.id + '&nowid=' + that.data.nowid + '&bigImages=' + that.data.bigImages + '&sharecode=' + codeStr + '&type=' + that.data.type + '&token=' + that.data.tokens + '&bookcode=' + that.data.bookcode,
        imageUrl: that.data.bigImages,
        success: function (res) {

        },
        fail: function (res) {

        }
      }
      
    } else {
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
   * 展示分享提示框
   */
  showDologin: function () {
    console.log("show do login");
    this.doshare.showDologin();
  },
  hideDologin: function () {
    console.log("hide do login");
    this.doshare.hideDologin();
  },
  onConfirmEvent: function () {
    this.doshare.hideDologin();
  },
////////////////////////////
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
   * 再次复制
   */
  copyBtnClickAgain: function(event){
    var that = this;
    var codeStr = event.currentTarget.dataset.codestr;
    wx.setClipboardData({
      data: codeStr,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
  /**
   * 复制激活码
   */
  copyBtnClick: function(event){
    console.log(event)
    var that = this;
    var codeStr = event.currentTarget.dataset.codestr;
    that.setData({
      sharecode: codeStr
    })
    const userInfoToken = wx.getStorageSync('token');
    network.emagCodeCopy({
      token: userInfoToken,
      id: that.data.nowid,
      type: "only",
      code: codeStr,
      success: function (res) {
        console.log("单个复制")
        console.log(res)
        wx.setClipboardData({
          data: codeStr,
          success: function (res) {
            wx.showModal({
              title: '提示',
              content: '复制成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                } else if (res.cancel) {
                  console.log('取消')
                }
              }
            })
          }
        })
      },
      failure: function (err) {

      }
    })
    
  },
  /**
   * 批量复制
   */
  copyAllClick:function(event){
    var that = this;
    const userInfoToken = wx.getStorageSync('token');
    network.emagCodeCopy({
      token: userInfoToken,
      id: that.data.nowid,
      type:"many",
      code: null,
      success: function(copycode){
        console.log("批量复制")
        console.log(copycode)
        that.setData({
          sharecode: copycode
        })
        that.inviteFriendLook(
          function (rescode) {
            //上报分享成功
            console.log('rescode:========' + rescode)
            const userInfoToken = wx.getStorageSync('token');
            network.shareCodeSuccess({
              code: rescode,
              type: 'yes',
              token: userInfoToken,
              success: function (res) {
                console.log('上报分享成功')
              },
              failure: function (err) {

              }
            })
          },
          function (err) {
            wx.showToast({
              title: '分享失败',
              icon: 'none'
            })
          }
        )
        wx.setClipboardData({
          data: '',
          success: function (res) {
            wx.showModal({
              title: '提示',
              content: '复制成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                } else if (res.cancel) {
                  console.log('取消')
                }
              }
            })
          }
        })
      },
      failure: function(err){
        if(err == 60003){
          wx.showToast({
            title: '阅读码过多请联系客服',
            icon: 'none',
            duration: 3000
          })
        }else{
          wx.showToast({
            title: '批量复制出错,请联系客服',
            icon: 'none',
            duration: 3000
          })
        }
        
      }
    })
    
  }
  
})