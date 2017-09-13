{foreach from=$css_config  key=key item=item}
    {assign var='cssList' value={$STATIC_PRE|cat:$item} }
    {$cssPath='/danlu.com/dlmain'|cat:$item}
    {if $smarty.const.STATIC_FROM=='yes'}
        {$cssList=$cssList|regex_replace:'/\.css/':'.min.css'}
        {$cssPath='/danlu.com/dlmain'|cat:$item|regex_replace:'/\.css/':'.min.css'}
    {/if}
    <link href="{$cssList}?{file_createtime path=$cssPath}" type="text/css" rel="stylesheet">
{/foreach}