<?php
    // error_reporting(0);
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/database.php';
    include_once '../class/admins.php';
    include_once '../class/projects.php';
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
    // $data = json_decode(file_get_contents("php://input"));
    // echo $data->id;
    if(isset($_GET['admin']) && isset($_GET['id'])){
        $item = new Admin($db);
        $item->id = $_GET['id'];
        //value
        $item->password = $data->password;
        $item->email = $data->email;
        if($item->updateAdmin()){
            echo json_encode("Admin data updated.");
        } else{
            echo json_encode("Admin Data could not be updated");
        }
    }else if(isset($_GET['project'])){
        $item = new Project($db);
        $item->id = $_GET['id'];
        $item->admin_id = 0;
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
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/".$filename;
                }else {
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/".basename($_FILES["thumbnail"]['name']);
                }
                if($_FILES['thumbnail']['size']/1024 > 100 ){
                    compressedImage($_FILES['thumbnail']['tmp_name'],$upload_path,40);   
                }else if($_FILES['thumbnail']['size']/1024 < 100 ) {
                    compressedImage($_FILES['thumbnail']['tmp_name'],$upload_path,60);   
                }
                // if(move_uploaded_file($_FILES['thumbnail']['tmp_name'], $upload_path)){
                    $item->thumbnail = $url;
                    // echo json_encode(array("message"=>"file Location: ".$upload_path));
                // }else {
                //     echo json_encode(array("message"=>"file could not moved to ".$upload_path));
                // }
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }else {
            if($data = $item->getSingleProject()){
                // echo json_encode(array("oldPath"=>$data['project_thumbnail']));   
                $item->thumbnail = $data['project_thumbnail'];
            }else {
                echo json_encode(array("Error"=>"Old path could not fetched"));   
            }
        }
        if($item->updateProject()){
            echo json_encode(array("message1"=>"Project has been updated"));
        } else{
            echo json_encode(array("message"=>"Project could not be updated"));
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
        $item->id = $_GET['id'];
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
                        compressedImage($_FILES['profile']['tmp_name'],$upload_path,30);   
                    }else {
                        compressedImage($_FILES['profile']['tmp_name'],$upload_path,60);   
                    }
                    $item->profile = $url;
                    // echo json_encode(array("message"=>"file Location: ".$upload_path));
                // }else {
                //     echo json_encode(array("message"=>"file could not moved to ".$upload_path));
                // }
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }else {
            if($data = $item->getSingleUser()){
                // echo json_encode(array("oldPath"=>$data['project_thumbnail']));   
                $item->profile = $data['user_profile'];
            }else {
                echo json_encode(array("Error"=>"Old path could not fetched"));   
            }
        }
        if($item->updateUser($_POST['name'])){
            echo json_encode(array("message1"=>"User has been updated"));
        } else{
            echo json_encode(array("message"=>"User could not be updated"));
        }
    }
    else{
        http_response_code(400);
    }
?>