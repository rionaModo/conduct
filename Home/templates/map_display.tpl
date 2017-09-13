<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit" />
    <title>丹露网当日实时交易/促销动态图</title>

    {include './part/addCss.tpl'}
    <script type="text/javascript" src='//webapi.amap.com/maps?v=1.3&key=9a2b593133101a429a0df94fcd5b9d35'></script>

    <script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.10"></script>
</head>
<body>
<div class="main-content">
    <div class="date"><span class="time-title">DATE</span><span  id="realdate"></span></div>
    <div class="time" ><span class="time-title">TIME</span><span  id="realtime"></span></div>

    <div class="total-order" ><span class="order-title">历史总交易量:</span><span id="total-order">111,111,111</span></div>
    <div class="today-order" ><span class="order-title">今日交易量:</span><span id="today-order">222,222,222</span></div>

   <div class="order-info">
       <div class="order-list-content">

           <ul class="order-list" id="order-list">

           </ul>
       </div>
       <div class="coupon-list-content">

           <ul class="coupon-list" id="coupon-list">

           </ul>
       </div>
   </div>

    <div id="container"></div>
    <div class="market-show">
      <div class="key-market mk-list">
          <p class="title "><span class="icon"></span><span class="mk-title">核心市场</span></p>
          <p ><span class="mk-detail">四川 | 湖南 | 湖北 | 重庆</span></p>
      </div>
        <div class="emp-market mk-list">
            <p class="title "><span class="icon"></span><span class="mk-title">重点市场</span></p>
            <p ><span class="mk-detail">江苏 | 河南 | 山西 | 辽宁 | 福建 | 浙江 | 江西</span></p>
        </div>
        <div class="com-market mk-list">
            <p class="title "><span class="icon"></span><span class="mk-title">普调市场</span></p>
            <p ><span class="mk-detail">甘肃 | 云南 | 广西 | 吉林 | 宁夏 | 黑龙江</span></p>
            <p class="last-detail "><span class="mk-detail">河北 | 贵州 | 山东</span></p>
        </div>
    </div>
    <div class=" show-btn" type="1" id="show-btn"></div>
</div>

</body>
{include './part/addJs.tpl'}
<script>

</script>
</html>