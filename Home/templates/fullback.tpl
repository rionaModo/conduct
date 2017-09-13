<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>满返活动中心</title>
    {include './part/addCss.tpl'}
    <script type="text/javascript">
    	var dlmallDomain = "{$evnCfg['dlmall']['baseUrl']}"
    </script>
</head>
<body>
	<div class="container clearfix">
		<input id="activityId" type="hidden" value="{$fullbackRule.data.fullBackActivity.activityId}">
		<div class="fullback-content">
			<div class="header-title head-color">
				<h1>{$fullbackRule.data.fullBackActivity.activityName}</h1>
				<h4>{$fullbackRule.data.fullBackActivity.dealerName}</h4>
				{if $fullbackRule.data.fullBackActivity.startTime && $fullbackRule.data.fullBackActivity.startTime|strlen > '10' && $fullbackRule.data.fullBackActivity.endTime && $fullbackRule.data.fullBackActivity.endTime|strlen > '10'}
				<h5>{$fullbackRule.data.fullBackActivity.startTime|mb_substr:0:4}年{$fullbackRule.data.fullBackActivity.startTime|mb_substr:5:2}月{$fullbackRule.data.fullBackActivity.startTime|mb_substr:8:2}日 - {$fullbackRule.data.fullBackActivity.endTime|mb_substr:0:4}年{$fullbackRule.data.fullBackActivity.endTime|mb_substr:5:2}月{$fullbackRule.data.fullBackActivity.endTime|mb_substr:8:2}日</h5>
				{/if}
			</div>
			<div class="header-rules">
					<div class="rules-title-top"></div>
					<div class="rules-content">
						<div class="rules-detail">
							<h4>活动时间内：</h4>
							<h5>购买{$fullbackRule.data.fullBackActivity.activityName}活动商品
								{foreach from=$fullbackRule.data.fullBackActivity.fullbackRules key=k item=i}
									<!-- 满额 -->
									{if $i.calculateUnit == '01'}
										<!-- 每满返 -->
										{if $i.ruleType == '1' && $i.classRank == '0'}
										每满{$i.classAmt/100}元，返{$i.fullBackAmt/100}元红包{$i.fullBackNumber}个;
										<!-- 满返数组 -->
										{else}
										满{$i.classAmt/100}元，返{$i.fullBackAmt/100}元红包{$i.fullBackNumber}个;
										{/if}
									{/if}
								{/foreach}
								</h5>
						  <h5>获得的红包可用于购买该经销商 {$fullbackRule.data.availGoodsCount} 款商品</h5>
							<h5 class="red-color">*订单完成后5-10分钟后获得活动红包。</h5>
							<h5 class="red-color">*红包数量有限，送完即止。</h5>
							{if $fullbackRule.data.fullBackActivity.extendFiled1 == '00' || $fullbackRule.data.fullBackActivity.extendFiled1 == '01' }
								<h5 class="red-color">*不可与其他促销优惠同享。</h5>
								<!-- <h5 class="red-color">*促销优惠金额不算做订单金额。</h5> -->
							{else}
								{if $fullbackRule.data.fullBackActivity.extendFiled1 == '10'}
									<h5 class="red-color">*促销优惠金额不算做订单金额。</h5>
								{/if}
							{/if}			

							{if $fullbackRule.data.fullBackActivity.extendFiled2 == '00' || $fullbackRule.data.fullBackActivity.extendFiled2 == '01'}
								<!-- <h5 class="red-color">*优惠券，经销商红包抵扣金额不算做订单金额。</h5> -->
								<h5 class="red-color">*使用了经销商红包或优惠券的订单无法获得红包。</h5>	
							{else}
								{if $fullbackRule.data.fullBackActivity.extendFiled2 == '10'}
									<h5 class="red-color">*优惠券，经销商红包抵扣金额不算做订单金额。</h5>	
								{/if}
							{/if}	
							<h5 class="red-color">*活动奖品由{$fullbackRule.data.fullBackActivity.dealerName}经销商提供。</h5>			
						</div>
					</div>
					<div class="rules-title-bottom"></div>
			</div>
			<div class="activity-goods">
				<div class="sub-title">
					<a href="javascript:void(0);">全部活动商品></a>
				</div>
				<div class="activity-goods-list">
					<div class="goods-title">
						<h1>活动商品</h1>
						<img src="../resource/images/fullback/activtiy-arrow.png">
					</div>
					<a href="javascript:void(0);" id="carousel-pre"></a>
						<ul>
						{foreach from=$fullbackRule.data.promotionGoodsList key=k item=activityGoodItem}
							<li>
								<div class="goods-item">
									<!-- url要变更 -->
									<a href="javascript:void(0)" onclick="window.open('{$evnCfg['dlmall']['baseUrl']}/goods/detail.html?goodsId={$activityGoodItem.goodsId}')">
										{if $activityGoodItem.isFullReduction == "1" || $activityGoodItem.isFullPrensentation == "1" || $activityGoodItem.isLimitRule == "1" }
											<img class="promotion-bkg" src="../resource/images/fullback/promotion-logo.png">
										{/if}
										{if $activityGoodItem.recommended}
											<img class="recommend-bkg" src="../resource/images/fullback/recommend.png">
										{/if}
										{if $activityGoodItem.saveUrl}
											<img class="good-pic" src="{$activityGoodItem.saveUrl}@210w_220h">
										{else}
											<img class="good-pic" src="../resource/images/fullback/noneimg.jpg">
										{/if}
									</a>
									{if $activityGoodItem.sellingPeriodType == '2' && !$activityGoodItem.theSellTimeStatus}
										<div class="selling-period">
											<p style="margin-top: 8px;">该商品售卖时间为：</p>
											<p>{$activityGoodItem.sellStartTime} - {$activityGoodItem.sellEndTime}</p>
										</div>
									{/if}
									<div class="goods-info">
										<p class="goods-name" title="{$activityGoodItem.goodsName}">
											<a href="javascript:void(0)" onclick="window.open('{$evnCfg['dlmall']['baseUrl']}/goods/detail.html?goodsId={$activityGoodItem.goodsId}')">
												{$activityGoodItem.goodsName|truncate:32:''}
											</a>
										</p>

										{if $activityGoodItem.price1 > 99 && $activityGoodItem.price1|mb_substr:($activityGoodItem.price1|strlen-2):2 == '00'} 
											<p>丹露价：<span class="price">￥{$activityGoodItem.price1/100}.00</span>/{$activityGoodItem.packagesTypePropertyValue}</p>
										{else}
											<p>丹露价：<span class="price">￥{$activityGoodItem.price1/100|string_format:'%.2f'}</span>/{$activityGoodItem.packagesTypePropertyValue}</p>
										{/if}

										<p class="icon-flag">
											<!-- 积分功能还没有暂时隐藏 -->
											<img style="display:none;" src="../resource/images/fullback/add-icon.png">
											{if $activityGoodItem.isFullReduction == "1" || $activityGoodItem.isFullPrensentation == "1" || $activityGoodItem.isLimitRule == "1" }
												<img src="../resource/images/fullback/cu-icon.png">
											{/if}
											{if $activityGoodItem.fullBack}
												<img src="../resource/images/fullback/money-icon.png">
											{/if}
											{if $activityGoodItem.dealerFlag}
												<img src="../resource/images/fullback/ticket.png">
											{/if}
										</p>
										<p>
											<img src="../resource/images/fullback/home.png"><span class="seller-infor">{$activityGoodItem.sellerName}</span>
											{if $activityGoodItem.theGoodsStatus == '1'}
												<span class="no-goods">【无货】</span>
											{/if}
										</p>
									</div>
								</div>
							</li>	
						{/foreach}
						</ul>
					<a href="javascript:void(0);" id="carousel-next"></a>
				</div>
			</div>
			<div class="available-coupon-goods">
				<div class="sub-acg-title">
					<a href="javascript:void(0);">全部活动商品></a>
				</div>
				<div class="acg-list">
					<div class="acg-goods-title">
						<h1>红包可用商品</h1>
						<img src="../resource/images/fullback/coupon-arrow.png">
					</div>	
					<a href="javascript:void(0);" id="carousel-coupon-pre"></a>
					<ul>
						{foreach from=$fullbackRule.data.couponPromotionGoodsList key=k item=couponGoodItem}
						<li>
							<div class="acg-goods-item">
								<a href="javascript:void(0)" onclick="window.open('{$evnCfg['dlmall']['baseUrl']}/goods/detail.html?goodsId={$couponGoodItem.goodsId}')">
									{if $couponGoodItem.isFullReduction == "1" || $couponGoodItem.isFullPrensentation == "1" || $couponGoodItem.isLimitRule == "1" }
										<img class="promotion-bkg" src="../resource/images/fullback/promotion-logo.png">
									{/if}
									{if $couponGoodItem.recommended}
										<img class="recommend-bkg" src="../resource/images/fullback/recommend.png">
									{/if}
									{if $couponGoodItem.saveUrl}
										<img class="good-pic" src="{$couponGoodItem.saveUrl}@210w_220h">
									{else}
										<img class="good-pic" src="../resource/images/fullback/noneimg.jpg">
									{/if}
								</a>
								{if $couponGoodItem.sellingPeriodType == '2' && !$couponGoodItem.theSellTimeStatus}
									<div class="selling-period">
										<p style="margin-top: 8px;">该商品售卖时间为：</p>
										<p>{$couponGoodItem.sellStartTime} - {$couponGoodItem.sellEndTime}</p>
									</div>
								{/if}
								<div class="goods-info">
									<p class="goods-name" title="{$couponGoodItem.goodsName}">
										<a href="javascript:void(0)" onclick="window.open('{$evnCfg['dlmall']['baseUrl']}/goods/detail.html?goodsId={$couponGoodItem.goodsId}')">
											{$couponGoodItem.goodsName|truncate:32:''}
										</a>
									</p>
									{if $couponGoodItem.price1 > 99 && $couponGoodItem.price1|mb_substr:($couponGoodItem.price1|strlen-2):2 == '00'} 
										<p>丹露价：<span class="price">￥{$couponGoodItem.price1/100}.00</span>/{$couponGoodItem.packagesTypePropertyValue}</p>
									{else}
										<p>丹露价：<span class="price">￥{$couponGoodItem.price1/100|string_format:'%.2f'}</span>/{$couponGoodItem.packagesTypePropertyValue}</p>
									{/if}
									<p class="icon-flag">
										<!-- 积分功能还没有暂时隐藏 -->
										<img style="display:none;" src="../resource/images/fullback/add-icon.png">
										{if $couponGoodItem.isFullReduction == "1" || $couponGoodItem.isFullPrensentation == "1" || $couponGoodItem.isLimitRule == "1" }
										<img src="../resource/images/fullback/cu-icon.png">
										{/if}
										{if $couponGoodItem.fullBack}
										<img src="../resource/images/fullback/money-icon.png">
										{/if}
										{if $couponGoodItem.dealerFlag}
											<img src="../resource/images/fullback/ticket.png">
										{/if}
									</p>
									<p>
										<img src="../resource/images/fullback/home.png">
										<span class="seller-infor">{$activityGoodItem.sellerName}</span>
										{if $couponGoodItem.theGoodsStatus == '1'}
											<span class="no-goods">【无货】</span>
										{/if}
									</p>
								</div>
							</div>
						</li>
						{/foreach}
					</ul>
					<a href="javascript:void(0);" id="carousel-coupon-next"></a>
				</div>
			</div>
		</div>
	</div>
  {include './part/addJs.tpl'}
</body>
</html>