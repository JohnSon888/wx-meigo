var api = require('../../utils/api.js')
Page({
  data: {
    singlePinItem: [],
    widgets: [],
    currentMenuIdx: '0', //当前点击的索引
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
    api.get('http://m.meigooo.com/api/npages/200003')
      .then(res => {
        console.log(res)
        var resData = res.data.body;
        var singleItem = resData.widgets[8].contents.shift();
        // 过滤商品
        this.setData({
          singlePinItem: singleItem,
          widgets: resData.widgets
        });
      })    
  },
  handleMenuTap: function(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      currentMenuIdx: e.currentTarget.dataset.idx
    })
  }
})