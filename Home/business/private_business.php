<?php
/**
 * Created by PhpStorm.
 * User: danlu
 * Date: 2016/12/15
 * Time: 16:37
 */
function page_coupon_business(){
    $redis=$GLOBALS['redis'];
    $province='default';
    $userInfo=$redis->get('userInfo');
    $ACT_INFO['winningList']=array();
    $ACT_INFO['userActivity']=array();
    $ACT_INFO['lucky']=array();
    $userActivity=array();
    if(empty($userInfo)){
        if (!empty($_GET['ticket'])) {//没有用户信心但是具有ticket
            $companyInfo= Base::userInfoHandle($_GET['ticket']);
            $userInfo=$companyInfo;
           //  $userInfo=Base::$redis->set('userInfo',$companyInfo);  //将用户信息存入redis
            $GLOBALS['smarty']->assign('userInfo', $userInfo);
        }
    }
    if($userInfo){
        $GLOBALS['smarty']->assign('userInfo', $userInfo);
        $province = substr(trim($userInfo['regAreaCode']),0,7);
        $companyId = $userInfo['companyId'];
        $ACT_INFO=array();
        $activity=array();
        $activityConfig=trim(file_get_contents($GLOBALS['privateSrc']['activitySrc']));
        $winningList=trim(file_get_contents(R_ROOT.'/common/businessCfg/winningList.json'));
        if(is_array(json_decode($activityConfig,true))){
            $activityConfig=json_decode($activityConfig,true);
        }
        if(is_array(json_decode($winningList,true))){
            $winningList=json_decode($winningList,true);
        }
        $userActivity = empty($activityConfig[$province])?$activityConfig['default']:$activityConfig[$province];
        $ACT_INFO['winningList']=$winningList;
        $ACT_INFO['userActivity']=$userActivity;
        $ACT_INFO['lucky']=array();
     //   $ACT_INFO['lottery']=array();
        $qs=array(//抢券请求参数
            'areaCode'=> trim($userInfo['regAreaCode']),
            'companyType'=> $userInfo['companyType'],
            'activityType'=> '02'
        );
        $qsC=array(//抽奖
            //
            //
            //请求参数
            'areaCode'=> trim($userInfo['regAreaCode']),
            'companyType'=> $userInfo['companyType'],
            'activityType'=> '03'
        );
        $recent=curl_get_contents($GLOBALS['evnCfg']['dlsc']['baseUrl'].'/sc/V1/activity/recent',$qs);//抢券
        $lottery=curl_get_contents($GLOBALS['evnCfg']['dlsc']['baseUrl'].'/sc/V1/activity/recent',$qsC);//抽奖
       // $lottery=curl_get_contents($GLOBALS['evnCfg']['dlsc']['baseUrl'].'/sc/V1/activity/'.(empty($userActivity['lottery'])?'':$userActivity['lottery']));
        if(is_array(json_decode($recent,true))){
            $recent=json_decode($recent,true);
        }
        if(is_array(json_decode($lottery,true))){
            $lottery=json_decode($lottery,true);
        }
        $nowDate=time()*1000;
        if(!empty($recent)&&!empty($recent['data'])){
            $activity[]=empty($recent['data'][0])?null:$recent['data'][0];
            $activity[]=empty($recent['data'][1])?null:$recent['data'][1];
        }else{
         //   echo  '获取最近抢红失败';
        }
        if(!empty($lottery)&&!empty($lottery['data'])){
            $activity[]=empty($lottery['data'][0])?null:$lottery['data'][0];
            $activity[]=empty($lottery['data'][1])?null:$lottery['data'][1];
        }else{
            //   echo  '获取最近抢红失败';
        }
     /* if(!empty($lottery)&&!empty($lottery['data'])){
          $list=empty($lottery['data'][0])?$lottery['data']:$lottery['data'][0];
          $ACT_INFO['lottery']=$list;
          $ACT_INFO['lottery']['startLeft']=date_timestamp_get(date_create($list['startTime']))*1000-$nowDate;
          $ACT_INFO['lottery']['endLeft']=date_timestamp_get(date_create($list['endTime']))*1000-$nowDate;
      } else {
          $ACT_INFO['lottery']=null;
       //   echo '获取抽奖活动信息失败';
      }*/
        foreach ($activity as $key => $val) {
            if (empty($val)) {
                continue;
            }
            $activity[$key]['startLeft'] = date_timestamp_get(date_create($val['startTime']))*1000 - $nowDate;
            $activity[$key]['endLeft'] = date_timestamp_get(date_create($val['endTime']))*1000 - $nowDate;
        }
        empty($activity[0])?$ACT_INFO['lucky']['pre']=null:$ACT_INFO['lucky']['pre']=$activity[0];
        empty($activity[1])?$ACT_INFO['lucky']['next']=null:$ACT_INFO['lucky']['next']=$activity[1];
        empty($activity[2])?$ACT_INFO['lottery']['pre']=null:$ACT_INFO['lottery']['pre']=$activity[2];
        empty($activity[3])?$ACT_INFO['lottery']['next']=null:$ACT_INFO['lottery']['next']=$activity[3];


    }
    $GLOBALS['smarty']->assign('userActivity', $userActivity);
    $GLOBALS['smarty']->assign('ACT_INFO', $ACT_INFO);
}
