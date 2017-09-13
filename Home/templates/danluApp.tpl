
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge,chrome=1">
    <meta name="renderer" content="webkit">
    <title>掌上丹露</title>
    {include './part/addCss.tpl'}

</head>




<div class="header">
    <div class="web">
        <ul class="nav1">
            <li style="width:85px"><a href="http://www.danlu.com/main/province.html" class="foc" id="color4">首 页</a></li>
            <li style="width:85px"><a href="http://www.danlu.com/common/chazhaoshang.html" id="color3">茶招商</a></li>
            <li style="width:85px"><a href="http://news.danlu.com/news-mall/foreground/newsChoice/NewsChoiceInit.html?news_kinds=all" id="color5" target="_blank">资讯</a></li>
        </ul>
        <div class="serch">
            <div class="idserch">
                <div class="serch_select left" style="margin-top: 6px;">
                    <div class="serch_select_a">
                        <div code="B011">白酒</div>
                        <u>&nbsp;</u>
                    </div>
                    <ul class="serch_ul" style="display: none;">
                        <li code="B011">白酒</li>
                        <li code="B012">葡萄酒</li>
                        <li code="B013">茶</li>
                    </ul>
                </div>
                {literal}      <input id="headerSearchText" style="color: black;" type="text" onkeydown="if(event.keyCode==13){$('#headerSearchButton').click()}">{/literal}
            </div>
        </div>
        <div class="phonedown_left"><p><i>&nbsp;</i><a href="http://web.danlu.com/danluApp.html" style="color: white;font-size: 14px;" target="_Blank" class="danluApp">掌上丹露</a></p></div>
    </div>
</div>








<div class="app-nav group">
    <div class="container clearfix">
        <img src="{$STATIC_PRE}/resource/images/app/logo.png" alt="" class="fl">
        <div class="fr">
            <a href="javascript:" data-app="terminal" class="terminal btn">丹露终端店app</a>
            <a href="javascript:" data-app="dealer" class="dealer btn active">丹露经销商app</a>
        </div>
    </div>
</div>


<div id="app_dealer" class="app-container" style="display: block;">
    <div class="banner dealer">
        <div class="container">
            <div class="phone_shadow"></div>
            <div class="qrcode">
                <img src="{$STATIC_PRE}/resource/images/app/dealer_qrcode.png" alt="">
            </div>
            <div class="download">
                <a href="https://itunes.apple.com/us/app/dan-lu-jing-xiao-shang/id1091985013?l=zh&ls=1&mt=8" target="_blank"><img src="{$STATIC_PRE}/resource/images/app/iOS_download.png" alt=""></a>
                <a href="http://asset.danlu.com/mobile/client/android/danlu_dealer.apk" target="_blank"><img src="{$STATIC_PRE}/resource/images/app/Android_download.png" alt=""></a>
            </div>
            <div class="banner-list">
                <div class="text-list">
                    <div class="carousel">
                        <div class="wrap group">
                            <div class="carousel-item" style="display: block;">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b1_text.png" alt="" class="text">
                            </div>
                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b2_text.png" alt="" class="text">
                            </div>
                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b3_text.png" alt="" class="text">
                            </div>
                        </div>
                        <div class="carousel-control">
                            <div class="carousel-btns">
                                <div class="carousel-btn cur"></div>
                                <div class="carousel-btn"></div>
                                <div class="carousel-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-list">
                    <div class="carousel">
                        <div class="wrap group">
                            <div class="carousel-item" style="display: block;">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b1_p.png" alt="" class="phone">
                            </div>

                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b2_p.png" alt="" class="phone">
                            </div>

                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/dealer_b3_p.png" alt="" class="phone">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="phone_frame"></div>
                <div class="phone_shadow"></div>
            </div>
        </div>
    </div>

    <div class="container steps">
        <h2 class="dealer">丹露经销商APP：【经销商的买卖助手】</h2>

        <div class="step1">
            <img src="{$STATIC_PRE}/resource/images/app/dealer_steps1.jpg" alt="">
            <div class="step-tip">（请先在电脑端注册账号&nbsp;&nbsp;<a href="http://www.danlu.com/main/showIndentity.html?indentity=2" target="_blank">点击注册</a>>）</div>
        </div>
        <div class="step2">
            <img src="{$STATIC_PRE}/resource/images/app/dealer_steps2.jpg" alt="">
        </div>
    </div>

    <div class="fixed-qrcode dealer">
        <img src="{$STATIC_PRE}/resource/images/app/dealer_qrcode.png" alt="">
        <div class="t">丹露经销商</div>
    </div>

</div>

<div id="app_terminal" class="app-container">
    <div class="banner terminal">
        <div class="container">
            <div class="phone_shadow"></div>
            <div class="qrcode">
                <img src="{$STATIC_PRE}/resource/images/app/terminal_qrcode.png" alt="">
            </div>
            <div class="download">
                <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=971492968&mt=8" target="_blank"><img src="{$STATIC_PRE}/resource/images/app/iOS_download.png" alt=""></a>
                <a href="http://asset.danlu.com/mobile/client/android/danlu_store.apk" target="_blank"><img src="{$STATIC_PRE}/resource/images/app/Android_download.png" alt=""></a>
            </div>
            <div class="banner-list">
                <div class="text-list">
                    <div class="carousel">
                        <div class="wrap group">
                            <div class="carousel-item" style="display: block;">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b1_text.png" alt="" class="text">
                            </div>
                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b2_text.png" alt="" class="text">
                            </div>
                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b3_text.png" alt="" class="text">
                            </div>
                        </div>
                        <div class="carousel-control">
                            <div class="carousel-btns">
                                <div class="carousel-btn cur"></div>
                                <div class="carousel-btn"></div>
                                <div class="carousel-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-list">
                    <div class="carousel">
                        <div class="wrap group">
                            <div class="carousel-item" style="display: block;">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b1_p.png" alt="" class="phone">
                            </div>

                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b2_p.png" alt="" class="phone">
                            </div>

                            <div class="carousel-item">
                                <img src="{$STATIC_PRE}/resource/images/app/terminal_b3_p.png" alt="" class="phone">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <a href="javascript:" class="banner-pre"></a>
                <a href="javascript:" class="banner-next"></a> -->
                <div class="phone_frame"></div>
                <div class="phone_shadow"></div>
            </div>
        </div>
    </div>

    <div class="container steps">
        <h2 class="terminal">丹露终端店APP：【店铺老板的掌上管家】</h2>

        <div class="step1">
            <img src="{$STATIC_PRE}/resource/images/app/terminal_steps1.jpg" alt="">
            <div class="step-tip">（请先在电脑端注册账号&nbsp;&nbsp;<a href="http://www.danlu.com/registerEasy/terminal-step1.html" target="_blank">点击注册</a>>）</div>
        </div>
        <div class="step2">
            <img src="{$STATIC_PRE}/resource/images/app/terminal_steps2.jpg" alt="">
        </div>
    </div>

    <div class="fixed-qrcode terminal">
        <img src="{$STATIC_PRE}/resource/images/app/terminal_qrcode.png" alt="">
        <div class="t">丹露终端店</div>
    </div>


</div>


{include './common/footer.tpl'}


{include './part/addJs.tpl'}
</body>
</html>