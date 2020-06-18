// pages/confirmExchange/confirmExchange.js
const {
  formatTime
} = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    good:"",
    userImage:"",
    integral:0,
    consume:0,
    address:[],
    confirmationInfo:"",
    userName:"",
    confirmAddress:""
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
  radio(e){
    this.setData({
      confirmAddress:e.currentTarget.dataset.address
    })
  },
  submit(){
    // if (this.data.integral-this.data.consume<0) {
    //   wx.showToast({
    //     title: '很遗憾，你的积分不足，感觉签到赚积分吧',
    //     icon: 'none',
    //     image: '',
    //     duration: 1500,
    //     mask: true
    //   });
    //   return false
    // }
    if (this.data.confirmAddress==="") {
      wx.showToast({
        title: '你还没有选择收货地址',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });
      return false
    }
    wx.showToast({
      title: '兑换成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
    });
    let time =formatTime(new Date()); 
    console.log(time);
    const goods= wx.getStorageSync("goods")||[];
    const data={good:this.data.good,time,address:this.data.confirmAddress,userImage:this.data.userImage,integral:this.data.integral,consume:this.data.consume}
    goods.push(data)
    wx.setStorageSync("goods", goods);
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '确认兑换',
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
    let pages =  getCurrentPages();
    let {options}=pages[pages.length-1];
    this.setData({
      good:options.good,
      userImage:options.userImage,
      integral:options.integral,
      consume:options.consume,
      userName:options.userName,
      address:address,
      confirmationInfo:options.confirmationInfo
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