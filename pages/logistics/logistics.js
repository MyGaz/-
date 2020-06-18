// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab切换    
    currentTab: 0,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    goods:[],
    height:0
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '我的物流',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
   const goods= wx.getStorageSync("goods")||[];
   console.log(goods);
   
   this.setData({
    goods
   })
   console.log(this.data.goods);
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const goods= wx.getStorageSync("goods")||[];
    let num=0;
    goods.forEach(e => {
     num++
   });
   console.log(num);
   
   this.setData({
     height:num*60
   })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})