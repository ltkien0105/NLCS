<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    if(isset($_POST['forget_username'])) {
        $forgetUsername = $_POST['forget_username'];
        $forgetNewPassword = $_POST['new_password'];
        
        $result = $db->updateAccount($forgetUsername, "password", $forgetNewPassword);
        if($result) {
            echo "success";
        } else {
            echo "Restore password failed";
        }
    } else {
        echo "hehe";
        echo "Can't send data to database";
    }
?>