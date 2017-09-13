<?php
/**
 * Created by PhpStorm.
 * User: danlu
 * Date: 2016/10/17
 * Time: 20:55
 */
return array(
    'router' => array(  //路由的key用rooter后的路径   如//router/coupon/detail  key=coupon/detail

        'data_show/order_data'=>array(  //订单数据
            'dataKey2'=>array(
           //     baseUrl=>'http://data.danlu.com/',
                'uri'=> '/data_show/order_data',
                'method'=>'GET'
            )
        ),
        'data_show/coupon_data'=>array(  //订单数据
            'dataKey2'=>array(
           //     baseUrl=>'http://data.danlu.com/',
                'uri'=> '/data_show/coupon_data',
                'method'=>'GET'
            )
        ),
        'data_show/trade_data'=>array(  //总量数据
            'dataKey2'=>array(
         //       baseUrl=>'http://data.dev63.idanlu.com/',
                'uri'=> '/data_show/trade_data',
                'method'=>'GET'
            )
        )
    )
);