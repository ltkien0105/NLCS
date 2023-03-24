<?php
    include "../../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST['add_username'])) {
        $username = $_POST['add_username'];
        $password = $_POST['add_password'];;
        $fullname =  $_POST["add_fullname"];
        $gender =  $_POST["add_gender"];
        $email =  $_POST["add_email"];
        $address =  $_POST["add_address"];
        $phonenumber =  $_POST["add_phoneNumber"];

        if($db->insertAccount($username, $password)) {
            if($db->insertReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
                echo "success";
            }   
        }
    } elseif(isset($_POST['usernameEdit'])) {
        $username = $_POST['usernameEdit'];
        $result = $db->getReaderByUsername($username);
        echo json_encode($result);
    } elseif(isset($_POST['edit_username'])) {
        $username = $_POST['edit_username'];
        $fullname =  $_POST["edit_fullname"];
        $gender =  $_POST["edit_gender"];
        $email =  $_POST["edit_email"];
        $address =  $_POST["edit_address"];
        $phonenumber =  $_POST["edit_phoneNumber"];
        if($db->updateReader($username, $fullname, $gender, $email, $address, $phonenumber)) {
            echo "success";
        }
    } elseif(isset($_POST['usernameDelete'])) {
        $username = $_POST['usernameDelete'];
        if(!$db->isIssue($username, "")) {
            if($db->deleteReader($username)) {
                if($db->deleteAccount($username)) {
                    echo "success";
                }
            }
        } else {
            echo "isIssue";
        }
    } else {
        $table = "readers";
        $data = $db->getAllData($table);
        echo json_encode($data);
    }
?>