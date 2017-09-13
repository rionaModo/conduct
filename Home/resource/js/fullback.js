$(function(){	
	//查看全部活动商品
	$(".sub-title a").on('click',function(){
		console.log("hello world!--a");
		var id = $("#activityId").val();
		var reqdata={
			activityId:id,
			indicate:'0'	//是	String	0-活动商品；1-红包商品
		}
		window.parent.location.href = dlmallDomain+"/goods/toGoodsListView.html?activityId="+$("#activityId").val()+"&indicate=0";
	})
	//查看红包可用商品
	$(".sub-acg-title a").on('click',function(){
		console.log("hello world!--c");
		var id = $("#activityId").val();
		var reqdata={
			activityId:id,
			indicate:'1'	//是	String	0-活动商品；1-红包商品
		}
		window.parent.location.href = dlmallDomain+"/goods/toGoodsListView.html?activityId="+$("#activityId").val()+"&indicate=1";
	})

	//可用红包商品列表轮播
	var carouObjm = new Object();
	if($(".acg-list ul>li").length>4){
			carouObjm.items = 4;
		}
	carouObjm.auto = true;
	carouObjm.scroll = {duration:1000, items:4, pauseOnHover:true};
	carouObjm.circular = true;
	carouObjm.infinite = false;
	carouObjm.prev = "#carousel-coupon-pre";
	carouObjm.next = "#carousel-coupon-next";
	$(".acg-list ul").carouFredSel(carouObjm);


	//活动商品列表轮播
	var carouObja = new Object();
	if($(".activity-goods-list ul>li").length>4){
			carouObjm.items = 4;
		}
	carouObja.auto = true;
	carouObja.scroll = {duration:1000, items:4, pauseOnHover:true};
	carouObja.circular = true;
	carouObja.infinite = false;
	carouObja.prev = "#carousel-pre";
	carouObja.next = "#carousel-next";
	$(".activity-goods-list ul").carouFredSel(carouObja);

	$(".acg-list ul").hover(function() {
		$("#carousel-coupon-pre").css("background",'url("../resource/images/fullback/hover-left-icon.png") no-repeat');
		$("#carousel-coupon-next").css("background",'url("../resource/images/fullback/hover-right-icon.png") no-repeat');
	}, function() {
		$("#carousel-coupon-pre").css("background",'');
		$("#carousel-coupon-next").css("background",'');
	});

	$(".activity-goods-list ul").hover(function() {
		$("#carousel-pre").css("background",'url("../resource/images/fullback/hover-left-icon.png") no-repeat');
		$("#carousel-next").css("background",'url("../resource/images/fullback/hover-right-icon.png") no-repeat');
	}, function() {
		$("#carousel-pre").css("background",'');
		$("#carousel-next").css("background",'');
	});
	
});