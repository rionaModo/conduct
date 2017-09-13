/**
 * Created by danlu on 2017/2/27.
 */


var lotteryInfo;
var lottery = (function(){

    var lottery = {},
        initdeg=45,
        AWARDS = lottery.AWARDS = {
            "01": {
                name: "一等奖",
                deg: [315]
            },
            "02": {
                name: "二等奖",
                deg: [15]
            },
            "03": {
                name: "三等奖",
                deg: [75]
            },
            "04":{
                name: "四等奖",
                deg: [135]
            },
            "05":{
                name: "五等奖",
                deg: [195]
            },
            "06":{
                name: "六等奖",
                deg: [255]
            },
            "999": {
                name: "谢谢参与",
                deg: [45,105,165, 225,285,345]
            }
        }, rolling


    lottery.init = function(){
        lottery.init = null

        var $avardBoard = lottery.$avardBoard = $(".lottery-award"),
            $lottery = lottery.$lottery = $(".lottery"),
            $chanceLeft = lottery.$chanceLeft = $("#chance-left"),
            $lotteryBtn = lottery.$lotteryBtn = $lottery.find('.lottery-btn');


        /*获取当前显示活动处理st*/
        var pre= ACT_INFO.lottery['pre'];
        var next= ACT_INFO.lottery['next'];
       if(pre&&pre.endLeft < 0&&next){
           lotteryInfo = lottery.info=next;
       }else{
           lotteryInfo = lottery.info=pre;
       }
        /*获取当前显示活动处理end*/

        lottery.flashLight = initFlashLight()
        if(!lotteryInfo){
            // 没有活动信息 直接结束
            btn("disable")
            _paq.push(['trackEvent' ,'lottery', 'enter_no_lottery']);
            return timebar(-1)
        }
        // 未开始
        if(lotteryInfo.startLeft > 0) {
            btn('disable nostart');
            timebar(lotteryInfo.startLeft, function(){
                $("#lottery-time-bar").replaceWith('<a class="coming-soon" href="">活动即将开始点击刷新</a>');
                setTimeout(function(){
                    _paq.push(['trackEvent' ,'lottery', 'waited_start_reload', lotteryInfo.activityId]);
                    setTimeout(function(){
                        location.reload()
                    },100)
                }, 5e3)
                _paq.push(['trackEvent' ,'lottery', 'waited_start', lotteryInfo.activityId]);
            })
            _paq.push(['trackEvent' ,'lottery', 'enter_not_start', lotteryInfo.activityId]);
        }else if(lotteryInfo.endLeft < 1  ){
            // 活动已结束
            btn("disable isend");
            $lottery.find(".chance-left").text("本轮活动已结束");
            _paq.push(['trackEvent' ,'lottery', 'enter_end', lotteryInfo.activityId])
        }else {
            // 正在活动
            if(lotteryInfo.status==01){//刷新页面
                btn('disable nostart');
                $("#lottery-time-bar").show();
                $("#lottery-time-bar").replaceWith('<a class="coming-soon" href="">活动即将开始点击刷新</a>');
            }
            getChanceNum(function(data){
                setChance(data);
                if(parseInt(data)>0&&lotteryInfo.status==02){
                    btn("active");
                }
                bindClick();
            })
            return;
        }

        getChanceNum(function(data){
            setChance(data);
        })
        bindClick();
        function bindClick() {
            $lottery.on('click', '.lottery-btn.active', roll);
            $lottery.on('click', '.lottery-btn.disable-canshowrule', function () {
                $("#rule-lottery").click()
            })
            $lottery.on('click', '.lottery-btn.disable-nochance', function () {
                openTipsLayer("luckNoChance NoChanceStyle","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>");
            });
            $lottery.on('click', '.lottery-btn.nostart', function () {
                openTipsLayer("", "活动未开始，请稍等 . . .");
            });
            $lottery.on('click', '.lottery-btn.isend', function () {
                openTipsLayer("", "本轮活动已结束，下波活动敬请期待!");
            });
            if(!(lotteryInfo.startLeft>0)){
                loadAwardList("#lottery-list",{
                    activityId: lotteryInfo.activityId,
                    activityType: lotteryInfo.activityTypeId
                })
            }

            if(lotteryInfo.startLeft < 1){
                // 活动已开始加载中奖列表

                // 不显示倒计时
                timebar(-1)
            }
        };
        function getChanceNum(callback) {//获取抽奖机会
            $.get("/router/activity/chance", {
                activityId: lotteryInfo.activityId,
                companyId: userInfo.companyId,
                t: Date.now()
            }, function (res) {
                var res=JSON.parse(res);
                if (callback) {
                    callback(res.data.ticketStock)
                }
            });
        }

    }

    function setChance(chance){
        var chance=chance||0;
        if(parseInt(chance)<=0){
            chance=0;
        }
        lottery.$chanceLeft.text(chance)
        if(chance < 1 && lottery.info.startLeft < 1 && lottery.info.endLeft > 0 ) {
            btn('disable-nochance')
        }
    }
    function btn(c){
        lottery.$lotteryBtn.removeClass('active disable disable-canshowrule').addClass(c)
    }

    function timebar(t, callback){
        if(t < 0){
            $("#lottery-time-bar").remove()
        }else {
            $("#lottery-time-bar").timebar(t,callback)
        }
    }

    function initFlashLight(){
        var lightsInfo = {
                radius: 230,
                amount: 30,
                fix: function(lamp){
                    // 这次切图 灯的偏移为：28px 29px
                    lamp.left -= 28
                    lamp.top -= 29
                    return lamp
                }
            },

            lampHtml = circleLamp(lightsInfo),

            lotteryFlash = $("#lottery-lights").html(lampHtml).flash('yellow blue green purple'.split(' '))

        return lotteryFlash
    }


    function loadAward(){
        $.get("/router/activity/roll", {
            activityId: lottery.info.activityId,
            companyId: userInfo.companyId,
            t: Date.now()
        }, function(res){
            var res=JSON.parse(res);
            if(res.status){
                rotate(1000, 360) //停止转盘
                _paq.push(['trackEvent' ,'lottery', 'rolled_system_error', lottery.info.activityId]);
            }
            if(res.status == 1){
                btn('disable')
                _paq.push(['trackEvent' ,'lottery', 'rolled_no_chance', lottery.info.activityId]);
                openTipsLayer("luckNoChance NoChanceStyle","<p>您未获得抽奖机会或已用完。下单越多，抽奖机会越多！ </p><p>（详见幸运轮盘详细规则）</p>");
                return setChance(0)
            }
            if(res.status == 2){
                btn('disable')
                _paq.push(['trackEvent' ,'lottery', 'rolled_ended', lottery.info.activityId]);
                $(".lottery").find(".chance-left").text("本轮活动已结束");
                openTipsLayer("","活动已结束！");
                return
            }
            if(res.status == 3){
                _paq.push(['trackEvent' ,'lottery', 'rolled_status3', lottery.info.activityId]);

                return layer.alert(res.msg)
            }
            var data = res.data;
            //additional_award st
            if (data.tradingPrizeList&&data.tradingPrizeList[0]) {
                var List = data.tradingPrizeList[0];
                if ((data.prizeLevel == '10' || data.prizeLevel == '11') && List.dealerCoupons.length > 0) {
                    //优惠券
                    if (data.prizeLevel == '11') {
                        var additional_packet = 'additional_cop';
                        var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                            "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                            "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p><p class='additional_list'>可购买：" + List.dealerCoupons[0].goodsName + "</p></div></div>" +
                            "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的优惠券！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
                    } else {
                        //红包
                        var additional_packet = 'additional_packet';
                        var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                            "<p class='money-line'><span class='money-icon'>￥</span>" + List.couponAmt / 100 + "</p><p class='additional_ad'>满" + List.effectiveAmt / 100 + "可用</p></div>" +
                            "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>" + List.dealerCoupons[0].dealerName + "</p></div></div>" +
                            "<p class='rob_my_tip'>恭喜您获得一张价值<span>" + List.couponAmt / 100 + "</span>元的经销商红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
                    }
                    openTipsLayer(additional_packet, packet, function (dom) {
                    });
                    setChance(data.remainTime)
                    rolling = false
                    return
                }
            }
            //additional_award end


            // 因为返回的整形
            if($.browser.msie && ($.browser.version == '7.0' || $.browser.version == '8.0') ){
                lottery.flashLight.restart(1e3) //停止慢速闪灯
                showPrize()
            }else{
                rotateToAward(data.prizeLevel + "", showPrize)
            }

            function showPrize(){
                setChance(data.remainTime)
                if(data.prizeLevel && data.tradingPrizeList) {
                    var money=countCouponList(data.tradingPrizeList);
                    money=money/100;
                    openTipsLayer("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",function(dom){
                        dom.find(".rob_money").append("<div class='money-title'><span>"+dom.find('.rob_my_tip span').html()+"</span>元</div>");
                    });
                }else {
                    openTipsLayer("","很遗憾，没有抽中。下次再接再厉！")
                }
                rolling = false
            }
        })

    }

    // 抽奖操作
    function roll(){
        if(rolling) return;
        _paq.push(['trackEvent' ,'lottery', 'roll_click', lottery.info.activityId]);
        rolling = true

        // 在服务器抽奖结果返回之前，先让转盘转起来
        rotate(2000, initdeg+360)

        loadAward()
    }

    // 滚到相应奖项
    function rotateToAward(awardId, callback){
        awardId.toString();
        var award = lottery.AWARDS[awardId] || lottery.AWARDS["999"],
            awardDeg = randomPick(award.deg)

        rotate(13e3,awardDeg , callback)
    }

    // 滚动转盘
    function rotate(time, angle, callback){
        var awar=Math.floor(initdeg/360)*360;
        var init=initdeg;
        var angle=angle+awar+360*5;
        initdeg=angle;
        lottery.flashLight.restart(100) //转起来时，加快闪灯
        lottery.$avardBoard.stopRotate();
        lottery.$avardBoard.rotate({
            angle: init,
            duration: time,
            animateTo: angle ,
            callback:function(){
                lottery.flashLight.restart(1e3) //停止慢速闪灯
                $.isFunction(callback) && callback()
            }
        })
    }


    function showNoChance(){
        popup("抱歉，您已经没机会！")
    }

    return lottery
})();


var lucky = (function() {
    var lucky = {},noWactivityId,luckyInfo = window.ACT_INFO.lucky;

    lucky.init = function() {
        lucky.init = null
        lucky.flashLight = $('#lucky-lights').flash('yellow blue green'.split(' '))
        var  presentLucky = lucky.presentLucky = luckyInfo.pre,
            nextLucky = lucky.nextLucky = luckyInfo.next,
            nowTime = Date.now(),
            $lucky = lucky.$lucky = $('.lucky-activity'),
            $luckyBtn = lucky.$luckyBtn = $lucky.find(".btn");
        lucky.presentLucky?noWactivityId=lucky.presentLucky.activityId:'';
        var bindClick=function(){
            $lucky.on('click', '.btn_rob', luckyRoll);
            $lucky.on('click', '.luckother-btn', luckyRoll);
        }
        // 如果当前活动存在

        if (presentLucky) {
            loadAwardList("#lucky-list", {
                activityId: presentLucky.activityId,
                activityType: presentLucky.activityTypeId
            })
            if(presentLucky.startLeft>0){
                btn('btn_coming',"");
                showTime(presentLucky.startLeft,function(){
                  //  $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
                //    btn('btn_rob');
                  //  $lucky.find(".luck-rob-btn").addClass("luckother-btn");
                    setBufferChance(presentLucky.activityId);
                })
                return
            }
            else if (presentLucky.endLeft < 0) {
                // 当前活动已结束
                btn('btn_end')
                _paq.push(['trackEvent' ,'lucky', 'enter_ended', presentLucky.activityId]);
                nextLuckhandle(1);
                return
            } else {
                if(presentLucky.status==01){
                    //活动进行中，但状态没更新
                    btn('btn_gray',"即将开始");
                    $("#lucky-time-bar").replaceWith('<div class="coming-soon">活动即将开始,<a href="">点击刷新</a></div>');
                    $(".lucky-activity .coming-soon").html('活动即将开始,<a href="">点击刷新</a>');
                    return
                }
                // 当前活动还在进行
                // 红包抢完
                //if (presentLucky.couponStock < 1) {
                if ((presentLucky.couponStock < 1&&presentLucky.additionalCouponStock!=null&&presentLucky.additionalCouponStock<1)||(presentLucky.couponStock < 1&&presentLucky.additionalCouponStock==null)) {
                        // 红包已经抢光
                    btn('btn_out')
                    _paq.push(['trackEvent' ,'lucky', 'enter_lucky_out', presentLucky.activityId]);
                    nextLuckhandle();
                    return
                } else {
                    setBufferChance(presentLucky.activityId);
                }
            }
        } else {
            btn("btn_end")
            _paq.push(['trackEvent' ,'lucky', 'no_present_lucky']);
            nextLuckhandle(1);
        }

        //对机会进行重新设定
        function setBufferChance(activityId,boo){
            var next=boo==false?false:true;
            $.get("/router/activity/chance",{
                activityId: activityId,
                companyId: userInfo.companyId,
                t: Date.now()
            },function(res){
                var res=JSON.parse(res);
                if(res.status){
                    _paq.push(['trackEvent' ,'lucky', 'getchance_error', activityId]);
                    btn('btn_gray',"红包异常");
                    if(next){
                        nextLuckhandle(1);
                    }
                    return
                }
                if (res.data.ticketStock < 1) {
                    noChance = true;
                    btn('btn_gray',"机会已用完");
                    _paq.push(['trackEvent' ,'lucky', 'enter_nochance', activityId]);
                    if(next){
                        nextLuckhandle();
                    }
                    return
                }
                //  if(!next){
                $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
                $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
                //    }
                btn('btn_rob');
                $lucky.find(".luck-rob-btn").addClass("luckother-btn");
                bindClick();
                if(next){
                    nextLuckhandle(2);
                }
            });
        }

        function  nextLuckhandle(tag){
            if (nextLucky) {
                //如果有下一个活动
                if(tag==1){
                    btn('btn_coming',"");
                    noWactivityId=nextLucky.activityId;
                    if(nextLucky.startLeft<0){
                        $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
                        $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
                        setBufferChance(noWactivityId,false);
                    }else {
                        showTime(nextLucky.startLeft,function(){
                            $("#lucky-time-bar").replaceWith('<div class="coming-soon">抢红包活动进行中！</div>');
                            $(".lucky-activity .coming-soon").html('抢红包活动进行中!');
                            setBufferChance(noWactivityId,false);
                        });
                    }
                }else {
                    if(tag!=2){ showTime(nextLucky.startLeft);}
                }
            } else {
                // 没有就敬请期待了
                if(tag!=2) {
                    $("#lucky-time-bar").replaceWith('<div class="coming-soon">下波活动敬请期待</div>')
                    $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
                    _paq.push(['trackEvent', 'lucky', 'no_next_lucky']);
                }
            }
        }
    }

    var noChance = false,
        rolling

    function luckyRoll() {
        _paq.push(['trackEvent' ,'lucky', 'roll_click', lucky.presentLucky.activityId ]);
        var $lucky=$('.lucky-activity');
        if (noChance){
            openTipsLayer("luckNoChance","您的本轮抢红包机会已用完，下轮继续！");
            $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
            return  btn('btn_gray',"机会已用完");
        }
        var isReturn=false;
        var timer;
        var luckcallHandle=function(){
            $(".lucky-activity .coming-soon").html('抢红包活动进行中！');
            openTipsLayer("more_one","<p>今天抢红包的小伙伴太多了。</p><p>再抢一次吧</p>",function(dom,index){
                dom.find('.close').html("再抢一次");
            },"1222");
        };
        function timeM(n,dom,index){
            dom.find('.showTime').html(n);
            n--;
            if(n==0||rollTime-n>=6){
                timer=setTimeout(function(){
                    layer.closeAll();
                    clearTimeout(timer);
                    luckcallHandle();
                },1000);
                return;
            }
            timer= setTimeout(function(){
                timeM(n,dom,index);
            },1000);
        }

        openTipsLayer("luck_money","<p class='rob_my_minutes'><span class='showTime'>"+rollTime+"</span></p></p><p class='rob_my_tip'>抢红包了，排队中！</p><p class='rob_my_time_m'> (千万别关掉我)</p>",function(dom,index){
            timeM(rollTime,dom,index);
        },"1222");
        if (rolling) return
        rolling = true
        $.get("/router/activity/roll", {
            activityId:  noWactivityId,
            companyId: userInfo.companyId,
            t: Date.now()
        }, function(res) {
            var res=JSON.parse(res);
            rolling = false;
            isReturn=true;
            if(res.status==403){
                location.reload();
            }
            if (res.status == 1) {
                luckcallHandle=function(){
                    btn('btn_gray',"机会已用完");
                    noChance = true;
                    _paq.push(['trackEvent' ,'lucky', 'rolled_no_chance', lucky.presentLucky.activityId ]);
                    openTipsLayer("luckNoChance","您的本轮抢红包机会已用完，下轮继续！",function(dom,index){
                        // if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
                        dom.find('.close').click(function () {
                            location.reload();
                        })
                        dom.find('.left-close').click(function () {
                            location.reload();
                        })
                        //  }
                    });
                    $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
                    $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
                }
                return
            }
            if(res.status == 4||res.status ==5){
                return
            }
            if (res.status == 2||res.status==6) {
                luckcallHandle=function(){
                    btn('btn_end')
                    _paq.push(['trackEvent' ,'lucky', 'rolled_ended', lucky.presentLucky.activityId ]);
                    openTipsLayer("","活动已结束！",function(dom,index){
                        //  if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
                        dom.find('.close').click(function(){location.reload();})
                        dom.find('.left-close').click(function(){location.reload();})
                        // }
                    });
                    $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
                    $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
                }
                return
            }
            if (res.status == 3) {
                luckcallHandle=function(){
                    _paq.push(['trackEvent' ,'lucky', 'rolled_system_error', lucky.presentLucky.activityId ]);
                    openTipsLayer("",res.msg);
                    $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
                }
                return
            }

            luckcallHandle=function(){
                var data = res.data
                if (!data.tradingPrizeList) {
                    _paq.push(['trackEvent' ,'lucky', 'rolled_lucky_out', lucky.presentLucky.activityId ]);
                    openTipsLayer("rob_all","<p>抢红包的小伙伴们手太快啦！！ </p><p>下轮继续加油哦！</p>",function(dom,index){
                        //   if(luckyInfo.next&&luckyInfo.next.activityId!=noWactivityId) {
                        dom.find('.close').click(function () {
                            location.reload();
                        })
                        dom.find('.left-close').click(function () {
                            location.reload();
                        })
                        //  }
                    });
                    btn('btn_out');
                    $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
                    $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
                    return
                }
                if (data.remainTime < 1) {
                    noChance = true;
                    btn('btn_gray',"机会已用完");
                    $lucky.find(".luck-rob-btn ").removeClass("luckother-btn");
                    $(".lucky-activity .coming-soon").html('下波活动敬请期待!');
                }
                //additional_award st
                var List=data.tradingPrizeList[0];
                if((data.prizeLevel=='10'||data.prizeLevel=='11')&&List.dealerCoupons.length>0) {
                    //优惠券
                    if (data.prizeLevel== '11') {
                        var additional_packet='additional_cop';
                        var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>优惠券</p>" +
                            "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                            "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p><p class='additional_list'>可购买："+List.dealerCoupons[0].goodsName+"</p></div></div>" +
                            "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的优惠券！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
                    } else {
                        //红包
                        var additional_packet='additional_packet';
                        var packet = "<div class='additional_content'><div class='additional_cop_left clearfix'><p class='additional_title'>经销商红包</p>" +
                            "<p class='money-line'><span class='money-icon'>￥</span>"+List.couponAmt/100+"</p><p class='additional_ad'>满"+List.effectiveAmt/100+"可用</p></div>" +
                            "<div class='additional_cop_right clearfix'><p class='additional-title'>可用范围：</p><p class='additional_shop'>"+List.dealerCoupons[0].dealerName+"</p></div></div>" +
                            "<p class='rob_my_tip'>恭喜您获得一张价值<span>"+List.couponAmt/100+"</span>元的经销商红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>"
                    }
                    openTipsLayer(additional_packet,packet,function(dom){
                    });
                    return
                }
                //additional_award end

                var money = countCouponList(data.tradingPrizeList)
                _paq.push(['trackEvent' ,'lucky', 'rolled_get_' + lucky.presentLucky.activityId , money ]);
                money = money/100;
                openTipsLayer("rob_money","<p class='rob_my_tip'>恭喜您获得一张价值<span>"+money+"</span>元的红包！</p><p class='rob_my_time'> 红包将在10分钟内完成发放，请注意查看个人账户。</p>",function(dom){
                    dom.find(".rob_money").append("<div class='money-title'><span>"+dom.find('.rob_my_tip span').html()+"</span>元</div>");
                    if (data.remainTime < 1) {
                        dom.find('.close').click(function () {
                            location.reload();
                        })
                        dom.find('.left-close').click(function () {
                            location.reload();
                        })
                    }
                });
            }
        })
    }
    function showTime(time,call) {
        $("#lucky-time-bar").timebar(time, function() {
            if(call&&typeof call=="function"){
                call()
            }else {
                $("#lucky-time-bar").replaceWith('<div class="coming-soon">活动即将开始!</div>')
                setTimeout(function(){
                    _paq.push(['trackEvent' ,'lucky', 'waited_start_reload', lucky.nextLucky.activityId]);
                    setTimeout(function(){
                        location.reload()
                    },100)
                }, 5e3)
            }
            _paq.push(['trackEvent' ,'lucky', 'waited_start', lucky.nextLucky.activityId]);
        })
    }

    function btn(c,h) {
        lucky.$luckyBtn.removeClass("btn_rob btn_out btn_end btn_gray btn_coming").addClass(c);
        if(!!h){
            lucky.$luckyBtn.html(h)
        }else {
            lucky.$luckyBtn.html('')
        }
    }

    function showNoChance(){
        popup("抱歉，您已经没机会！")
    }

    return lucky
})();



var rollTime=5;
function openTipsLayer(classN,tips,callback,tag){

    var shadeClose=tag?false:true;
    layer.open({
        type: 1,
        scrollbar: false,
        title: false,
        closeBtn: 0,
        area: ['881px','667px'],
        shadeClose: shadeClose,
        shade:[0.5,"#000"],
        content: '<div class="rule-panel rob-layer"><div class="left-close"></div><div class="rule-content-rob"></div><div  class="close">确   认</div></div>',
        success: function(dom,index){
            dom.css({
                "background":"none",
                "box-shadow":"none"
            })
            dom.find('.close').click(function(){layer.close(index);})
            dom.find('.left-close').click(function(){layer.close(index);})
            dom.find('.rule-content-rob').html(tips);
            if(classN){
                dom.find('.rule-panel').addClass(classN)
            }
            if(callback){ callback(dom,index)}
        }
    });
}
$(function(){
    loginUser(function(){
        lottery.init()
        lucky.init()
    },function(){
        login()
    });

    monthWinList="";
    var winningList = ACT_INFO.winningList;
    if(winningList.content){
        monthWinList="<dl>"
        if(winningList.title)monthWinList=monthWinList+"<p class='tac'><b>"+winningList.title+"</b></p>"
        monthWinList=monthWinList+winningList.content+"</dl>"
    }else {
        monthWinList = winningList["default"] || "敬请期待！";
    }
    $("#rule-month").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("赢TOP排行  赢当月大礼");
            dom.find('.rule-content').html(monthRuleHTML);
        })
        _paq.push(['trackEvent', 'month_act', 'show_rule']);
    })

    $("#rule-reg").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("免费注册 红包立即送")
            dom.find('.rule-content').html(regRuleHTML)
        })
        _paq.push(['trackEvent', 'register_act', 'show_rule']);
    })

    $("#rule-lottery").click(function () {
        if(lotteryRuleHTML.indexOf('|----|')<0){
            showRule(function (dom, index) {
                dom.find('.title').html("在线下单  幸运轮盘每周抽")
                dom.find('.rule-content').html(lotteryRuleHTML)
            })
        }else{
            var activityId=null;
            ACT_INFO.lottery.next&&ACT_INFO.lottery.next.activityId&&ACT_INFO.lottery.next.activityId!=lotteryInfo.activityId?activityId=ACT_INFO.lottery.next.activityId:'';
            getActivityRule(activityId,function(html){
                lotteryRuleHTML=lotteryRuleHTML.replace('|----|',html);
                showRule(function (dom, index) {
                    dom.find('.title').html("在线下单  幸运轮盘每周抽")
                    dom.find('.rule-content').html(lotteryRuleHTML)
                })
            })
        }

    });
    $("#mouth-reg").click(function () {
        showRule(function (dom, index) {
            dom.find('.rule-panel').addClass('mouth-reg-layer');
            dom.find('.title').html("TOP排行中奖公布")
            dom.find('.rule-content').html(monthWinList)
        })
    })

    $("#rule-lucky").click(function () {
        showRule(function (dom, index) {
            dom.find('.title').html("丹露红包  每日随机抢")
            dom.find('.rule-content').html(luckyRuleHTML)
        })
        _paq.push(['trackEvent', 'lucky', 'show_rule']);
    })
});

function login(){
    var basePath = window.location.origin;
    //兼容ie
    if (window["context"] == undefined) {
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        window["context"] = location.origin+"/V6.0";
    }

    basePath = window.location.origin;

    var url=ssoCfg.login+'?service='+basePath;
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['514px','318px'],
        shadeClose: false,
        shade:[0.9,"#000"],
        scrollbar: false,
        content: '<div id="loginpanel"><a class="gologin" href="'+url+'"></a></div>',
        success: function(dom){
            dom.css("background", "none")
        }
    });
}

function showRule(callback){
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        scrollbar: false,
        area: ['881px','667px'],
        shadeClose: true,
        shade:[0.5,"#000"],
        content: '<div class="rule-panel"><div class="title"></div><div class="left-close"></div><div class="activity-rule"></div><div class="wrap"><div class="rule_layer_c"></div><div class="rule-content"></div></div><a href="javascript:" class="close"></a></div>',
        success: function(dom,index){
            dom.css({
                "background":"none",
                "box-shadow":"none"
            })
            dom.find('.close').click(function(){layer.close(index);})
            dom.find('.left-close').click(function(){layer.close(index);})
            callback(dom,index)
        }
    });
}






function getActivityRule(activityId,call) {//获取抽奖机会
    if(!activityId){
        if(call&&typeof call=="function"){
            call('下次抽奖敬请期待；')
        }
        return ;
    }
    $.ajax({
        'url':"/router/sc/V1/activity/fullInfo",
        dataType:'json',
        type:'GET',
        data:{
            activityId: activityId,
            t: Date.now()
        },
        success:function(data){
            var dataList=data.data;
            var html=getRuleHtml(dataList);
            if(call&&typeof call=="function"){
                call(html)
            }
        }
    });

}

/*生成下一轮文案*/
function getRuleHtml(dataList){
    // 优化抽奖次数
    var tem = [];
    var lotteryNumList={};
    var html='下次抽奖敬请期待；';
    if(dataList.activityTypeId === '03' && dataList.activityRules.length) {
        var limitStartTime=getDateArray(Date.parse(new Date(dataList.limitStartTime)));
        var limitEndTime=getDateArray(Date.parse(new Date(dataList.limitEndTime)));
         html='下次抽奖机会发放规则：'+limitStartTime[0]+'年'+limitStartTime[1]+'月'+limitStartTime[2]+'日—'+limitEndTime[0]+'年'+limitEndTime[1]+'月'+limitEndTime[2]+'日之间，'
        if(dataList.activityRules[0].ruleGroup || dataList.activityRules[0].ruleMultiple) {
            var lotteryNumType = 'tl1';//阶梯价
        }else {
            var lotteryNumType = 'tl2';//非阶梯价
        }

        if(lotteryNumType == 'tl1') {
            $.each(dataList.activityRules, function(index, val) {
                if(!tem[val.ruleGroup]){
                    tem[val.ruleGroup]={
                        "amt":null,
                        "count":null,
                        "num":''
                    }
                }
                tem[val.ruleGroup].num = (val.ruleMultiple).toString();
                if(val.ruleId == '1'){
                    tem[val.ruleGroup].amt = (val.ruleValue/100).toString();
                }
                if(val.ruleId == '3') {
                    tem[val.ruleGroup].count = val.ruleValue;

                }
            });
            //删除空对象
            var isDouble=false,//规则是否为特殊规则
                firstKey=null;
            for (var i = 0; i < tem.length; i++) {
                if(tem[i] != "" &&typeof(tem[i]) != "undefined"){
                    if(!firstKey&&(tem[i].amt&&tem[i].count)){
                        firstKey='amt&count';
                    }else if(!firstKey&&(tem[i].amt||tem[i].count)){
                        firstKey=tem[i].amt?'amt':'count';
                    } else if(firstKey&&tem[i].amt||tem[i].count){
                        if(tem[i].amt&&!tem[i].count&&firstKey=='amt')continue;
                        if(tem[i].count&&!tem[i].amt&&firstKey=='count')continue;
                        if(tem[i].count&&tem[i].amt&&firstKey=='amt&count')continue;
                         isDouble=true;//特殊规则
                    }
                }else{
                    tem.splice(i,1);
                    i= i-1;
                }
            };
            //只有一个阶梯
            if(tem.length==0){
                if(tem[0].amt){
                    html=html+'交易量累积'+tem[0].amt+'元以上，';
                }
                if(tem[0].count){
                    html=html+'交易次数累积'+tem[0].count+'以上，';
                }
                html=html+'获得'+tem[0].num +'次抽奖机会。'
                return html;
            }
            //多个阶梯

            for (var i = 0; i < tem.length; i++) {
                var item=tem[i];
                if(prev){
                    if(!isDouble){
                        html=html+(item.amt?'交易量累积'+prev.amt+'-'+item.amt+'元（含'+prev.amt+'元），':'')
                            +(item.count? '交易次数累积'+prev.count+'-'+item.count+'次（含'+prev.count+'次），':'')
                            +'即可获得'+prev.num+'次抽奖机会；';
                        if(i==tem.length-1){
                            html=html+(item.amt?'交易量累积'+item.amt+'元以上,':'')
                                    +(item.count?'交易次数累积'+item.count+'以上，':'')
                                +'获得'+item.num+'次抽奖机会。'
                                +'最多可获'+item.num+'次抽奖机会。'
                        }
                    }else{
                        html=html+(prev.amt?'消费满'+prev.amt+'元':'')
                            +(prev.count? prev.amt?' 且 消费满'+prev.count+'单':'消费满'+prev.count+'单':'')
                            +' 获得'+prev.num+'次抽奖机会；';
                        if(i==tem.length-1){
                            html=html+(item.amt?'消费满'+item.amt+'元':'')
                                +(item.count? item.amt?' 且 消费满'+item.count+'单':'消费满'+item.count+'单':'')
                                +' 获得'+item.num+'次抽奖机会。'
                                +'最多可获'+item.num+'次抽奖机会。'
                        }
                    }
                }
                var prev=item;
            }

        }

        if(lotteryNumType == 'tl2') {
            var temArray = dataList.activityRules;

            $.each(temArray, function(index, val) {
                if(val.ruleId == '1'){
                    lotteryNumList.amt = (val.ruleValue/100).toString();
                }
                if(val.ruleId == '3') {
                    lotteryNumList.count = val.ruleValue;
                }
            });
            lotteryNumList.num = (dataList.lotteryNum).toString();
            //抽奖次数累积

            if(!dataList.isCumulate){
                lotteryNumList.cumulateNum = lotteryNumList.num ;
            }else {
                lotteryNumList.cumulateNum = dataList.cumulateNum;
            }
            if(lotteryNumList.amt){
                html=html+'交易量累积'+lotteryNumList.amt+'元以上，';
            }
            if(lotteryNumList.count){
                html=html+'交易次数累积'+lotteryNumList.count+'以上，';
            }
            html=html+'获得'+lotteryNumList.num +'次抽奖机会。'
            if(dataList.isCumulate){
                html=html+'最多可获'+lotteryNumList.cumulateNum+'次抽奖机会。';
            }

        }
    }
    return html;
}