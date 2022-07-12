<?php
    class Comment{
        private $conn;
        private $db_table = "comments";
        private $db_comment_reply = "comment_reply";
        
        // Columns
        public $id;
        public $comment;
        public $password;
        public $user_id;
        public $project_id;
        
        public function __construct($db){
            $this->conn = $db;
        }

        // CREATE
        public function createComment(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        project_id = :project_id,  
                        user_id = :user_id,
                        comment  = :comment";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->project_id=htmlspecialchars(strip_tags($this->project_id));
            $this->user_id=htmlspecialchars(strip_tags($this->user_id));
            $this->comment=htmlspecialchars(strip_tags($this->comment));
        
            // bind data
            $stmt->bindParam(":project_id", $this->project_id);
            $stmt->bindParam(":comment", $this->comment);
            $stmt->bindParam(":user_id", $this->user_id);

            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // CREATE COMMENT REPLY
        public function createReplyComment(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_comment_reply ."
                    SET
                        comment_id = :comment_id,  
                        user_id = :user_id,
                        comment_reply  = :comment";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->id=htmlspecialchars(strip_tags($this->id));
            $this->user_id=htmlspecialchars(strip_tags($this->user_id));
            $this->comment=htmlspecialchars(strip_tags($this->comment));
        
            // bind data
            $stmt->bindParam(":comment_id", $this->id);
            $stmt->bindParam(":user_id", $this->user_id);
            $stmt->bindParam(":comment", $this->comment);

            if($stmt->execute()){
                return true;
            }
            return false;
        }

        // GET ALL
        public function getComments($where){
            if($where=="user"){
                $sqlQuery = "SELECT * FROM " . $this->db_table . " WHERE user_id = :user_id ORDER BY comment_id desc";
                $stmt = $this->conn->prepare($sqlQuery);
                $this->user_id=htmlspecialchars(strip_tags(intval($this->user_id)));
                $stmt->bindParam(":user_id", $this->user_id);

            }else {
                $sqlQuery = "SELECT * FROM " . $this->db_table . " WHERE project_id = :project_id ORDER BY comment_id desc";
                $stmt = $this->conn->prepare($sqlQuery);
                $this->project_id=htmlspecialchars(strip_tags(intval($this->project_id)));
                $stmt->bindParam(":project_id", $this->project_id);
            }

            $stmt->execute();
            return $stmt;
        }

        // GET  Reply comments 
        public function getReplyComments(){
            $sqlQuery = "SELECT * FROM " . $this->db_comment_reply . " WHERE comment_id = :id";
            $stmt = $this->conn->prepare($sqlQuery);

            $this->id=htmlspecialchars(strip_tags($this->id));
            $stmt->bindParam(":id", $this->id);

            $stmt->execute();
            return $stmt;
        }

        // READ single comment id
        public function getSingleComment(){
            $sqlQuery = "SELECT
                        *
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       project_id = ?
                    LIMIT 0,1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $dataRow['comment_id'];
            return $dataRow;
        }

        
        // DELETE
        function deleteComments($where){
            if($where=="user"){
                $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE user_id = ?";
                $stmt = $this->conn->prepare($sqlQuery);
                $this->user_id=htmlspecialchars(strip_tags($this->user_id));
                $stmt->bindParam(1, $this->user_id);
            }else {
                $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE project_id = ?";
                $stmt = $this->conn->prepare($sqlQuery);
                $this->project_id=htmlspecialchars(strip_tags($this->project_id));
                $stmt->bindParam(1, $this->project_id);
            }
    
            if($stmt->execute()){
                return $stmt;
            }
            return false;
        }

                // DELETE
        function deleteReplyComments(){
            $sqlQuery = "DELETE FROM " . $this->db_comment_reply . " WHERE comment_id = ?";
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