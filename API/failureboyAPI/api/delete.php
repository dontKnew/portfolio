<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods:*");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/database.php';
    include_once '../class/admins.php';
    include_once '../class/projects.php';
    include_once '../class/comments.php';
    include_once '../class/users.php';
    
    $database = new Database();
    $db = $database->getConnection();
    if(isset($_GET['id']) && isset($_GET['admin'])){
        $item = new Admin($db);
        $item->id = htmlspecialchars($_GET['id']);
        if($item->deleteAdmin()){
            echo json_encode("Admin deleted");
        } else{
            echo json_encode("Admin data could not be deleted");
        }
    }else if(isset($_GET['project'])){
        
        $commentItem = new Comment($db);
        $commentItem->project_id = htmlspecialchars($_GET['projectid']);

        $stmt = $commentItem->getComments("project");
        $commentCount = $stmt->rowCount();
        
        $commentItem->deleteComments("project");

        if($commentCount > 0 ){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $commentItem->id = $row['comment_id'];
                $commentItem->deleteReplyComments();
            }
        }
        $item = new Project($db);
        $item->id = htmlspecialchars($_GET['projectid']);
        if($item->deleteProject()){
            echo json_encode(array("message"=>"Project has been deleted", "status"=>1));
        } else{
            echo json_encode(array("message"=>"Project data could not be deleted", "status"=>1));
        }
    }else if(isset($_GET['user'])){
        
        $commentItem = new Comment($db);
        $commentItem->user_id = htmlspecialchars($_GET['userid']);

        $stmt = $commentItem->getComments("user");
        $commentCount = $stmt->rowCount();

        if($commentCount > 0 ){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $commentItem->id = $row['comment_id'];
                $commentItem->deleteReplyComments();
            }
        }
        $commentItem->deleteComments("user");
        $item = new User($db);
        $item->id = htmlspecialchars($_GET['userid']);
        if($item->deleteUser()){
            echo json_encode(array("message"=>"User has been deleted", "status"=>1));
        } else{
            echo json_encode(array("message"=>"User could not be deleted", "status"=>0));
        }
    }else {
        echo json_encode("not requested..");
    }
?>