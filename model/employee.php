<?php

class Employee{
     function addEmployee( $employee_name, $created_date) {
        include_once('db_con.php');

        $obj = new DBConnect();

        $sql = "INSERT INTO employees (employee_id, employee_name) VALUES "
                . "(NULL, '" . mysql_real_escape_string($employee_name, $obj->getDBhandle()) . "')";

        return $result = $obj->query($sql);
    }

    function getAllEmployee(){
        include_once 'db_con.php';
        $obj = new DBConnect();
        $sql = "SELECT * FROM employees";
        return $result = $obj->query($sql);
    }

    function getAllEmployeeById($employee_id){
        include_once 'db_con.php';
        $obj = new DBConnect();
        $sql = "SELECT * FROM employee WHERE employee_id = '" . mysql_real_escape_string($employee_id) . "'";
        return $result = $obj->query($sql);
    }

    function getAllEmployeeByDesignationID($designation_id){
        include_once 'db_con.php';
        $obj = new DBConnect();
        $sql = "SELECT * FROM employee WHERE country_id = '" . mysql_real_escape_string($country_id) . "'";
        return $result = $obj->query($sql);
    }


}
