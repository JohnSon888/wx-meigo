var api = require('../../utils/api.js')
Page({
  data: {
    text: "Page main",
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    scrollTop: 100,
    selectedMenuId: '1',
    currentMenuId: '0',
    toView: 'red',
    rightSideW: '0',
    cateList: [],
    menuListH: '0' // 列表高度
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    console.log(event);
    
    this.setData({
      selectedMenuId: data.id,
      currentMenuId: data.idx,
      toView: data.tag
    })
    
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
    var sys = wx.getSystemInfoSync()
    var rw = (sys.screenWidth - 90) * 2 + 'rpx';
    
    console.log(sys.screenWidth);

    console.log(sys.screenHeight);
    var menuListH = sys.screenHeight*2 + 'rpx';
    this.setData({
      rightSideW: rw,
      menuListH: menuListH
    })

    api.get('http://m.meigooo.com/category/getBoutiqueList')
      .then(res => {
        console.log(res)
        // 过滤商品
        this.setData({
          cateList: res.data.body
        });
      })    
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onScroll: function (e) {
    console.log(e)
  }
})