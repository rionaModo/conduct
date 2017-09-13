var map = new AMap.Map('container', {  //定义地图
    cursor: 'default',
    zoom: 5,
    features:[],
 //  zoomEnable:false,
  //  dragEnable:false
});


function setMapStyle(container){ //删除地图默认样式
    $(container).css('background','none');
    $(container).css('left','-255px');
    $(container).show();
    map.setZoom(4);
    map.setStatus({zoomEnable:false,dragEnable:false});
}

//just some colors
var colors ={//地图颜色配置
    'default':'#58626c',
    strokeColor:'#8D9CB1',//地图边际颜色
    110000:'#58626c',//北京 默认色
    120000:'#5f6c7a',//天津
    130000:'#b5b324',//河北
    140000:'#58616c',//山西
    //  150000:'#58626c',//内蒙古
    210000:'#be6f24',//辽宁
    220000:'#b5b324',//吉林
    230000:'#b5b324',//黑龙江
    190000:'#be6f24',//上海
    320000:'#be6f24',//江苏
    330000:'#be6f24',//浙江
    350000:'#be6f24',//福建
    360000:'#b5b324',//江西
    610000:'#be6f24',//陕西
    410000:'#be6f24',//陕西
    620000:'#b5b324',//甘肃
    640000:'#b5b324',//宁夏
    450000:'#b5b324',//广西
    520000:'#b5b324',//贵州
    530000:'#b5b324',//云南
    510000:'#a92a2a',//四川
    500000:'#a92a2a',//重庆
    420000:'#a92a2a',//湖北
    430000:'#a92a2a',//湖南
    //   710000:'#a92a2a',//山东
    // 340000:'#b5b324',//安徽
}

var showAreaName={//地图颜色配置
    130000:'#b5b324',//河北
    //  150000:'#58626c',//内蒙古
    210000:'#be6f24',//辽宁
    220000:'#b5b324',//吉林
    230000:'#b5b324',//黑龙江
    190000:'#be6f24',//上海
    320000:'#be6f24',//江苏
    330000:'#be6f24',//浙江
    350000:'#be6f24',//福建
    360000:'#b5b324',//江西
    610000:'#be6f24',//陕西
    410000:'#be6f24',//陕西
    620000:'#b5b324',//甘肃
    640000:'#b5b324',//宁夏
    450000:'#b5b324',//广西
    520000:'#b5b324',//贵州
    530000:'#b5b324',//云南
    510000:'#a92a2a',//四川
    500000:'#a92a2a',//重庆
    420000:'#a92a2a',//湖北
    430000:'#a92a2a',//湖南
    //   710000:'#a92a2a',//山东
    // 340000:'#b5b324',//安徽
};//省名显示设置
var proviceCenter={};//缓存省市中心城市经纬度
var markers=[]; //订单对应的点
var couponmarkers=[];//coupon对应的点
var Timer;

AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
    window.SimpleMarker=SimpleMarker;
    AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {

        //创建一个实例
        window.districtExplorer = new DistrictExplorer({
            map: map,
            eventSupport: true, //打开事件支持
            preload: [100000] //预加载全国

        });
        districtExplorer.clearFeaturePolygons();

        var adcode = 100000;

        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {

            //更新地图视野
            map.setBounds(areaNode.getBounds(), null, null, true);

            //清除已有的绘制内容
            districtExplorer.clearFeaturePolygons();

            //绘制子区域
            districtExplorer.renderSubFeatures(areaNode, function(feature, i) {

                proviceCenter[feature.properties.name.substr(0,feature.properties.name.length-1)]=feature.properties.center;
                var code=feature.properties.adcode;
                if(showAreaName&&showAreaName[code]){
                    new SimpleMarker({
                        iconLabel:{
                            innerHTML:feature.properties.name.substr(0,2),
                            style:{
                                color:'#eee',
                                fontSize:'60%',
                                width:'80px',
                                'textAlign':'left',
                                top:'20px'
                            }
                        },
                        iconStyle: '',
                        map: map,
                        position: feature.properties.center
                    });
                }

                var fillColor = colors[code]|| colors['default'];

                var strokeColor=colors.strokeColor;

                if(code=='460000'){ //去除海南珠岛
                    var coordinates=feature.geometry.coordinates;
                    feature.geometry.coordinates=[];
                    feature.geometry.coordinates.push(coordinates[0]);
                }
                return {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: strokeColor, //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 1, //线宽
                    fillColor: fillColor, //填充色
                };

            });

            //绘制父区域--中国
          /*  districtExplorer.renderParentFeature(areaNode, {
                cursor: 'default',
                bubble: true,
                strokeColor: colors.strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: null, //填充色
                fillOpacity: 0.35, //填充透明度
            });*/

            map.setFitView(districtExplorer.getAllFeaturePolygons());
            setMapStyle('#container')
        });



        //根据Hover状态设置相关样式
        function toggleHoverFeature(feature, isHover, position) {


            var props = feature.properties;

            //更新相关多边形的样式
            var polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
            for (var i = 0, len = polys.length; i < len; i++) {

                polys[i].setOptions({
                    fillOpacity: isHover ? 0.5 : 0.2
                });
            }
        }

        /*  //监听feature的hover事件
         districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
         toggleHoverFeature(feature, e.type === 'featureMouseover',
         e.originalEvent ? e.originalEvent.lnglat : null);
         });*/


    });
})


/*获取红包总量 */
function getOrderTotal(){
    $.ajax({
        type: "GET",
        url: "/router/data_show/trade_data",
        dataType: "json",
        success: function(data){
            var handleData=function(num){
                var arr=[];
                if(!num)return '0';
                num=num.toString();
                var len=num.length;
                var leni=parseInt(len/3)+1;
                var end=len%3;
                var start=0;
                if(end==0)end=3;
                for(var i=0;i<leni;i++){
                    if(start>len-1)break
                    arr.push(num.slice(start,end));
                    start=end;
                    end=end+3;
                }
                return arr.join(',')
            }
            if(data){
                var countAmt=handleData(parseInt(data.countAmt/100))+' 元';
                var grantAmt=handleData(data.grantAmt/100)+' 元';
                $('#total-order').html(countAmt)
                $('#today-order').html(grantAmt)
                $('.total-order,.today-order').show();
            }
        }
    });
}
/*获取红包数据*/
function getCouponData(selector,call){
    $.ajax({
        type: "GET",
        url: "/router/data_show/coupon_data",
        dataType: "json",
        success: function(data){
            var data=data.data;
            if(data&&data.data_list&&data.data_list.length>0){
                $(selector).empty();
                for(var i= 0,len=data.data_list.length;i<len;i++){
                    var item=data.data_list[i];
                    var couponAmt=item.couponAmt/100;
                    if(!item.couponAmt||!item.payerName)continue
                    var html='<li class="rows"  buyerProvince="'+item.buyerProvince+'"'
                        +' buyerName="'+item.payerName+'"'
                        +' orderDataType="20"'
                        +' amount="'+couponAmt+'"'
                        +' couponDataType="'+item.couponDataType+'"'
                        + ' >'
                        +'<span class="icon"></span>'
                        +'<span class="status">恭喜</span>'
                        +'<span class="shopName">'+item.payerName+'</span>'
                        +'<span class="status">获得</span>'
                        +'<span class="money">'+couponAmt+'元</span>'
                        +'<span class="status">红包</span>'
                        +'</li>';
                    $(selector).append(html)
                }
                if(call&&typeof call=="function"){
                    call(selector,data.data_list)
                }
            }
        }
    });
}
/*
* 秒表展示
* */
function showtime(){
    var today,hour,second,minute,year,month,date;
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth()+1;
    date = today.getDate();
    hour = today.getHours();
    minute =today.getMinutes();
    second = today.getSeconds();
    if(hour < 10){
        hour = '0' + hour;
    }
    if(minute < 10){
        minute = '0' + minute;
    }
    if(second < 10){
        second = '0' + second;
    }
    $("#realdate").text(year+'/' + month+'/'+date)
    $("#realtime").text(hour + ":" + minute + ":" + second);
    setTimeout("showtime();", 1000);
}
/*
* 显示订单数据
* */
function getOrderData(selector,call){
    $.ajax({
        type: "GET",
        url: "/router/data_show/order_data",
        dataType: "json",
        success: function(data){
            if(data&&data.data_list&&data.data_list.length>0){
                $(selector).empty();
                for(var i= 0,len=data.data_list.length;i<len;i++){
                    var item=data.data_list[i];
                    if(item.orderAmount==null||!item.sellerName)continue;
                    var orderAmount=(item.orderAmount/1000000).toFixed(2)>0.01?((item.orderAmount/1000000).toFixed(2)+'万'):item.orderAmount/100;
                    var html='<li class="rows" buyerProvince="'+item.buyerProvince+'"'
                        +'buyerName="'+item.buyerName+'"'
                        +'orderDataType="'+item.orderDataType+'"'
                        +'amount="'+orderAmount+'"'
                        + ' >'
                        +'<span class="icon"></span>'
                        +'<span class="shopName">'+item.buyerName+'</span>'
                        +'<span class="status">已下单</span>'
                        +'<span class="money">'+orderAmount+'</span>'
                        +'<span class="status">元</span>'
                        +'</li>';
                    var html2='<li class="rows " buyerProvince="'+item.buyerProvince+'"'
                        +'buyerName="'+item.buyerName+'"'
                        +'orderDataType="'+item.orderDataType+'"'
                        +'amount="'+orderAmount+'"'
                        + ' >'
                        +'<span class="icon"></span>'
                        +'<span class="shopName">'+item.buyerName +'</span>'
                        +'<span class="status">新下单</span>'
                        +'<span class="money">'+orderAmount+'</span>'
                        +'<span class="status">元</span>'
                        +'<span class="new"></span>'
                        +'</li>';
                    var html3='<li class="rows " buyerProvince="'+item.buyerProvince+'"'
                        +'buyerName="'+item.buyerName+'"'
                        +'orderDataType="'+item.orderDataType+'"'
                        +'amount="'+orderAmount+'"'
                        + ' >'
                        +'<span class="tansf"></span>'
                        +'<span class="shopName">'+item.buyerName +'的订单</span>'
                        +'<span class="status">已发货</span>'
                        +'</li>';
                    if(item.orderDataType=='02'){
                        html=html2;
                    }
                    if(item.orderDataType=='03'){
                        html=html3;
                    }
                    $(selector).append(html)
                }
                if(call&&typeof call=="function"){
                    call(selector,data.data_list)
                }
            }
        }
    });
}
/*添加效果css*/
function getEleHandle(selector,addclass){
    var addclass=addclass||'animated zoomIn'
    if(selector){
        if($(selector).length>0){
            if(!$(selector).hasClass('animated')){
                $(selector).addClass(addclass).show();
            }
        }else {
            setTimeout(function(){
                getEleHandle(selector,addclass);
            },20)
        }
    }
}
function timeerHan(){
    clearTimeout(Timer);
    getCouponData();
    getCouponData('#coupon-list');
    getOrderData('#order-list');
    Timer=setTimeout(function(){
        timeerHan();
    },60000)
}
(function(){
    getOrderTotal();
    showtime();
    getOrderData('#order-list',function(selector){
        $('.order-list-content').scrollbox({
            linear: true,
            step: 2,
            delay: 1,
            speed: 40,
            afterForward:function(data){
                var lis=$(this).find('li');
                var li=$(data.currentFirstChild[0]);
                var buyerProvince=li.attr('buyerProvince');
                var buyerName=li.attr('buyerName')
                var orderDataType=li.attr('orderDataType')
                var amount=li.attr('amount')
                var switchCount=data.switchCount;
                var html='<div class="marker-icon">'+buyerName+'已下单'+amount+'元</div>';
                var icon=STATIC_PRE+'/resource/images/map_display/order-icon.png';
                if(orderDataType=='02'){
                    var html='<div class="marker-icon">'+buyerName+'新下单'+amount+'元</div>';

                }else if(orderDataType=='03') {
                    icon=STATIC_PRE+'/resource/images/map_display/yuns-icon.png';
                    var html='<div class="marker-icon">'+buyerName+'的订单已发货</div>';
                }
                if(orderDataType=='03'){
                    getEleHandle('.order_'+switchCount,'animated bounceInRight StateTips');
                    var animation='AMAP_ANIMATION_DROP';
                }else {
                    var animation='AMAP_ANIMATION_DROP';
                }
                map.remove(markers)
                markers[switchCount-1]= new SimpleMarker({
                    iconLabel:{
                        innerHTML:html,
                        style:{
                            color:'#c5e6ff',
                            fontSize:'50%',
                            width:'200px',
                            height:'40px',
                            'textAlign':'left',
                            top:'0px'
                        }
                    },
                    animation:animation,
                    iconStyle: icon,
                    map: map,
                    position:proviceCenter[buyerProvince]
                });
                markers[switchCount-1].setContainerClassNames(' order_'+switchCount);

                (function (){
                    setTimeout(function(){
                        $('.order_'+switchCount).addClass('bounceInDown animated ');
                        $('.order_'+switchCount).hide();
                        $('.order_'+switchCount).remove();
                        markers[switchCount-1].setMap(null);
                    },2800)
                })(switchCount)
            },
            afterBackward:function(data){
                console.log(data);
            }
        })
    })
    getCouponData('#coupon-list',function(selector){
        $('.coupon-list-content').scrollbox({
            linear: true,
            step: 2,
            delay: 1,
            speed: 40,
            afterForward:function(data){
                var lis=$(this).find('li');
                var li=$(data.currentFirstChild[0]);
                var buyerProvince=li.attr('buyerProvince');
                var buyerName=li.attr('buyerName')
                var orderDataType=li.attr('orderDataType')
                var couponDataType=li.attr('couponDataType')
                var amount=li.attr('amount')
                var switchCount=data.switchCount;
                var icon=STATIC_PRE+'/resource/images/map_display/icon.png';
                var html='<div class="marker-icon">恭喜'+buyerName+'获得'+amount+'元红包</div>';

                if(couponDataType=='02'){
                    getEleHandle('.coupun_'+switchCount,'animated bounceInDown StateTips');
                    var animation='AMAP_ANIMATION_DROP';
                }else {
                    var animation='AMAP_ANIMATION_DROP';
                }
                map.remove(couponmarkers)
                couponmarkers[switchCount-1]= new SimpleMarker({
                    iconLabel:{
                        innerHTML:html,
                        style:{
                            color:'#c5e6ff',
                            fontSize:'50%',
                            width:'200px',
                            height:'40px',
                            'textAlign':'left',
                            top:'0px'
                        }
                    },
                   animation:animation,
                    iconStyle: icon,
                    map: map,
                    position:proviceCenter[buyerProvince]
                });
                couponmarkers[switchCount-1].setContainerClassNames('coupun_'+switchCount);


                getEleHandle('.coupun_'+switchCount);
                (function (){
                    setTimeout(function(){
                        $('.coupun_'+switchCount).addClass('bounceInDown animated');
                        $('.coupun_'+switchCount).hide();
                        couponmarkers[switchCount-1].setMap(null);
                    },2800)
                })(switchCount)
            }
        })
    })
    Timer=setTimeout(function(){
        timeerHan();
    },60000)
})();





function datashow(){
    var btn=$('#show-btn');
    var type=btn.attr('type');
    if(type==1){
        $('.order-info').css('z-index','-5');
        $('.market-show').hide();
        $(container).css('left','0');
        btn.attr('type',2);
        map.setStatus({zoomEnable:true,dragEnable:true});
        map.setZoom(5);
        map.setStatus({zoomEnable:false,dragEnable:false});
    }else {
        $('.order-info').css('z-index','5');
        $('.market-show').show();
        map.setStatus({zoomEnable:true,dragEnable:true});
        map.setZoom(4);
        map.setStatus({zoomEnable:false,dragEnable:false});
        $(container).css('left','-255px');
        btn.attr('type',1);
    }
}
$("#show-btn").click(datashow);