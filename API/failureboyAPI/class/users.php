<?php
    class User{
        // Connection
        private $conn;
        // Table
        private $db_table = "users";

        // Columns
        public $id;
        public $name;
        public $email;
        public $password;
        public $question;
        public $answer;
        public $gender;
        public $profile;
        public $timestamp;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        // GET ALL
        public function getUsers(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " ORDER BY user_id desc";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        // CREATE
        public function createUser($pass){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        user_name = :name, 
                        user_email = :email,
                        user_gender = :gender,
                        user_password = :password,
                        user_question = :question,
                        user_answer = :answer,
                        user_profile = :profile";
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->question=htmlspecialchars(strip_tags($this->question));
            $this->answer=htmlspecialchars(strip_tags($this->answer));
            $this->profile=htmlspecialchars(strip_tags($this->profile));
            $pass=htmlspecialchars(strip_tags($pass));
            $this->gender=htmlspecialchars(strip_tags($this->gender));
        
            // bind data
            $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
            $stmt->bindParam(':gender', $this->gender, PDO::PARAM_STR);
            $stmt->bindParam(':password', $pass, PDO::PARAM_STR);
            $stmt->bindParam(':question', $this->question, PDO::PARAM_STR);
            $stmt->bindParam(':answer', $this->answer, PDO::PARAM_STR);
            $stmt->bindParam(':profile', $this->profile, PDO::PARAM_STR);
            
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // login Admin Searching
        public function userLogin(){
            $sqlQuery = "SELECT
                            *
                        FROM
                        ". $this->db_table ."
                    WHERE 
                        user_email = ?
                    LIMIT 0,1"; 
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->email);

            if($stmt->execute()){
                $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->password = $dataRow['user_password'];
                $this->id = $dataRow['user_id'];
                return true;
            }
            return false;
        }

        // READ single
        public function getSingleUser(){
            $sqlQuery = "SELECT
                        *
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       user_id = ?
                    LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->email = $dataRow['user_email'];
            $this->password = $dataRow['user_password'];
            $this->name = $dataRow['user_name'];
            $this->profile = $dataRow['user_profile'];
            return $dataRow;
        }

        
        // UPDATE
        public function updateUser($name){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                    user_name = :name, 
                    user_email = :email,
                    user_gender = :gender,
                    user_password = :password,
                    user_question = :question,
                    user_answer = :answer,
                    user_profile = :profile
                    WHERE 
                        user_id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
    
            // sanitize
            $this->name=htmlspecialchars(strip_tags($name));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->question=htmlspecialchars(strip_tags($this->question));
            $this->answer=htmlspecialchars(strip_tags($this->answer));
            $this->profile=htmlspecialchars(strip_tags($this->profile));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->gender=htmlspecialchars(strip_tags($this->gender));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
            $stmt->bindParam(':gender', $this->gender, PDO::PARAM_STR);
            $stmt->bindParam(':password', $this->password, PDO::PARAM_STR);
            $stmt->bindParam(':question', $this->question, PDO::PARAM_STR);
            $stmt->bindParam(':answer', $this->answer, PDO::PARAM_STR);
            $stmt->bindParam(':profile', $this->profile, PDO::PARAM_STR);
            $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // DELETE
        function deleteUser(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE user_id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
    
            if($stmt->execute()){
                return $stmt;
            }
            return false;
        }
    }
?>