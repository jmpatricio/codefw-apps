<?php
//print_r($_SERVER);

//require_once( __DIR__.'/../wp-load.php' );

include '../../codefw/class.CodeFW_App_API.php';

class hello_api extends CodeFW_App_API {

    const dbHost = '185.28.20.12';
    const dbUser = 'u765608950_msgus';
    const dbPass = 'Zxd8h8dvXW';
    const dbName = 'u765608950_msg';
    
    private $db;
    
    function hello_api(){
        parent::CodeFW_App_API();
        $connectionParams = array(
            'dbname' => self::dbName,
            'user' => self::dbUser,
            'password' => self::dbPass,
            'host' => self::dbHost,
            'driver' => 'pdo_mysql',
        );
        $this->db = \Doctrine\DBAL\DriverManager::getConnection($connectionParams, null);

    }

    function list_users($params){
        $sql = "SELECT * FROM user";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll();
        return json_encode($users);
    }
    
    function get_user($params){
        
        $id = (isset($params['id'])) ? $params['id'] : false;
        if ($id){
            $sql = 'select * from user where id=?';
            $user = $this->db->fetchAssoc($sql, array($id), 0);
            if (!empty($user)){
                return json_encode($user);
            } else {
                return json_encode(array('error'=>'User not found'));
            }
        }
        return json_encode(array('error'=>'User not found'));
    }
    
    function get_message($params){
        $id = (isset($params['id'])) ? $params['id'] : false;
        if ($id){
            $sql = 'select * from message where id=?';
            $message = $this->db->fetchAssoc($sql, array($id), 0);
            if (!empty($message)){
                return json_encode($message);
            } else {
                return json_encode(array('error'=>'Message not found'));
            }
        }
        return json_encode(array('error'=>'Message not found'));
    }
    
    function add_message($params){
        
        $message['id_from'] = $params['id_from'];
        $message['id_to'] = $params['id_to'];
        $message['content'] = $params['content'];
        $message['_sent'] = $params['_sent'];
        $this->db->insert('message',$message);
        return json_encode($this->db->insert('message',$message));
    }
    
    function list_messages($params){
        $messages = $this->db->fetchAll("select * from message");
        return json_encode($messages);
    }
    
    function set_read($params){
        
        return json_encode($this->db->update('message', array('_read'=>time()), array('id'=>$params['id'])));
        
    }

}

$api = new hello_api();
$api->listen();

?>
