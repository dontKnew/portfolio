<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../class/admins.php';
    include_once '../class/projects.php';
    include_once '../class/users.php';
    $database = new Database();

    $db = $database->getConnection();
    if(isset($_GET['adminlogin']) && isset($_GET['email']) && isset($_GET['password']) ){
        $item = new Admin($db);
        $item->email = $_GET['email'];
        $item->adminLogin();
        if($item->password == htmlspecialchars($_GET['password'])){
            // http_response_code(200);
            echo json_encode(array("message"=>"login successfully", "count"=>1));
        }
        else{
            
            echo json_encode(array("message"=>"data does not exits", "count"=>0));
        }
    }else if(isset($_GET['admin'])){
        $item = new Admin($db);
        $item->id = isset($_GET['id']) ? $_GET['id'] : die();
        $item->getSingleAdmin();
        if($item->email != null){
            // create array
            $emp_arr = array(
                "admin_id" =>  $item->id,
                "email" => $item->email,
                "password" => $item->password,
                "timestamp" => $item->timestamp
            );
            // http_response_code(200);
            echo json_encode($emp_arr);
        }
        else{
            echo json_encode("Admin not found");
        }
    }else if(isset($_GET['project'])){
        $item = new Project($db);
        $item->id = isset($_GET['id']) ? $_GET['id'] : die();
        echo json_encode(array("body"=>$item->getSingleProject(), "message"=>"data fetched"));

    }else if(isset($_GET['userlogin']) && isset($_GET['email']) && isset($_GET['password'])){
        $item = new User($db);
        $item->email = $_GET['email'];
        $item->userLogin();
        if($item->password == htmlspecialchars($_GET['password'])){
            echo json_encode(array("message"=>"login successfully", "status"=>1));
        }
        else{
            echo json_encode(array("message"=>"login failed", "status"=>0));
        }
    }else if(isset($_GET['user'])){
        $item = new User($db);
        $item->id = $_GET['id'];
        echo json_encode(array("body"=>$item->getSingleUser(), "message"=>$_GET['id']));
    }else {
        echo json_encode(array("message"=>"No any request send by client"));
    }

?>