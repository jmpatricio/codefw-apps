<?php


class hello_api{
    function barber($params)
    {
        $params = json_decode($params);
        $t1['text'] = "Item 1";
        $t1['done'] = false;

        $t2['text'] = "Item 2";
        $t2['done'] = true;

        $t3['text'] = "Item 3";
        $t3['done'] = false;

        $tasks[] = $t1;
        $tasks[] = $t2;
        $tasks[] = $t3;

        echo json_encode($tasks);
    }
}

if (!empty($_GET['method'])) {
    $obj = new hello_api();
    $method_name = $_GET['method'];
    $parameter = (empty($_GET['params'])) ? $_GET['params'] : null;
    $obj->{$method_name}($parameter);
}

?>
