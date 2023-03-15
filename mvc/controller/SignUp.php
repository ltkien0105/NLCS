<?php
    include '../model/DBConfig.php';
    $db = new Database();
    $db->connect();
    
    if(isset($_POST['signUpUsername'])) {
        $signUpUsername = $_POST['signUpUsername'];
        $signUpPassword = $_POST['signUpPassword'];
        $signUpFullname = $_POST['signUpFullname'];
        $signUpEmail = $_POST['signUpEmail'];
        $gender = $_POST['gender'];
        $signUpPhonenumber = $_POST['signUpPhonenumber'];
        $signUpAddress = $_POST['signUpAddress'];

        if($db->insertAccount($signUpUsername, $signUpPassword)) {
            if($db->insertReader($signUpUsername, $signUpFullname, $gender, $signUpEmail, $signUpAddress, $signUpPhonenumber)) {
                echo "Sign up successfully!";
            }   
        }
    } else {
        echo "Can't send data to database";
    }
?>