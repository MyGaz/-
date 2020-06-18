// pages/search/search.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    case:[],
    isFocus:false,
    inputValue:""
  },
  setTime:-1,
  handBindInput(e){
    const {value}=e.detail;
    if (!value.trim()) {
      clearTimeout(this.setTime)
      this.setTime= setTimeout(() => {
        this.setData({
          case:[],
          isFocus:false
        })
      }, 1000);
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.setTime)
    this.setTime=setTimeout(() => {
      this.qSearch(value);       
    }, 1000);
  },
  qSearch(query){
    request({url:"",data:{query}}).then(res=>{
      this.setData({
        case:res.data.message
        
      })
    })
  },
  clearSearchContent(){
    this.setData({
      case:[],
      isFocus:false,
      inputValue:""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '搜索病例',
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