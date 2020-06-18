// pages/case/case.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   images:[],
   width:-1,
   cases:[],
   judge:false,
   nbFrontColor: '#000000',
   nbBackgroundColor: '#ffffff'
  },
  ChooseImage(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
         images:[...this.data.images,...result.tempFilePaths],
         judge:true
        })
        wx.setStorage({
          key: 'images',
          data: this.data.images
        });
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  preview(e){
    const urls =this.data.images;
    const current =e.currentTarget.dataset.src; 
    wx.previewImage({
      current,
      urls
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '病例好医生',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000'
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
    const images= wx.getStorageSync("images");
    const cases= wx.getStorageSync("case");
    if (images||cases) {
      this.setData({
        images,
        cases,
        judge:true
      })
    }else{
      this.setData({
        images:[],
        cases:[],
        judge:false
      })
    }
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