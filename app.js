var util = require("utils/common.js")

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo && this.globalData.hasUserInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    else {
      wx.login({
        success: res => {
          res.url = that.globalData.host;
          util.jscode2session(res, function (session_data) {
            wx.getSetting({
              success: res => {
                var getSettiong_res = res
                wx.getUserInfo({
                  success: res => {
                    cb(res.userInfo)
                    that.globalData.userInfo = res.userInfo
                    if (getSettiong_res.authSetting['scope.userInfo']) {
                      util.getUserInfo(that.globalData.host, session_data, res)
                    } else {
                      wx.authorize({
                        scope: 'scope.userInfo',
                        success() {
                          that.globalData.hasUserInfo = true
                          util.getUserInfo(that.globalData.host, session_data, res)
                          console.log("35")
                        },
                        fail() {
                          console.log("36")
                        }
                      })
                    }
                  }
                })

              }
            })
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    host: 'https://xxxx.com/' // 此处填写自己的服务域名
  }
})
