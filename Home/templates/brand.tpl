<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    {include './part/addCss.tpl'}
</head>
<body>
<div class="resultlist clearfix brandcontent">
    <div id="screeningConditionsDiv" class="new_search_box">
        <div class="sl-key">品牌：</div>
        <div class="clear_check_big_box ">
            <div class="clear_check_box clearfix">
                <ul class="clear_check_state clearfix" id="screeningConditions">

                </ul>
            </div>

        </div>
    </div>
    <div id="brand_div" class="new_search_box search_brand_on clearfix" style="display: block;">
        <ul class="dl-cat-list clearfix" style="height: 120px;overflow: hidden">
        </ul>
        <div class="brand_ui_layer clearfix">
            <div id="brandMoreButton" class="clear_check_cat">更多</div>
            <div id="brandMoreSelectFirst" class="clear_check_cat2">多选</div>
        </div>
        <div class="cl"></div>
    </div>

    <div id="brand_more_div" class="new_search_box search_brand_off more_select_list">
      <div class="clearfix letter-title">
          <div class="sl-all" >全部</div>
          <ul id="letterList" class="letter-list clearfix">
              <li><a href="javascript:void(0)">A</a></li>
              <li><a href="javascript:void(0)">B</a></li>
              <li><a href="javascript:void(0)">C</a></li>
              <li><a href="javascript:void(0)">D</a></li>
              <li><a href="javascript:void(0)">E</a></li>
              <li><a href="javascript:void(0)">F</a></li>
              <li><a href="javascript:void(0)">G</a></li>
              <li><a href="javascript:void(0)">H</a></li>
              <li><a href="javascript:void(0)">I</a></li>
              <li><a href="javascript:void(0)">J</a></li>
              <li><a href="javascript:void(0)">K</a></li>
              <li><a href="javascript:void(0)">L</a></li>
              <li><a href="javascript:void(0)">M</a></li>
              <li><a href="javascript:void(0)">N</a></li>
              <li><a href="javascript:void(0)">O</a></li>
              <li><a href="javascript:void(0)">P</a></li>
              <li><a href="javascript:void(0)">Q</a></li>
              <li><a href="javascript:void(0)">R</a></li>
              <li><a href="javascript:void(0)">S</a></li>
              <li><a href="javascript:void(0)">T</a></li>
              <li><a href="javascript:void(0)">U</a></li>
              <li><a href="javascript:void(0)">V</a></li>
              <li><a href="javascript:void(0)">W</a></li>
              <li><a href="javascript:void(0)">X</a></li>
              <li><a href="javascript:void(0)">Y</a></li>
              <li><a href="javascript:void(0)">Z</a></li>
          </ul>
          <div class="search-condition">
              <a href="javascript:void(0)" id="searchCon" >搜索</a>
              <input type="text" id="brandNameValue"  value="">
          </div>

          <input type="hidden" id="brandSelectFlag" value="moreFlag">
      </div>

        <div class="cl clearfix"></div>
            <ul id="brandUl" class="brand_list clearfix" style="height: 120px;">
            </ul>
        <div class="brand_ui_layer clearfix">
            <div id="brandSlideUp" class="clear_check_cat">收起</div>
            <div id="brandMoreSelect" class="clear_check_cat2">多选</div>
            <div id="brandOneSelect" class="clear_check_cat3">单选</div>
        </div>

    </div>
</div>


</body>
{include './part/addJs.tpl'}
</html>
