module.exports = {
  jscode2session: jscode2session,
  getUserInfo: getUserInfo
}

var jscode2session_url = "api/xxx?jscode=" // 此处填写你的方法名
function jscode2session(parameters, foo) {
  wx.request({
    url: parameters.url + jscode2session_url + parameters.code,
    method: 'GET',
    success: (res) => {
      if (+res.statusCode == 200) {
        console.log(res.data)
        foo(res.data)
      }
    },
    fail: (res) => {
      console.log(res);
    }
  });
};

var getUserInfo_url = "api/xxxxx" // 此处填写你的方法名
function getUserInfo(base_url, session_data, res) {
  res.sessionData = session_data
  res.openid = session_data["openid"]
  // 可以将 res 发送给后台解码出 unionId
  wx.request({
    url: base_url + getUserInfo_url,
    method: 'POST',
    data: res,
    success: (res) => {
      if (+res.statusCode == 200) {
        
      }
    },
    fail: (res) => {
      console.log(res);
    }
  });

}
