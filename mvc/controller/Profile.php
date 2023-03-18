<?php
    include "../model/DBConfig.php";
    $db = new Database();
    $db->connect();

    if(isset($_POST["new_pass"])) {
        $username = $_POST["usernameChange"];
        $newPass = $_POST["new_pass"];
        if($db->updatePassword($username, "password", $newPass)) {
            echo "Change password successfully";
        }
    } elseif(isset($_POST['profileUsername'])) {
        $username = $_POST['profileUsername'];
        $result = $db->getProfile($username);
        echo json_encode($result);
    } 
?>