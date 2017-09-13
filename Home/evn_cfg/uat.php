<?php

define('STATIC_PRE', 'http://static.danlu.com/dlmain');                                    //静态资源前缀,最后无‘/’;
define('EVN_NAME', 'uat');                                                             //环境配置--开发环境
define('STATIC_FROM', "yes");                                                             //是否采用压缩文档


define('REDIS_IP','codis.web.idanlu.com');                                           //配置 redis 的ip
define('REDIS_PORT','80');                                                   //配置redis的端口



$GLOBALS['ssoCfg']=array(                                                               //sso 配置
    "login"=>"http://sso.uat.idanlu.com/login",
    "auth"=>"http://sso.uat.idanlu.com/serviceValidate",
    "logout"=>"http://sso.uat.idanlu.com/logout"
);
$GLOBALS['evnCfg']=array(
    'dlsc'=>array(
        'baseUrl'=>'http://sc.uat.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlsc.php'
    ),
    'dluc'=>array(
        'baseUrl'=>'uc.uat.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dluc.php'
    ),
    'dlic'=>array(
        'baseUrl'=>'http://ic.uat.idanlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlic.php'
    )
);
$GLOBALS['privateSrc']=array();                        //定义工程所需的具体功能配置
$GLOBALS['privateSrc']['activitySrc']=R_ROOT.'/common/businessCfg/activity.json'; //抽奖活动配置文件地址