<?php
    class Project{
        // Connection
        private $conn;
        // Table
        private $db_table = "projects";
        // Columns
        public $id;
        public $admin_id = 0;
        public $name = "";
        public $languages = "";
        public $level = "";
        public $downloadlink = "";
        public $version = "";
        public $description = "";
        public $thumbnail = "";
        public $previewlink = "";

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getProjects(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " ORDER BY project_id desc";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        // CREATE
        public function createProject(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                    admin_id = :admin_id,
                    project_name = :name,
                    project_language = :languages,
                    project_level = :level,
                    project_download_link = :downloadlink,
                    project_version = :version,
                    project_description = :description,
                    project_thumbnail = :thumbnail,
                    project_preview = :previewlink";
                    $stmt = $this->conn->prepare($sqlQuery);
        
             // sanitize
            $this->admin_id = htmlspecialchars(strip_tags($this->admin_id));
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->languages = htmlspecialchars(strip_tags($this->languages));
            $this->level = htmlspecialchars(strip_tags($this->level));
            $this->downloadlink = htmlspecialchars(strip_tags($this->downloadlink));
            $this->version = htmlspecialchars(strip_tags($this->version));
            $this->description = htmlspecialchars(strip_tags($this->description));
            $this->thumbnail = htmlspecialchars(strip_tags($this->thumbnail));
            $this->previewlink = htmlspecialchars(strip_tags($this->previewlink));
        
            // bind data
            $stmt->bindParam(":admin_id", $this->admin_id);
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":languages", $this->languages);
            $stmt->bindParam(":level", $this->level);
            $stmt->bindParam(":downloadlink", $this->downloadlink);
            $stmt->bindParam(":version", $this->version);
            $stmt->bindParam(":description", $this->description);
            $stmt->bindParam(":thumbnail", $this->thumbnail);
            $stmt->bindParam(":previewlink", $this->previewlink);
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // READ single
        public function getSingleProject(){
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
            return $dataRow;
        }
        
        // UPDATE
        public function updateProject(){
            $sqlQuery = "UPDATE ". $this->db_table ." 
            SET admin_id = :admin_id,
             project_thumbnail = :thumbnail,
              project_name = :name,
               project_language = :languages,
               project_level = :level,
                project_download_link = :downloadlink,
                 project_version = :version, 
                 project_description = :description,
                  project_preview = :previewlink 
                  WHERE  project_id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
    
             // sanitize
             (int)$this->admin_id = htmlspecialchars(strip_tags($this->admin_id));
             $this->name = htmlspecialchars(strip_tags($this->name));
             $this->languages = htmlspecialchars(strip_tags($this->languages));
             $this->level = htmlspecialchars(strip_tags($this->level));
             $this->downloadlink = htmlspecialchars(strip_tags($this->downloadlink));
             $this->version = htmlspecialchars(strip_tags($this->version));
             $this->description = htmlspecialchars(strip_tags($this->description));
             $this->thumbnail = htmlspecialchars(strip_tags($this->thumbnail));
             $this->previewlink = htmlspecialchars(strip_tags($this->previewlink));
             (int)$this->id = htmlspecialchars(strip_tags($this->id));
    
             // bind data
             $stmt->bindParam(":admin_id", $this->admin_id);
             $stmt->bindParam(":name", $this->name);
             $stmt->bindParam(":languages", $this->languages);
             $stmt->bindParam(":level", $this->level);
             $stmt->bindParam(":downloadlink", $this->downloadlink);
             $stmt->bindParam(":version", $this->version);
             $stmt->bindParam(":description", $this->description);
             $stmt->bindParam(":thumbnail", $this->thumbnail);
             $stmt->bindParam(":previewlink", $this->previewlink);
             $stmt->bindParam(":id", $this->id);
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        // DELETE
        function deleteAllProject(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE admin_id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
    
            if($stmt->execute()){
                return $stmt;
            }
            return false;
        }

        // DELETE One Project
        function deleteProject(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE project_id = ?";
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