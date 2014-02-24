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
        $this->sendJSON($users, 200);
    }
    
    function get_user($params){
        
        $id = (isset($params['id'])) ? $params['id'] : false;
        if ($id){
            $sql = 'select * from user where id=?';
            $user = $this->db->fetchAssoc($sql, array($id), 0);
            if (!empty($user)){
                $response = $user;
            } else {
                $response = array('error'=>'User not found');
            }
        }
        $this->sendJSON($response, 200);
    }
    
    function get_message($params){
        $id = (isset($params['id'])) ? $params['id'] : false;
        if ($id){
            $sql = 'select * from message where id=?';
            $message = $this->db->fetchAssoc($sql, array($id), 0);
            if (!empty($message)){
                $response = $message;
            } else {
                $response = array('error'=>'Message not found');
            }
        }
        $this->sendJSON($response, 200);
    }
    
    function add_message($params){
        
        $message['id_from'] = $params['id_from'];
        $message['id_to'] = $params['id_to'];
        $message['content'] = $params['content'];
        $message['_sent'] = time();
        $this->db->insert('message',$message);
        #$response = $this->db->insert('message',$message);
        #$this->sendJSON($response, 200);
    }
    
    function list_messages($params){
			$id_from = (isset($params['id_from'])) ? $params['id_from'] : false;
      $id_to = (isset($params['id_to'])) ? $params['id_to'] : false;
      if ($id_from&&$id_to){
          $sql = 'select * from message where id_from=? OR id_to=?';
	        $stmt = $this->db->prepare($sql);
	        $stmt->execute(array($id_from, $id_to));
	        $message = $stmt->fetchAll();
          if (!empty($message)){
              $response = $message;
          } else {
              $response = array('error'=>'Messages not found');
          }
      }
      $this->sendJSON($response, 200);
    }
    
    function set_read($params){
        $response = $this->db->update('message', array('_read'=>time()), array('id'=>$params['id']));
        $this->sendJSON( $response , 200);
    }

}

$api = new hello_api();
$api->listen();

?>
