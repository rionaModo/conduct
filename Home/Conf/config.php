<?php
/**
 * Created by PhpStorm.
 * User: danlu
 * Date: 2016/12/13
 * Time: 9:48
 */

define('PRIVI_ROOT', dirname(realpath('./')) . '/danlu.com');                       //网站公用路径define('PRIVI_ROOT', dirname(realpath('./')) . '/m.danlu.com');                       //网站私有路径
define('TEMPLATE_PATH', PRIVI_ROOT . '/templates');                               //所有项目公共模板路径
define('RESOURCES_PATH', PRIVI_ROOT . '/resources');                             //公共资源路径
define('RESOURCES_CFG', PRIVI_ROOT . '/sourceCfg');                             //资源配置路径
define('EVN_CFG', PRIVI_ROOT . '/evn_cfg/cfg.php');                      //环境配置路径，不同的环境配置不同




$PRIVI_ROOT=dirname(dirname(__FILE__));
return array(
    //'配置项'=>'配置值'
    'PRIVI_ROOT' =>  $PRIVI_ROOT, //模块目录
    'TEMPLATE_PATH' => $PRIVI_ROOT.'/templates', //模板目录
    'ROOT_PATH'=>$PRIVI_ROOT.'/Root', //路由地址
    'TMP_RENDER'=>true, //是否开启模渲染
    'MODEL'=>'Home'
);

