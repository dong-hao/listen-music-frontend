//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    welcome:"欢迎啊",
    audioAction: {
      method: 'pause'
    }
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      console.log("用户数据存入当前页面");
    })

  },
  onShareAppMessage: function(){
    return {
      title:"来听首歌吧",
      path:"/pages/index/index"
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function (e) {
    var keyword = e.detail.value.input;
    console.log(keyword)
    var url = app.globalData.host + "api/search?limit=10&key=" + keyword

    wx.request({
      url: url,
      method: 'GET',
      success: (res) => {
        if (+res.statusCode == 200) {
          this.setData({
            QQSongdatas:res.data.QQSongdatas,
            XiamiSongdatas:res.data.XiamiSongdatas,
            qq_data:true,
            xiami_data:true
          });
        }
      },
      fail: (res) => {
        console.log(res);
      }
    });
  }
})
