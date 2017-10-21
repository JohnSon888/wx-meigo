var api = require('../../utils/api.js')
Page({
  data: {
    singlePinItem: [],
    widgets: [],
    subWidgets: [],
    currentMenuIdx: '0', //当前点击的索引
    currentId: '0', //当前列表的索引
    isShow: false,
    isLinkShow: false,
    imgW: '0', //商品列表图的宽度
    blockImgH: '0',//商品块状图高度
    subWidgetsList: [], // 每个栏目的商品列表
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function() {
    var screenW = wx.getSystemInfoSync().screenWidth;
    api.get('http://m.meigooo.com/api/npages/200003')
      .then(res => {
        console.log(res)
        var resData = res.data.body;
        var singleItem = resData.widgets[8].contents.shift();
        var imgW = (screenW - 3) + 'rpx'; 
        // 过滤商品
        this.setData({
          isShow: true,
          singlePinItem: singleItem,
          widgets: resData.widgets,
          imgW: imgW
        });
      }) 
  },
  handleMenuTap: function(e) {
    var contentId = e.currentTarget.dataset.target;
    // 屏幕宽度
    var screenW = wx.getSystemInfoSync().screenWidth;
    this.setData({
      currentMenuIdx: e.currentTarget.dataset.idx,
      currentId: e.currentTarget.dataset.idx
    })
    if (contentId){
      api.get('http://m.meigooo.com/api/npages/' + contentId)
        .then(res => {
          console.log(res)
          var resData = res.data.body;
          var subWidgetsList = [];
          for (var i in resData.widgets) {
            if (resData.widgets[i].widgetType == '31') {
              subWidgetsList = resData.widgets[i];
            }
          }
          // 过滤商品
          this.setData({
            subWidgets: resData.widgets,
            blockImgH: screenW / 2 + 'rpx',
            isLinkShow: true,
            subWidgetsList: subWidgetsList

          });
        }) 
    }
  }
})