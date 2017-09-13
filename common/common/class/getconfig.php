<?php

class getconfig{
    public $privCfg;
    public function __construct(pravitcofig $privConfig)
    {
        $this->privCfg=$privConfig;
    }
    function commonCfg(){

    }
    function coomoncfg(){

    }
    function priviteCfg(){
        $this->privCfg->getconfig();
    }
    function getconfig(){
      return  $this->commonCfg()+$this->priviteCfg();;
    }
}