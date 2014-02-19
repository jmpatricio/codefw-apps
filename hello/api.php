<?php
//print_r($_SERVER);

//require_once( __DIR__.'/../wp-load.php' );

include '../../codefw/class.CodeFW_App_API.php';

//header('Access-Control-Allow-Origin: *'); 

class hello_api extends CodeFW_App_API {

    function hello_api(){
        parent::CodeFW_App_API();

    }

    function hello_world($params){
        $resp = file_get_contents('data.json');
        return $resp;
    } 

}

$api = new hello_api();
$api->listen();

?>
