<?php
/**
 * Created by PhpStorm.
 * User: danlu
 * Date: 2016/10/17
 * Time: 20:43
 */
define('STATIC_PRE', 'http://static.danlu.com/dlmain');                                    //静态资源前缀,最后无‘/’;
define('EVN_NAME', 'prod');                                                             //环境配置--开发环境
define('STATIC_FROM', "yes");                                                             //是否采用压缩文档

define('REDIS_IP','10.171.134.153');                                           //配置 redis 的ip
define('REDIS_PORT','19001');                                                   //配置redis的端口



$GLOBALS['ssoCfg']=array(                                                               //sso 配置
    "login"=>"http://sso.danlu.com/login",
    "auth"=>"http://sso.danlu.com/serviceValidate",
    "logout"=>"http://sso.danlu.com/logout"
);


$GLOBALS['evnCfg']=array(
    'dlsc'=>array(
        'baseUrl'=>'http://sc.danlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlsc.php'
    ),
    'dluc'=>array(
        'baseUrl'=>'uc.danlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dluc.php'
    ),
    'dlic'=>array(
        'baseUrl'=>'http://ic.danlu.com',
        'sourceCfg'=>RESOURCES_CFG.'/dlic.php'
    )
);

$GLOBALS['privateSrc']=array();                        //定义工程所需的具体功能配置
$GLOBALS['privateSrc']['activitySrc']=R_ROOT.'/common/businessCfg/activity.json'; //抽奖活动配置文件地址