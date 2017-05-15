<?php

class DBConnect{

    private $conn;
    private $host = 'localhost';
    private $database = 'bitm_project';
    private $username = 'root';
    private $password = '';

    public function connect(){

        if (!$this->conn) {
  			$this->conn = mysql_connect($this->host, $this->username, $this->password);
  			mysql_select_db($this->database, $this->conn);
  			mysql_set_charset('utf8',$this->conn);

  			if (!$this->conn) {
  				echo 'Connection BDD failed';
  				die();
  			}
  			else {
            	// echo 'Connection BDD successful';
  			}
  		}

    }

    public function query($sql) {
        $this->connect();
        $results = mysql_query($sql, $this->conn);
        return $results;
    }



}
