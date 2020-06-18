// pages/searchAround/searchAround.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'FJMBZ-OS5CP-AH5D7-VTF23-XFI3E-MAFOC' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    place: "",
    markers: []
  },
  setTime: -1,
  handBindInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      clearTimeout(this.setTime)
      this.setTime = setTimeout(() => {
        this.setData({
          isFocus: false
        })
      }, 1000);
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.setTime)
    this.setTime = setTimeout(res => {
      const that=this;
      qqmapsdk.search({
        keyword: value, //搜索关键词
        // location:location , //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          console.log(res.data.pano);
          wx.getLocation({
            type: 'wgs84',
            success: (result) => {
              
              var mks = []
              for (var i = 0; i < res.data.length; i++) {
                let distance = that.getDistance(result.latitude, result.longitude, res.data[i].location.lat, res.data[i].location.lng);
                distance = distance.toFixed(0)
                mks.push({ // 获取返回结果，放到mks数组中
                  title: res.data[i].title,
                  id: res.data[i].id,
                  latitude: res.data[i].location.lat,
                  longitude: res.data[i].location.lng,
                  iconPath: "../../icons/easyicon.net.png", //图标路径
                  width: 20,
                  height: 20,
                  distance: distance
                })
              }
              that.setData({ //设置markers属性，将搜索结果显示在地图中
                markers: mks
              })
            }
          })
        }
      });
      // }
      // });
    }, 1000);
  },
  //计算距离，距离单位（m）
  getDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },
  clearSearchContent() {
    this.setData({
      case: [],
      isFocus: false,
      inputValue: ""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '搜索周边',
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