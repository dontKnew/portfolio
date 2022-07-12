<?php
    
    // show  php erros for linux user 
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1); //hide error for user registered...

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../class/admins.php';
    include_once '../class/projects.php';
    include_once '../class/comments.php';
    include_once '../class/users.php';
    
    $database = new Database();
    $db = $database->getConnection();
    function compressedImage($source, $path, $quality) {
         $info = getimagesize($source);
         if ($info['mime'] == 'image/jpeg') 
             $image = imagecreatefromjpeg($source);
         elseif ($info['mime'] == 'image/gif') 
             $image = imagecreatefromgif($source);
         elseif ($info['mime'] == 'image/png') 
             $image = imagecreatefrompng($source);
         imagejpeg($image, $path, $quality);
    }
    
    if(isset($_GET['admin'])){
        $item = new Admin($db);
        $data = json_decode(file_get_contents("php://input"));
        $item->password = $data->password;
        $item->email = $data->email;
        if($item->createAdmin()){
             echo json_encode(array("message"=>"Admin created successfully"));
        } else{
            echo json_encode(array("message"=>"Admin could not created"));
        }   
    }else if(isset($_GET['project']) && $_SERVER["REQUEST_METHOD"]=="POST"){
        $item = new Project($db);
        $item->admin_id = $_POST['adminId'];
        $item->name = $_POST['name'];
        $item->languages = $_POST['language'];
        $item->level = $_POST['level'];
        $item->downloadlink = $_POST['downloadlink'];
        $item->description = $_POST['description'];
        $item->version = $_POST['version'];
        $item->previewlink = $_POST['previewlink'];
        $item->thumbnail = "";
        if (isset($_FILES['thumbnail']['name'])) {
            $upload_path = __DIR__."/images/".basename($_FILES["thumbnail"]['name']);
            $valid_ext = array('png','jpeg','jpg','gif');
            $ext = strtolower(pathinfo($_FILES['thumbnail']['name'], PATHINFO_EXTENSION));
            if(in_array($ext,$valid_ext)){  
                if(file_exists($upload_path)){
                $filename = basename($_FILES['thumbnail']['name'],".".$ext).rand().".".$ext;
                $upload_path = __DIR__."/images/".$filename;
                $url = "https://".$_SERVER['HTTP_HOST']."/failureboyAPI/api/images/".$filename;
                }else {
                    $url = "https://".$_SERVER['HTTP_HOST']."./failureboyAPI/api/images/".basename($_FILES["thumbnail"]['name']);
                }
                // if(move_uploaded_file($_FILES['thumbnail']['tmp_name'], $upload_path)){
                if($_FILES['thumbnail']['size']/1024 > 100 ){
                    compressedImage($_FILES['thumbnail']['tmp_name'],$upload_path,40);   
                }else if($_FILES['thumbnail']['size']/1024 < 100 ) {
                    compressedImage($_FILES['thumbnail']['tmp_name'],$upload_path,60);   
                }
                    $item->thumbnail = $url;
                    // echo json_encode(array("message"=>"file Location: ".$upload_path));
                    if($item->createProject()){
                        echo json_encode(array("message1"=>"New Project has been added"));
                    } else{
                        echo json_encode(array("message"=>"Project could not be added"));
                    }
                // }else {
                //     echo json_encode(array("message"=>"file could not moved to ".$upload_path));
                // }    
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }else {
            echo json_encode(array("message"=>"file does not exits")); 
        }
    }else if(isset($_GET['user'])){
        
        $item = new User($db);
        $item->name =  $_POST['name'];
        $item->email =  $_POST['email'];;
        $item->password = $_POST['password'];;
        $item->question =  $_POST['question'];
        $item->password = $_POST['password'];
        $item->answer =  $_POST['answer'];
        $item->gender  = $_POST['gender'];
        $item->profile = "";
        if($item->userLogin())
        if(strtoupper($item->gender) === "MALE"){
            $item->profile = "https://randomuser.me/api/portraits/men/".(rand(10,100)).".jpg";
        }else if(strtoupper($item->gender) === "FEMALE"){
            $item->profile = "https://randomuser.me/api/portraits/women/".(rand(10,100)).".jpg";
        }   
        if($item->createUser($_POST['password'])){
            echo json_encode(array("message"=>"New user has been created", "status"=>"1"));
        }else { 
            echo json_encode(array("message"=>"User Could not created", "status"=>"0"));
        }     

    }else if(isset($_GET['user']) && $_SERVER["REQUEST_METHOD"]=="POST"){
        $item = new User($db);
        $item->name =  $_POST['name'];
        $item->email =  $_POST['email'];;
        $item->password = $_POST['password'];;
        $item->question =  $_POST['question'];
        $item->password = $_POST['password'];
        $item->answer =  $_POST['answer'];
        $item->gender  = $_POST['gender'];
        $item->profile = "";
        if($item->userLogin())
        if(strtoupper($item->gender) === "MALE"){
            $item->profile = "https://randomuser.me/api/portraits/men/".(rand(10,100)).".jpg";
        }else if(strtoupper($item->gender) === "FEMALE"){
            $item->profile = "https://randomuser.me/api/portraits/women/".(rand(10,100)).".jpg";
        }   
        if($item->createUser($item->password)){
            echo json_encode(array("message"=>"New user has been created", "status"=>"1"));
        }else { 
            echo json_encode(array("message"=>"User Could not created", "status"=>"0"));
        }          
    }else if(isset($_GET['userByImage']) && $_SERVER["REQUEST_METHOD"]=="POST"){
        
        $item = new User($db);
        $item->name =  $_POST['name'];
        $item->email =  $_POST['email'];;
        $item->password = $_POST['password'];;
        $item->question =  $_POST['question'];
        $item->password = $_POST['password'];
        $item->answer =  $_POST['answer'];
        $item->gender  = $_POST['gender'];
        $item->profile = "";
        if (isset($_FILES['profile']['name'])) {
            $upload_path = __DIR__."/images/profile/".basename($_FILES["profile"]['name']);
            $valid_ext = array('png','jpeg','jpg','gif');
            $ext = strtolower(pathinfo($_FILES['profile']['name'], PATHINFO_EXTENSION));
            if(in_array($ext,$valid_ext)){  
                if(file_exists($upload_path)){
                    $filename = basename($_FILES['profile']['name'],".".$ext).rand();
                    $upload_path = __DIR__."/images/profile/".$filename.".".$ext;
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/profile/".$filename.".".$ext;
                }else {
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/profile/".basename($_FILES["profile"]['name']);
                }
                // if(move_uploaded_file($_FILES['profile']['tmp_name'], $upload_path)){
                    if($_FILES['profile']['size']/1024 > 100 ){
                        compressedImage($_FILES['profile']['tmp_name'],$upload_path,40);   
                    }else if($_FILES['thumbnail']['size']/1024 < 100 ) {
                        compressedImage($_FILES['profile']['tmp_name'],$upload_path,60);   
                    }
                    $item->profile = $url;
                    if($item->createUser($item->password)){
                        echo json_encode(array("message1"=>"New User  has been added", "data"=>$upload_path, "urlPath"=>$url));
                    } else{
                        echo json_encode(array("message"=>"User could not be added"));
                    }
                // }else {
                //     echo json_encode(array("message"=>"Profile image path could not moved to ".$upload_path));
                // }
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }else {
            echo json_encode(array("message"=>"Profile image does not exits")); 
        }
    }else if(isset($_GET['comment'])){
            $item = new Comment($db);
            $data = json_decode(file_get_contents("php://input"));
            $item->comment = $data->comment;
            $item->email = $data->email;
            $item->user_id = "";
            $item->project_id  = $data->projectid;
            if(isset($item->email)){
                $userItem = new User($db);
                $userItem->email = $item->email;
                $userItem->userLogin(); //user id has been set in line around 88
                $item->user_id = $userItem->id;
            }
            if($item->createComment()){
                echo json_encode(array("message"=>"Comment has been added",  "status"=>1));
            }else {
                echo json_encode(array("message"=>"comment could not added",  "status"=>0));
            }
    }else if(isset($_GET['commentreply'])){
            $item = new Comment($db);
            $data = json_decode(file_get_contents("php://input"));
            $item->comment = $data->comment;
            $item->id = $data->commentid;
            $item->email = $data->email;
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
        echo json_encode(array("message"=>"Method does not selected",  "status"=>0));
    }
?>