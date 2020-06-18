// pages/info/info.js
import WxValidate from "../../utils/WxValidate.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    userName:"",
    isFocus:false,
    form:{
      name1:"",
      phone:"",
      sex:"",
      email:"",
      birthDate:"",
      number1:""
    }
  },
  input(e){
    if (e.detail.value.trim()) {
      this.setData({
        isFocus:true,
        userName:e.detail.value
      })
    }
  },
  clear(){
    this.setData({
      userName:"",
      isFocus:false
    })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  formSubmit(e) {
    let userInfo = wx.getStorageSync("userInfo") || [];
    const params = e.detail.value
    console.log(params);
    
    // 校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    userInfo.nickName.replace(params.name1)
    this.showModal({
      msg: '提交成功'
    })
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    const {userName}=options;
    this.setData({
      userName,
      isFocus:true
    })
    this.setData({
      nbTitle: '基本信息',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
  },
  initValidate() {
    const rules = {
      name1: {
        required: true,
        rangelength: [2, 10]
      },
      phone: {
        required: true,
        tel: true,
      },
      sex: {
        required: true,
      },
      email:{
        required: true,
        email: true
      },
      birthDate: {
        required: true,
        dateISO: true
      },
      number1:{
        required: true,
        idcard: true
      }

    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name1: {
        required: '请输入姓名',
        name1: '姓名格式:请输入2~10个字符'
      },
      phone: {
        required: '请输入11位手机号码',
        phone: '请输入正确的手机号码',
      },
      sex: {
        required: '请选择性别'
      },
      email:{
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
      },
      birthDate: {
        required: '请输入出生日期',
        birthDate: '请输入有效的日期'
      },
      number1:{
        required: '请输入身份证号码',
        number1:"请输入正确的身份证号码"
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
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