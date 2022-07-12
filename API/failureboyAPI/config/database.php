<?php 
    class Database {
        // private $host = "127.0.0.1";
        // private $database_name = "failureboy";
        // private $username = "root";
        // private $password = "";

        private $host = "localhost";
        private $database_name = "id18676455_failureboy";
        private $username = "id18676455_root";
        private $password = "Sajid@786Sajid@786";
        public $conn;
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }
    }
?>