(function(){
  var getNum = 0
  function getSign(){
    $.get("http://wx.gstzy.cn/coupon/get_js_ticket", {url: window.location.href}, function(resp){
      var temp = JSON.parse(resp);
      if(temp.status==200){
        // alert("sign"+ JSON.stringify(temp.data));
        initWx(temp.data);
      }else{
        if(getNum>5) return;
        getNum +=1;
        getSign();
      }
    })
  }
  // jsapi_ticket: jsapi_ticket,
  // nonceStr: createNonceStr(),
  // timestamp: createTimestamp(),
  // url: url
  function initWx(data){
    var dataTemp = {
      appId: "wxc04ce1d87dcd13cd",
      nonceStr: "6ert7ppbiysyvi",
      timestamp: 1454491851,
      url: "http://wx.gstzy.cn/coupon/?name=pat&state=1&cardstate=CASH10&openid=o0pk9uD1xoHMzV8GaXmsCTnv_n2w",
      signature: "a7f06b0524db2dde9135a1fd0040dc4824685969",
      debug: false,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    }
    // alert(JSON.stringify(dataTemp));
    wx.config(dataTemp);
    wx.ready(function () {
      // 在这里调用 API
      alert("==配置成功！测试时的提示")
      var shareObj = {
        title: '固生堂邀您加入新年红包群',
        desc: '固生堂中医邀您加入新年红包群，10万元红包，抢到就是你的！',
        link: 'http://movie.douban.com/subject/25785114/',
        imgUrl: 'http://wx.gstzy.cn/coupon/assets/img/share.png',
        success: function(res){
          alert('分享成功！！!!');
        },
        cancel: function(res){
          alert("取消分享!!!!");
        }
      }
      // $("#share").one("touchstart", function(){
        // 分享到微信
        wx.onMenuShareAppMessage(shareObj);
        //分享到朋友圈
        // alert("点击分享，，开")
        wx.onMenuShareTimeline(shareObj);
        //分享到QQ
        wx.onMenuShareQQ(shareObj);
        // 分享到微博
        // wx.onMenuShareWeibo(shareObj);
        // // 分享到QZone
        // wx.onMenuShareQZone(shareObj);
      // })
    });
    wx.error(function (res) {
      alert(res.errMsg);
    });
  }
  getSign();
})();
