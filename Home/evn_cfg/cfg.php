<?php

define('STATIC_PRE', '/dlmain');                                    //\u9759\u6001\u8d44\u6e90\u524d\u7f00,\u6700\u540e\u65e0\u2018/\u2019;
define('EVN_NAME', 'prod');                                                             //\u73af\u5883\u914d\u7f6e--\u5f00\u53d1\u73af\u5883
define('STATIC_FROM', "no");                                                             //\u662f\u5426\u91c7\u7528\u538b\u7f29\u6587\u6863

define('REDIS_IP','codis.dev67.idanlu.com');                                           //\u914d\u7f6e redis \u7684ip
define('REDIS_PORT','80');                                                   //\u914d\u7f6eredis\u7684\u7aef\u53e3



$GLOBALS['ssoCfg']=array(                                                               //sso \u914d\u7f6e
    "login"=>"http://sso.web.idanlu.com/login",
    "auth"=>"http://sso.web.idanlu.com/serviceValidate",
    "logout"=>"http://sso.web.idanlu.com/logout"
);


$GLOBALS['evnCfg']=array(
    'dlsc'=>array(
        'baseUrl'=>'http://sc.web.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlsc.php'
    ),
    'dluc'=>array(
        'baseUrl'=>'http://uc.web.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dluc.php'
    ),
    'dlic'=>array(
        'baseUrl'=>'http://ic.web.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlic.php'
    ),
    'dldata'=>array(
        'baseUrl'=>'http://data.web.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dldata.php'
    )
);
$GLOBALS['privateSrc']=array();                        //定义工程所需的具体功能配置
$GLOBALS['privateSrc']['activitySrc']=R_ROOT.'/common/businessCfg/activity.json'; //抽奖活动配置文件地址