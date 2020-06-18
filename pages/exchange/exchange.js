// pages/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    userImage:"",
    Grade: 0,
    integral: 0,
    userName:"",
    goods:[],
    address:[]
  },
  receivingAddress(){
    let address=wx.getStorageSync("exchangeAddress")||[];
    wx.chooseAddress({
      success: (res)=>{
        this.setData({
          address:res
        })
        address.push(res)
        wx.setStorageSync("exchangeAddress", address);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Grade:options.Grade,
      userImage:options.userImage,
      integral:options.integral,
      userName:options.userName,

    })
    this.setData({
      nbTitle: '积分兑换',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
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
    const address=wx.getStorageSync("exchangeAddress")||[];
    const imgs=['../../icons/4-1F62G04516.jpg','../../icons/4-1F62G04516.jpg','../../icons/4-1F62G04516.jpg','../../icons/4-1F62G04516.jpg','../../icons/4-1F62G04516.jpg','../../icons/4-1F62G04516.jpg']
    this.setData({
      goods:imgs,
      address
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