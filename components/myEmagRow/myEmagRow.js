// components/myEmagRow/myEmagRow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    shareBtnClick: function(e){
      console.log("ddddd");
      console.log(e);
      var detail={
        buynum: e.currentTarget.dataset.buynum,
        overnum: e.currentTarget.dataset.overnum,
        nowid: e.currentTarget.dataset.nowid,
        bigImages: e.currentTarget.dataset.bigimages,
        typename: e.currentTarget.dataset.emagtypename,
        emagtitle: e.currentTarget.dataset.emagtitles,
        id: e.currentTarget.dataset.id,
        emagtype: e.currentTarget.dataset.emagtype
      };
      var option={};
      this.triggerEvent('onShareBtn',detail,option);
    },
    readCodeBtnClick: function(e){
      console.log("阅读码点击");
      console.log(e);
      var detail={
        buynum: e.currentTarget.dataset.buynum,
        overnum: e.currentTarget.dataset.overnum,
        nowid: e.currentTarget.dataset.nowid,
        bigImages: e.currentTarget.dataset.bigimages,
        typename: e.currentTarget.dataset.emagtypename,
        emagtitle: e.currentTarget.dataset.emagtitles,
        id: e.currentTarget.dataset.id,
        emagtype: e.currentTarget.dataset.emagtype
      };
      var option={};
      this.triggerEvent('onReadCode',detail,option);
    },
    onRowClick: function(e){
      var detail = {
        buynum: e.currentTarget.dataset.buynum,
        overnum: e.currentTarget.dataset.overnum,
        nowid: e.currentTarget.dataset.nowid,
        bigImages: e.currentTarget.dataset.bigimages,
        typename: e.currentTarget.dataset.emagtypename,
        emagtitle: e.currentTarget.dataset.emagtitles,
        id: e.currentTarget.dataset.id,
        emagtype: e.currentTarget.dataset.emagtype
      };
      var option = {};
      this.triggerEvent('onRowClick', detail, option);
    }
  }
})
