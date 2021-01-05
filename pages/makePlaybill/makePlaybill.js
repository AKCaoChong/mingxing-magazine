var app = getApp();
var shareimg = '';
var ermImgUrl = [];
var ermimgurlTemp1 = '';
var ermimgurlTemp2 = '';
var makedImgWidth;
var makedImgHeight;
Page({
  data: {
    shareimgurl: '',
    saveImagebtn: false,
    canvasWidth: '',
    canvasHeight: '',
    isIosX: app.globalData.isiOSX
  },
  saveImageToPhotos: function () {
    var that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调
              that.saveImageToPhotosQQQ();
            },
            fail() { //这里是用户拒绝授权后的回调
              that.setData({
                saveImagebtn: true
              })
            }
          })
        } else { //用户已经授权过了
          that.saveImageToPhotosQQQ();
        }
      }
    })
  },
  saveImageToShouquan: function (e) {
    let that = this;
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      that.setData({
        saveImagebtn: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      that.setData({
        saveImagebtn: false
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '正在生成海报..',
      icon: 'loading',
      mask: true,
      duration: 60000
    })
    ermImgUrl = [];
    ermimgurlTemp1 = '';
    ermimgurlTemp2 = '';
    shareimg = options.bigUrl;
    ermImgUrl = [options.bigUrl, options.erWeiMaUrl];
    var ermImgfirst = String(ermImgUrl[0]);
    if (ermImgfirst.indexOf("https://") < 0) {
      ermImgfirst = ermImgfirst.replace('http', 'https');
    }
    var ermImgsec = String(ermImgUrl[1]);
    if (ermImgsec.indexOf("https://") < 0) {
      ermImgsec = ermImgsec.replace('http', 'https');
    }


    wx.getImageInfo({
      src: ermImgfirst,
      success: function (res) {
        console.log(res)
        let tm1 = res.path;
        let imgW = res.width;
        let imgH = res.height;
        wx.getImageInfo({
          src: ermImgsec,
          success: function (res) {
            let tm2 = res.path;
            let ewmimgW = res.width;
            let ewmimgH = res.height;
            that.drawImages(tm1, tm2, imgW, imgH, ewmimgW, ewmimgH);
          },
          fail: function (res) { }
        })
      },
      fail: function (res) { }
    })

  },

  drawImages: function (tm1, tm2, imgW, imgH, ewmimgW, ewmimgH) {
    var that = this;
    var toutuWidth = app.globalData.windowW * 0.95;
    var toutuHeight = toutuWidth * imgH / imgW;
    var ermtuWidth = ewmimgW * .3;
    var ermtuHeight = ewmimgH * .3;
    var canvasAllWidth = app.globalData.windowW;
    var canvasAllHeight = toutuHeight + ermtuHeight + canvasAllWidth - toutuWidth + 20;
    that.setData({
      canvasWidth: canvasAllWidth,
      canvasHeight: canvasAllHeight,
    })

    var ctx = wx.createCanvasContext('canvas');
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, canvasAllWidth, canvasAllHeight);
    ctx.drawImage(tm1, 0, 0, imgW, imgH, (canvasAllWidth - toutuWidth) / 2, (canvasAllWidth - toutuWidth) / 2, toutuWidth, toutuHeight);
    ctx.drawImage(tm2, 50, toutuHeight + 20, ermtuWidth, ermtuHeight);
    ctx.setFillStyle('black');
    ctx.font = 'bold 14px Arial'
    ctx.fillText('长按识别小程序码', ermtuWidth + 70, toutuHeight + ermtuHeight / 2 + 18)
    ctx.fillText('看瑞丽明星电子刊', ermtuWidth + 70, toutuHeight + 32 + ermtuHeight / 2)
    ctx.draw();

    makedImgWidth = canvasAllWidth;
    makedImgHeight = canvasAllHeight;
    setTimeout(function () {
      that.shareimgUlr();
    }, 1000)
  },

  shareimgUlr() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: makedImgWidth,
      height: makedImgHeight,
      fileType: 'jpg',
      canvasId: 'canvas',
      success: function (res) {
        that.setData({
          shareimgurl: res.tempFilePath
        });
        wx.hideToast();
      },
      fail: function (res) {
        return
      }
    })
  },


  saveImageToPhotosQQQ() {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareimgurl,
      success(res) {
        wx.showToast({
          title: '保存成功',
          mask: true,
          duration: 1000
        })
      }
    })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '瑞丽明星电子刊',
      path: 'pages/index/index',
      imageUrl: that.data.shareimgurl
    }
  }
})