// pages/periphery/periphery.js
import {
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/address.js";
import {
  request
} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    address: {},
    IsHidden: false,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['不想动科', '睡科', '懒科', '玩科'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    show1: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1: ['1', '2', '3', '4', '5', '6'], //下拉列表的数据
    index1: 0, //选择的下拉列表下标
    chooseAddress: [],
    fromLng:"",
    fromLat:"",
    latitude:0,
    longitude:0
  },
  //调用微信位置接口搜索周边
  // onChangeAddress() {
  //   let maps = wx.getStorageSync("map") || [];
  //   let address="";
  //   wx.chooseLocation({
  //     success:(res)=>{
  //       const that=this;
  //       address=res;
  //       that.setData({
  //         chooseAddress: res
  //       })
  //       wx.getLocation({
  //         success:ress=> {
  //           let distance= this.getDistance(ress.latitude,ress.longitude,res.latitude,res.longitude);
  //           distance=distance.toFixed(0)
  //           maps.push({address,distance})
  //           wx.setStorageSync("map", maps);
  //           this.onShow();
  //         }
  //       })  
  //     }
  //   });
  // },
  //计算距离，距离单位（m）
  // getDistance(lat1, lng1, lat2, lng2) {
  //   lat1 = lat1 || 0;
  //   lng1 = lng1 || 0;
  //   lat2 = lat2 || 0;
  //   lng2 = lng2 || 0;
   
  //   var rad1 = lat1 * Math.PI / 180.0;
  //   var rad2 = lat2 * Math.PI / 180.0;
  //   var a = rad1 - rad2;
  //   var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
   
  //   var r = 6378137;
  //   return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  // },
  //计算距离，距离单位（km/公里）
// distance(la1, lo1, la2, lo2) {
//   var La1 = la1 * Math.PI / 180.0;
//   var La2 = la2 * Math.PI / 180.0;
//   var La3 = La1 - La2;
//   var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
//   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
//   s = s * 6378.137;//地球半径
//   s = Math.round(s * 10000) / 10000;
//   console.log("计算结果",s);
//   return s;
//   },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  selectTap1() {
    this.setData({
      show1: !this.data.show1
    });
  },
  // 点击下拉列表
  optionTap(e) {
    const Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  optionTap1(e) {
    const Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index1: Index,
      show1: !this.data.show1
    });
  },
  addressAdd() {
    try {
      wx.getSetting({
        success: (result) => {
          const address = result.authSetting["scope.address"];
          if (address === true || address === undefined) {
            chooseAddress().then(res => {
              console.log(res);
              
              this.setData({
                address: res,
                IsHidden: true
              })
              wx.setStorage({
                key: 'address',
                data: res,
                IsHidden: true
              });
            });
          } else {
            openSetting();
            chooseAddress().then(res => {
              console.log(res);
              
              wx.setStorage({
                key: 'address',
                data: res,
                IsHidden: true
              });
              this.setData({
                address: res,
                IsHidden: true
              })
            });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '周边',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000'
    })
    const address = wx.getStorageSync("address");
    if (address) {
      this.setData({
        address,
        IsHidden: true
      })
    }

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
    let map = wx.getStorageSync("map");
    if (map) {
      this.setData({
        chooseAddress: map
      })
    } else {
      this.setData({
        chooseAddress: []
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