// components/segment/segment.js
Component({
  options:{
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value:[]
    },
    defaultIndex:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes:{
    attached: function(){
      var that = this;
      that.setData({
        currentIndex: that.properties.defaultIndex
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemTapEvent: function(e){
      console.log(e)
      var index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("itemchanged",{
        currentIndex: index
      },{})
    }
  }
})
