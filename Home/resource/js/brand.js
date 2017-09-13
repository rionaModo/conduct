
function branchControl (obj){
    var obj=obj;
    this.slected=$(obj.slected);
    this.searchBox=$(obj.searchBox);
    this.searchMoreBox=$(obj.searchMoreBox);
    this.MoreSelectedClass=obj.MoreSelectedClass||'band_more_'+parseInt(Math.random()*100);
    this.brandData={};
    this.brandData={categoryCodesStr:"C01L0101",brandDate:[]};
    obj.startCall(this);
    this.addChangeEvent=function(obj,fn){
        var testinput = document.createElement('input');
        if('oninput' in testinput){
            obj.addEventListener("input",fn,false);
        }else{
            obj.onpropertychange = fn;
        }
    };
    if(obj.changeData){
        this.changeData=obj.changeData;
    }
    this._start();
}
//初始化事件
branchControl.prototype._start=function(){
    var that=this;
    //更多的
    this.searchBox.find(".clear_check_cat").click(function(){
        that.showMore();
    });
    this.searchMoreBox.find(".clear_check_cat").click(function(){
        that.searchBoxShow();
    });
    //多选按钮
    this.searchBox.find(".clear_check_cat2").click(function(){
        that.showMoreSelected();
        that.searchMoreBox.find(".clear_check_cat3").show();
        that.searchMoreBox.find(".clear_check_cat2").hide();
        that.slected.find("#screeningConditions").empty();
    });
    this.searchMoreBox.find(".clear_check_cat2").click(function(){
        that.showMoreSelected();
        that.searchMoreBox.find(".clear_check_cat3").show();
        that.searchMoreBox.find(".clear_check_cat2").hide();
        that.slected.find("#screeningConditions").empty();
        that.setBrandData('brandDate',[])
    });
    this.searchMoreBox.find(".clear_check_cat3").click(function(){
        that.searchBoxShow();
        that.searchMoreBox.find(".clear_check_cat2").show();
        that.searchMoreBox.find(".clear_check_cat3").hide();
        that.searchMoreBox.find(".clear_check_cat3").hide();
        that.slected.find("#screeningConditions").empty();
        that.searchMoreBox.find("#brandUl li.sl-check input").prop('checked',false);
        that.searchMoreBox.find("#brandUl li.sl-check").removeClass('sl-check');
        that.searchMoreBox.removeClass(that.MoreSelectedClass);
        that.setBrandData('brandDate',[])

    });
    this.searchBox.find(".dl-cat-list li").click(function(){//单选品牌
        var id=$(this).attr('data-id'),
            title=$(this).attr('title'),
            data=[{id:id,title:title}]
        that.selectedInfo(data);
    });
    this.searchMoreBox.find(".sl-all").click(function(){
        that.loadBrand();
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
    })
    this.searchMoreBox.find("#letterList li").click(function(){//字母添加事件
        var obj=$(this);
        var initial= $.trim(obj.find('a').text());
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        that.searchMoreBox.find("#brandUl").empty();
        //    that.searchMoreBox.find("#selectedBrandShow").hide();
        // that.searchMoreBox.find("#brandConfirm").css("display","inline-block");
        obj.addClass("on");
        that.loadBrand({initial:initial,type:2})
    });
    this.addChangeEvent(this.searchMoreBox.find("#brandNameValue")[0],function(){//input搜索改变事件
        var obj=$(this);
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        var val=obj.val();
        that.loadBrand({brandName:val,type:3})
    })
    this.searchMoreBox.find("#searchCon").click(function(){//搜索
        that.searchMoreBox.find("#letterList li.on").removeClass("on");
        var val=that.searchMoreBox.find("#brandNameValue").val();
        that.loadBrand()
    });
    this.searchMoreBox.find("#brandUl li").click(function(){//选择品牌处理函数
        var $obj=$(this);
        that.addOneConditions($obj)
    });
}
//更多的事件handle
branchControl.prototype.showMore=function(){
    this.searchBox.hide();
    this.searchMoreBox.show();
    this.searchMoreBox.removeClass(this.MoreSelectedClass);
    this.searchMoreBox.removeClass('more_select_list');
    this.searchMoreBox.find(".clear_check_cat3").hide();
}
//多选事件handle
branchControl.prototype.showMoreSelected=function(){
    this.searchBox.hide();
    this.searchMoreBox.show();
    this.searchMoreBox.addClass(this.MoreSelectedClass);
    this.searchMoreBox.addClass('more_select_list');
}
//取消事件handle
branchControl.prototype.searchBoxShow=function(){
    this.searchBox.show();
    this.searchMoreBox.hide();
}
branchControl.prototype.selecltedBrandClick=function(obj){
    var $obj=$(obj);
    var id=$obj.attr('data-id');
    var brandAdd=this.searchMoreBox.find('#brandAdd');
    var lis=brandAdd.find('li');
    $('#'+id).removeClass('sl-check')
    if(lis.length==1){
        brandAdd.empty();
        this.searchMoreBox.find("#selectedBrandShow").hide();
        this.searchMoreBox.find("#brandConfirmSelected").hide();
        this.searchMoreBox.find("#brandConfirm").css("display","inline-block");
    }else {
        $obj.remove();
    }
}
branchControl.prototype.loadBrand=function(obj){//根据赛选条件加载品牌列表
    var obj=obj||{};
    var Brand=this.getBrandData();
    var uri='/router/dealerCoupon/getBrands';
    var data={categoryCodesStr:Brand.categoryCodesStr};
    var type=obj.type||1;
    delete obj.type;
    if(!obj.categoryCodesStr){
        obj.categoryCodesStr=Brand.categoryCodesStr
    }
    this.setBrandData('categoryCodesStr',obj.categoryCodesStr)
    var that=this;
    $.ajax({
        type:"get",
        data:obj,
        url:uri,
        dataType: "json",
        success:function(data){
            var brandUl=that.searchMoreBox.find("#brandUl");
            brandUl.empty();
            if(data.status==0&&typeof data.data!='undefined'){
                if(type==1){// 单选处理
                    var searchBoxUl=that.searchBox.find(".dl-cat-list")
                    searchBoxUl.empty();
                }
                var brandDate=that.getBrandData('brandDate');//修改
                $.each(data.data,function(i,v){
                    var selClass='';
                    var checked='';
                    $.each(brandDate,function(j,val){
                        var id=val.id;
                        if(v.brandId==id){
                            selClass='sl-check';
                            checked='checked="true"';
                        }
                    });
                    var el=$('<li data-id="'+v.brandId+'" id="'+v.brandId+'" class="sl-none '+selClass+'" title="'+ v.brandName+'"> <input type="checkbox" '+checked+' value="'+v.brandId+'" name="'+v.brandName+'"> <a href="javascript:void(0)" title="'+ v.brandName+'">'+ v.brandName+'</a></li>');
                    brandUl.append(el);
                    if(type==1&&i<22){
                        searchBoxUl.append('<li title="'+ v.brandName+'" data-id="'+v.brandId+'"> <a href="javascript:void(0)">'+ v.brandName+' </a></li>')
                    }
                });
                that.searchMoreBox.find("#brandUl li").click(function(){
                    that.addOneConditions($(this))
                });
                if(type==1){
                    that.searchBox.find(".dl-cat-list li").click(function(){//单选品牌 事件
                        var data=[{id:$(this).attr('data-id'),title:$(this).attr('title')}];
                        that.selectedInfo(data);
                    });
                }
            }

        }
    })
}

branchControl.prototype.addOneConditions=function($obj){ //选中品牌点击事件
    var that=this;
    var $obj=$obj;
    var title=$obj.attr("title");
    var id=$obj.attr('data-id');
    var data=[];
    var brandDate=this.getBrandData('brandDate');//修改
    if(this.searchMoreBox.hasClass(this.MoreSelectedClass)){
        if($obj.hasClass('sl-check')){
            $obj.removeClass('sl-check');
            $obj.find('input').prop('checked',false);
            this.slected.find('#seBrand_'+id).remove();
            for(var i= 0,len=brandDate.length;i<len;i++){
                var v=brandDate[i];
                if(v.id==id){
                    brandDate.splice(i,1);
                    break;
                }
            }
        }else {
            $obj.find('input').prop('checked',true)
            $obj.addClass('sl-check');
            brandDate.push({id:id,title:title});
            var $li=$('<li id="seBrand_'+id+'" data-id="'+ id+'">'+ title+'<span class="on" data-id="'+ id+'">×</span></li>');
            $li.click(function(){
                var id=$(this).attr('data-id')
                that.clearOneSelected(id)
            })
            that.slected.find("#screeningConditions").append($li);

           // that.slected.find("#screeningConditions").append('<li id="seBrand_'+id+'" data-id="'+ id+'">'+ title+'<span class="on" data-id="'+ id+'">×</span></li>');
        }
    }else {
        data.push({id:$obj.attr('data-id'),title:$obj.attr('title')});
        this.selectedInfo(data);
    }

}
branchControl.prototype.selectedInfo=function(data){//选中品牌
    var data=data||[];
   var ids=[],titles=[];
 /*   this.slected.show();
    this.searchBox.hide();
    this.searchMoreBox.hide();*/
    var that=this;
    var slectes=this.slected.find("#screeningConditions");
    slectes.empty();
    $.each(data,function(i,v){
        slectes.append('<li id="seBrand_'+v.id+'" data-id="'+ v.id+'">'+ v.title+'<span class="on" data-id="'+ v.id+'">×</span></li>');
        ids.push(v.id);
        titles.push(v.title);
    })
    this.setBrandData('brandDate',data);//修改
    this.brandData.brandTitle=titles;
    slectes.find('li .on').click(function(){
        var id=$(this).attr('data-id')
        that.clearOneSelected(id)
    });
}
branchControl.prototype.clearOneSelected=function(id){
    this.slected.find('#seBrand_'+id).remove();
    if(this.searchMoreBox.hasClass(this.MoreSelectedClass)) {
        var $obj=this.searchMoreBox.find('#brandUl li#'+id)
        $obj.removeClass('sl-check');
        $obj.find('input').prop('checked', false)
    }
    var brandDate=this.getBrandData('brandDate');//修改
    for(var i= 0,len=brandDate.length;i<len;i++){
        var v=brandDate[i];
        if(v.id==id){
            brandDate.splice(i,1);
            break;
        }
    }
}//单个选中品牌取消的操作
branchControl.prototype.clearSlectedData=function(){//取消所有已选择信息
    this.setBrandData('brandId',[]);
    this.searchBoxShow();
    var slectes=this.slected.find("#screeningConditions").empty();
    this.searchMoreBox.find("#brandAdd").empty();
    this.searchMoreBox.find("#selectedBrandShow").hide();
    this.searchMoreBox.find("#brandConfirmSelected").hide();
    this.searchMoreBox.find("#brandConfirm").css("display","inline-block");
    this.searchMoreBox.find("#brandUl li.sl-check").removeClass("sl-check");
    this.searchMoreBox.find("#letterList li.on").removeClass("on");
}
branchControl.prototype.getBrandData=function(key){
    if(typeof key!='undefined')return this.brandData[key];
    return this.brandData;
}
branchControl.prototype.setBrandData=function(key,value){
    if(typeof key!='undefined'&&typeof value!='undefined')this.brandData[key]=value;
    if(this.changeData){
        this.changeData(key,value,this);
    }
    return this.brandData;
}
var brand=new branchControl({
    slected:"#screeningConditionsDiv",//选中展示id
    searchBox:"#brand_div",//单选收起div
    searchMoreBox:"#brand_more_div",//多选或单选更多
    MoreSelectedClass:"brand-more-class",//多选与单选区别class,非必传
    changeData:function(key,value){ //brand相关数据改变时调用的函数
        var opUl=$("#packets-ctt-cop");
        opUl.empty();
    },
    startCall:function(that){//初始完数据调用的函数
        that.loadBrand({categoryCodesStr:'C01L0101'});//初始化brand数据
    }
});
console.log(brand.getBrandData());//查看组件相关数据
console.log(brand.getBrandData('brandDate'));//查看组件选中数据