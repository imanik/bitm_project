<?php
session_start();


include_once 'model/employee.php';

$obj = new Employee();

$res = $obj->getAllEmployee();

//$user_data1 = mysql_fetch_assoc($res);
$employee_rows = mysql_num_rows($res);

//var_dump($user_data1);
echo $employee_rows;

if($employee_rows > 0){
    while ($rows = mysql_fetch_assoc($res)){
        var_dump($rows);
    //    echo $rows['employee_name'];
    }

}

 ?>
