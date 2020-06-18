import WxValidate from "../../utils/WxValidate.js";

Page({
  data: {
    image: [],
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    form: {
      name1: '',
      sex: '',
      age: '',
      tel: '',
      time: '',
      houseNumber: '',
      hospital: "",
      doctor: '',
      Department: ""
    },
    isFocus: false,
    inputValue: ""
  },

  uploadImage: [],
  input(e) {
    if (e.detail.value.trim()) {
      this.setData({
        isFocus: true,
        inputValue: e.detail.value
      })
    }
  },
  clear() {
    this.setData({
      isFocus: false,
      inputValue: ""
    })
  },
  clearImage(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let {
      image
    } = this.data;
    image.splice(index, 1)
    this.setData({
      image
    })
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  handChooseImage() {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          image: [...this.data.image, ...result.tempFilePaths]
        })
      }
    });
  },

  formSubmit(e) {
    let cases = wx.getStorageSync("case") || [];
    const params = e.detail.value
    // 校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    cases.push(params)
    this.showModal({
      msg: '提交成功'
    })
    wx.setStorageSync("case", cases);
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad() {
    this.initValidate();
    this.setData({
      nbTitle: '手动添加',
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
  },
  initValidate() {
    const rules = {
      name1: {
        required: true,
        rangelength: [2, 4]
      },
      sex: {
        required: true,
      },
      age: {
        required: true,
        range: [1, 150],
      },
      tel: {
        required: true,
        tel: true,
      },
      time: {
        required: true,
        dateISO: true
      },
      hospital: {
        required: true,
        maxlength: 20,
        minlength: 5
      },
      Department: {
        required: true,
        rangelength: [2, 10]
      },
      doctor: {
        required: true,
        rangelength: [2, 4]
      },
      houseNumber: {
        required: true,
        number: true
      },

    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name1: {
        required: '请输入姓名',
        name: '请输入2~4个汉字'
      },
      sex: {
        required: '请选择性别'
      },
      age: {
        required: '请输入年龄',
        range: '请输入1~150内的年龄',
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      time: {
        required: '请输入就诊时间',
        time: '请输入有效的日期',
      },
      hospital: {
        required: '请输入就诊医院',
        hospital: "请输入5~20个字符的医院名称"
      },
      Department: {
        required: '请输入就诊科室',
        hospital: "请输入2~10个字符的科室名称"
      },
      doctor: {
        required: '请输入就诊医生姓名',
        name: '请输入2~4个汉字'
      },
      houseNumber: {
        required: '请输入门牌号',
        houseNumber: '请输入有效数字',
      },

    }
    this.WxValidate = new WxValidate(rules, messages)
  },
})