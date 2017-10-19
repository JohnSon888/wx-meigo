var api = require('../../utils/api.js')
Page({
  data: {
    text: "Page main",
    background: [
      {
        color: 'green',
        sort: 1
      },
      {
        color: 'red',
        sort: 2
      },
      {
        color: 'yellow',
        sort: 3
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    selectedMenuId: '1',
    currentMenuId: '0',
    rightSideW: '0',
    cateList: [],
    total: {
      count: 0,
      money: 0
    }
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id,
      currentMenuId: data.idx
    })
    // this.data.toView = 'red'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
    var res = wx.getSystemInfoSync()
    var rw = (res.screenWidth - 90) * 2 + 'rpx';
    console.log(res.screenWidth);
    console.log(rw);
    this.setData({
      rightSideW: rw
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