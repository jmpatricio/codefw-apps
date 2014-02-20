<?php
//print_r($_SERVER);

//require_once( __DIR__.'/../wp-load.php' );

include '../../codefw/class.CodeFW_App_API.php';

class hello_api extends CodeFW_App_API {

    function hello_api(){
        parent::CodeFW_App_API();

    }

    function hello_world($params){
        $arr['test'] = 'OK';
        return json_encode($arr);
    } 

}

$api = new hello_api();
$api->listen();

?>
