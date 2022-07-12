<?php
    // this will show error if any error happens
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1); //hide error for user registered...

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // header("Access-Control-Allow-Origin: *");
    // header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../class/projects.php';
    include_once '../class/comments.php';
    include_once '../class/users.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    if(isset($_GET['comment'])){
            $item = new Comment($db);
            $item->comment = $_POST['comment'];
            $item->email = $_POST['email'];
            $item->user_id = "";
            $item->project_id  = $_POST['projectid'];
            if(isset($item->email)){
                $userItem = new User($db);
                $userItem->email = $item->email;
                $userItem->userLogin(); //user id has been set in line around 88
                $item->user_id = $userItem->id;
            }
            if($item->createComment()){
                echo json_encode(array("message"=>"Comment has been added",  "status"=>1));
            }else {
                echo json_encode(array("message"=>$data,  "status"=>0));
            }
    }else if(isset($_GET['commentreply'])){
            $item = new Comment($db);
            $item->comment = $_POST['comment'];
            $item->id = $_POST['commentid'];
            $item->email = $_POST['email'];
            $item->user_id = "";
            if(isset($item->id)){
                $userItem = new User($db);
                $userItem->email = $item->email;
                $userItem->userLogin(); //user id has been set in line around 88
                $item->user_id = $userItem->id;
            }
            // print_r($data);
            if($item->createReplyComment()){
                echo json_encode(array("message"=>"Comment has been added",  "status"=>1));
            }else {
                echo json_encode(array("message"=>"comment could not added",  "status"=>0));
            }
    }else {
        echo "method not selected";
    }
?>