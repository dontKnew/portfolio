<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);

    include_once '../config/database.php';
    include_once '../class/admins.php';
    include_once '../class/projects.php';
    include_once '../class/comments.php';
    include_once '../class/users.php';
    $database = new Database();
    $db = $database->getConnection();

    if(isset($_GET['admin'])){
        $items = new Admin($db);
        $stmt = $items->getAdmins();
        $itemCount = $stmt->rowCount();
        if($itemCount > 0){
            $adminArr = array();
            $adminArr["body"] = array();
            $adminArr["itemCount"] = $itemCount;
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $e = array(
                    "id" => $id,
                    "email" => $email,
                    "password" => $password,
                    "timestamp" => $timestamp
                );
                array_push($adminArr["body"], $e);
            }
            echo json_encode($adminArr);
        }
        else{
            // http_response_code(404);
            echo json_encode(
                array("message" => "No record found.")
            );
        }
    }else if(isset($_GET['project'])){
        $items = new Project($db);
        $stmt = $items->getProjects();
        $itemCount = $stmt->rowCount();
        if($itemCount > 0){
            $projectArr = array();
            $projectArr["body"] = array();
            $projectArr["itemCount"] = $itemCount;
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                // $e = array(
                //     "id" => $id,
                //     "admin_id" => $admin_id,
                //     "name" => $name,
                //     "languages" => $langugaes,
                //     "level" => $level,
                //     "downloadlink" => $downloadlink,
                //     "version" => $version,
                //     "description" => $description,
                //     "thumbnaillink" => $thumbnail,
                //     "previewlink" => $previewlink,
                //     "timestamp" => $timestamp,
                // );
                // print_r($e);  
                array_push($projectArr["body"], $row);
            }
            echo json_encode($projectArr);

        }
    }else if(isset($_GET['comment'])){
            $item = new Comment($db);
            $item->project_id = $_GET['projectid']; //intval() return 0 value, if does not isset value
            $stmt = $item->getComments("project");
            $itemCount = $stmt->rowCount();
            if($itemCount > 0 ){
                $commentArr = array();
                $commentArr["body"] = array();
                $commentArr["itemCount"] = $itemCount;
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $userItem = new User($db);
                    $userItem->id = $row['user_id'];
                    $userItem->getSingleUser();
                    // comment reply
                    $item->id = $row['comment_id']; 
                    $replyStmt = $item->getReplyComments();
                    $replyItemCount = $replyStmt->rowCount();
                    $commentArr["replyItemCount"] = $replyItemCount;
                    $replyBody = array();
                    if($replyItemCount > 0 ){
                        $commentArr["replyItemCount"] = $replyItemCount;
                        while($row1 = $replyStmt->fetch(PDO::FETCH_ASSOC)){
                            extract($row1);
                            $replyUserItem = new User($db);
                            $replyUserItem->id = $row1['user_id'];
                            $replyUserItem->getSingleUser();
                            $e1 = array(
                                "commentid"=>$comment_id,
                                "id"=>$comment_reply_id,
                                "comment"=>$comment_reply,
                                "name"=>$replyUserItem->name,
                                "profile"=>$replyUserItem->profile,
                                "email"=>$replyUserItem->email,
                                "timestamp"=>$timestamp,
                            );
                            array_push($replyBody, $e1);
                        }
                    }
                    $e = array(
                        "commentid"=>$comment_id,
                        "comment"=>$comment,
                        "name"=>$userItem->name,
                        "profile"=>$userItem->profile,
                        "email"=>$userItem->email,
                        "projectid"=>$project_id,
                        "timestamp"=>$timestamp,
                        "replyBody"=>$replyBody,
                        "replyCount"=>$replyItemCount
                    );
                    // end comment reply
                array_push($commentArr["body"], $e);
                }
                      
                 echo json_encode($commentArr);
                
            // get user name and email

            }
    }else if(isset($_GET['user'])){
        $items = new User($db);
        $stmt = $items->getUsers();
        $itemCount = $stmt->rowCount();
        if($itemCount > 0){
            $UserArr = array();
            $UserArr["body"] = array();
            $UserArr["itemCount"] = $itemCount;
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                array_push($UserArr['body'], $row);
            }
            echo json_encode($UserArr);    
        }
    }else {
        echo json_encode(array("message"=>"something is wrong","status"=>0));
    }
?>