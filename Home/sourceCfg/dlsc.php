<?php
/**
 * Created by PhpStorm.
 * User: danlu
 * Date: 2016/10/17
 * Time: 21:01
 */
return array(
    'tpl' => array(
        'getcoupon'=>array(
           /* 'dataKeydetaildatw'=>array(
                'uri'=> '/sc/V1/dealer/getCenterCouponDetail',
                'method'=> 'POST',
                'qs'=>array(
                    "companyId"=> "",
                    "dealerCouponType"=> "10",
                    "dealerCouponStatus"=>"01"
                )
            )*/
        ),
        'loginPageTest'=>array(),
        'businesscoupon'=>array(
            'coupon'=>array(
                'uri'=> '/sc/V1/dealerCoupon/getCenterCouponDetail',
                'method'=> 'POST',
                'qs'=>array(
                    "companyId"=> empty($_GET['companyId'])?'':$_GET['companyId'],
                    "dealerCouponType"=> "10",
                    "showWay"=> "0",
                    "pageIndex"=> 1,
                    "pageSize"=> 10
                )
            ),
            'packets'=>array(
                'uri'=> '/sc/V1/dealerCoupon/getCenterCouponDetail',
                'method'=> 'POST',
                'qs'=>array(
                    "companyId"=> empty($_GET['companyId'])?'':$_GET['companyId'],
                    "dealerCouponType"=> "11",
                    "categoryCode"=> "C01L0101",
                    "showWay"=> "0",
                    "dealerName"=>empty($_GET['dealerName'])?null:$_GET['dealerName'],
                    "pageIndex"=> 1,
                    "pageSize"=> 10,
                    "sortParams"=>"default"
                )
            ),
            'brands'=>array(
                'uri'=> '/sc/V1/dealerCoupon/getBrands',
                'method'=> 'GET',
                'qs'=>array(
                    "categoryCodesStr"=> "C01L0101"
                )
            )
        ),
        'fullback'=>array(
            'fullbackRule'=>array(
                'uri'=> '/sc/V1/fullBack/getActivityByGoodsId.html',
                'method'=> 'POST',
                'qs'=>array(
                    "goodsId"=> empty($_GET['goodsId'])?'':$_GET['goodsId'],
                    "buyerArea"=> empty($_GET['buyerArea'])?'':$_GET['buyerArea'],
                    "buyerType"=> '02',
                    "buyerId"=> empty($_GET['buyerId'])?'':$_GET['buyerId'],
                    "shopType"=>empty($_GET['shopType'])?'':$_GET['shopType'] ,
                    "pageIndex"=>1,
                    "pageSize"=> 12
                )
            )
        )
    ),
    'router' => array(  //路由的key用rooter后的路径   如//router/coupon/detail  key=coupon/detail
        'root_getCouper'=>array(
            'dataKey2'=>array(
                'method'=>'GET',
                'data'=>array(),
                'path'=>''
            )
        ),
        'dealer/share_dealer_trading'=>array(  //链接领券 立即领取
            'dataKey2'=>array(
                'uri'=> '/sc/V1/dealer/share_dealer_trading',
                'method'=>'POST',
                'qs'=>"{$rawdata}"
            )
        ),
        //coupon页面st
        'activity/chance'=>array(
            'chance'=>array(
                'uri'=> '/sc/V1/activity/ticket',
                'method'=>'GET',
                'qs'=>array(
                    'activityId'=>empty($_GET['activityId'])?'':$_GET['activityId'],
                    'companyId'=>empty($_GET['companyId'])?'':$_GET['companyId']
                )
            )
        ),
        'activity/roll'=>array(
            'chance'=>array(
                'uri'=> '/sc/V1/activity/create_trading',
                'method'=>'POST',
                'qs'=>array(
                    'activityId'=>empty($_GET['activityId'])?'':$_GET['activityId'],
                    'companyId'=>empty($_GET['companyId'])?'':$_GET['companyId']
                )
            )
        ),
        'activity/award_list'=>array(
            'chance'=>array(
                'uri'=> '/sc/V1/issue',
                'method'=>'GET',
                'qs'=>array(
                    'activityId'=>empty($_GET['activityId'])?'':$_GET['activityId'],
                    'activityType'=>empty($_GET['activityType'])?'':$_GET['activityType']
                )
            )
        ),//coupon页面end
        //领券中心
        'dealerCoupon/getCenterCouponDetail'=>array(//优惠券信息 领券中心
            'chance'=>array(
                'uri'=> '/sc/V1/dealerCoupon/getCenterCouponDetail',
                'method'=>'POST',
                'qs'=>"{$rawdata}"
            )
        ),
        'dealer/create_dealer_trading'=>array(//领券中心 立即领取
            'chance'=>array(
                'uri'=> '/sc/V1/dealer/create_dealer_trading',
                'method'=>'POST',
                'qs'=>"{$rawdata}"
            )
        ),
        'dealerCoupon/nameMatching'=>array(//领券中心 店铺联想
            'chance'=>array(
                'uri'=> '/sc/V1/dealerCoupon/nameMatching',
                'method'=>'GET',
                'qs'=>array(
                    'dealerName'=>empty($_GET['dealerName'])?'':$_GET['dealerName'],
                    'companyType'=>empty($_GET['companyType'])?'':$_GET['companyType'],
                    'pageIndex'=>empty($_GET['pageIndex'])?1:$_GET['pageIndex'],
                    'pageSize'=>empty($_GET['pageSize'])?10:$_GET['pageSize']
                )
            )
        ),
        'dealerCoupon/goodsMatching'=>array(//领券中心 商品联想
            'chance'=>array(
                'uri'=> '/sc/V1/dealerCoupon/goodsMatching',
                'method'=>'GET',
                'qs'=>array(
                    'goodsName'=>empty($_GET['goodsName'])?'':$_GET['goodsName'],
                    'pageIndex'=>empty($_GET['pageIndex'])?1:$_GET['pageIndex'],
                    'pageSize'=>empty($_GET['pageSize'])?10:$_GET['pageSize']
                )
            )
        ),
        'dealerCoupon/getBrands'=>array(//领券中心 根据类目Code，字母或者品牌名称查询品牌
            'chance'=>array(
                'uri'=> '/sc/V1/dealerCoupon/getBrands',
                'method'=>'GET',
                'qs'=>array(
                    'categoryCodesStr'=>empty($_GET['categoryCodesStr'])?'':$_GET['categoryCodesStr'],
                    'initial'=>empty($_GET['initial'])?null:$_GET['initial']
                )
            )
        ),
        'sc/V1/activity/fullInfo'=>array(//活动页 获取下一轮活动
            'chance'=>array(
                'uri'=> '/sc/V1/activity/fullInfo',
                'method'=>'GET',
                'qs'=>array(
                    'activityId'=>empty($_GET['activityId'])?'':$_GET['activityId']
                )
            )
        )
    )
);