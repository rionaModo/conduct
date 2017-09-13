(function($){

function Carousel(conf,ele){
  conf = $.extend({
    width:undefined,
    duration:3000,
    effect:{
      name:"slide",
      speed:500
    },
    btn_mouseover:false,
    auto:true
  },conf);

  var _self = this;
  var duration = conf.duration;
  var carousel = $(ele);

  conf.width = conf.width || carousel.width();

  var items = carousel.find(".carousel-item");
      items.width(conf.width);

  var total = items.length;
  var btns = carousel.find(".carousel-btn");
  var pre = carousel.find(".carousel-btn.cur").index();



  carousel.on('click',".carousel-btn_pre",function(){
    addAction(prev);
  });
  carousel.on('click',".carousel-btn_next",function(){
    addAction(next);
  });

  var _method = conf.btn_mouseover  ? "mouseover" : "click";
  btns.each(function(i){
    $(this)[_method](function(){
      addAction(function(){
        setTo(i);
      });
    });
  });

  // 自动播放
  var autoThread = undefined;
  function autoPlay(){
    stopAuto();
    if(duration >> 0){
      autoThread = setTimeout(function(){
        addAction(next);
        autoPlay();
      },duration);
    }
  }
  function stopAuto(){
    clearTimeout(autoThread);
  }

  autoPlay();

  // 按钮点击队列
  var queque = [];
  var done = true;

  function addAction(callback){
    queque.push(callback);
    startAction();
  }
  function startAction(){
    var fn = queque.shift();
    if(fn && done){
      done = false;
      fn();
      stopAuto();
    };
  }
  function doneAction(){
    done = true;
    if(conf.auto){
      autoPlay();
    }
    startAction();
  }

  // 下一个
  function next(){
    var now = pre;
    var then = pre = (pre + 1 )% total;
    rend(now, then);
  }
  // 前一个
  function prev(){
    var now = pre;
    var then = pre = (pre + total - 1) % total;
    rend(now, then);
  }

  // 设置到某个
  function setTo(index){
    var now = pre;

    var then = pre = index;

    rend(now,then);
  }

  // 执行动画
  function rend(now,then){
    if(now == then){
      doneAction();
      return;
    }
    _self.onRender.fire(now,then);
    $( btns.removeClass("cur").get(pre) ).addClass("cur");
    if(Carousel.effects[conf.effect.name]){
      Carousel.effects[conf.effect.name].call(_self,now,then);
    }else{
      Carousel.effects['slide'].call(_self,now,then);
    }
  }


  conf.carousel = carousel;
  conf.items = items;
  conf.btns = btns;
  _self.conf = conf;
  _self.next = function(){
    addAction(next);
  }
  _self.prev = function(){
    addAction(prev);
  }
  _self.setTo = function(i){
    addAction(function(){
      setTo(i);
    });
  }
  _self.stopAuto = stopAuto;
  _self.autoPlay = autoPlay;
  _self.doneAction = doneAction;
  _self.onRender = $.Callbacks();
}
  
  Carousel.effects = {};
  $.Carousel = Carousel;

  $.fn.carousel = function(conf){
    var obj = this.map(function(){
      var _self = $(this);
      if(_self.data('carousel_obj')){
        return _self.data('carousel_obj');
      }
      var carousel_obj = new $.Carousel(conf,this);
      _self.data("carousel_obj",carousel_obj);
      return carousel_obj;
    }).get();
    return obj.length == 1 ? obj[0] : this;
  }
})(jQuery);


/**
 * 滑动效果定义
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function($){
  // 往左移
 $.Carousel.effects.slide = function(now,then){
    var _self = this;
    var elenow = $(_self.conf.items.get(now));
    var elethen = $(_self.conf.items.get(then));

    if(elenow.length == 0 || elethen.length == 0){
      _self.doneAction();
      return;
    }
    
    then > now ? moveleft(elenow,elethen,_self) : moveRight(elenow,elethen,_self);
  }
  function moveleft(elenow,elethen,carousel){

    var width = carousel.conf.width;
    var speed = carousel.conf.effect.speed || 300;
    elethen.show();

    elenow.animate({marginLeft:-width},speed,function(){
      elenow.hide().css({marginLeft:0});
      // 保证对此点击一次执行
      carousel.doneAction();
    });
  }
  // 右移
  function moveRight(elenow,elethen,carousel){
    var width = carousel.conf.width;
    var speed = carousel.conf.effect.speed || 300;
    elethen.css({marginLeft:-width}).show().animate({marginLeft:0},speed,function(){
      elenow.hide();
      // 保证对此点击一次执行
      carousel.doneAction();
    });
  }
})(jQuery);

(function(){
  $.Carousel.effects.marqueSlide = function(now, then) {
    var _self = this;

    var $eleNow = $(_self.conf.items.get(now));
    var $eleThen = $(_self.conf.items.get(then));

    $eleNow.parent().css("position", "relative");
    _self.conf.items.css("position","absolute");

    var width = _self.conf.width;

    $eleNow.css("left", 0 );
    $eleThen.css("left", width).show();
    $eleNow.add($eleThen).animate({
      left: "-=" + width + "px"
    }, _self.conf.effect.speed, function(){
      $eleNow.hide();
      _self.doneAction();
    })

  }
})();


(function($){
  $.Carousel.effects.fade = function(now,then){
    var _self = this;
    var elenow = $(_self.conf.items.get(now));
    var elethen = $(_self.conf.items.get(then)); 

    var speed = _self.conf.effect.speed || 300;
    elenow.fadeOut(speed,function(){
      elethen.fadeIn();
      _self.doneAction();
    });
  }
})(jQuery);


(function(){
  $.Carousel.effects.app = function (then, now){
        var that = this,
            $eleNow = $(that.conf.items.get(now)),
            $eleThen = $(that.conf.items.get(then)),
            
            //避免同时显示两帧会重影
            $textNow = $eleNow.find(".text").hide(),
            $phoneNow = $eleNow.find(".phone").hide(),

            $textThen = $eleThen.find(".text"),
            $phoneThen = $eleThen.find(".phone");

        var animateWith = $phoneThen.width() + 20 ;
        
        $eleNow.show();
        $textThen.fadeOut(400, function(){
            $textNow.fadeIn(200);
        })
        $phoneThen.animate({
            right:"-" + animateWith
        }, 300, function(){
            $phoneNow.fadeIn(300, function(){
                $phoneThen.fadeOut(300,function(){
                  $eleThen.hide();
                  that.doneAction();
                  $phoneThen.removeAttr("style");
                });
            });
        })
    }
})();


$(function () {

    $(".banner-list").each(function(){
      var $banner = $(this),
          $text = $(".text-list",this),
          $content = $(".content-list",this),

          textControl = $text.carousel({
            btn_mouseover: true,
            width: 1200,
            effect: {
                name: "fade",
                speed: 500
            }
          }),

          contentControl = $content.carousel({
            effect: {
              name: "marqueSlide",
              speed: 300
            }
          });

      contentControl.stopAuto();

      textControl.onRender.add(function (now, then){
        contentControl.setTo(then);
      })
    });


})

$(function(){
  
  var $code = $("#zoomQrcode");

  $(".banner .qrcode").mouseenter(function(){
    var offset = $(this).offset();

    $code.removeClass("right").addClass("left");

    offset.left += 175;
    offset.top -= 20;

    $code.css(offset).stop().fadeIn();

  }).mouseleave(function(){
    $code.stop().fadeOut()
  })

  $(window).scroll(delayScroll);

  var thread,
      threadDelay = 100,
      windowHeight = $(window).height(),
      hidingHeight = 600;

  var $codeMask = $(".fixed-qrcode");

  function delayScroll(){
    clearTimeout(thread);
    thread = setTimeout(checkHeight,threadDelay)
  }

  function checkHeight(){
    var documentScroll = $(document).scrollTop();
    documentScroll > hidingHeight ? $codeMask.fadeIn() : $codeMask.fadeOut() ;
  }
  checkHeight();

  $codeMask.mouseenter(function(){
    var offset = $(this).offset();
    $code.removeClass("left").addClass("right");
    offset.left -= 330;
    offset.top -= 30;

    $code.css(offset).stop().fadeIn();

  }).mouseleave(function(){
    $code.stop().fadeOut()
  })


  // app显示切换
  $(".app-nav .btn").click(function(){
    $(this).addClass('active').siblings().removeClass("active");

    var app = $(this).data("app"),
        appSelector = "#app_" + app;

    $(".app-container").hide();
    $(appSelector).show();

    var $code = $("#zoomQrcode");
    $code.removeClass("dealer terminal").addClass(app);
    var $qrcode = $code.find("img"),
      src = $qrcode[0].src;

    $qrcode[0].src = src.replace(/(dealer|terminal)/, app);
  })


});

