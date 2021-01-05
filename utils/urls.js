var baseUrl = "https://minibook2.rayligirl.com/";
// var baseUrl = "https://minibook2.rayligirl.com";
// var baseUrl = "http://minibooktest.rayli.com.cn/";

const globalUrls={
  //用户信息
  getUserSomeInfo:baseUrl + "api/v1/token/user",
  //获取首页推荐轮播
  getHomeRecommendBanner: baseUrl + "api/v2/article/new",
  //首页刊列表
  homeArticleList:function(page){
    return baseUrl + "api/v2/article/list/"+page
  }, 
  //搜索电子刊
  searchArticleUrl: baseUrl + "api/v2/article/search",
  //刊详情
  articleDetails: baseUrl + "api/v2/article/details",
  //我的刊列表
  owenEmagList: baseUrl + "api/v1/user/owen",
  //各刊列表
  typeArticleList:function(type,page){
    return baseUrl + "api/v1/article/typelist/"+type+"/"+page
  },
  //各刊推荐文章
  typeRecommendArticle: function(type){
    return baseUrl + "api/v1/article/magazine/"+type
  },
  //获取微信支付的参数
  getwxPayParams: baseUrl + "api/v2/wxpay/pre_order",
  //刊的排行榜列表
  getRankList: function(articleId){
    return baseUrl + "api/v1/article/ranking/" + articleId;
  },
  //抢刊
  robArticle: baseUrl + "api/v2/article/rob",
  //激活阅读码
  activactionCode: baseUrl + "api/v1/article/activationcode",
  //邀请好友看 可分享数量
  emagCountCanInviteUrl: function(aid,type){
    return baseUrl + "api/v2/user/invitation/" + aid + '/' + type;
  },
  //邀请好友看
  emagInviteFriendUrl: baseUrl + "api/v2/user/invitationfrient",
  //上报分享成功
  emagShareSuccessUrl: baseUrl + "api/v2/user/sharecode",
  //阅读码列表
  emagCodeListUrl: baseUrl + "api/v2/user/codelist",
  //复制阅读码
  emagCodeCopyUrl: baseUrl + "api/v2/user/copycode",
  //获取各刊最新最热列表接口
  classTypeEmagListUrl: function (type,classType, page) {
    return baseUrl + "/api/v2/article/newhotlist/" + type + '/' + classType + '/' + page;
  }, 

}
export {globalUrls}