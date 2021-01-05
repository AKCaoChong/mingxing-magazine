import {globalUrls} from "urls.js";
// var app=getApp();
const network = {
  //获取用户信息
  getUserInfo: function(params){
    var url = globalUrls.getUserSomeInfo;
    var code = params.code;
    var iv = params.iv;
    var encryptedData = params.encryptedData
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data:{
        "code": code,
        "iv": iv,
        "encryptedData": encryptedData
      },
      success: function(res){
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var itemDic = res.data;
          if (params && params.success) {
            params.success(itemDic);
          }
        }
      },
      fail:function(res){
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //首页轮播图推荐期刊
  getHomeRecommendBanner:function(params){
    // var token = params.token;
    var url = globalUrls.getHomeRecommendBanner;
    wx.request({
      url: url,
      method: 'GET',
      // header: {
      //   "token": token
      // },
      success: function (res) {
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          console.log(res.data);
          var items = res.data;
          if (params && params.success) {
            params.success(items);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //获取首页列表
  getArticleList:function(params){
    // var token = params.token;
    var url = globalUrls.homeArticleList(params.page);
    wx.request({
      url: url,
      method: 'GET',
      // header: {
      //   "token": token
      // },
      success: function(res){
        if(res.data.error_code){
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        }else{
          console.log(res.data);
          var items = res.data;
          if (params && params.success) {
            params.success(items);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //搜索电子刊
  searchArticle: function(params){
    var token = params.token;
    var word = params.word;
    var url = globalUrls.searchArticleUrl;
    wx.request({
      url: url,
      method: "POST",
      header: {
        "token": token
      },
      data: {
        "word": word,
      },
      success: function (res) {
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          console.log(res.data);
          var items = res.data;
          if (params && params.success) {
            params.success(items);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //获取preview详情
  getArticleDetails: function(params){
    var id = params.articleId;
    var token = params.token;
    var url = globalUrls.articleDetails;
    console.log('article detail param')
    console.log(url, token, id, )
    wx.request({
      url: url,
      header: {
        "token": token
      },
      method:'POST',
      data: {
        "id": id 
      },
      success: function(res){
        console.log('======res=======')
        console.log(res)
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function(err){
        console.log('======fail=======')
        console.log(err)
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //获取我购买的电子刊
  getOwenEmagLists: function(params){
    var token = params.token;
    var page = params.page;
    var token = params.token;
    var type = params.type;
    var url = globalUrls.owenEmagList;
    console.log(token,page,type,url)
    wx.request({
      url: url,
      header:{
        "token":token
      },
      method:"POST",
      data:{
        "page":page,
        "type":type
      },
      success: function(res){
        if(res.data.error_code){
          if(params && params.failure){
            params.failure(res.data.error_code);
          }
        }else{
          var result = res.data;
          if(params && params.success){
            params.success(result);
          }
        }
      },
      fail: function(err){
        if(params && params.failure){
          params.failure(err)
        }
      }
    })
  },

  //各刊最新一期列表
  getClassTypeArticleLists: function (params) {
    // var token = params.token;
    var type = params.hotType
    var classType = params.type;
    var page = params.page;
    var url = globalUrls.classTypeEmagListUrl(type, classType, page);
    console.log('=============',url)
    wx.request({
      url: url,
      method: 'get',
      // header: {
      //   "token": token
      // },
      
      success: function (res) {
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },

  //各刊最新一期列表
  getTypeArticleLists: function(params){
    // var token = params.token;
    var type = params.type;
    var page = params.page;
    var url = globalUrls.typeArticleList(type,page);
    wx.request({
      url: url,
      method: 'get',
      // header: {
      //   "token": token
      // },
      data:{
        "type":type,
        "page":page
      },
      success:function(res){
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err);
        }
      }
    })
  },
  //各刊首推的电子刊
  getTypeRecommendArticle: function(params){
    // var token = params.token;
    var type = params.type;
    var url = globalUrls.typeRecommendArticle(type);
    wx.request({
      url: url,
      method: 'get',
      // header: {
      //   "token": token
      // },
      success: function(res){
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //获取微信支付所需参数
  getWxPayParams: function(params){
    var token = params.token;
    var id = params.id;
    var typeid = params.typeid;
    var number = params.number;
    var url = globalUrls.getwxPayParams;
    console.log(url,id,typeid,number,token)
    wx.request({
      url: url,
      method: 'POST',
      header: {
        "token": token
      },
      data:{
        id:id,
        typeid:typeid,
        number: number
      },
      success: function(res){
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err)
        }
      }

    })
  },
  //获取排行榜
  getUserRankList: function(params){
    var id = params.articleId;
    // var token = params.token;
    var url = globalUrls.getRankList(id);
    wx.request({
      url: url,
      method: 'get',
      // header: {
      //   "token": token
      // },
      success: function (res) {
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //抢电子刊
  robEmagList: function(params){
    var aid = params.aid;//购买信息ID
    var bookcode = params.bookcode;//阅读码加密串
    var token = params.token;
    var url = globalUrls.robArticle;
    console.log("================================")
    console.log(url,bookcode,aid,token)
    wx.request({
      url: url,
      method: 'post',
      header:{
        'token':token
      },
      data:{
        'id': aid,
        'bookcode': bookcode
      },
      success: function(res){
        console.log("抢啦！！！！")
        console.log(res);
        if (res.data.isViliate == true) {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        } else {
          if (params && params.failure) {
            params.failure(res);
          }
        }
      },
      fail: function(res){
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //激活阅读码阅读
  activationCode: function(params){
    var token = params.token;
    var id = params.id;
    var code = params.code;
    var type = params.type;
    var url = globalUrls.activactionCode;
    wx.request({
      url: url,
      method:'post',
      header: {
        "token": token
      },
      data:{
        "id": id,
        "code": code,
        "type": type
      },
      success: function(res){
        if (res.data.activation == true) {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        } else {
          console.log(res.data.mesaage)
          if (params && params.failure) {
            params.failure(res.data.mesaage);
          }
        }
      },
      fail: function(err){
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })

  },
  //emagCountCanInviteUrl 获取每次能分享的最大数
  emagCountCanInvite: function(params){
    var token = params.token;
    var aid = params.aid;//购买信息ID
    var type = params.type;//期刊类型
    var url = globalUrls.emagCountCanInviteUrl(aid, type);
    wx.request({
      url: url,
      method: 'get',
      header: {
        "token": token
      },
      success: function (res) {
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //邀请好友看 emagInviteFriendUrl
  emaginviteFriend: function(params){
    var token = params.token;
    var aid = params.aid;//购买信息ID
    var type = params.type;//期刊类型
    var number = params.number;
    var sharecode = params.sharecode;
    var url = globalUrls.emagInviteFriendUrl;
    wx.request({
      url: url,
      method: 'post',
      header: {
        "token": token
      },
      data: {
        "id": aid,
        "type": type,
        "number": number,
        "sharecode": sharecode
      },
      success: function (res) {
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //分享成功后更改阅读码状态 emagShareSuccessUrl
  shareCodeSuccess: function(params){
    var token = params.token;
    var type = params.type;//分享成功传yes
    var code = params.code;
    var url = globalUrls.emagShareSuccessUrl;
    console.log(url,token,type,code)
    wx.request({
      url: url,
      method: 'post',
      header: {
        "token": token
      },
      data: {
        "type": type,
        "code": code
      },
      success: function (res) {
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //加载阅读码列表
  loadCodeList: function(params){
    var token = params.token;
    var bookid = params.bookid;//分享成功传yes
    var type = params.type;
    var page = params.page;
    var url = globalUrls.emagCodeListUrl;
    wx.request({
      url: url,
      method: 'post',
      header: {
        "token": token
      },
      data: {
        "page": page,
        "bookid": bookid,
        "type":type
      },
      success: function (res) {
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data.data;
          var isCopy = res.data.copy;
          if (params && params.success) {
            params.success(result,isCopy);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  },
  //批量复制阅读码 emagCodeCopyUrl
  emagCodeCopy: function(params){
    var token = params.token;
    var type = params.type;//only 一个 many 批量
    var code = params.code;//阅读码 批量复制的时候不传
    var id = params.id;
    var url = globalUrls.emagCodeCopyUrl;
    console.log(token,id,type,code,url)
    wx.request({
      url: url,
      method: 'post',
      header: {
        "token": token
      },
      data: {
        "type": type,
        "code": code,
        "id":id
      },
      success: function (res) {
        console.log(res);
        if (res.data.error_code) {
          if (params && params.failure) {
            params.failure(res.data.error_code);
          }
        } else {
          var result = res.data;
          if (params && params.success) {
            params.success(result);
          }
        }
      },
      fail: function (err) {
        if (params && params.failure) {
          params.failure(err)
        }
      }
    })
  }
}
export{network}