// pages/user/user.js

const util = require('../../utils/util.js');
const {
  getToday
} = require('../../utils/getToday.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    user: {},
    Grade: 0,
    integral: 0,
    Days: 0,
    time: ""
  },
  //签到
  Sign() {
    const day = wx.getStorageSync("time");
    var time = getToday();
    if (day !== time) {
      wx.setStorageSync("time", time);
      this.setData({
        time: time
      });
      this.bindSign()
    } else {
      wx.showToast({
        title: '一天只能签到一次',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true
      });

    }
  },
  //vip等级
  bindSign() {
    let day = ++this.data.Days
    let num = this.data.integral + day
    this.setData({
      integral: num,
      Days: day
    })
    let integral = this.data.integral;
    if (integral <= 100 & integral > 0) {
      this.setData({
        Grade: 1
      })

    }
    if (integral <= 200 & integral > 100) {
      this.setData({
        Grade: 2
      })

    }
    if (integral <= 300 & integral > 200) {
      this.setData({
        Grade: 3
      })

    }
    if (integral <= 400 & integral > 300) {
      this.setData({
        Grade: 4
      })

    }
    if (integral <= 500 & integral > 400) {
      this.setData({
        Grade: 5
      })

    }
    if (integral <= 600 & integral > 500) {
      this.setData({
        Grade: 6
      })
    }
    if (integral <= 700 & integral > 600) {
      this.setData({
        Grade: 7
      })

    }
    if (integral <= 800 & integral > 700) {
      this.setData({
        Grade: 8
      })

    }
    if (integral <= 900 & integral > 800) {
      this.setData({
        Grade: 9
      })

    }
    if (integral <= 1000 & integral > 900) {
      this.setData({
        Grade: 10
      })

    }
    if (integral > 1000) {
      this.setData({
        Grade: 10
      })

    }
    wx.setStorageSync("day", this.data.Days);
    wx.setStorageSync("integral", this.data.integral);
    wx.setStorageSync("Grade", this.data.Grade);
  },
  //获取用户信息
  handGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;

    this.setData({
      user: userInfo
    })
    wx.setStorage({
      key: 'userInfo',
      data: userInfo
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '个人信息',
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
    const Days = wx.getStorageSync("day", this.data.Days);
    const integral = wx.getStorageSync("integral", this.data.integral);
    const Grade = wx.getStorageSync("Grade", this.data.Grade);
    const user = wx.getStorageSync("userInfo");
    if (user !== "") {
      this.setData({
        user,
        Days,
        integral,
        Grade
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