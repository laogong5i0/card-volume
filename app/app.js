$(function(){
  var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  var touchstart = mobile ? "touchstart" : "mousedown";
  var touchend = mobile ? "touchend" : "mouseup";
  var touchmove = mobile ? "touchmove" : "mousemove";
  var tap = mobile ? "tap" : "click";

  //阻止屏幕滑动
  $('html,body').on(touchmove,function(e){
    e.preventDefault()
  });

  // var userName = "固生堂";
  var userName = "固生堂中医";
  var motionObj = {};
  var loadingPath='sound/path';
  var stageH=$(window).height();
  var stageW=$(window).width();
  //
  //定义时间动画：
  for(var i=0; i<10; i++){
    motionObj["page"+(i+1)] = new TimelineMax();
  };

  //初始化音乐
  var _music;
  function intsound(){
      var sounds = [
          {src: "assets/bg1.mp3", id: 1}
      ];
      createjs.Sound.alternateExtensions = ["ogg"];
      createjs.Sound.registerSounds(sounds);
  }
  intsound();
  // alert("---->"+ $.cookie("name"));
  $("#mess").text( ($.cookie("name") ? window.decodeURIComponent($.cookie("name")) : userName)+"邀请您加入抢红包大战！");
  //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
  initPreventPageDobuleTap(true);
  getUserInfo();
  getSign();
  initPageMotion();

  //初始化动画
  function initPageMotion(){
      $(".main").fadeIn(300,function(){
          setTimeout(function(){
              $('.longpage').show();
              messages1();
          },1000)
      });
  }

  var shareType = false;// 标记为是否通过分享层进行分享
  var shareNum = 0;
  var _timer;
  var mydist;
  var msgID;
  var dist;
  var vancept=72;
  var vancesm=110+85;
  //显示消息1
  function messages1(){
      msgID=1;
      //dist = -150+_space;
      dist = 20;
      setMS1();
      _timer = setInterval(setMS1,2000)
  }

  //播放消息声音
  function playmessagesSound(){
      _music = createjs.Sound.play('1');
      _music.volume = 0.1;
  }

  var tweenSpace = []
  function setMS1(){
      if(msgID<=8 ){
          if(msgID<=3){
            if(stageH-vancept-185-150-170<0){
              mydist = stageH-vancept-185-150-170;
              console.log("00000", mydist);
              TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':Math.abs(mydist)+'px'},ease:Linear.easeNone});
              dist = mydist;
              vancept =0;
            }else{
              console.log("9999");
              false;
            }
          }else if(msgID<=4){
            if(stageH-vancept-185-150-170-120<0){
              mydist = stageH-vancept-185-150-170;
              console.log("0000011", mydist);
              TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':Math.abs(mydist)+'px'},ease:Linear.easeNone});
              vancept = 0;
              dist = mydist;
            }else{
              false;
            }
          }else if(msgID<=5){
            if(stageH-vancept-185-150-170-120-150-150<0){
              mydist = stageH-vancept-185-150-170-120-150-150;
              console.log("0000011", mydist);
              TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
              vancept = 0;
              dist = mydist;
            }else{
              false;
            }
          }else if(msgID==6){
                mydist=dist-120+20;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==7){
                mydist=dist-210;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==8){
                mydist=dist-230;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==9){
                mydist=dist-230;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==10){
                mydist=dist-150;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==11){
                mydist=dist-150;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==12){
                mydist=dist-180;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==13){
                mydist=dist-180;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }else if(msgID==14){
                mydist=dist-230;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
                dist = mydist;
          }
          if(msgID==8) receiveMoney();
          $('#msg'+msgID).fadeIn();
          playmessagesSound();
      }else{
          clearInterval(_timer);
          return;
      }
      msgID++;
  }

  function setMs2(){
    if(msgID<=9){
      if(msgID==9){
        mydist=dist-230;
        TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':mydist+'px'},ease:Linear.easeNone});
        dist = mydist;
      }
      if(msgID==9) receiveMoney2();
      $('#msg'+msgID).fadeIn();
      playmessagesSound();
    }else{
      clearInterval(_timer);
    }
    msgID++;
  }

  //打开红包
  var isTheFirstReceive = true;
  var ct = true;
  function receiveMoney(){
    shareType = true;
      $('#redpick1').one(touchstart, function(e){
        // console.log("9999999999999999999;;;", $target, e);
        if($("#redpick1").hasClass("clicked")){
          //已经点击过的显示分享层
          $(".hongbao.share2").removeClass("hide");
        }else{
          $("#redpick1").addClass("clicked");
          $('#hongbao, #hb1').removeClass("hide");
          TweenMax.to('#hb1',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
        }
      })
  }
  function receiveMoney2(){
      $('#redpick2').one(touchstart, function(){
        if($("#redpick2").hasClass("clicked")){
          //已经点击过的显示分享层
          // shareType = true;
          $(".hongbao.share2").removeClass("hide");
        }else {
          // alert("22222222");
          $("#redpick2").addClass("clicked");
          $('#hongbao, #hb2').removeClass("hide");
          TweenMax.to('#hb2',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
        }
      })
  }

  function redpickReady(){
    // $("#hongbao").removeClass("hide")
    $('.hongbao,#hb1').removeClass("hide");
    TweenMax.to('#hb1',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
  }



  // 点击拆红包
  $("#btn2").on(touchstart, function(){
    grabRedpaper();
  })
  // 点击优惠券
  $("#coupon").on(touchstart, function(){
    if(shareNum>=1){
      // 直接关闭优惠券
      // alert("ijijieijfji"+ shareNum)
      $("#coupon").addClass("hide")
    }else{
      // 显示分享层
      // shareType = true;
      $(".hongbao.share2").removeClass("hide");
    }
    // if(window.statusGet){
      // $(".hongbao.share2").removeClass("hide")
    // }else {
    //   // 第一次分享完点击优惠卷关闭分享和优惠图层
    //   $(".hongbao.share2").addClass("hide")
    //   $("#coupon").addClass("hide")
    // }
    // alert("假如分享成功")
    // nextPacke();
  })
  // 点击活动结束页
  $("#redpaperEnd").on(touchstart, function(){
    $("#redpaperEnd").addClass("hide");
  });
  //点击空红包
  $("#empty").on(touchstart, function(){
    if(shareNum>=1){
      $("#empty").addClass("hide");
    }else{
      $(".hongbao.share2").removeClass("hide");
      $(".hongbao.share2").addClass("clicked");
    }
  });
  // 点击代金券
  // $("#cash").on(touchstart, function(){
  //   if(window.statusGet){
  //     $(".hongbao.share1").removeClass("hide")
  //   }else{
  //     $(".hongbao.share1").addClass("hide")
  //     $("#cash").addClass("hide")
  //   }
  // })

  // 开启下一个红包
  function nextPacke(){
    var openid = getQueryString("openid");
    $.post("http://wx.gstzy.cn/coupon/share", {openid: openid}, function(resp){
      setMs2();
    });
  }

  window.nextPacke = nextPacke;

  // 排队超过一秒后放弃排队，直接弹出红包抽完
  var waitTime = 5000;
  var startTime = 0;
  //开始排队
  function grabRedpaper(){
    startTime = Date.parse(new Date());
    var openid = getQueryString("openid");
    $.post("http://wx.gstzy.cn/coupon/grab_redpaper", {openid: openid}, function(resp){
      var temp = JSON.parse(resp);
      if(temp.status != "200") alert("网络错误！")
      if(temp.data.state=="waiting"){
        $(".hongbao.loading").removeClass("hide")
        rsRedpaper()
      }else {
        sendEnd()
      }
    });
  }

  function rsRedpaper(){
    var openid = getQueryString("openid");
    $.post("http://wx.gstzy.cn/coupon/rs_redpaper", {openid: openid}, function(resp){
      var temp = JSON.parse(resp);
      if(temp.status!="200") rsRedpaper();
      if(temp.data.state=="waiting"){
        var currentTime = Date.parse(new Date());
        if((currentTime-startTime)>waitTime){
          // 超过最长排队时间
          $(".hongbao.loading").addClass("hide");
          sendEnd()
        }else{
          //继续排队
          rsRedpaper();
          return;
        }
      }else if(temp.data.state = "catch"){
        $(".hongbao.loading").addClass("hide");
        if(temp.data.type=="CASH"){
          // 现金
          // $("#cashText").text(temp.data.value)
          // openCash()
        }else if(temp.data.type=="COUPON_CASH"){
          // 优惠券
          if(temp.data.value==0){
            openEmpty();
          }else{
            $("#couponText").text(temp.data.value)
            openCoupon();
          }
        }else{
          //活动结束
          // alert("已到达可抽奖上限, 测试时的数据，请不要在意这些细节");
          openEmpty();
          // alert(resp);
        }
      }else{
        //活动结束//
        // alert("已到达可抽奖上限, 测试时的数据，请不要在意这些细节222");
        sendEnd();
        // alert(resp);
      }
    })
  }

  // 打开控红包
  function openEmpty(){
    $("#hongbao").addClass("hide");
    $("#hongbao #hb1").addClass("hide")
    $("#empty").removeClass("hide");
  }
  //打开优惠券
  function openCoupon(){
    $("#hongbao").addClass("hide");
    $("#hongbao #hb1").addClass("hide")
    $("#coupon").removeClass("hide")
  }
  // 发完红包
  function sendEnd(){
    $("#hongbao").addClass("hide");
    // $("#hongbao #hb1").removeAttr("style");
    $("#hongbao #hb1").addClass("hide")
    $("#redpaperEnd").removeClass("hide")
  }

  // 获取url参数
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  function getUserInfo(){
    var openid = getQueryString("openid");
    // console.log("openid:", openid);
    if(!openid){
      // alert("openid 为空，无法获取用户信息！");
      alert("您无权限抽奖。")
      return;
    }

    $.post("http://wx.gstzy.cn/coupon/check_subscribe", {openid: openid}, function(resp){
      // 获取用户信息
      var temp = JSON.parse(resp)
      if(temp.status == 200){
        $("#headimgurl").attr("src", temp.data.headimgurl)
        $("#nickname").text(temp.data.nickname)
        if(temp.data.nickname){
          userName = temp.data.nickname;
        }else{
          userName = "固生堂中医";
        }
      }else{
        // alert("获取用户信息失败！")
        alert("您无权限抽奖。")
      }
    })
  }

  //阻止屏幕双击以后向上位移,当有表单页的时候，要关闭阻止事件，否则不能输入文字了
  function initPreventPageDobuleTap(isPreventPageDobuleTap){
      if(isPreventPageDobuleTap){
          $('.page').on(touchstart,function(e){
              e.preventDefault();
          })
      }else{
          $('.page').off(touchstart);
      }
  }
  //
  // function getCookie(name)
  // {
  //   var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  //   if(arr=document.cookie.match(reg))
  //   return unescape(arr[2]);
  //   else
  //   return null;
  // }


  //////////分享/////////////////////////////////////////////////////////////////////
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
  function initWx(data){
    // console.log("data:::", data);
    var dataTemp = {
      appId: data.appId,
      nonceStr: data.nonceStr,
      timestamp: data.timestamp,
      url: data.url,
      signature: data.signature,
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
    // alert("-----"+JSON.stringify(dataTemp));
    wx.config(dataTemp);
    wx.ready(function () {
      // 在这里调用 API
      // alert("==配置成功！测试时的提示")

      // wx.checkJsApi({
      //   jsApiList: [
      //     'onMenuShareTimeline',
      //     'onMenuShareAppMessage',
      //     'onMenuShareQQ',
      //     'onMenuShareWeibo',
      //     'onMenuShareQZone'
      //   ],
      //   success: function (res) {
      //     alert("======="+JSON.stringify(res));
      //   }
      // });

      var shareObj = {
        title: userName+'邀您加入固生堂新年红包群',
        desc: userName+'邀您加入固生堂新年红包群，20万元红包，抢到就是你的！',
        link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc04ce1d87dcd13cd&redirect_uri=http://wx.gstzy.cn/index/gupong?callbackurl=http://wx.gstzy.cn/coupon/?name="+userName+"&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect",
        // link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc04ce1d87dcd13cd&redirect_uri=http://wx.gstzy.cn/coupon/?name=" + window.encodeURIComponent(window.encodeURIComponent(userName)),
        imgUrl: 'http://wx.gstzy.cn/coupon/assets/img/share.jpg',
        success: function(res){
          // alert('分享成功！！000');
          $(".hongbao.share2").addClass("hide")
          $("#coupon").addClass("hide")
          $(".hongbao.share1").addClass("hide")
          $("#cash").addClass("hide")
          if (shareType) {
            shareNum+=1;
            window.setTimeout(function(){
              nextPacke();
            }, 500)
          }
          // shareType = false;
        },
        cancel: function(res){
          // alert("取消分享!!!!");
          $(".hongbao.share2").addClass("hide")
          $("#coupon").addClass("hide")
          $(".hongbao.share1").addClass("hide")
          $("#cash").addClass("hide")
          // shareType = false;
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

});
