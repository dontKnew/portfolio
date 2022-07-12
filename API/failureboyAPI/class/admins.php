<?php
    class Admin{
        // Connection
        private $conn;
        // Table
        private $db_table = "admins";
        // Columns
        public $id;
        public $email;
        public $password;
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getAdmins(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        // CREATE
        public function createAdmin(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        admin_email = :email,  
                        admin_password = :password";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
            // bind data
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);

            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // READ single
        public function getSingleAdmin(){
            $sqlQuery = "SELECT
                        *
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       admin_id = ?
                    LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->email = $dataRow['admin_email'];
            $this->password = $dataRow['admin_password'];
            return $dataRow;
        }

        // login Admin Searching
        public function adminLogin(){
            $sqlQuery = "SELECT
                         admin_password
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       admin_email = ?
                    LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->email);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
        
            $this->password = $dataRow['admin_password'];
        }
        
        // UPDATE
        public function updateAdmin(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        admin_email = :email, 
                        admin_password = :password
                    WHERE 
                        admin_id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
    
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // DELETE
        function deleteAdmin(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE admin_id = ?";
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